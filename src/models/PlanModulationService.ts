"use server";
import { Area } from "@/models/Area";
import {
    ModulationPlanAreaViewData,
    ModulationViewData,
} from "@/models/ModulationPlan";
import { ModulationPlanDate } from "@/models/ModulationPlanDate";
import { ModulationPlanHour } from "@/models/ModulationPlanHour";
import { SubArea } from "@/models/SubArea";
import { dateToISODateString } from "@/utils/Date";
import { databaseClient } from "../../infra/database";

export async function getAreas(date: Date | string): Promise<Area[]> {
    "use server";
    const queryResult = await databaseClient.query<
        {
            area_id: string;
            area_name: string;
            sub_area_id: string;
            sub_area_name: string;
        }[]
    >(
        `SELECT
	        ar.id AS area_id,
            ar.name AS area_name,
            sb.id AS sub_area_id,
            sb.name AS sub_area_name
        FROM areas AS ar RIGHT JOIN sub_areas AS sb ON ar.id = sb.area_id`
    );

    const areasMap = queryResult.reduce((pv, cv, i) => {
        const subArea = new SubArea(cv.sub_area_name, [], cv.sub_area_id);

        if (pv.has(cv.area_id)) {
            const area = pv.get(cv.area_id) as Area;
            area.addSubArea(subArea);
            pv.set(cv.area_id, area);

            return pv;
        }

        const area = new Area(cv.area_name, [subArea], cv.area_id);
        pv.set(cv.area_id, area);

        return pv;
    }, new Map<string, Area>());

    const areas = [...areasMap.values()];

    return JSON.stringify(areas) as unknown as Area[];
}

export async function saveModulationPlan(
    areasViewData: ModulationPlanAreaViewData[]
) {
    "use server";

    const areas = areasViewData.map((areaViewData) =>
        modulationPlanAreaViewDataToArea(areaViewData)
    );

    const datesData = areas
        .map((area) => areaToDatesDataList(area))
        .flat()
        .flat();

    try {
        const datesQuery =
            "INSERT INTO modulation_plan_date (id, date, sub_area_id) values ?";
        await databaseClient.query(datesQuery, datesData);
    } catch (e) {
        console.error(e);
    }

    const hoursData = areas
        .map((area) => areaToHoursDataList(area))
        .flat()
        .flat()
        .flat();

    const hoursQuery = `
        INSERT INTO modulation_plan_hours (id, hour, state, comment, date_id) values ?
    `;

    try {
        await databaseClient.query(hoursQuery, hoursData);
    } catch (e) {
        console.error(e);
    }
}

function modulationPlanAreaViewDataToArea(
    areaViewData: ModulationPlanAreaViewData
): Area {
    const subAreas = areaViewData.subAreas.map((sb) => {
        return new SubArea(
            sb.name,
            modulationViewDataToModulationPlanDates(sb.modulation),
            sb.id
        );
    });

    return new Area(areaViewData.name, subAreas, areaViewData.id);
}

function areaToDatesDataList(area: Area) {
    return area.subAreas.map((sb) =>
        sb.dates.map((date) => [date.id, dateToISODateString(date.date), sb.id])
    );
}

function areaToHoursDataList(area: Area) {
    return area.subAreas.map((sb) =>
        sb.dates.map((date) =>
            date.hours.map((hour) => {
                return [hour.id, hour.hour, hour.state, hour.comment, date.id];
            })
        )
    );
}

function modulationViewDataToModulationPlanDates(
    modulationViewData: ModulationViewData
): ModulationPlanDate[] {
    const d0Hours = modulationViewData.d0.hours.map((h) => {
        return new ModulationPlanHour(h.hour, h.state, h.coment || "");
    });

    const dPlus1Hours = modulationViewData.dPlus1.hours.map((h) => {
        return new ModulationPlanHour(h.hour, h.state, h.coment || "");
    });

    return [
        new ModulationPlanDate(modulationViewData.d0.date, d0Hours),
        new ModulationPlanDate(modulationViewData.dPlus1.date, dPlus1Hours),
    ];
}
