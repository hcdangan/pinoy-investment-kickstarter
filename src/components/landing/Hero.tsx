import { Link } from 'react-router-dom'
import { useAuth } from '../../lib/auth/AuthContext'

export default function Hero() {
  const { session } = useAuth()

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary-50 via-white to-white pt-28 pb-20 sm:pt-32">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-secondary-200/20 blur-3xl" />
        <div className="absolute top-20 -left-40 h-80 w-80 rounded-full bg-primary-200/20 blur-3xl" />
      </div>

      <div className="container-max relative px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-secondary-200 bg-secondary-50 px-4 py-1.5 text-sm font-medium text-secondary-700 animate-fade-in">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            A free, non-profit project for every Filipino
          </div>

          <h1 className="text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl animate-fade-in-up">
            Investing doesn't have to be{' '}
            <span className="text-secondary-600">intimidating</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 animate-fade-in-up">
            We're here to help the average Filipino take that first step into investing — no finance
            degree, no big money, no sales pitch. Just honest, beginner-friendly education and a
            patient AI guide that walks with you.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in-up">
            <Link to={session ? '/chat' : '/signup'} className="btn-primary text-base">
              {session ? 'Continue Learning' : "Start Learning — It's Free"}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <a href="#why-invest" className="btn-secondary text-base">
              Learn more
            </a>
          </div>

          <p className="mt-6 text-sm text-slate-400 animate-fade-in">
            No fees. No upsells. No credit card. We're not selling anything.
          </p>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <Stat value="1 in 10" label="Filipinos who currently invest" />
            <Stat value="₱1,000" label="Minimum to start in many options" />
            <Stat value="100%" label="Free — this is a non-profit project" />
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
