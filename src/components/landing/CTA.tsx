import { Link } from 'react-router-dom'
import { useAuth } from '../../lib/auth/AuthContext'

export default function CTA() {
  const { session } = useAuth()

  return (
    <section className="section-padding bg-gradient-to-br from-primary-700 via-primary-800 to-primary-950">
      <div className="container-max">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Your future self will thank you
          </h2>
          <p className="mt-4 text-lg text-primary-100">
            The best time to start investing was yesterday. The second best time is today. Create your
            free account and take the first step.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to={session ? '/chat' : '/signup'}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-primary-700 shadow-lg transition-all hover:bg-primary-50 hover:shadow-xl active:scale-[0.98]"
            >
              {session ? 'Go to Chat' : 'Get Started — Free'}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
          <p className="mt-6 text-sm text-primary-200">No credit card required. Start learning in minutes.</p>
        </div>
      </div>
    </section>
  )
}
