import { Link } from 'react-router-dom'

export default function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link to="/" onClick={onClick} className="flex items-center gap-2 group">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 shadow-md transition-transform group-hover:scale-105">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white">
          <path d="M3 17l6-6 4 4 8-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M17 7h4v4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span className="font-display text-lg font-bold text-slate-900">
        Pinoy<span className="text-primary-600">Invest</span>
      </span>
    </Link>
  )
}
