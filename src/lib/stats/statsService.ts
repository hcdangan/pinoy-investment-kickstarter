import { supabase } from '../supabase/client'

export interface TokenUsageSummary {
  totalTokens: number
  totalPromptTokens: number
  totalCompletionTokens: number
  totalRequests: number
  byProvider: ProviderUsage[]
}

export interface ProviderUsage {
  provider: string
  totalTokens: number
  requests: number
}

export interface TokenUsageRecord {
  id: string
  provider: string
  model: string | null
  prompt_tokens: number
  completion_tokens: number
  total_tokens: number
  created_at: string
}

export async function getTokenUsageSummary(): Promise<TokenUsageSummary> {
  const { data, error } = await supabase
    .from('token_usage')
    .select('provider, prompt_tokens, completion_tokens, total_tokens')

  if (error) throw error

  const rows = data ?? []
  const providerMap = new Map<string, ProviderUsage>()

  let totalTokens = 0
  let totalPromptTokens = 0
  let totalCompletionTokens = 0

  for (const row of rows) {
    totalTokens += row.total_tokens
    totalPromptTokens += row.prompt_tokens
    totalCompletionTokens += row.completion_tokens

    const existing = providerMap.get(row.provider)
    if (existing) {
      existing.totalTokens += row.total_tokens
      existing.requests += 1
    } else {
      providerMap.set(row.provider, {
        provider: row.provider,
        totalTokens: row.total_tokens,
        requests: 1,
      })
    }
  }

  return {
    totalTokens,
    totalPromptTokens,
    totalCompletionTokens,
    totalRequests: rows.length,
    byProvider: Array.from(providerMap.values()).sort((a, b) => b.totalTokens - a.totalTokens),
  }
}

export async function getRecentTokenUsage(limit = 20): Promise<TokenUsageRecord[]> {
  const { data, error } = await supabase
    .from('token_usage')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return (data ?? []) as TokenUsageRecord[]
}
