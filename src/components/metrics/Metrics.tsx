
function Metrics() {
    return (
        <section className="flex flex-col gap-y-5 sm:flex-row justify-around my-16 w-full max-w-4xl shadow-lg p-6 rounded-md">
            <article className="text-center flex flex-col">
                <h3 className="font-semibold">Average time to finish tasks:</h3>
                <p className="flex-grow flex items-center justify-center">22:15 minutes</p>
            </article>
            <article className="text-center sm:text-left">
                <h3 className="font-semibold">Average time to finish tasks by priority:</h3>
                <ul>
                    <li>
                        <p>Low: 10:25 mins</p>
                        <p>Medium: 10:25 mins</p>
                        <p>High: 10:25 mins</p>
                    </li>
                </ul>
            </article>
        </section>
    )
}

export default Metrics