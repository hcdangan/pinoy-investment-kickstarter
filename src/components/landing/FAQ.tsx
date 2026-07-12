import { useState } from 'react'

const faqs = [
  {
    q: 'Is this really free?',
    a: 'Yes, completely free. PinoyInvest is a non-profit project. There are no premium plans, no hidden fees, and no upsells. We created this because we believe financial education should be accessible to every Filipino, not just those who can afford it.',
  },
  {
    q: 'Are you giving me financial advice?',
    a: 'No. We provide educational content only. Our AI assistant helps you understand investing concepts and suggests learning paths based on your profile, but it does not give licensed financial advice or personalized buy/sell recommendations. Always consult a licensed financial professional for personal decisions.',
  },
  {
    q: 'How much money do I need to start investing?',
    a: 'You can start with as little as ₱1,000. Many mutual funds, UITFs, and digital investment platforms accept small initial investments. Pag-IBIG MP2 lets you start with just ₱500/month. You don\'t need to be rich to begin — you just need to begin.',
  },
  {
    q: 'What investment options are available to Filipinos?',
    a: 'Filipinos can invest in stocks (via the PSE), bonds, mutual funds, UITFs, ETFs, Pag-IBIG MP2, SSS PESO Fund, and digital bank high-yield savings. Each has different risk levels, minimum amounts, and expected returns — our lessons explain them in plain language.',
  },
  {
    q: 'Is my data safe?',
    a: 'Yes. We use row-level security at the database level, meaning your data is protected by design. We never share your personal information with third parties, and all your AI conversations are private to your account.',
  },
  {
    q: 'Can I lose money investing?',
    a: 'Yes, and we want you to know that upfront. All investments carry risk, and the value of investments can go down as well as up. This is exactly why we focus on education — so you understand the risks before you put any money in. Never invest money you can\'t afford to leave invested for the long term.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="section-padding bg-white">
      <div className="container-max">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full bg-secondary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary-700">
            Questions
          </span>
          <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Questions you might have
          </h2>
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="card overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-4 text-left"
              >
                <span className="text-base font-semibold text-slate-900">{faq.q}</span>
                <svg
                  className={`h-5 w-5 flex-shrink-0 text-slate-400 transition-transform ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-4 text-sm leading-relaxed text-slate-600 animate-slide-up">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
