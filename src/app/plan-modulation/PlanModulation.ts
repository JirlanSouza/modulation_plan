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
        hours: makeDayHours(),
    };
}

function makeDayHours() {
    const hours: ModulationHour[] = [];
    for (let i = 1; i <= 24; i++) {
        hours[i] = {
            hour: parseModulationHour(i),
            state: false,
        };
    }

    hours[24].hour = parseModulationHour(0);
    return hours;
}

function parseModulationHour(hourNumber: number) {
    return hourNumber.toString().padStart(2, "0") + ":00";
}
