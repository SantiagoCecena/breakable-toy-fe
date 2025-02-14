import { Todo } from "../../types/types"
import TableItem from "./TableItem"

const TODOS = [
    {
        id: 1,
        text: "Buy groceries",
        due_date: "2021-09-01",
        done: false,
        done_date: null,
        priority: "high",
        created_at: "2021-08-01",
    },
    {
        id: 2,
        text: "Buy groceries",
        due_date: null,
        done: false,
        done_date: null,
        priority: "high",
        created_at: "2021-08-01",
    },
    {
        id: 3,
        text: "Buy groceries",
        due_date: "2021-09-01",
        done: true,
        done_date: null,
        priority: "high",
        created_at: "2021-08-01",
    },
    {
        id: 4,
        text: "Buy groceries",
        due_date: null,
        done: false,
        done_date: null,
        priority: "high",
        created_at: "2021-08-01",
    },
    {
        id: 5,
        text: "Buy groceries Buy groceries Buy groceries Buy groceries",
        due_date: "2021-09-01",
        done: true,
        done_date: null,
        priority: "high",
        created_at: "2021-08-01",
    },
    {
        id: 6,
        text: "Buy groceries",
        due_date: "2021-09-01",
        done: false,
        done_date: null,
        priority: "high",
        created_at: "2021-08-01",
    },
    {
        id: 7,
        text: "Buy groceries",
        due_date: "2021-09-01",
        done: true,
        done_date: null,
        priority: "high",
        created_at: "2021-08-01",
    },
    {
        id: 8,
        text: "Buy groceries",
        due_date: "2021-09-01",
        done: true,
        done_date: null,
        priority: "high",
        created_at: "2021-08-01",
    },
]

function TableBody({ todos }: { todos: Todo[] }) {

    return (
        <tbody className="bg-white border-b border-gray-200">
            {todos.map(todo => (
                <TableItem todo={todo} key={todo.id} />
            ))}
        </tbody>
    )
}

export default TableBody