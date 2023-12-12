"use client";

import { PlanModulationTable } from "./PlanModulationTable";
import { usePlanModulationViewModel } from "./viewModel";

export default function PlanModulation() {
    const {
        selectedDateToInputValue,
        dateLabelOnD0,
        dateLabelOnDPlus1,
        hasSelectionArea,
        planModulationData,
        selectDate,
        toggleHourState,
        saveChanges,
    } = usePlanModulationViewModel();

    return (
        <div className="select-none overflow-hidden">
            <div className="flex justify-between">
                <h1 className="text-md md:text-lg">Planejar modulação</h1>

                <span className="flex gap-2 items-end">
                    <button
                        className="
                    h-6 md:h-8
                    mr-2
                    w-28 max-w-full
                    justify-self-end
                    bg-green-500 hover:bg-green-600
                    rounded-md md:rounded-lg
                    px-4
                    text-sm md:text-base
                    text-slate-100
                    active:scale-95
                    transition-all"
                        onClick={saveChanges}
                    >
                        Salvar
                    </button>

                    <span className="flex flex-col md:gap-y-1 text-slate-700">
                        <label className="text-xs">Selecione a data</label>
                        <input
                            type="date"
                            className="
                            h-6 md:h-8
                            text-sm md:text-base
                            rounded-md md:rounded-lg
                            px-2 md:p-4
                            bg-slate-200
                            outline-cyan-500
                            select-none"
                            value={selectedDateToInputValue}
                            onChange={(e) => selectDate(e.target.value)}
                            onKeyDown={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                        />
                    </span>
                </span>
            </div>

            <section className="flex flex-col gap-6 md:gap-8 mt-8 md:mt-12">
                <PlanModulationTable
                    planModulationData={planModulationData}
                    dayLabel="D0"
                    isDZero
                    date={dateLabelOnD0}
                    hasSelectionArea={hasSelectionArea}
                    toggleHour={toggleHourState}
                />

                <PlanModulationTable
                    planModulationData={planModulationData}
                    dayLabel="D+1"
                    date={dateLabelOnDPlus1}
                    hasSelectionArea={hasSelectionArea}
                    toggleHour={toggleHourState}
                />
            </section>
        </div>
    );
}
