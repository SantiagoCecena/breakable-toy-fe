import React from "react";
import Button from "../UI/Button";
import Input from "../UI/Input";
import Select from "../UI/Select";
import { Filters } from "../../types/types";

function SearchForm({ setFilters }: { setFilters: React.Dispatch<React.SetStateAction<Filters>> }) {

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.currentTarget).entries());
        const filters: Filters = {
            name: String(formData.name) || "",
            priority: formData.priority as Filters["priority"],
            state: formData.state as Filters["state"]
        }
        setFilters(filters);
    }

    return (
        <form className="flex flex-col gap-3 my-2 p-3 pt-4 rounded-md shadow-lg w-full max-w-4xl" onSubmit={handleSubmit} data-testid="search-form">
            <Input label="Name" placeholder="Take the dog out..." id="name" name="name" />

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                <div className="flex flex-col">
                    <Select label="Priority" id="priority" defaultValue="all" name="priority" classname="sm:min-w-[320px]">
                        <option value="all">All</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </Select>
                    <Select label="State" id="state" defaultValue="all" name="state" classname="sm:min-w-[320px]">
                        <option value="all">All</option>
                        <option value="done">Done</option>
                        <option value="undone">Undone</option>
                    </Select>
                </div>
                <Button text="Search" type="submit" classname="mt-3" onClick={() => { }} />
            </div>
        </form>
    )
}

export default SearchForm;