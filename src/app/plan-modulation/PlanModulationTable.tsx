import { ModulationPlanAreaViewData } from "@/models/ModulationPlan";
import { hourNumberToHourString } from "@/utils/Date";
import { ModulationHourRef } from "./viewModel";

interface PlanModulationTableProps {
    planModulationData: ModulationPlanAreaViewData[];
    dayLabel: string;
    isDZero?: boolean;
    date: string;
    hasSelectionArea?: boolean;
    toggleHour: (props: ModulationHourRef) => void;
}

export function PlanModulationTable({
    planModulationData,
    dayLabel,
    isDZero,
    date,
    hasSelectionArea,
    toggleHour,
}: PlanModulationTableProps) {
    return (
        planModulationData.length > 0 && (
            <div className="bg-slate-200 rounded-xl p-4 w-fit">
                <div className="p-2">
                    <strong className="text-lg md:text-xl">{dayLabel}</strong>
                    <span className="ml-2 md:ml-4 text-xs"> {date}</span>
                </div>

                <table
                    className="
                    w-32
                    rounded-xl
                    [&>*]:border [&>*]: border-slate-400
                    text-xs md:text-sm
                    whitespace-nowrap
                    overflow-scroll"
                >
                    <thead>
                        <tr className="[&>th]:border [&>th]:border-slate-400">
                            <th className="w-max px-2 py-1 bg-slate-200 sticky">
                                Area
                            </th>
                            <th className="px-2 bg-slate-200 sticky">
                                Sub area
                            </th>
                            {planModulationData[0].subAreas[0].modulation.d0.hours.map(
                                (hour) => (
                                    <th
                                        key={hour.hour}
                                        className="bg-slate-200 px-1"
                                    >
                                        {hourNumberToHourString(hour.hour)}
                                    </th>
                                )
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {planModulationData.map((area, areaIndex) =>
                            area.subAreas.map((subArea, subAreaIndex) => (
                                <tr
                                    key={subArea.name}
                                    data-selectionarea={hasSelectionArea}
                                    className="
                                    bg-slate-200
                                    [&>td]:border [&>td]:border-slate-400
                                    data-[selectionarea=true]:hover:border-y-yellow-200"
                                >
                                    <td className="px-2  border-slate-600 sticky">
                                        {area.name}
                                    </td>
                                    <td className="px-2  border-slate-600 sticky">
                                        {subArea.name}
                                    </td>

                                    {subArea.modulation[
                                        isDZero ? "d0" : "dPlus1"
                                    ].hours.map((hour, hourIndex) => (
                                        <td
                                            key={subArea.name + hour.hour}
                                            data-state={hour.state}
                                            className="
                                            w-4 sm:w-8
                                            h-4 sm:h-8
                                            bg-red-600 data-[state=true]:bg-green-600
                                             border-slate-600
                                            hover:brightness-90 cursor-pointer
                                            transition-all"
                                            onClick={() =>
                                                toggleHour({
                                                    areaIndex,
                                                    subAreaIndex,
                                                    day: isDZero
                                                        ? "d0"
                                                        : "dPlus1",
                                                    hourIndex,
                                                })
                                            }
                                        >
                                            {hour.coment}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        )
    );
}
