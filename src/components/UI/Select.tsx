
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    children: React.ReactNode;
    name?: string;
    id?: string;
    classname?: string;
}

function Select({ label, children, id, name, classname, ...props }: SelectProps) {

    return (
        <div className="flex gap-x-2 items-center my-2">
            <label htmlFor={id} className="min-w-[55px]">{label}</label>
            <select id={id} name={name} className={`p-2.5 border border-gray-300 ocus:outline focus:outline-1 focus:outline-gray-500 shadow-sm rounded-md w-full bg-transparent ${classname}`} {...props}>
                {children}
            </select>
        </div>
    );
}

export default Select;