import React from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string;
    type?: "button" | "submit" | "reset";
    classname?: string;
    onClick: () => void;
    children?: React.ReactNode
}

function Button({ text, type = "button", classname, onClick, children, ...props }: ButtonProps) {

    return (
        <button
            className={twMerge("bg-slate-950 shadow-md text-white px-6 py-2.5 rounded-md hover:bg-zinc-700 transition-colors", classname)}
            type={type}
            onClick={onClick}
            {...props}
        >
            {text ?? children}
        </button>
    )
}

export default Button;