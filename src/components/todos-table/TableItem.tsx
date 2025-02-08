import CheckboxChecked from "../UI/svgs/CheckboxChecked";
import CheckboxUnchecked from "../UI/svgs/CheckboxUnchecked";
import Delete from "../UI/svgs/Delete";
import Edit from "../UI/svgs/Edit";

interface Todo {
    id: number;
    text: string;
    due_date: string;
    done: boolean;
    done_date: null;
    priority: string;
    created_at: string;
}
interface TodoProps {
    todo: Todo;
}
function TableItem({ todo }: TodoProps) {
    return (
        <tr className="border-b border-gray-200 even:bg-gray-100 hover:bg-gray-200 transition-colors duration-75" key={todo.id}>
            <td className="px-6 py-3 text-center hover:cursor-pointer">{todo.done ? <CheckboxChecked /> : <CheckboxUnchecked />}</td>
            <td className="px-6 py-3 text-center max-w-60">{todo.text}</td>
            <td className="px-6 py-3 text-center">{todo.priority}</td>
            <td className="px-6 py-3 text-center">{todo.due_date}</td>
            <td className="px-6 py-3 text-center flex gap-x-6 sm:gap-x-3 justify-between sm:justify-evenly"><Edit /> <Delete /></td>
        </tr>
    )
}

export default TableItem;