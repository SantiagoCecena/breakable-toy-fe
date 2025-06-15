import { render, screen, fireEvent } from '@testing-library/react';
import SearchForm from './SearchForm';
import { describe, it, expect, vi } from 'vitest';

describe('SearchForm Component', () => {
    it('renders all form elements correctly', () => {
        render(<SearchForm setFilters={vi.fn()} />);

        // Verificar que los elementos del formulario están presentes
        expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Priority/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/State/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
    });

    it('handles input changes correctly', () => {
        render(<SearchForm setFilters={vi.fn()} />);

        // Simular escritura en el campo de texto
        const nameInput = screen.getByLabelText(/Name/i);
        fireEvent.change(nameInput, { target: { value: 'Test Task' } });
        expect(nameInput).toHaveValue('Test Task');

        // Simular selección en el menú desplegable de prioridad
        const prioritySelect = screen.getByLabelText(/Priority/i);
        fireEvent.change(prioritySelect, { target: { value: 'high' } });
        expect(prioritySelect).toHaveValue('high');

        // Simular selección en el menú desplegable de estado
        const stateSelect = screen.getByLabelText(/State/i);
        fireEvent.change(stateSelect, { target: { value: 'done' } });
        expect(stateSelect).toHaveValue('done');
    });

    it('calls setFilters with correct data on form submission', () => {
        const setFiltersMock = vi.fn();
        render(<SearchForm setFilters={setFiltersMock} />);

        // Simular escritura y selección
        fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test Task' } });
        fireEvent.change(screen.getByLabelText(/Priority/i), { target: { value: 'medium' } });
        fireEvent.change(screen.getByLabelText(/State/i), { target: { value: 'undone' } });

        // Simular envío del formulario
        fireEvent.submit(screen.getByTestId('search-form'));

        // Verificar que setFilters fue llamado con los datos correctos
        expect(setFiltersMock).toHaveBeenCalledWith({
            name: 'Test Task',
            priority: 'medium',
            state: 'undone',
        });
    });

    it('handles empty values correctly', () => {
        const setFiltersMock = vi.fn();
        render(<SearchForm setFilters={setFiltersMock} />);

        // Simular envío del formulario sin llenar campos
        fireEvent.submit(screen.getByTestId('search-form'));

        // Verificar que setFilters fue llamado con valores predeterminados
        expect(setFiltersMock).toHaveBeenCalledWith({
            name: '',
            priority: 'all',
            state: 'all',
        });
    });
});