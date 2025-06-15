import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, beforeEach, expect, it } from 'vitest';
import TableItem from './TableItem';
import { Todo } from '../../types/types';
import { markTodo } from '../../services/api';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock del store
const mockTodosStore = vi.fn();
vi.mock('../../store/useTodosStore', () => ({
    useTodosStore: () => mockTodosStore(),
}));

// Mock de la API
vi.mock('../../services/api', () => ({
    markTodo: vi.fn(),
}));

// Mock de los íconos
vi.mock('../UI/svgs/CheckboxChecked', () => ({
    default: () => <svg data-testid="checkbox-checked" />,
}));
vi.mock('../UI/svgs/CheckboxUnchecked', () => ({
    default: () => <svg data-testid="checkbox-unchecked" />,
}));
vi.mock('../UI/svgs/Edit', () => ({
    default: ({ handleSetEditingTodo }: { handleSetEditingTodo: () => void }) => (
        <button data-testid="edit-button" onClick={handleSetEditingTodo}>
            Edit
        </button>
    ),
}));
vi.mock('../UI/svgs/Delete', () => ({
    default: ({ handleSetIdToDelete }: { handleSetIdToDelete: () => void }) => (
        <button data-testid="delete-button" onClick={handleSetIdToDelete}>
            Delete
        </button>
    ),
}));

const queryClient = new QueryClient();

describe('TableItem Component', () => {
    const mockTodo: Todo = {
        id: '1',
        text: 'Test Todo',
        priority: 'high',
        dueDate: '12/31/2023',
        done: false,
        createdAt: '2023-01-01',
    };

    // Helper para renderizar con tabla
    const renderWithTable = (component: React.ReactElement) => {
        return render(
            <QueryClientProvider client={queryClient}>
                <table>
                    <tbody>
                        {component}
                    </tbody>
                </table>
            </QueryClientProvider>
        );
    };

    beforeEach(() => {
        vi.clearAllMocks();
        mockTodosStore.mockReturnValue({
            setEditingTodo: vi.fn(),
            editTodo: vi.fn(),
            toggleEditModal: vi.fn(),
            setIdToDelete: vi.fn(),
            toggleDelModal: vi.fn(),
        });
    });

    it('renders correctly with todo data', () => {

        renderWithTable(<TableItem todo={mockTodo} />);
        // Verificar que los datos del todo se renderizan correctamente
        expect(screen.getByText('Test Todo')).toBeInTheDocument();
        expect(screen.getByText('high')).toBeInTheDocument();
        expect(screen.getByTestId('checkbox-unchecked')).toBeInTheDocument();
        expect(screen.getByText('12/31/2023')).toBeInTheDocument();
    });

    it('calls markTodo when checkbox is clicked', async () => {
        renderWithTable(<TableItem todo={mockTodo} />);

        const checkbox = screen.getByTestId('checkbox');
        fireEvent.click(checkbox);

        // Verificar que la mutación se llama con el valor correcto
        await waitFor(() => {
            expect(markTodo).toHaveBeenCalledTimes(1);
            expect(markTodo).toHaveBeenCalledWith(mockTodo.id, true);
        })
    });

    it('displays "--" for invalid or missing dueDate', () => {
        const invalidTodo = { ...mockTodo, dueDate: 'invalid-date' };

        render(
            <QueryClientProvider client={queryClient}>
                <TableItem todo={invalidTodo} />
            </QueryClientProvider>
        );

        // Verificar que se muestra "--" para una fecha inválida
        expect(screen.getByText('--')).toBeInTheDocument();
    });
});