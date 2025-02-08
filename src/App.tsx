import SearchForm from "./components/search-controls/SearchForm";
import TodosTable from "./components/todos-table/TodosTable";
import Button from "./components/UI/Button";

function App() {

	return (
		<main className="p-6 pb-10 flex flex-col items-center">
			<SearchForm />
			<div className="w-full max-w-4xl mt-4">
				<Button text="+ New To Do" classname="justify-self-start" onClick={() => { }} />
			</div>
			<TodosTable />
			{/* //todo: add the todo's table here */}
		</main>
	)
}

export default App;