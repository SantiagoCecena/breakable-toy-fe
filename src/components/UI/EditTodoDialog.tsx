import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "./Dialog";
import Input from "./Input";
import Select from "./Select";
import Button from './Button';
import Backspace from './svgs/Backspace';
import X from './svgs/X';
import { useMutation } from "@tanstack/react-query";
import { editTodo } from "../../services/api";
import { Todo } from "../../types/types";
import { useTodosStore } from "../../store/useTodosStore";

interface FormData {
    name: string;
    priority: "low" | "medium" | "high";
    dueDate: string;
}

function isPriority(priority: string): priority is FormData['priority'] {
    return ["low", "medium", "high"].includes(priority);

}
function EditTodoDialog() {

    const isOpen = useTodosStore(state => state.editModalOpen);
    const toggleModal = useTodosStore(state => state.toggleEditModal);
    const clearEditingTodo = useTodosStore(state => state.clearEditingTodo);
    const editingTodo = useTodosStore(state => state.editingTodo);
    const addEditedTodo = useTodosStore(state => state.editTodo);
    const editingTodoDueDate = editingTodo?.dueDate ? new Date(editingTodo.dueDate) : null;
    const [startDate, setStartDate] = useState<Date | null>(editingTodoDueDate);

    useEffect(() => {
        if (editingTodo) {
            setStartDate(editingTodo?.dueDate ? new Date(editingTodo.dueDate) : null)
        }
    }, [editingTodo]);


    const mutation = useMutation({
        mutationFn: (todoData: Partial<Todo>) => {
            return editTodo(editingTodo!.id, todoData)
        }
    })

    function handleClose() {
        toggleModal(false)
        clearEditingTodo();
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const { name, priority, dueDate } = Object.fromEntries(new FormData(e.currentTarget).entries()) as unknown as FormData;
        if (name.trim().length < 3) return;
        if (isNaN(Date.parse(dueDate)) && dueDate.trim() !== "") return;
        if (!isPriority(priority.trim().toLowerCase())) return;
        mutation.mutate({ text: name, priority, dueDate: dueDate.trim() === "" ? null : new Date(dueDate).toISOString() }, {
            onSuccess: (todo) => {
                handleClose();
                addEditedTodo(todo);

            }
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black">
                <DialogHeader>
                    <div className="flex justify-between items-center mb-4">
                        <DialogTitle>Edit your To-Do and stay on track!</DialogTitle>
                        <DialogClose><X /></DialogClose>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <Input label="Text" defaultValue={editingTodo?.text} placeholder="Take the dog out..." name="name" />
                        <Select label="Priority" defaultValue={editingTodo?.priority} name="priority" classname="sm:min-w-[320px]">
                            <option value="LOW">Low</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HIGH">High</option>
                        </Select>
                        <div className="flex gap-x-2 items-center">
                            <label className="max-w-[55px]">Due date:</label>
                            <DatePicker
                                name="dueDate"
                                placeholderText='Pick a date'
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                className='border border-gray-300 shadow-sm rounded-md p-2.5 w-full focus:outline focus:outline-1 focus:outline-gray-500'
                            />
                            {startDate !== null && (
                                <div onClick={() => setStartDate(null)} className="cursor-pointer">
                                    <Backspace />
                                </div>
                            )}
                        </div>

                        <div className='w-full flex min-[448px]:justify-end'>
                            <Button
                                text={mutation.isPending ? "Loading" : 'Edit task'}
                                type="submit"
                                disabled={mutation.isPending}
                                classname={"mt-4 max-w-md w-full min-[448px]:w-auto"} onClick={() => { }}
                            />
                        </div>

                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default EditTodoDialog