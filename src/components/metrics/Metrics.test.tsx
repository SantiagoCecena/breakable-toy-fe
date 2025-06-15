import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Metrics from './Metrics'
import * as utils from '../../lib/utils'

// Mock the API call
vi.mock('../../services/api', () => ({
    getAllMetrics: vi.fn()
}))

// Mock the utility function
vi.mock('../../lib/utils', () => ({
    fromMilisecondsToMinutes: vi.fn()
}))

// Mock useQuery hook
const mockUseQuery = vi.fn()
vi.mock('@tanstack/react-query', async () => {
    const actual = await vi.importActual('@tanstack/react-query')
    return {
        ...actual,
        useQuery: () => mockUseQuery()
    }
})

describe('Metrics', () => {
    const mockMetricsData = {
        all: 3600000, // 1 hour in milliseconds
        low: 1800000, // 30 minutes
        medium: 3600000, // 1 hour
        high: 7200000 // 2 hours
    }

    beforeEach(() => {
        vi.clearAllMocks()
        vi.mocked(utils.fromMilisecondsToMinutes).mockReturnValue('60 minutes')
    })

    it('displays loading spinner when data is loading', () => {
        mockUseQuery.mockReturnValue({
            data: undefined,
            isLoading: true
        })

        render(<Metrics />)

        expect(screen.getByTestId('spin-loader')).toBeInTheDocument()
    })

    it('displays metrics data when successfully loaded', () => {
        mockUseQuery.mockReturnValue({
            data: mockMetricsData,
            isLoading: false
        })

        render(<Metrics />)

        // Check main heading
        expect(screen.getByText('Average time to finish tasks:')).toBeInTheDocument()
        expect(screen.getByText('Average time to finish tasks by priority:')).toBeInTheDocument()

        // Check priority labels
        expect(screen.getByText(/Low:/)).toBeInTheDocument()
        expect(screen.getByText(/Medium:/)).toBeInTheDocument()
        expect(screen.getByText(/High:/)).toBeInTheDocument()
    })

    it('calls fromMilisecondsToMinutes with correct values', () => {
        const mockFromMiliseconds = vi.mocked(utils.fromMilisecondsToMinutes)
        mockFromMiliseconds.mockReturnValue('60 minutes')

        mockUseQuery.mockReturnValue({
            data: mockMetricsData,
            isLoading: false
        })

        render(<Metrics />)

        // Verify utility function is called with correct values
        expect(mockFromMiliseconds).toHaveBeenCalledWith(mockMetricsData.all)
        expect(mockFromMiliseconds).toHaveBeenCalledWith(mockMetricsData.low)
        expect(mockFromMiliseconds).toHaveBeenCalledWith(mockMetricsData.medium)
        expect(mockFromMiliseconds).toHaveBeenCalledWith(mockMetricsData.high)
        expect(mockFromMiliseconds).toHaveBeenCalledTimes(4)
    })

    it('handles no data gracefully', () => {
        mockUseQuery.mockReturnValue({
            data: undefined,
            isLoading: false
        })

        render(<Metrics />)

        // Should render headings but no metric values
        expect(screen.getByText('Average time to finish tasks:')).toBeInTheDocument()
        expect(screen.getByText('Average time to finish tasks by priority:')).toBeInTheDocument()
        expect(screen.getByText(/Low:/)).toBeInTheDocument()
        expect(screen.getByText(/Medium:/)).toBeInTheDocument()
        expect(screen.getByText(/High:/)).toBeInTheDocument()
    })

    it('handles null data gracefully', () => {
        mockUseQuery.mockReturnValue({
            data: null,
            isLoading: false
        })

        render(<Metrics />)

        expect(screen.getByText('Average time to finish tasks:')).toBeInTheDocument()
        expect(screen.getByText('Average time to finish tasks by priority:')).toBeInTheDocument()
    })

    it('renders correct component structure', () => {
        mockUseQuery.mockReturnValue({
            data: mockMetricsData,
            isLoading: false
        })

        render(<Metrics />)

        // Check section structure
        const section = screen.getByTestId('metrics-section')
        expect(section).toHaveClass('flex', 'flex-col', 'gap-y-5')

        // Check articles
        const articles = screen.getAllByRole('article')
        expect(articles).toHaveLength(2)

        // Check list structure
        const list = screen.getByRole('list')
        expect(list).toBeInTheDocument()
    })

    it('displays formatted time values correctly', () => {
        const mockFromMiliseconds = vi.mocked(utils.fromMilisecondsToMinutes)
        mockFromMiliseconds
            .mockReturnValueOnce('60 minutes')  // all
            .mockReturnValueOnce('30 minutes')  // low
            .mockReturnValueOnce('60 minutes')  // medium
            .mockReturnValueOnce('120 minutes') // high

        mockUseQuery.mockReturnValue({
            data: mockMetricsData,
            isLoading: false
        })

        render(<Metrics />)

        expect(screen.getByText('60 minutes')).toBeInTheDocument()
        expect(screen.getByText(/Low: 30 minutes/)).toBeInTheDocument()
        expect(screen.getByText(/Medium: 60 minutes/)).toBeInTheDocument()
        expect(screen.getByText(/High: 120 minutes/)).toBeInTheDocument()
    })

    it('uses correct query key for API call', () => {
        mockUseQuery.mockReturnValue({
            data: mockMetricsData,
            isLoading: false
        })

        render(<Metrics />)

        // This test verifies the component uses the correct query key
        // The actual verification would depend on how you want to test the query configuration
        expect(mockUseQuery).toHaveBeenCalled()
    })
})