import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import TodosTable from './TodosTable'
import { useQuery } from '@tanstack/react-query'
import { useTodosStore } from '../../store/useTodosStore'
import { Filters } from '../../types/types'

// Mock dependencies
vi.mock('@tanstack/react-query')
vi.mock('../../store/useTodosStore')
vi.mock('../../services/api')
vi.mock('./TableHead', () => ({ default: () => <thead data-testid="table-head" /> }))
vi.mock('./TableBody', () => ({ default: ({ todos }: { todos: any[] }) => <tbody data-testid="table-body">{todos.length}</tbody> }))
vi.mock('../UI/loaders/SpinLoader', () => ({ default: () => <div data-testid="spin-loader" /> }))
vi.mock('../UI/Button', () => ({
    default: ({ onClick, children, disabled, text }: any) =>
        <button onClick={onClick} disabled={disabled} data-testid="button">{text || children}</button>
}))
vi.mock('../UI/svgs/ArrowLeft', () => ({ default: () => <span data-testid="arrow-left" /> }))
vi.mock('../UI/svgs/ArrowRight', () => ({ default: () => <span data-testid="arrow-right" /> }))

const mockUseQuery = vi.mocked(useQuery)
const mockUseTodosStore = vi.mocked(useTodosStore)

describe('TodosTable', () => {
    const mockSetTodos = vi.fn()
    const mockFilters: Filters = { name: "", priority: "all", state: "done" }
    const mockTodos = [
        { id: 1, title: 'Todo 1', completed: false },
        { id: 2, title: 'Todo 2', completed: true }
    ]

    beforeEach(() => {
        vi.clearAllMocks()
        mockUseTodosStore.mockReturnValue(mockSetTodos)
    })

    it('renders loading state', () => {
        mockUseQuery.mockReturnValue({
            data: undefined,
            isError: false,
            isLoading: true
        } as any)

        render(<TodosTable filters={mockFilters} />)

        expect(screen.getByTestId('spin-loader')).toBeInTheDocument()
    })

    it('renders error state', () => {
        mockUseQuery.mockReturnValue({
            data: undefined,
            isError: true,
            isLoading: false
        } as any)

        render(<TodosTable filters={mockFilters} />)

        expect(screen.getByText('Ups, something went wrong...')).toBeInTheDocument()
    })

    it('renders no data state when data is undefined', () => {
        mockUseQuery.mockReturnValue({
            data: undefined,
            isError: false,
            isLoading: false
        } as any)

        render(<TodosTable filters={mockFilters} />)

        expect(screen.getByText('It seems like no data are available')).toBeInTheDocument()
    })

    it('renders no data state when data is empty array', () => {
        mockUseQuery.mockReturnValue({
            data: [],
            isError: false,
            isLoading: false
        } as any)

        render(<TodosTable filters={mockFilters} />)

        expect(screen.getByText('It seems like no data are available')).toBeInTheDocument()
    })

    it('renders table with data successfully', () => {
        mockUseQuery.mockReturnValue({
            data: mockTodos,
            isError: false,
            isLoading: false
        } as any)

        render(<TodosTable filters={mockFilters} />)

        expect(screen.getByTestId('table-head')).toBeInTheDocument()
        expect(screen.getByTestId('table-body')).toBeInTheDocument()
        expect(screen.getAllByTestId('button')).toHaveLength(3)
    })

    it('calls setTodos when data is available', () => {
        mockUseQuery.mockReturnValue({
            data: mockTodos,
            isError: false,
            isLoading: false
        } as any)

        render(<TodosTable filters={mockFilters} />)

        expect(mockSetTodos).toHaveBeenCalledWith(mockTodos)
    })

    it('does not call setTodos when data is empty', () => {
        mockUseQuery.mockReturnValue({
            data: [],
            isError: false,
            isLoading: false
        } as any)

        render(<TodosTable filters={mockFilters} />)

        expect(mockSetTodos).not.toHaveBeenCalled()
    })

    it('disables previous button on first page', () => {
        mockUseQuery.mockReturnValue({
            data: mockTodos,
            isError: false,
            isLoading: false
        } as any)

        render(<TodosTable filters={mockFilters} />)

        const buttons = screen.getAllByTestId('button')
        const prevButton = buttons[0]

        expect(prevButton).toBeDisabled()
    })

    it('disables next button when data length is less than 10', () => {
        mockUseQuery.mockReturnValue({
            data: mockTodos, // length 2 < 10
            isError: false,
            isLoading: false
        } as any)

        render(<TodosTable filters={mockFilters} />)

        const buttons = screen.getAllByTestId('button')
        const nextButton = buttons[2]

        expect(nextButton).toBeDisabled()
    })

    it('enables next button when data length is 10 or more', () => {
        const largeMockData = Array.from({ length: 10 }, (_, i) => ({ id: i, title: `Todo ${i}`, completed: false }))

        mockUseQuery.mockReturnValue({
            data: largeMockData,
            isError: false,
            isLoading: false
        } as any)

        render(<TodosTable filters={mockFilters} />)

        const buttons = screen.getAllByTestId('button')
        const nextButton = buttons[2]

        expect(nextButton).not.toBeDisabled()
    })

    it('handles page navigation correctly', async () => {
        const mockTodosWithMoreItems = Array.from({ length: 10 }, (_, i) => ({
            id: i + 1,
            title: `Todo ${i + 1}`,
            completed: false
        }))

        mockUseQuery.mockReturnValue({
            data: mockTodosWithMoreItems,
            isError: false,
            isLoading: false
        } as any)

        render(<TodosTable filters={mockFilters} />)

        const buttons = screen.getAllByTestId('button')
        const prevButton = buttons[0]
        const pageButton = buttons[1]  // Page number button
        const nextButton = buttons[2]

        // Check initial state
        expect(prevButton).toBeDisabled()
        expect(pageButton).toHaveTextContent('1')
        expect(nextButton).not.toBeDisabled()

        // Click next button
        fireEvent.click(nextButton)

        // Check that page number changed
        await waitFor(() => {
            expect(pageButton).toHaveTextContent('2')
        })

        // Now previous button should be enabled
        expect(prevButton).not.toBeDisabled()
    })
})