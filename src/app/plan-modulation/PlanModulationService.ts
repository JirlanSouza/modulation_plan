import { ModulationArea, PlanModulationArea } from "./PlanModulation";

export class PlanModulationService {
    async getAreas(): Promise<ModulationArea[]> {
        return [
            {
                name: "Area1",
                subAreas: ["subArea11", "subArea12", "subArea13"],
            },
            {
                name: "Area2",
                subAreas: ["subArea21", "subArea22", "subArea23"],
            },
        ];
    }

    async saveModulationPlan(plan: PlanModulationArea[]) {
        console.log(plan);
    }
}
