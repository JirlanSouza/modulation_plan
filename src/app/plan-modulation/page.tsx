"use client";

import { addDays } from "@/utils/Date";
import { PlanModulationTable } from "./PlanModulationTable";
import { usePlanModulationViewModel } from "./viewModel";

export default function PlanModulation() {
    const {
        selectedDate,
        hasSelectionArea,
        planModulationData,
        setSelectedDate,
        toggleHour,
    } = usePlanModulationViewModel();

    return (
        <div className="select-none">
            <div className="flex justify-between">
                <h1 className="text-md md:text-lg">Planejar modulação</h1>

                <span className="flex flex-col md:gap-y-1 text-slate-700">
                    <label className="text-xs">Selecione a data</label>
                    <input
                        type="date"
                        className="
                            h-6 md:h8
                            text-sm md:text-base
                            rounded-md md:rounded-lg
                            p-1.5 md:p2
                            bg-slate-200
                            outline-cyan-500
                            select-none"
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

            <section className="flex flex-col gap-6 md:gap-8 mt-8 md:mt-12">
                <PlanModulationTable
                    planModulationData={planModulationData}
                    dayLabel="D0"
                    isDZero
                    date={selectedDate.toLocaleDateString("pt-br")}
                    hasSelectionArea={hasSelectionArea}
                    toggleHour={toggleHour}
                />

                <PlanModulationTable
                    planModulationData={planModulationData}
                    dayLabel="D+1"
                    date={addDays(selectedDate, 1).toLocaleDateString("pt-br")}
                    hasSelectionArea={hasSelectionArea}
                    toggleHour={toggleHour}
                />
            </section>
        </div>
    );
}
