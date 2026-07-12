import { useState } from 'react'

const faqs = [
  {
    q: 'Is this app giving me financial advice?',
    a: 'No. PinoyInvest provides educational content only. Our AI assistant helps you understand investing concepts and suggests learning paths based on your profile, but it does not give licensed financial advice or personalized buy/sell recommendations. Always consult a licensed financial professional for personal decisions.',
  },
  {
    q: 'How much money do I need to start investing in the Philippines?',
    a: 'You can start with as little as ₱1,000. Many mutual funds, UITFs, and digital investment platforms accept small initial investments. Some online stock brokers require a minimum opening balance of around ₱5,000.',
  },
  {
    q: 'What investment options are available to Filipinos?',
    a: 'Filipinos can invest in stocks (via the PSE), bonds, mutual funds, UITFs, ETFs, Pag-IBIG MP2, SSS PESO Fund, and digital bank high-yield savings. Each has different risk levels, minimum amounts, and expected returns.',
  },
  {
    q: 'Is my data safe?',
    a: 'Yes. We use Supabase with row-level security, meaning your data is protected at the database level. We never share your personal information with third parties, and all AI interactions are private to your account.',
  },
  {
    q: 'Can I lose money investing?',
    a: 'Yes. All investments carry risk, and the value of investments can go down as well as up. This is why understanding risk, diversifying, and investing only what you can afford to keep invested long-term are essential. This app emphasizes education to help you make informed decisions.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="section-padding bg-slate-50">
      <div className="container-max">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Frequently asked questions</h2>
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
