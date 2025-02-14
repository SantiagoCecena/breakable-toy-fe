import { useState } from "react";
import { Todo } from "../../types/types";
import CheckboxChecked from "../UI/svgs/CheckboxChecked";
import CheckboxUnchecked from "../UI/svgs/CheckboxUnchecked";
import Delete from "../UI/svgs/Delete";
import Edit from "../UI/svgs/Edit";

// const colors = {"bg-red-300", "bg-yellow-300", "bg-green-300"};
function TableItem({ todo }: { todo: Todo }) {

    const [done, setDone] = useState(todo.done)

    const dueDate = todo.dueDate ? isNaN(Date.parse(todo.dueDate)) ? "--" : new Date(todo.dueDate).toLocaleDateString() : "--";

    return (
        <tr className={`border-b border-gray-200 even:bg-gray-100 ${done && "line-through"}`} key={todo.id}>
            <td className="px-6 py-3 text-center hover:cursor-pointer" onClick={() => setDone(prev => !prev)}>
                {done ? <CheckboxChecked /> : <CheckboxUnchecked />}
            </td>
            <td className="px-6 py-3 text-center max-w-60">{todo.text}</td>
            <td className="px-6 py-3 text-center">{todo.priority.toLowerCase()}</td>
            <td className="px-6 py-3 text-center">{dueDate}</td>
            <td className="px-6 py-3 text-center flex gap-x-6 sm:gap-x-3 justify-between sm:justify-evenly"><Edit /> <Delete /></td>
        </tr>
    )
}

export default TableItem;