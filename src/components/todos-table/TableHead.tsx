import { useTodosStore } from "../../store/useTodosStore"
import CheckboxUnchecked from "../UI/svgs/CheckboxUnchecked"

const TABLE_HEADINGS = ["Name", "Priority <>", "Due Date <>", "Actions"]

function TableHead() {

    const orderByPriority = useTodosStore(state => state.orderTodosByPriority);
    const orderByDueDate = useTodosStore(state => state.orderTodosByDueDate);

    return (
        <thead className="text-xs font-extrabold sm:text-base text-white uppercase bg-slate-950">
            <tr>
                <th className="px-6 py-3 text-center"><CheckboxUnchecked /></th>
                {TABLE_HEADINGS.map((head, idx) => (
                    <th
                        className={`px-6 py-3 text-center ${head.includes("<>") && "hover:cursor-pointer"}`}
                        key={idx}
                        onClick={() => {
                            if (head.includes("Priority <>")) orderByPriority();
                            if (head.includes("Due Date <>")) orderByDueDate();
                        }}
                    >
                        {head}
                    </th>
                ))}
            </tr>
        </thead>
    )
}

export default TableHead