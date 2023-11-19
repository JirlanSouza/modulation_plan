import React from "react";

type IconType = React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
        title?: string | undefined;
        titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>
>;

interface NavButtonProps {
    label: string;
    isSelected?: boolean;
    path: string;
    Icon: IconType;
}

export function NavButton({ label, isSelected, path, Icon }: NavButtonProps) {
    return (
        <div
            className={`flex items-center justify-center w-12 h-12 rounded-lg hover:bg-cyan-500 ${
                isSelected && "bg-cyan-500 text-white"
            }`}
        >
            <a href={path} className="-m-1.5 p-1.5">
                <span className="sr-only">{label}</span>
                <Icon
                    className={`h-8 w-8 ${
                        isSelected ? "text-slate-300" : "text-slate-800"
                    }`}
                    aria-hidden="true"
                />
            </a>
        </div>
    );
}
