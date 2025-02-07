interface ButtonProps {
    text: string;
    type?: "button" | "submit" | "reset";
    classname?: string;
    onClick: () => void;
}

function Button({ text, type = "button", classname, onClick }: ButtonProps) {

    return (
        <button
            className={`bg-slate-950 text-white px-6 py-2.5 rounded-md hover:bg-zinc-700 transition-colors ${classname}`}
            type={type}
            onClick={onClick}
        >
            {text}
        </button>
    )
}

export default Button;