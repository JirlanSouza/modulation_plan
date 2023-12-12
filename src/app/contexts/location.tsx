"use client";
import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const LocationContext = createContext({ pathname: "/" });

interface LoacationContextProviderProps {
    children: ReactNode;
}

export function LoacationContextProvider({
    children,
}: LoacationContextProviderProps) {
    const [pathname, setPathname] = useState("");
    useEffect(() => setPathname(window.location.pathname), []);

    return (
        <LocationContext.Provider value={{ pathname }}>
            {children}
        </LocationContext.Provider>
    );
}

export const useLocationContext = () => useContext(LocationContext);
