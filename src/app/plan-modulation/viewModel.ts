import { KeyEvent, useKeyboardEvent } from "@/hooks/useKeyboardEvent";
import { Area } from "@/models/Area";
import {
    ModulationPlanAreaViewData,
    ModulationPlanAreaViewDataFactory,
} from "@/models/ModulationPlan";
import { addDays, dateFromInputToDate } from "@/utils/Date";
import { KeyboardEvent, useEffect, useState } from "react";
import {
    getAreas,
    saveModulationPlan,
} from "../../models/PlanModulationService";

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
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [modulationPlanAreas, setModulationPlanAreas] = useState<
        ModulationPlanAreaViewData[]
    >([]);
    const [ctrlPressed, setCtrlPressed] = useState(false);
    const [selectionArea, setSelectionArea] = useState<SelectionArea>(
        defaulSelectionArea()
    );

    useKeyboardEvent("Shift", KeyEvent.KEY_DOWN, setShiftKeyPressed);
    useKeyboardEvent("Shift", KeyEvent.KEY_UP, setShiftKeyPressed);

    let selectedDateToInputValue = "";
    let dateLabelOnD0 = "";
    let dateLabelOnDPlus1 = "";

    if (selectedDate) {
        selectedDateToInputValue = selectedDate?.toISOString().slice(0, 10);
        dateLabelOnD0 = selectedDate?.toLocaleDateString("pt-br");
        dateLabelOnDPlus1 = addDays(selectedDate, 1).toLocaleDateString(
            "pt-br"
        );
    }

    useEffect(() => {
        (async function () {
            if (!selectedDate) return;

            const areas = JSON.parse(
                (await getAreas(selectedDate)) as unknown as string
            ) as unknown as Area[];
            const areasViewData = areas.map((a) =>
                ModulationPlanAreaViewDataFactory.fromArea(a, selectedDate)
            );
            setModulationPlanAreas(areasViewData);
        })();
    }, [selectedDate]);

    function selectDate(newDate: string) {
        setSelectedDate(dateFromInputToDate(newDate, -4));
    }

    function toggleHourState(hourRef: ModulationHourRef) {
        if (ctrlPressed) {
            handleSelectionArea(hourRef);
            return;
        }

        modulationPlanAreas[hourRef.areaIndex].subAreas[
            hourRef.subAreaIndex
        ].modulation[hourRef.day].hours[hourRef.hourIndex].state =
            !modulationPlanAreas[hourRef.areaIndex].subAreas[
                hourRef.subAreaIndex
            ].modulation[hourRef.day].hours[hourRef.hourIndex].state;

        setModulationPlanAreas([...modulationPlanAreas]);
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

        changeStateHoursInterval(intervalStart, intervalEnd, true);

        setSelectionArea(defaulSelectionArea());
    }

    function changeStateHoursInterval(
        start: ModulationHourRef,
        end: ModulationHourRef,
        state: boolean
    ) {
        for (let i = start.hourIndex; i <= end.hourIndex; i++) {
            modulationPlanAreas[start.areaIndex].subAreas[
                start.subAreaIndex
            ].modulation[start.day].hours[i].state = state;
        }

        setModulationPlanAreas([...modulationPlanAreas]);
    }

    function saveChanges() {
        saveModulationPlan(modulationPlanAreas);
    }

    return {
        selectedDateToInputValue,
        dateLabelOnD0,
        dateLabelOnDPlus1,
        hasSelectionArea: ctrlPressed,
        planModulationData: modulationPlanAreas,
        selectDate,
        toggleHourState,
        saveChanges,
    };
}
