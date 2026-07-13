import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Statistics from '../pages/Statistics'
import { AuthProvider } from '../lib/auth/AuthContext'

vi.mock('../lib/supabase/client', () => {
  const mockFrom = vi.fn()
  const mockSelect = vi.fn().mockReturnThis()
  const mockOrder = vi.fn().mockReturnThis()
  const mockLimit = vi.fn().mockReturnThis()

  mockFrom.mockReturnValue({
    select: mockSelect,
    order: mockOrder,
    limit: mockLimit,
  })

  return {
    supabase: {
      from: mockFrom,
      auth: {
        getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
        onAuthStateChange: vi.fn().mockReturnValue({
          data: { subscription: { unsubscribe: vi.fn() } },
        }),
      },
    },
  }
})

vi.mock('../lib/stats/statsService', () => ({
  getTokenUsageSummary: vi.fn(),
  getRecentTokenUsage: vi.fn(),
}))

import { getTokenUsageSummary, getRecentTokenUsage } from '../lib/stats/statsService'

function renderStatistics() {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <Statistics />
      </AuthProvider>
    </MemoryRouter>,
  )
}

describe('Statistics page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows the development in progress notice', async () => {
    vi.mocked(getTokenUsageSummary).mockResolvedValue({
      totalTokens: 0,
      totalPromptTokens: 0,
      totalCompletionTokens: 0,
      totalRequests: 0,
      byProvider: [],
    })
    vi.mocked(getRecentTokenUsage).mockResolvedValue([])

    renderStatistics()

    await waitFor(() => {
      expect(screen.getByText(/Development in progress/i)).toBeDefined()
    })
  })

  it('mentions admin roles in the notice', async () => {
    vi.mocked(getTokenUsageSummary).mockResolvedValue({
      totalTokens: 0,
      totalPromptTokens: 0,
      totalCompletionTokens: 0,
      totalRequests: 0,
      byProvider: [],
    })
    vi.mocked(getRecentTokenUsage).mockResolvedValue([])

    renderStatistics()

    await waitFor(() => {
      expect(screen.getByText(/admin roles/i)).toBeDefined()
    })
  })

  it('shows loading spinner initially', () => {
    vi.mocked(getTokenUsageSummary).mockReturnValue(new Promise(() => {}))
    vi.mocked(getRecentTokenUsage).mockReturnValue(new Promise(() => {}))

    renderStatistics()

    expect(screen.getByRole('status', { name: 'Loading' })).toBeDefined()
  })

  it('shows token usage stats after loading', async () => {
    vi.mocked(getTokenUsageSummary).mockResolvedValue({
      totalTokens: 5000,
      totalPromptTokens: 3000,
      totalCompletionTokens: 2000,
      totalRequests: 10,
      byProvider: [
        { provider: 'openai', totalTokens: 5000, requests: 10 },
      ],
    })
    vi.mocked(getRecentTokenUsage).mockResolvedValue([])

    renderStatistics()

    await waitFor(() => {
      expect(screen.getAllByText('5,000').length).toBeGreaterThan(0)
    })
    expect(screen.getAllByText('Total Tokens').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Prompt Tokens').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Completion Tokens').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Total Requests').length).toBeGreaterThan(0)
  })

  it('shows provider breakdown table', async () => {
    vi.mocked(getTokenUsageSummary).mockResolvedValue({
      totalTokens: 5000,
      totalPromptTokens: 3000,
      totalCompletionTokens: 2000,
      totalRequests: 10,
      byProvider: [
        { provider: 'openai', totalTokens: 4000, requests: 8 },
        { provider: 'fallback', totalTokens: 1000, requests: 2 },
      ],
    })
    vi.mocked(getRecentTokenUsage).mockResolvedValue([])

    renderStatistics()

    await waitFor(() => {
      expect(screen.getByText('Usage by Provider')).toBeDefined()
    })
    expect(screen.getByText('openai')).toBeDefined()
    expect(screen.getByText('fallback')).toBeDefined()
  })

  it('shows recent usage records', async () => {
    vi.mocked(getTokenUsageSummary).mockResolvedValue({
      totalTokens: 500,
      totalPromptTokens: 300,
      totalCompletionTokens: 200,
      totalRequests: 1,
      byProvider: [{ provider: 'openai', totalTokens: 500, requests: 1 }],
    })
    vi.mocked(getRecentTokenUsage).mockResolvedValue([
      {
        id: 'rec-1',
        provider: 'openai',
        model: 'gpt-4o-mini',
        prompt_tokens: 300,
        completion_tokens: 200,
        total_tokens: 500,
        created_at: '2026-07-13T10:00:00Z',
      },
    ])

    renderStatistics()

    await waitFor(() => {
      expect(screen.getByText('gpt-4o-mini')).toBeDefined()
    })
  })

  it('shows empty state when no usage records', async () => {
    vi.mocked(getTokenUsageSummary).mockResolvedValue({
      totalTokens: 0,
      totalPromptTokens: 0,
      totalCompletionTokens: 0,
      totalRequests: 0,
      byProvider: [],
    })
    vi.mocked(getRecentTokenUsage).mockResolvedValue([])

    renderStatistics()

    await waitFor(() => {
      expect(screen.getByText(/No token usage recorded yet/i)).toBeDefined()
    })
  })

  it('shows error message on failure', async () => {
    vi.mocked(getTokenUsageSummary).mockRejectedValue(new Error('Network error'))
    vi.mocked(getRecentTokenUsage).mockResolvedValue([])

    renderStatistics()

    await waitFor(() => {
      expect(screen.getByText('Network error')).toBeDefined()
    })
  })
})
