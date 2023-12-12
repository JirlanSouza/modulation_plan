import { SubArea } from "./SubArea";

export class Area {
    id: string;
    name: string;
    subAreas: SubArea[];

    constructor(name: string, subAreas: SubArea[], id?: string) {
        this.id = id ? id : crypto.randomUUID();
        this.name = name;
        this.subAreas = subAreas;
    }

    addSubArea(subArea: SubArea) {
        this.subAreas.push(subArea);
    }
}
