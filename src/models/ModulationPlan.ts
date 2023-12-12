import { addDays } from "@/utils/Date";
import { Area } from "./Area";
import { ModulationPlanDate } from "./ModulationPlanDate";
import { SubArea } from "./SubArea";

export interface ModulationPlanAreaViewData {
    id: string;
    name: string;
    subAreas: ModulationPlanSubAreaViewData[];
}

interface ModulationPlanSubAreaViewData {
    id: string;
    name: string;
    modulation: ModulationViewData;
}

export interface ModulationViewData {
    date: Date;
    d0: ModulationDayViewData;
    dPlus1: ModulationDayViewData;
}

interface ModulationDayViewData {
    date: Date;
    hours: ModulationHourViewData[];
}

interface ModulationHourViewData {
    hour: number;
    state: boolean;
    coment?: string;
}

export class ModulationPlanAreaViewDataFactory {
    static fromArea(area: Area, date: Date): ModulationPlanAreaViewData {
        return ModulationPlanAreaViewDataFactory.modulationAreaToDefaultPlanModulationArea(
            area,
            date
        );
    }

    private static modulationAreaToDefaultPlanModulationArea(
        area: Area,
        date: Date
    ): ModulationPlanAreaViewData {
        return {
            ...area,
            subAreas: area.subAreas.map((sb) =>
                ModulationPlanAreaViewDataFactory.subAreaTtoModulationPlanSubArea(
                    sb,
                    date
                )
            ),
        };
    }

    private static subAreaTtoModulationPlanSubArea(
        subArea: SubArea,
        date: Date
    ): ModulationPlanSubAreaViewData {
        return {
            id: subArea.id,
            name: subArea.name,
            modulation:
                ModulationPlanAreaViewDataFactory.modulationPlanDatesToModulationViewData(
                    subArea.dates,
                    date
                ),
        };
    }

    private static modulationPlanDatesToModulationViewData(
        modulationPlanDates: ModulationPlanDate[],
        date: Date
    ): ModulationViewData {
        const dPlus1Date = addDays(date, 1);

        return {
            date,
            d0: ModulationPlanAreaViewDataFactory.modulationPlanDateToModulationDayViewData(
                modulationPlanDates.filter(
                    (md) => md.date.getTime() === date.getTime()
                )[0],
                date
            ),
            dPlus1: ModulationPlanAreaViewDataFactory.modulationPlanDateToModulationDayViewData(
                modulationPlanDates.filter(
                    (md) => md.date.getTime() === dPlus1Date.getTime()
                )[0],
                dPlus1Date
            ),
        };
    }

    private static modulationPlanDateToModulationDayViewData(
        modulationDate: ModulationPlanDate,
        date: Date
    ) {
        if (!modulationDate) {
            return ModulationPlanAreaViewDataFactory.createModulationDay(date);
        }

        return modulationDate;
    }

    private static createModulationDay(date: Date): ModulationDayViewData {
        return {
            date,
            hours: ModulationPlanAreaViewDataFactory.makeDayHours(),
        };
    }

    private static makeDayHours() {
        const hours: ModulationHourViewData[] = [];
        for (let i = 0; i <= 23; i++) {
            hours[i] = {
                hour: i + 1,
                state: false,
            };
        }

        hours[23].hour = 0;
        return hours;
    }
}
