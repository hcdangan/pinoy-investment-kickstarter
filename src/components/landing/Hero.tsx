import { Link } from 'react-router-dom'
import { useAuth } from '../../lib/auth/AuthContext'

export default function Hero() {
  const { session } = useAuth()

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-white to-white pt-28 pb-20 sm:pt-32">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary-200/30 blur-3xl" />
        <div className="absolute top-20 -left-40 h-80 w-80 rounded-full bg-secondary-200/30 blur-3xl" />
      </div>

      <div className="container-max relative px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700 animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-secondary-500 animate-pulse" />
            Built for Filipino investors
          </div>

          <h1 className="text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl animate-fade-in-up">
            Kickstart your{' '}
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              investment journey
            </span>{' '}
            today
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 animate-fade-in-up">
            Learn the basics, get AI-guided recommendations based on your profile, and take your first
            step toward financial growth — with education tailored to the Philippine investing context.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in-up">
            <Link to={session ? '/chat' : '/signup'} className="btn-primary text-base">
              {session ? 'Go to Chat' : 'Start Investing — Free'}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <a href="#why-invest" className="btn-secondary text-base">
              Learn more
            </a>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <Stat value="₱10T+" label="Total PSE market cap" />
            <Stat value="30%" label="Filipinos with savings accounts" />
            <Stat value="1 in 10" label="Filipinos who invest" />
          </div>
        </div>
      </div>
    </section>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-slate-900">{value}</div>
      <div className="mt-1 text-sm text-slate-500">{label}</div>
    </div>
  )
}
