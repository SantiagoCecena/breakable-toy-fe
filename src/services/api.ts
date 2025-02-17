import axios from "axios";
import { Filters, Todo } from "../types/types";


const api = axios.create({
    baseURL: "http://localhost:9090/api/todos",
})


export const getTodos = async (filters: Filters, page: number): Promise<Todo[]> => {
    try {
        const { data } = await api.get<Todo[]>("", {
            params: {
                page: page - 1,
                name: filters.name ? filters.name : undefined,
                priority: filters.priority !== "all" ? filters.priority.toUpperCase() : undefined,
                done: filters.state !== "all" ? filters.state : undefined
            }
        });
        return data;
    } catch (error) {
        console.log(error)
        throw new Error("Error fetching todos");
    }
}

export const addTodo = async (todo: Partial<Todo>): Promise<Todo> => {

    if (todo.text?.trim() === "") throw new Error("Text is required");
    if (todo.priority && !["low", "medium", "high"].includes(todo.priority)) throw new Error("Invalid priority");
    if (todo.dueDate && isNaN(Date.parse(todo.dueDate))) throw new Error("Invalid due date");
    try {
        const { data } = await api.post<Todo>("", {
            text: todo.text,
            priority: todo.priority?.toUpperCase(),
            dueDate: todo.dueDate
        })
        return data;
    } catch (error) {
        console.log(error)
        throw new Error("Error adding todo");
    }
}

export const editTodo = async (todoId: string, todo: Partial<Todo>): Promise<Todo> => {
    if (todo.text?.trim() === "") throw new Error("Text is required");
    if (todo.priority && !["low", "medium", "high"].includes(todo.priority)) throw new Error("Invalid priority");
    if (todo.dueDate && isNaN(Date.parse(todo.dueDate))) throw new Error("Invalid due date");
    try {
        const { data } = await api.put<Todo>(`/${todoId}`, {
            text: todo.text,
            priority: todo.priority?.toUpperCase(),
            dueDate: todo.dueDate
        })
        return data;
    } catch (error) {
        console.log(error)
        throw new Error("Error editing todo");
    }
}

export const deleteTodo = async (todoId: string): Promise<void> => {

    try {
        await api.delete(`/${todoId}`);
        return;
    } catch (error) {
        console.log(error)
        throw new Error("Errod deleting todo")
    }
}

export const markTodo = async (id: string, done: boolean): Promise<Todo> => {

    try {
        if (done) {
            const { data } = await api.post<Todo>(`/${id}/done`);
            return data;
        } else {
            const { data } = await api.put<Todo>(`/${id}/undone`)
            return data;
        }
    } catch (error) {
        console.log(error);
        throw new Error("Error marking the todo")
    }
}

type Metric = {
    all: number,
    high: number,
    medium: number,
    low: number
}
export const getAllMetrics = async (): Promise<Metric> => {

    try {
        const { data } = await api.get<Metric>("/averages");
        return data;
    } catch (error) {
        console.log(error)
        throw new Error("Error fetching the metrics")
    }
}