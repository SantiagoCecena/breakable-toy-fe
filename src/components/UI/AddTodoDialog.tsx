import { useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "./Dialog";
import Input from "./Input";
import Select from "./Select";
import Button from './Button';
import Backspace from './svgs/Backspace';
import X from './svgs/X';

interface AddTodoDialogProps {
    isOpen: boolean;
    setClose: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddTodoDialog({ isOpen, setClose }: AddTodoDialogProps) {

    const [startDate, setStartDate] = useState<Date | null>(null);

    return (
        <Dialog open={isOpen} onOpenChange={() => setClose(false)}>
            <DialogContent className="bg-white text-black">
                <DialogHeader>
                    <div className="flex justify-between items-center mb-4">
                        <DialogTitle>Add a new To-Do to stay on track!</DialogTitle>
                        <DialogClose><X /></DialogClose>
                    </div>
                    <form>
                        <Input label="Text" placeholder="Take the dog out..." name="name" />
                        <Select label="Priority" defaultValue="low" name="priority" classname="sm:min-w-[320px]">
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </Select>
                        <div className="flex gap-x-2 items-center">
                            <label className="max-w-[55px]">Due date:</label>
                            <DatePicker
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
                                text='Save task'
                                classname={"mt-4 max-w-md w-full min-[448px]:w-auto"} onClick={() => { }}
                            />
                        </div>

                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default AddTodoDialog