const modules = [
  {
    id: 'basics',
    title: 'Investing Basics',
    desc: 'What is investing? Stocks, bonds, mutual funds, UITFs — understand the building blocks.',
    level: 'Beginner',
    minutes: 10,
  },
  {
    id: 'risk',
    title: 'Understanding Risk',
    desc: 'Learn about risk vs. reward, diversification, and how to match investments to your comfort level.',
    level: 'Beginner',
    minutes: 8,
  },
  {
    id: 'local-market',
    title: 'The Philippine Market',
    desc: 'How the PSE works, local brokers, and Philippine-specific investment options like Pag-IBIG MP2 and SSS PESO Fund.',
    level: 'Intermediate',
    minutes: 15,
  },
  {
    id: 'portfolio',
    title: 'Building a Portfolio',
    desc: 'Asset allocation, peso-cost averaging, and how to build a simple starter portfolio.',
    level: 'Intermediate',
    minutes: 12,
  },
]

export default function Learn() {
  return (
    <section id="learn" className="section-padding bg-slate-50">
      <div className="container-max">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Learn the smart way</h2>
          <p className="mt-4 text-lg text-slate-600">
            Beginner-friendly modules designed for the Filipino investor. No jargon, no hype — just
            clear, practical knowledge.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {modules.map((mod) => (
            <div key={mod.id} className="card p-6 transition-all hover:shadow-lg duration-300">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center rounded-full bg-secondary-50 px-3 py-1 text-xs font-semibold text-secondary-700">
                  {mod.level}
                </span>
                <span className="text-xs text-slate-400">{mod.minutes} min read</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{mod.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{mod.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
