"use client";

import { matchRoutePath } from "@/utils/Navegation";
import { HomeIcon, SquaresPlusIcon } from "@heroicons/react/24/outline";
import { NavButton } from "./NavButton";

export function SideBar() {
    return (
        <aside className="bg-slate-100 w-fit min-h-screen border-r border-slate-500">
            <nav
                className="flex flex-col items-center gap-y-2 p-2"
                aria-label="Global"
            >
                <NavButton
                    label="Home"
                    path="/"
                    Icon={HomeIcon}
                    isSelected={matchRoutePath("/")}
                />
                <NavButton
                    label="Planejar modulação"
                    path="plan-modulation"
                    Icon={SquaresPlusIcon}
                    isSelected={matchRoutePath("/plan-modulation")}
                />
            </nav>
        </aside>
    );
}
