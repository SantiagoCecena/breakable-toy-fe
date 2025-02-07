
interface SelectProps {
    label: string;
    children: React.ReactNode;
    name?: string;
    id?: string;
    classname?: string;
}

function Select({ label, children, id, name, classname }: SelectProps) {

    return (
        <div className="flex gap-x-2 items-center my-2">
            <label htmlFor={id} className="min-w-[55px]">{label}</label>
            <select id={id} name={name} className={`p-2.5 border border-gray-400 shadow-sm rounded-md w-full bg-transparent ${classname}`}>
                {children}
            </select>
        </div>
    );
}

export default Select;