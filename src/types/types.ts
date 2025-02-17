

export interface Filters {
    name: string;
    priority: "all" | "high" | "medium" | "low";
    state: "all" | "done" | "undone";
}

export type Todo = {
    id: string,
    text: string,
    priority: "high" | "medium" | "low" | "HIGH" | "MEDIUM" | "LOW",
    done: boolean,
    dueDate?: string | null,
    doneDate?: string | null,
    createdAt: string
}