import SearchForm from "./components/search-controls/SearchForm";
import Button from "./components/UI/Button";

function App() {

	return (
		<main className="p-6 flex flex-col items-center">
			<SearchForm />
			<div className="w-full max-w-4xl mt-4">
				<Button text="+ New To Do" classname="justify-self-start" onClick={() => { }} />
			</div>
		</main>
	)
}

export default App;