
interface InputProps {
    label: string;
    type?: string;
    classname?: string;
    placeholder: string;
    name?: string;
    id?: string;
}

function Input({ label, type = "text", classname, placeholder, name, id }: InputProps) {

    return (
        <div className="flex gap-x-2 items-center">
            <label htmlFor={id} className="min-w-[55px]">{label}</label>
            <input
                type={type}
                className={`border border-gray-400 shadow-sm rounded-md p-2.5 w-full ${classname}`}
                placeholder={placeholder}
                name={name}
                id={id}
            />
        </div>
    );
}

export default Input;