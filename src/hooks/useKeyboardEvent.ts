import { KeyboardEventHandler, useEffect } from "react";

export enum KeyEvent {
    KEY_DOWN = "keydown",
    KEY_UP = "keyup",
    KEY_PRESS = "keypress",
}

export function useKeyboardEvent(
    key: string,
    event: KeyEvent,
    fn: KeyboardEventHandler
) {
    const onKeyEvent = (e: any) => {
        if (e.key !== key) return;
        fn(e as any);
    };

    useEffect(() => {
        document.addEventListener(event, onKeyEvent);
        return () => document.removeEventListener(event, onKeyEvent);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onKeyEvent]);
}
