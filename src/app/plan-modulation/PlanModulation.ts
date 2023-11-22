import { addDays } from "@/utils/Date";

export interface ModulationArea {
    name: string;
    subAreas: string[];
}

export interface PlanModulationArea {
    name: string;
    subAreas: PlanModulationSubArea[];
}

interface PlanModulationSubArea {
    name: string;
    modulation: {
        date: Date;
        d0: ModulationDay;
        dPlus1: ModulationDay;
    };
}

interface ModulationDay {
    date: Date;
    hours: ModulationHour[];
}

interface ModulationHour {
    hour: string;
    state: boolean;
    coment?: string;
}

export function ModulationAreaToDefaultPlanModulationArea(
    date: Date,
    area: ModulationArea
): PlanModulationArea {
    return {
        name: area.name,
        subAreas: area.subAreas.map((subArea) => {
            return {
                name: subArea,
                modulation: {
                    date,
                    d0: createModulationDay(date),
                    dPlus1: createModulationDay(addDays(date, 1)),
                },
            };
        }),
    };
}

function createModulationDay(date: Date): ModulationDay {
    return {
        date,
        hours: new Array(24)
            .fill({ hour: "", state: false, coment: "" })
            .map((v, i) => {
                v.hour = parseModulationHour(i);
                return v;
            }),
    };
}

function parseModulationHour(hourNumber: number) {
    return hourNumber.toString().padStart(2, "0") + ":00";
}
