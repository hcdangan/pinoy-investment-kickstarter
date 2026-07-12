import { Link } from 'react-router-dom'
import { useAuth } from '../../lib/auth/AuthContext'

export default function CTA() {
  const { session } = useAuth()

  return (
    <section className="section-padding bg-secondary-700">
      <div className="container-max">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            The best time to start learning is now
          </h2>
          <p className="mt-4 text-lg text-secondary-100">
            You don't need to be an expert. You don't need a lot of money. You just need to take the
            first step — and we'll walk with you the rest of the way.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to={session ? '/chat' : '/signup'}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-secondary-700 shadow-lg transition-all hover:bg-secondary-50 hover:shadow-xl active:scale-[0.98]"
            >
              {session ? 'Continue Learning' : 'Create a Free Account'}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
          <p className="mt-6 text-sm text-secondary-200">
            Always free. No fees, no upsells, no credit card. This is a non-profit project.
          </p>
        </div>
      </div>
    </section>
  )
}
