import { PlanModulationArea } from "./PlanModulation";
import { ModulationHourRef } from "./viewModel";

interface PlanModulationTableProps {
    planModulationData: PlanModulationArea[];
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
            <div>
                <div className="p-2">
                    <strong className="text-xl">{dayLabel}</strong>
                    <span className="ml-4 text-xs"> {date}</span>
                </div>
                <table className="w-full rounded-xl border-collapse border border-slate-500 overflow-hidden text-sm">
                    <thead>
                        <tr>
                            {/* <th className="w-8 h-6 bg-slate-200 border border-slate-600"></th> */}
                            <th className="w-8 h-6 px-2 py-1 bg-slate-200 border border-slate-600">
                                Area
                            </th>
                            <th className="w-fit h-6 px-2 py-1 bg-slate-200 border border-slate-600">
                                Sub area
                            </th>
                            {planModulationData[0].subAreas[0].modulation.d0.hours.map(
                                (hour) => (
                                    <th
                                        key={hour.hour}
                                        className="w-8 h-6 py-0 bg-slate-200 border border-slate-600 text-sm md:text-xs"
                                    >
                                        {hour.hour}
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
                                    className="border-y-2 border-slate-900 first:border-t-0 last:border-b-0"
                                >
                                    {/* <td
                                        className="w-8 h-4 p-4 bg-slate-200 border border-slate-600"
                                        //onClick={selectAllHours}
                                    ></td> */}
                                    <td className="w-8 h-4 px-2 py-1 bg-slate-200 border border-slate-600">
                                        {area.name}
                                    </td>
                                    <td className="w-8 h-4 px-2 py-1 bg-slate-200 border border-slate-600">
                                        {subArea.name}
                                    </td>
                                    {subArea.modulation[
                                        isDZero ? "d0" : "dPlus1"
                                    ].hours.map((hour, hourIndex) => (
                                        <td
                                            key={subArea.name + hour.hour}
                                            className={`w-8 h-8 ${
                                                hour.state
                                                    ? "bg-green-600"
                                                    : "bg-red-600"
                                            }
                                            border
                                            ${
                                                hasSelectionArea
                                                    ? "border-d-yellow-600"
                                                    : "border-slate-600"
                                            }
                                            hover:brightness-90 cursor-pointer`}
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
