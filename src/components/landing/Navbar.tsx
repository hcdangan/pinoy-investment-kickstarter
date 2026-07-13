import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../Logo'
import { useAuth } from '../../lib/auth/AuthContext'

const navLinks = [
  { label: 'Our Mission', href: '#mission' },
  { label: 'Why Invest', href: '#why-invest' },
  { label: 'Lessons', href: '#learn' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { session, signOut } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 shadow-md backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="container-max flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Logo onClick={() => setMobileOpen(false)} />

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-primary-600"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {session ? (
            <>
              <Link to="/chat" className="btn-ghost">
                Go to Chat
              </Link>
              <Link to="/statistics" className="btn-ghost">
                Statistics
              </Link>
              <button onClick={handleSignOut} className="btn-ghost">
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="btn-ghost">
                Sign in
              </Link>
              <Link to="/signup" className="btn-primary">
                Join Free
              </Link>
            </>
          )}
        </div>

        <button
          className="rounded-lg p-2 text-slate-700 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-slate-100 pt-3">
              {session ? (
                <>
                  <Link to="/chat" onClick={() => setMobileOpen(false)} className="btn-secondary w-full">
                    Go to Chat
                  </Link>
                  <button onClick={handleSignOut} className="btn-ghost w-full">
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/signin" onClick={() => setMobileOpen(false)} className="btn-secondary w-full">
                    Sign in
                  </Link>
                  <Link to="/signup" onClick={() => setMobileOpen(false)} className="btn-primary w-full">
                    Join Free
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
