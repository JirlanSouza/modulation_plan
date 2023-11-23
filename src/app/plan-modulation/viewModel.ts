import { KeyEvent, useKeyboardEvent } from "@/hooks/useKeyboardEvent";
import { KeyboardEvent, useEffect, useState } from "react";
import {
    ModulationAreaToDefaultPlanModulationArea,
    PlanModulationArea,
} from "./PlanModulation";
import { PlanModulationService } from "./PlanModulationService";

export function usePlanModulationViewModel() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [planModulationData, setPlanModulationData] = useState<
        PlanModulationArea[]
    >([]);
    const [selecteds, setSelecteds] = useState<boolean[]>(
        new Array(24).fill(false, 0, 24)
    );
    const [ctrlPressed, setCtrlPressed] = useState(false);
    const [selectionAreaStart, setSelectionAreaStart] = useState(-1);
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

    function toggleHour(hour: number) {
        if (ctrlPressed) {
            handleSelectionArea(hour);
            return;
        }

        selecteds[hour] = !selecteds[hour];
        setSelecteds([...selecteds]);
    }

    function selectAllHours() {
        setSelecteds(new Array(24).fill(true, 0, 24));
    }

    function setShiftKeyPressed(event: KeyboardEvent) {
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

    return {
        selectedDate,
        selecteds,
        hasSelectionArea: ctrlPressed,
        planModulationData,
        setSelectedDate,
        toggleHour,
        selectAllHours,
    };
}
