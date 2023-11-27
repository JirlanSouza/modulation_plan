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
                    <strong className="text-lg md:text-xl">{dayLabel}</strong>
                    <span className="ml-2 md:ml-4 text-xs"> {date}</span>
                </div>

                <table
                    className="
                    w-full
                    rounded-xl
                    text-xs md:text-sm
                    border-collapse border border-slate-500
                    overflow-hidden"
                >
                    <thead>
                        <tr>
                            <th className="bg-slate-200 border border-slate-600">
                                Area
                            </th>
                            <th className="bg-slate-200 border border-slate-600">
                                Sub area
                            </th>
                            {planModulationData[0].subAreas[0].modulation.d0.hours.map(
                                (hour) => (
                                    <th
                                        key={hour.hour}
                                        className="bg-slate-200 border border-slate-600 px-0.5"
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
                                    data-selectionArea={hasSelectionArea}
                                    className="
                                    bg-slate-200
                                    border-y-2 border-slate-900
                                    data-[selectionArea=true]:hover:border-y-yellow-200"
                                >
                                    <td className="border border-y-2 border-slate-600">
                                        {area.name}
                                    </td>
                                    <td className="border border-y-2 border-slate-600">
                                        {subArea.name}
                                    </td>

                                    {subArea.modulation[
                                        isDZero ? "d0" : "dPlus1"
                                    ].hours.map((hour, hourIndex) => (
                                        <td
                                            key={subArea.name + hour.hour}
                                            data-state={hour.state}
                                            className="
                                            w-8 h-8
                                            bg-red-600 data-[state=true]:bg-green-600
                                            border-x border-slate-600                                           
                                            hover:brightness-90 cursor-pointer"
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
