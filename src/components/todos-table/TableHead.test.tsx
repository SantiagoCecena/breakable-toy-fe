import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, beforeEach, expect, it } from 'vitest';
import { useTodosStore } from '../../store/useTodosStore';
import TableHead from './TableHead';

// Mock del store
const mockOrderByPriority = vi.fn();
const mockOrderByDueDate = vi.fn();

vi.mock('../../store/useTodosStore', () => ({
    useTodosStore: vi.fn(() => ({
        orderTodosByPriority: mockOrderByPriority,
        orderTodosByDueDate: mockOrderByDueDate,
    })),
}));

// Mock del componente CheckboxUnchecked
vi.mock('../UI/svgs/CheckboxUnchecked', () => ({
    default: () => <svg data-testid="checkbox-unchecked" />,
}));

describe('TableHead Component', () => {
    // Helper para renderizar con tabla
    const renderWithTable = (component: React.ReactElement) => {
        return render(
            <table>
                {component}
            </table>
        );
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders correctly with all table headings', () => {
        renderWithTable(<TableHead />);

        // Verificar que se renderiza el checkbox
        expect(screen.getByTestId('checkbox-unchecked')).toBeInTheDocument();

        // Verificar que se renderizan todos los encabezados
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Priority <>')).toBeInTheDocument();
        expect(screen.getByText('Due Date <>')).toBeInTheDocument();
        expect(screen.getByText('Actions')).toBeInTheDocument();
    });

    it('applies hover cursor styling to sortable columns', () => {
        renderWithTable(<TableHead />);

        const priorityHeader = screen.getByText('Priority <>');
        const dueDateHeader = screen.getByText('Due Date <>');
        const nameHeader = screen.getByText('Name');
        const actionsHeader = screen.getByText('Actions');

        // Verificar que las columnas ordenables tienen cursor pointer
        expect(priorityHeader).toHaveClass('hover:cursor-pointer');
        expect(dueDateHeader).toHaveClass('hover:cursor-pointer');

        // Verificar que las columnas no ordenables no tienen cursor pointer
        expect(nameHeader).not.toHaveClass('hover:cursor-pointer');
        expect(actionsHeader).not.toHaveClass('hover:cursor-pointer');
    });

    it('calls orderByPriority when Priority column is clicked', async () => {

        (useTodosStore as any).mockImplementation((selector: any) => {
            const state = {
                orderTodosByPriority: mockOrderByPriority,
                orderTodosByDueDate: mockOrderByDueDate,
            };
            return selector(state);
        });

        renderWithTable(<TableHead />);

        const priorityHeader = screen.getByText('Priority <>');
        fireEvent.click(priorityHeader);

        await waitFor(() => {
            expect(mockOrderByPriority).toHaveBeenCalledTimes(1);
            expect(mockOrderByDueDate).not.toHaveBeenCalled();
        })
    });

    it('calls orderByDueDate when Due Date column is clicked', async () => {
        renderWithTable(<TableHead />);

        const dueDateHeader = screen.getByText('Due Date <>');
        fireEvent.click(dueDateHeader);

        await waitFor(() => {
            expect(mockOrderByDueDate).toHaveBeenCalledTimes(1);
            expect(mockOrderByPriority).not.toHaveBeenCalled();
        });
    });

    it('does not call any functions when non-sortable columns are clicked', async () => {
        renderWithTable(<TableHead />);

        const nameHeader = screen.getByText('Name');
        const actionsHeader = screen.getByText('Actions');


        fireEvent.click(nameHeader);
        fireEvent.click(actionsHeader);

        await waitFor(() => {
            expect(mockOrderByPriority).not.toHaveBeenCalled();
            expect(mockOrderByDueDate).not.toHaveBeenCalled();
        });
    });

    it('renders correct table structure', () => {
        renderWithTable(<TableHead />);

        const thead = screen.getByRole('rowgroup');
        const row = screen.getByRole('row');
        const headers = screen.getAllByRole('columnheader');

        expect(thead).toBeInTheDocument();
        expect(row).toBeInTheDocument();
        expect(headers).toHaveLength(5); // 1 checkbox + 4 headings
    });
});