import Logo from '../Logo'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-12">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <Logo />
          <div className="flex flex-col items-center gap-2 sm:items-end">
            <p className="text-sm text-slate-500">
              Educational content only. Not financial advice. Investments can lose value.
            </p>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-50 px-3 py-1 text-xs font-semibold text-secondary-700">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Non-profit · Free forever
            </span>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-100 pt-8 text-center">
          <p className="text-xs text-slate-400">
            © 2026 PinoyInvest. A free, non-profit project built to help Filipinos learn about
            investing. Always consult a licensed professional for personal financial decisions.
          </p>
        </div>
      </div>
    </footer>
  )
}
