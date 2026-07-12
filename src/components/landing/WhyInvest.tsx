const reasons = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
      </svg>
    ),
    title: 'Beat inflation',
    desc: 'Inflation in the Philippines averaged 3-5% yearly. Savings accounts earn less than 1%. Investing helps your money grow faster than prices rise.',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Build long-term wealth',
    desc: 'The Philippine Stock Exchange Index (PSEi) has historically delivered average annual returns of around 7-8% over the long run, outpacing inflation.',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: 'Start with small amounts',
    desc: 'You can start investing in Philippine mutual funds and UITFs for as low as ₱1,000. Some online brokers let you buy stocks with just ₱1,000.',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2zM3 9l9 6 9-6" />
      </svg>
    ),
    title: 'Accessible online',
    desc: 'Online brokers like COL Financial, First Metro Sec, and digital banks make investing accessible from your phone — no need to visit a bank branch.',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: 'Learn at your own pace',
    desc: 'Our guided modules break down investing concepts into bite-sized lessons. No finance degree needed — just curiosity and a willingness to learn.',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Safe and regulated',
    desc: 'Investments in the Philippines are regulated by the SEC and BSP. Licensed brokers and fund managers follow strict rules to protect investors.',
  },
]

export default function WhyInvest() {
  return (
    <section id="why-invest" className="section-padding bg-white">
      <div className="container-max">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Why should Filipinos invest?</h2>
          <p className="mt-4 text-lg text-slate-600">
            Investing is one of the most effective ways to grow your money over time. Here's why it
            matters for every Filipino.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, i) => (
            <div
              key={i}
              className="card p-6 transition-all hover:shadow-lg hover:-translate-y-1 duration-300"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                {reason.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{reason.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{reason.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-accent-200 bg-accent-50 p-6 text-center">
          <p className="text-sm font-medium text-accent-800">
            Note: All investments carry risk. Past performance does not guarantee future returns. This
            app provides educational content only, not licensed financial advice.
          </p>
        </div>
      </div>
    </section>
  )
}
