import { Todo } from "../../types/types"
import TableItem from "./TableItem"


function TableBody({ todos }: { todos: Todo[] }) {

    return (
        <tbody className="bg-white border-b border-gray-200">

            {todos.length === 0 && (
                <tr className="border-b border-gray-200 even:bg-gray-100">
                    <td className="px-6 py-3 text-center">No todos found</td>
                </tr>
            )}
            {todos.length > 0 && todos.map(todo => (
                <TableItem todo={todo} key={todo.id} />
            ))}
        </tbody>
    )
}

export default TableBody