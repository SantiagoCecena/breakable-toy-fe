import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TableBody from './TableBody'
import { Todo } from '../../types/types'

vi.mock('./TableItem', () => ({
    default: ({ todo }: { todo: Todo }) => <tr data-testid={`todo-${todo.id}`}>{todo.text}</tr>
}))

const queryClient = new QueryClient()

describe('TableBody', () => {
    const renderWithTable = (component: React.ReactElement) => {
        return render(
            <QueryClientProvider client={queryClient}>
                <table>{component}</table>
            </QueryClientProvider>
        )
    }

    it('renders "No todos found" when empty array', () => {
        renderWithTable(<TableBody todos={[]} />)
        expect(screen.getByText('No todos found')).toBeInTheDocument()
    })

    it('renders TodoItems when todos exist', () => {
        const mockTodos: Todo[] = [
            { id: '1', text: 'Test 1', priority: 'high', done: false, createdAt: '2023-01-01' },
            { id: '2', text: 'Test 2', priority: 'low', done: true, createdAt: '2023-01-02' }
        ]

        renderWithTable(<TableBody todos={mockTodos} />)

        expect(screen.getByTestId('todo-1')).toBeInTheDocument()
        expect(screen.getByTestId('todo-2')).toBeInTheDocument()
        expect(screen.getByText('Test 1')).toBeInTheDocument()
        expect(screen.getByText('Test 2')).toBeInTheDocument()
    })
})