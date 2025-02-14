import axios from "axios";
import { Filters, Todo } from "../types/types";


const api = axios.create({
    baseURL: "http://localhost:8080/api/todos",
})


export const getTodos = async (filters: Filters): Promise<Todo[]> => {
    try {
        const { data } = await api.get<Todo[]>("", {
            params: {
                name: filters.name ? filters.name : undefined,
                priority: filters.priority !== "all" ? filters.priority.toUpperCase() : undefined,
                done: filters.state !== "all" ? filters.state : undefined
            }
        });
        return data;
    } catch (error) {
        throw new Error("Error fetching todos");
    }
}