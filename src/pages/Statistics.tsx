import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../lib/auth/AuthContext'
import {
  getTokenUsageSummary,
  getRecentTokenUsage,
  type TokenUsageSummary,
  type TokenUsageRecord,
} from '../lib/stats/statsService'
import Logo from '../components/Logo'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'

export default function Statistics() {
  const { user, signOut } = useAuth()
  const [summary, setSummary] = useState<TokenUsageSummary | null>(null)
  const [recent, setRecent] = useState<TokenUsageRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const [s, r] = await Promise.all([getTokenUsageSummary(), getRecentTokenUsage(20)])
        setSummary(s)
        setRecent(r)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load statistics')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="container-max flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Logo />
          <div className="flex items-center gap-3">
            <Link to="/chat" className="btn-ghost">Chat</Link>
            <Link to="/" className="btn-ghost">Home</Link>
            <button onClick={signOut} className="btn-ghost">Sign out</button>
          </div>
        </div>
      </header>

      <main className="container-max flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Statistics</h1>
          <p className="mt-1 text-sm text-slate-500">
            Overview of your account and AI token usage.
          </p>
        </div>

        <div className="mb-6 rounded-xl border border-warning-200 bg-warning-50 px-4 py-3">
          <div className="flex items-start gap-2">
            <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-warning-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-sm text-warning-800">
              <span className="font-semibold">Development in progress.</span> This page is
              currently available to all registered users. In the future, it will only be
              accessible by admin roles.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <LoadingSpinner size="lg" />
          </div>
        ) : error ? (
          <div className="rounded-xl border border-error-200 bg-error-50 px-4 py-3 text-sm text-error-700">
            {error}
          </div>
        ) : (
          <>
            <section className="mb-8">
              <h2 className="mb-4 text-lg font-semibold text-slate-800">Account</h2>
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700">
                    {user?.email?.[0]?.toUpperCase() ?? '?'}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Email</p>
                    <p className="text-base text-slate-900">{user?.email ?? 'Unknown'}</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-lg font-semibold text-slate-800">LLM Token Usage</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                  label="Total Tokens"
                  value={summary?.totalTokens ?? 0}
                  color="primary"
                />
                <StatCard
                  label="Prompt Tokens"
                  value={summary?.totalPromptTokens ?? 0}
                  color="secondary"
                />
                <StatCard
                  label="Completion Tokens"
                  value={summary?.totalCompletionTokens ?? 0}
                  color="accent"
                />
                <StatCard
                  label="Total Requests"
                  value={summary?.totalRequests ?? 0}
                  color="success"
                />
              </div>
            </section>

            {summary && summary.byProvider.length > 0 && (
              <section className="mb-8">
                <h2 className="mb-4 text-lg font-semibold text-slate-800">Usage by Provider</h2>
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      <tr>
                        <th className="px-6 py-3">Provider</th>
                        <th className="px-6 py-3 text-right">Total Tokens</th>
                        <th className="px-6 py-3 text-right">Requests</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {summary.byProvider.map((p) => (
                        <tr key={p.provider} className="hover:bg-slate-50">
                          <td className="px-6 py-3 font-medium text-slate-800">{p.provider}</td>
                          <td className="px-6 py-3 text-right text-slate-600">{p.totalTokens.toLocaleString()}</td>
                          <td className="px-6 py-3 text-right text-slate-600">{p.requests}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            <section>
              <h2 className="mb-4 text-lg font-semibold text-slate-800">Recent Usage</h2>
              {recent.length === 0 ? (
                <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-400">
                  No token usage recorded yet. Start a chat to see usage data here.
                </div>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      <tr>
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3">Provider</th>
                        <th className="px-6 py-3">Model</th>
                        <th className="px-6 py-3 text-right">Prompt</th>
                        <th className="px-6 py-3 text-right">Completion</th>
                        <th className="px-6 py-3 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {recent.map((r) => (
                        <tr key={r.id} className="hover:bg-slate-50">
                          <td className="whitespace-nowrap px-6 py-3 text-slate-500">
                            {new Date(r.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-3 font-medium text-slate-800">{r.provider}</td>
                          <td className="px-6 py-3 text-slate-500">{r.model ?? '—'}</td>
                          <td className="px-6 py-3 text-right text-slate-600">{r.prompt_tokens.toLocaleString()}</td>
                          <td className="px-6 py-3 text-right text-slate-600">{r.completion_tokens.toLocaleString()}</td>
                          <td className="px-6 py-3 text-right font-semibold text-slate-800">{r.total_tokens.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  )
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  const colorClasses: Record<string, string> = {
    primary: 'border-primary-200 bg-primary-50 text-primary-700',
    secondary: 'border-secondary-200 bg-secondary-50 text-secondary-700',
    accent: 'border-accent-200 bg-accent-50 text-accent-700',
    success: 'border-success-200 bg-success-50 text-success-700',
  }
  return (
    <div className={`rounded-xl border p-5 ${colorClasses[color] ?? colorClasses.primary}`}>
      <p className="text-xs font-semibold uppercase tracking-wider opacity-70">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value.toLocaleString()}</p>
    </div>
  )
}
