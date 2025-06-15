import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Button from './Button'

describe('Button', () => {
    it('renders with text prop', () => {
        render(<Button text="Click me" onClick={vi.fn()} />)
        expect(screen.getByText('Click me')).toBeInTheDocument()
    })

    it('renders with children when no text prop', () => {
        render(<Button onClick={vi.fn()}><span>Child content</span></Button>)
        expect(screen.getByText('Child content')).toBeInTheDocument()
    })

    it('calls onClick when clicked', () => {
        const handleClick = vi.fn()
        render(<Button text="Click" onClick={handleClick} />)
        fireEvent.click(screen.getByText('Click'))
        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('applies custom className', () => {
        render(<Button text="Test" onClick={vi.fn()} classname="custom-class" />)
        expect(screen.getByText('Test')).toHaveClass('custom-class')
    })

    it('respects disabled state', () => {
        render(<Button text="Test" onClick={vi.fn()} disabled />)
        expect(screen.getByText('Test')).toBeDisabled()
    })
})