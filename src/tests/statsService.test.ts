import { describe, it, expect, vi, beforeEach } from 'vitest'

let mockResult: { data: any; error: any } = { data: [], error: null }

vi.mock('../lib/supabase/client', () => {
  const limit = vi.fn(async () => mockResult)
  const order = vi.fn(() => ({ limit }))

  const selectResult = {
    order,
    then: (resolve: any, reject?: any) =>
      Promise.resolve(mockResult).then(resolve, reject),
  }

  const select = vi.fn(() => selectResult)

  return {
    supabase: {
      from: vi.fn(() => ({ select })),
    },
  }
})

import { getTokenUsageSummary, getRecentTokenUsage } from '../lib/stats/statsService'

describe('statsService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockResult = { data: [], error: null }
  })

  describe('getTokenUsageSummary', () => {
    it('aggregates token usage across rows', async () => {
      mockResult = {
        data: [
          { provider: 'openai', prompt_tokens: 100, completion_tokens: 50, total_tokens: 150 },
          { provider: 'openai', prompt_tokens: 200, completion_tokens: 100, total_tokens: 300 },
          { provider: 'fallback', prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
        ],
        error: null,
      }

      const summary = await getTokenUsageSummary()

      expect(summary.totalTokens).toBe(450)
      expect(summary.totalPromptTokens).toBe(300)
      expect(summary.totalCompletionTokens).toBe(150)
      expect(summary.totalRequests).toBe(3)
      expect(summary.byProvider).toHaveLength(2)
      expect(summary.byProvider[0]).toEqual({ provider: 'openai', totalTokens: 450, requests: 2 })
      expect(summary.byProvider[1]).toEqual({ provider: 'fallback', totalTokens: 0, requests: 1 })
    })

    it('returns zeros when no data', async () => {
      mockResult = { data: [], error: null }

      const summary = await getTokenUsageSummary()

      expect(summary.totalTokens).toBe(0)
      expect(summary.totalRequests).toBe(0)
      expect(summary.byProvider).toEqual([])
    })

    it('throws on error', async () => {
      mockResult = { data: null, error: { message: 'Permission denied' } }

      await expect(getTokenUsageSummary()).rejects.toThrow('Permission denied')
    })
  })

  describe('getRecentTokenUsage', () => {
    it('returns recent records ordered by date', async () => {
      const rows = [
        { id: 'r1', provider: 'openai', model: 'gpt-4o-mini', prompt_tokens: 100, completion_tokens: 50, total_tokens: 150, created_at: '2026-07-13T10:00:00Z' },
      ]
      mockResult = { data: rows, error: null }

      const result = await getRecentTokenUsage(10)

      expect(result).toEqual(rows)
    })

    it('returns empty array when no data', async () => {
      mockResult = { data: [], error: null }

      const result = await getRecentTokenUsage()

      expect(result).toEqual([])
    })

    it('throws on error', async () => {
      mockResult = { data: null, error: { message: 'Query failed' } }

      await expect(getRecentTokenUsage()).rejects.toThrow('Query failed')
    })
  })
})
