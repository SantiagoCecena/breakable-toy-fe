

export interface Filters {
    name: string;
    priority: "all" | "high" | "medium" | "low";
    state: "all" | "done" | "undone";
}

export type Todo = {
    id: `${string}-${string}-${string}-${string}-${string}`,
    text: string,
    priority: "high" | "medium" | "low",
    done: boolean,
    dueDate?: string,
    doneDate?: string,
    createdAt: string
}