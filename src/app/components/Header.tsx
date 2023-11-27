"use client";

import { useState } from "react";

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="bg-slate-900 h-14 m-auto fixed w-full">
            <nav
                className="mx-auto flex items-center justify-between p-4"
                aria-label="Global"
            >
                <div className="flex lg:flex-1">
                    <a href="/" className="-m-0.5 p-1">
                        <span className="text-lg font-extrabold text-slate-50">
                            Plan Modulation
                        </span>
                    </a>
                </div>

                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <a
                        href="/login"
                        className="text-sm font-semibold leading-6 text-slate-50"
                    >
                        Log in <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </nav>
        </header>
    );
}
