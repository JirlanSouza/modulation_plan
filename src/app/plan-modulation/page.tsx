"use client";

import { KeyboardEvent, useState } from "react";

const data = {
    hours: [
        "00",
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
    ],
};

export default function PlanModulation() {
    const [selecteds, setSelecteds] = useState<boolean[]>(
        new Array(24).fill(false, 0, 24)
    );
    const [ctrlPressed, setCtrlPressed] = useState(false);
    const [selectionAreaStart, setSelectionAreaStart] = useState(-1);

    function toggleHour(hour: number) {
        if (ctrlPressed) {
            handleSelectionArea(hour);
            return;
        }

        selecteds[hour] = !selecteds[hour];
        setSelecteds([...selecteds]);
    }

    function selectAll() {
        setSelecteds(new Array(24).fill(true, 0, 24));
    }

    function setCtrlKeyPressed(event: KeyboardEvent) {
        if (event.key !== "Shift") return;

        setCtrlPressed(event.shiftKey);
    }

    function handleSelectionArea(hour: number) {
        if (selectionAreaStart === -1) {
            setSelectionAreaStart(hour);
            return;
        }

        selecteds.fill(true, selectionAreaStart, hour + 1);
        setSelecteds([...selecteds]);
        setSelectionAreaStart(-1);
    }

    return (
        <div
            onKeyDown={setCtrlKeyPressed}
            onKeyUp={setCtrlKeyPressed}
            tabIndex={0}
        >
            <div className="flex justify-between Z-0 select-none">
                <h1 className="text-lg">Planejar modulação</h1>
                <span className="flex flex-col gap-y-1 text-slate-700">
                    <label className="text-xs font-medium">Data</label>
                    <input
                        type="date"
                        className="h-8 rounded-lg p-2 bg-slate-200 cursor-text"
                    />
                </span>
            </div>
            <section className="mt-16">
                <table className="w-full rounded-lg border-collapse border border-slate-500 ">
                    <thead>
                        <tr>
                            <th className="w-8 h-6 bg-slate-200 border border-slate-600"></th>
                            {data.hours.map((hour) => (
                                <th
                                    key={hour}
                                    className="w-8 h-6 bg-slate-200 border border-slate-600"
                                >
                                    {hour}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td
                                className="w-8 h-4 bg-slate-200 border border-slate-600"
                                onClick={selectAll}
                            ></td>
                            {data.hours.map((hour, index) => (
                                <td
                                    key={hour}
                                    className={`w-8 h-8 ${
                                        selecteds[index]
                                            ? "bg-green-600"
                                            : "bg-red-600"
                                    }
                                    border
                                    ${
                                        ctrlPressed
                                            ? "border-d-yellow-600"
                                            : "border-slate-600"
                                    }
                                    hover:brightness-90 cursor-pointer`}
                                    onClick={() => toggleHour(index)}
                                ></td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    );
}
