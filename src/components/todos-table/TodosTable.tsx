import Button from "../UI/Button"
import ArrowLeft from "../UI/svgs/ArrowLeft"
import ArrowRight from "../UI/svgs/ArrowRight"
import TableBody from "./TableBody"
import TableHead from "./TableHead"

function TodosTable() {
    return (
        <>
            <div className="mt-5 overflow-auto shadow-top rounded-tl-md rounded-tr-md w-full max-w-4xl">
                <table className="w-full text-left table-auto min-w-max">
                    <TableHead />
                    <TableBody />
                </table>
            </div>

            <div className="shadow-bottom rounded-bl-md rounded-br-md w-full max-w-4xl p-3.5 flex justify-center md:justify-end gap-x-3">
                <Button onClick={() => { }} classname="px-2.5 py-1.5 disabled:bg-slate-800" disabled={true}>
                    <ArrowLeft />
                </Button>

                <Button text="1" classname="font-semibold text-base hover:bg-slate-100 px-3 py-2" onClick={() => { }} />

                <Button onClick={() => { }} classname="px-2.5 py-1.5">
                    <ArrowRight />
                </Button>
            </div>
        </>
    )
}

export default TodosTable