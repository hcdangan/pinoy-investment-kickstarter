import Logo from '../Logo'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-12">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <Logo />
          <p className="text-sm text-slate-500">
            Educational content only. Not financial advice. Investments can lose value.
          </p>
        </div>
        <div className="mt-8 border-t border-slate-100 pt-8 text-center">
          <p className="text-xs text-slate-400">
            © 2026 PinoyInvest. Built for Filipino investors. Always consult a licensed professional for
            personal financial decisions.
          </p>
        </div>
      </div>
    </footer>
  )
}
