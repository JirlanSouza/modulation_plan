import { ModulationPlanDate } from "./ModulationPlanDate";

export class SubArea {
    id: string;
    name: string;
    dates: ModulationPlanDate[];

    constructor(name: string, dates: ModulationPlanDate[], id?: string) {
        this.id = id ? id : crypto.randomUUID();
        this.dates = dates;
        this.name = name;
    }
}
