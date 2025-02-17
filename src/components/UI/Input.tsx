import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    type?: string;
    classname?: string;
    placeholder: string;
    name?: string;
    id?: string;
}

function Input({ label, type = "text", classname, placeholder, name, id, ...props }: InputProps) {

    return (
        <div className="flex gap-x-2 items-center">
            <label htmlFor={id} className="min-w-[55px]">{label}</label>
            <input
                type={type}
                className={`border border-gray-300 shadow-sm rounded-md p-2.5 w-full focus:outline focus:outline-1 focus:outline-gray-500 ${classname}`}
                placeholder={placeholder}
                name={name}
                id={id}
                autoComplete="off"
                {...props}
            />
        </div>
    );
}

export default Input;