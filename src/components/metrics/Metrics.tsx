import { useQuery } from "@tanstack/react-query";
import { fromMilisecondsToMinutes } from "../../lib/utils";
import { getAllMetrics } from "../../services/api";
import SpinLoader from "../UI/loaders/SpinLoader";

function Metrics() {

    const { data, isLoading } = useQuery({
        queryKey: ['metrics'],
        queryFn: getAllMetrics
    });

    if (isLoading) return <SpinLoader />

    return (
        <section className="flex flex-col gap-y-5 sm:flex-row justify-around my-16 w-full max-w-4xl shadow-lg p-6 rounded-md">
            <article className="text-center flex flex-col">
                <h3 className="font-semibold">Average time to finish tasks:</h3>
                <p className="flex-grow flex items-center justify-center">
                    {data && fromMilisecondsToMinutes(data.all)}
                </p>
            </article>
            <article className="text-center sm:text-left">
                <h3 className="font-semibold">Average time to finish tasks by priority:</h3>
                <ul>
                    <li>
                        <p>Low: {data && fromMilisecondsToMinutes(data.low)}</p>
                        <p>Medium: {data && fromMilisecondsToMinutes(data.medium)}</p>
                        <p>High: {data && fromMilisecondsToMinutes(data.high)}</p>
                    </li>
                </ul>
            </article>
        </section>
    )
}

export default Metrics