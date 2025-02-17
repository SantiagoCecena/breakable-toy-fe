import { lazy, Suspense, useState } from "react";
import Metrics from "./components/metrics/Metrics";
import SearchForm from "./components/search-controls/SearchForm";
const TodosTable = lazy(() => import("./components/todos-table/TodosTable"));
import Button from "./components/UI/Button";
import { Filters } from "./types/types";
import AddTodoDialog from "./components/UI/AddTodoDialog";
import EditTodoDialog from "./components/UI/EditTodoDialog";
import DeleteTodoDialog from "./components/UI/DeleteTodoDialog";
import SpinLoader from "./components/UI/loaders/SpinLoader";

function App() {

	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [filters, setFilters] = useState<Filters>({
		name: "",
		priority: "all",
		state: "all"
	});

	return (
		<main className="p-6 pb-10 flex flex-col items-center">
			<SearchForm setFilters={setFilters} />
			<div className="w-full max-w-4xl mt-4">
				<Button text="+ New To Do" classname="justify-self-start" onClick={() => setIsDialogOpen(true)} />
			</div>
			<AddTodoDialog isOpen={isDialogOpen} setClose={setIsDialogOpen} />
			<EditTodoDialog />
			<DeleteTodoDialog />
			<Suspense fallback={<SpinLoader />}>
				<TodosTable filters={filters} />
			</Suspense>
			<Metrics />
		</main>
	)
}

export default App;