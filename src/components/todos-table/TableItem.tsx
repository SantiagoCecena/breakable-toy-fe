import { useState } from "react";
import { Todo } from "../../types/types";
import CheckboxChecked from "../UI/svgs/CheckboxChecked";
import CheckboxUnchecked from "../UI/svgs/CheckboxUnchecked";
import Delete from "../UI/svgs/Delete";
import Edit from "../UI/svgs/Edit";
import { getRowColor } from "../../lib/utils";
import { useTodosStore } from "../../store/useTodosStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markTodo } from "../../services/api";

function TableItem({ todo }: { todo: Todo }) {

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (done: boolean) => {
            return markTodo(todo.id, done)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
            queryClient.invalidateQueries({ queryKey: ['metrics'] })
        }
    })

    const setEditingTodo = useTodosStore(state => state.setEditingTodo);
    const editMarkedTodo = useTodosStore(state => state.editTodo);
    const toggleEditModal = useTodosStore(state => state.toggleEditModal);
    const setIdToDelete = useTodosStore(state => state.setIdToDelete);
    const toggleDeleteModal = useTodosStore(state => state.toggleDelModal);
    const [done, setDone] = useState(todo.done)

    const rowColor = getRowColor(todo.dueDate);
    const dueDate = todo.dueDate ? isNaN(Date.parse(todo.dueDate)) ? "--" : new Date(todo.dueDate).toLocaleDateString() : "--";

    function handleSetEditingTodo() {
        setEditingTodo(todo);
        toggleEditModal(true);
    }

    function handleSetTodoIdToDelete() {
        setIdToDelete(todo.id);
        toggleDeleteModal(true)
    }

    function handleMarkTodo() {
        if (mutation.isPending) return;

        mutation.mutate(!done, {
            onSuccess: (todo) => {
                editMarkedTodo(todo);
                setDone(prev => !prev)
            }
        })
    }

    return (
        <tr className={`${rowColor} border-b border-gray-200 ${done && "line-through"}`} key={todo.id}>
            <td className="px-6 py-3 text-center hover:cursor-pointer" onClick={handleMarkTodo} data-testid="checkbox">
                {done ? <CheckboxChecked /> : <CheckboxUnchecked />}
            </td>
            <td className="px-6 py-3 text-center max-w-60">{todo.text}</td>
            <td className="px-6 py-3 text-center">{todo.priority.toLowerCase()}</td>
            <td className="px-6 py-3 text-center">{dueDate}</td>
            <td className="px-6 py-3 text-center flex gap-x-6 sm:gap-x-3 justify-between sm:justify-evenly"><Edit handleSetEditingTodo={handleSetEditingTodo} /> <Delete handleSetIdToDelete={handleSetTodoIdToDelete} /></td>
        </tr>
    )
}

export default TableItem;