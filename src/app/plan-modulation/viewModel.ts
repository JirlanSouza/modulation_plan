import { KeyEvent, useKeyboardEvent } from "@/hooks/useKeyboardEvent";
import { KeyboardEvent, useEffect, useState } from "react";
import {
    ModulationAreaToDefaultPlanModulationArea,
    PlanModulationArea,
} from "./PlanModulation";
import { PlanModulationService } from "./PlanModulationService";

export type ModulationHourRef = {
    areaIndex: number;
    subAreaIndex: number;
    day: "d0" | "dPlus1";
    hourIndex: number;
};

export type SelectionArea = {
    state: SelectionAreaState;
    hourRef: ModulationHourRef;
};

enum SelectionAreaState {
    IDLE,
    STARTED,
}

const defaulSelectionArea: () => SelectionArea = () => ({
    state: SelectionAreaState.IDLE,
    hourRef: {
        areaIndex: -1,
        subAreaIndex: -1,
        day: "d0",
        hourIndex: -1,
    },
});

export function usePlanModulationViewModel() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [planModulationData, setPlanModulationData] = useState<
        PlanModulationArea[]
    >([]);
    const [ctrlPressed, setCtrlPressed] = useState(false);
    const [selectionArea, setSelectionArea] = useState<SelectionArea>(
        defaulSelectionArea()
    );

    useKeyboardEvent("Shift", KeyEvent.KEY_DOWN, setShiftKeyPressed);
    useKeyboardEvent("Shift", KeyEvent.KEY_UP, setShiftKeyPressed);
    const service = new PlanModulationService();

    useEffect(() => {
        (async function getAreas() {
            const areas = await service.getAreas();

            setPlanModulationData(
                areas.map((area) =>
                    ModulationAreaToDefaultPlanModulationArea(new Date(), area)
                )
            );
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function toggleHour(hourRef: ModulationHourRef) {
        if (ctrlPressed) {
            handleSelectionArea(hourRef);
            return;
        }

        planModulationData[hourRef.areaIndex].subAreas[
            hourRef.subAreaIndex
        ].modulation[hourRef.day].hours[hourRef.hourIndex].state =
            !planModulationData[hourRef.areaIndex].subAreas[
                hourRef.subAreaIndex
            ].modulation[hourRef.day].hours[hourRef.hourIndex].state;

        setPlanModulationData([...planModulationData]);
    }

    function setShiftKeyPressed(event: KeyboardEvent) {
        setCtrlPressed(event.shiftKey);
    }

    function handleSelectionArea(hourRef: ModulationHourRef) {
        if (selectionArea.state === SelectionAreaState.IDLE) {
            setSelectionArea({ state: SelectionAreaState.STARTED, hourRef });
            return;
        }

        const isTheNotSameArea =
            hourRef.areaIndex != selectionArea.hourRef.areaIndex;
        const isTheNotSameSubAra =
            hourRef.subAreaIndex != selectionArea.hourRef.subAreaIndex;
        const isTheNotSameDay = hourRef.day != selectionArea.hourRef.day;

        if (isTheNotSameArea || isTheNotSameSubAra || isTheNotSameDay) {
            setSelectionArea(defaulSelectionArea());
            setCtrlPressed(false);
            return;
        }

        const intervalStart =
            selectionArea.hourRef.hourIndex <= hourRef.hourIndex
                ? selectionArea.hourRef
                : hourRef;
        const intervalEnd =
            selectionArea.hourRef.hourIndex > hourRef.hourIndex
                ? selectionArea.hourRef
                : hourRef;

        deselectHoursInterval(intervalStart, intervalEnd);

        setSelectionArea(defaulSelectionArea());
    }

    function deselectHoursInterval(
        start: ModulationHourRef,
        end: ModulationHourRef
    ) {
        for (let i = start.hourIndex; i <= end.hourIndex; i++) {
            planModulationData[start.areaIndex].subAreas[
                start.subAreaIndex
            ].modulation[start.day].hours[i].state = false;
        }

        setPlanModulationData([...planModulationData]);
    }

    return {
        selectedDate,

        hasSelectionArea: ctrlPressed,
        planModulationData,
        setSelectedDate,
        toggleHour,
    };
}
