import Button from "../UI/Button";
import Input from "../UI/Input";
import Select from "../UI/Select";

function SearchForm() {

    return (
        <form className="flex flex-col gap-3 my-2 p-3 pt-4 border border-gray-950 rounded-sm w-full max-w-4xl">
            <Input label="Name" placeholder="Take the dog out..." id="name" name="name" />

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                <div className="flex flex-col">
                    <Select label="Priority" classname="sm:min-w-[320px]">
                        <option value="all">All</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </Select>
                    <Select label="State" classname="sm:min-w-[320px]">
                        <option value="all">All</option>
                        <option value="done">Done</option>
                        <option value="undone">Undone</option>
                    </Select>
                </div>
                <Button text="Search" classname="mt-3" onClick={() => { }} />
            </div>
        </form>
    )
}

export default SearchForm;