"use client";

import { addDays } from "@/utils/Date";
import { PlanModulationTable } from "./PlanModulationTable";
import { usePlanModulationViewModel } from "./viewModel";

export default function PlanModulation() {
    const {
        selectedDate,
        selecteds,
        hasSelectionArea,
        planModulationData,
        setSelectedDate,
        toggleHour,
        selectAllHours,
    } = usePlanModulationViewModel();

    return (
        <div className="select-none">
            <div className="flex justify-between">
                <h1 className="text-lg">Planejar modulação</h1>
                <span className="flex flex-col gap-y-1 text-slate-700">
                    <label className="text-xs">Selecione a data</label>
                    <input
                        type="date"
                        className="h-8 rounded-lg p-2 bg-slate-200 select-none"
                        value={selectedDate.toISOString().slice(0, 10)}
                        onChange={(e) =>
                            setSelectedDate(new Date(e.target.value))
                        }
                        onKeyDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                        onFocus={(e) => e.target.showPicker()}
                    />
                </span>
            </div>
            <section className="flex flex-col gap-8 mt-16">
                <PlanModulationTable
                    planModulationData={planModulationData}
                    dayLabel="D0"
                    isDZero
                    date={selectedDate.toLocaleDateString("pt-br")}
                />

                <PlanModulationTable
                    planModulationData={planModulationData}
                    dayLabel="D+1"
                    date={addDays(selectedDate, 1).toLocaleDateString("pt-br")}
                />
            </section>
        </div>
    );
}
