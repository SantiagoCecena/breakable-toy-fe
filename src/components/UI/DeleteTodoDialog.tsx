
import 'react-datepicker/dist/react-datepicker.css'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "./Dialog";
import Button from './Button';
import X from './svgs/X';
import { useMutation } from "@tanstack/react-query";
import { deleteTodo } from "../../services/api";
import { useTodosStore } from "../../store/useTodosStore";

function DeleteTodoDialog() {

    const deleteTodoFromStore = useTodosStore(state => state.deleteTodo);
    const isOpen = useTodosStore(state => state.delModalOpen);
    const clearIdToDelete = useTodosStore(state => state.clearIdToDelete);
    const toggleModal = useTodosStore(state => state.toggleDelModal);
    const todoId = useTodosStore(state => state.todoIdToDelete);

    const mutation = useMutation({
        mutationFn: () => deleteTodo(todoId!)
    });

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        mutation.mutate(undefined, {
            onSuccess: () => {
                deleteTodoFromStore(todoId!);
                toggleModal(false);
                clearIdToDelete();
            }
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={() => toggleModal(false)}>
            <DialogContent className="bg-white text-black">
                <DialogHeader>
                    <div className="flex justify-between items-center mb-4">
                        <DialogTitle>Are you sure you want to delete the todo?</DialogTitle>
                        <DialogClose><X /></DialogClose>
                    </div>
                    <form onSubmit={handleSubmit} className="flex justify-center min-[510px]:justify-end gap-x-4">
                        <Button text="Yes" type="submit" classname="bg-red-500 hover:bg-red-600" onClick={() => { }} />
                        <DialogClose asChild>
                            <Button text="Cancel" onClick={() => { }} />
                        </DialogClose>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteTodoDialog;