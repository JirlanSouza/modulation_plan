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
        <button
            data-selected={isSelected}
            className="
            flex
            items-center
            justify-center
            w-8
            h-8
            md:w-12
            md:h-12
            rounded-lg
            hover:bg-cyan-500
            data-[selected=true]:bg-cyan-500 text-white
            "
        >
            <a href={path} className="-m-1.5 p-1.5">
                <span className="sr-only">{label}</span>
                <Icon
                    data-selected={isSelected}
                    className="w-6 h-6 md:h-8 md:w-8 data-[selected=true]:text-slate-300 text-slate-800"
                    aria-hidden="true"
                />
            </a>
        </button>
    );
}
