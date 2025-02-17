import { create } from "zustand";
import { Todo } from "../types/types";
import { orderByDueDate, orderByPriority } from "../lib/utils";


const initialState = {
    todos: [],
    editingTodo: null,
    editModalOpen: false,
    delModalOpen: false
}

interface TodosStore {
    todos: Todo[];

    editingTodo: Todo | null,
    editModalOpen: boolean;
    toggleEditModal: (isOpen: boolean) => void;

    delModalOpen: boolean;
    toggleDelModal: (isOpen: boolean) => void;
    todoIdToDelete: string | null;
    setIdToDelete: (id: string) => void;
    clearIdToDelete: () => void;

    setTodos: (todos: Todo[]) => void;
    orderTodosByPriority: () => void;
    orderTodosByDueDate: () => void;
    addTodo: (todo: Todo) => void;
    editTodo: (todo: Todo) => void;
    deleteTodo: (id: string) => void
    setEditingTodo: (todo: Todo) => void;
    clearEditingTodo: () => void;
}

export const useTodosStore = create<TodosStore>((set) => ({
    todos: initialState.todos,
    editingTodo: null,
    editModalOpen: initialState.editModalOpen,
    delModalOpen: initialState.delModalOpen,

    setTodos: (todos: Todo[]) => set(state => ({ ...state, todos: todos })),
    orderTodosByPriority: () => set(state => {
        const todosToSort = [...state.todos];
        todosToSort.sort(orderByPriority);
        return { ...state, todos: todosToSort }
    }),
    orderTodosByDueDate: () => set(state => {
        const todosToSort = [...state.todos];
        todosToSort.sort(orderByDueDate);
        return { ...state, todos: todosToSort }
    }),
    addTodo: (todo: Todo) => set(state => {
        if (state.todos.length < 10) return ({ ...state, todos: [...state.todos!, todo] });
        return state;
    }),
    editTodo: (todo: Todo) => set(state => {
        const newTodos = state.todos!.map(t => t.id === todo.id ? todo : t);
        return { ...state, todos: newTodos };
    }),
    deleteTodo: (id: string) => set(state => ({ ...state, todos: state.todos!.filter(t => t.id !== id) })),

    toggleEditModal: (isOpen: boolean) => set(state => ({ ...state, editModalOpen: isOpen })),
    setEditingTodo: (todo: Todo) => set(state => ({ ...state, editingTodo: todo })),
    clearEditingTodo: () => set(state => ({ ...state, editingTodo: null })),

    toggleDelModal: (isOpen: boolean) => set(state => ({ ...state, delModalOpen: isOpen })),
    todoIdToDelete: null,
    setIdToDelete: (id) => set(state => ({ ...state, todoIdToDelete: id })),
    clearIdToDelete: () => set(state => ({ ...state, todoIdToDelete: null }))
}))