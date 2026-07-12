import { Link } from 'react-router-dom'

export default function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link to="/" onClick={onClick} className="flex items-center gap-2.5 group">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary-600 shadow-sm transition-transform group-hover:scale-105">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white">
          <path d="M12 3L4 7v5c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V7l-8-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-display text-lg font-bold text-slate-900">
          Pinoy<span className="text-secondary-600">Invest</span>
        </span>
        <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
          Free · Non-profit
        </span>
      </div>
    </Link>
  )
}
