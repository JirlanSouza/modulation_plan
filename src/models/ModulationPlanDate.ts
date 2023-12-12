import { ModulationPlanHour } from "./ModulationPlanHour";

export class ModulationPlanDate {
    id: string;
    date: Date;
    hours: ModulationPlanHour[];

    constructor(date: Date, hours: ModulationPlanHour[], id?: string) {
        this.id = id ? id : crypto.randomUUID();
        this.date = date;
        this.hours = hours;
    }
}
