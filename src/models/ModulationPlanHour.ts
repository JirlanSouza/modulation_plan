export class ModulationPlanHour {
    id: string;
    hour: number;
    state: boolean;
    comment: string;

    constructor(hour: number, state: boolean, comment: string, id?: string) {
        this.id = id ? id : crypto.randomUUID();
        this.hour = hour;
        this.state = state;
        this.comment = comment;
    }
}
