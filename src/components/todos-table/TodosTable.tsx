import { useQuery } from "@tanstack/react-query"
import Button from "../UI/Button"
import ArrowLeft from "../UI/svgs/ArrowLeft"
import ArrowRight from "../UI/svgs/ArrowRight"
import TableBody from "./TableBody"
import TableHead from "./TableHead"
import { getTodos } from "../../services/api"
import { Filters } from "../../types/types"
import { useEffect, useState } from "react"
import SpinLoader from "../UI/loaders/SpinLoader"
import { useTodosStore } from "../../store/useTodosStore"

function TodosTable({ filters }: { filters: Filters }) {

    const todos = useTodosStore(state => state.todos);
    const setTodos = useTodosStore(state => state.setTodos);
    const [page, setPage] = useState<number>(1);

    const { data, isError, isLoading } = useQuery({
        queryKey: ['todos', filters, page],
        queryFn: () => getTodos(filters, page)
    });

    useEffect(() => {
        if (data && data.length > 0) {
            setTodos(data)
        }
    }, [data, setTodos, filters]);

    if (isLoading) return <SpinLoader />;
    if (isError) return <div className="mt-8">Ups, something went wrong...</div>;
    if (data === undefined || data.length === 0) return <div>It seems like no data are available</div>;

    return (
        <>
            <div className="mt-5 overflow-auto shadow-top rounded-tl-md rounded-tr-md w-full max-w-4xl">

                <table className="w-full text-left table-auto min-w-max">
                    <TableHead />
                    <TableBody todos={todos ?? []} />
                </table>
            </div>

            <div className="shadow-bottom rounded-bl-md rounded-br-md w-full max-w-4xl p-3.5 flex justify-center md:justify-end gap-x-3">
                <Button data-testid="button" onClick={() => setPage(prev => prev == 1 ? 1 : prev - 1)} classname="px-2.5 py-1.5 disabled:bg-slate-800" disabled={page == 1}>
                    <ArrowLeft />
                </Button>

                <Button onClick={() => { if (page > 1) setPage(1); }} text={String(page)} classname="font-semibold text-base px-3 py-2" />

                <Button data-testid="button" onClick={() => setPage(prev => prev + 1)} classname="px-2.5 py-1.5 disabled:bg-slate-800" disabled={data!.length < 10}>
                    <ArrowRight />
                </Button>
            </div>
        </>
    )
}

export default TodosTable;