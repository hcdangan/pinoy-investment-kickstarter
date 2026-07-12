const modules = [
  {
    id: 'basics',
    title: 'Investing Basics',
    desc: 'What is investing? Stocks, bonds, mutual funds, UITFs — understand the building blocks in simple terms.',
    level: 'Start Here',
    minutes: 10,
  },
  {
    id: 'risk',
    title: 'Understanding Risk',
    desc: 'What does "risk" really mean? Learn about risk vs. reward, diversification, and finding your comfort zone.',
    level: 'Start Here',
    minutes: 8,
  },
  {
    id: 'local-market',
    title: 'The Philippine Market',
    desc: 'How the PSE works, local brokers, and Philippine-specific options like Pag-IBIG MP2 and SSS PESO Fund.',
    level: 'Next Steps',
    minutes: 15,
  },
  {
    id: 'portfolio',
    title: 'Building a Portfolio',
    desc: 'Asset allocation, peso-cost averaging, and how to put together a simple starter portfolio.',
    level: 'Next Steps',
    minutes: 12,
  },
]

export default function Learn() {
  return (
    <section id="learn" className="section-padding bg-white">
      <div className="container-max">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full bg-secondary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary-700">
            Free Lessons
          </span>
          <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">Learn at your own pace</h2>
          <p className="mt-4 text-lg text-slate-600">
            Short, simple lessons written for beginners. No jargon, no hype — just clear, practical
            knowledge you can actually use.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {modules.map((mod) => (
            <div key={mod.id} className="card p-6">
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

        <p className="mt-8 text-center text-sm text-slate-400">
          All lessons are free. No sign-up required to read — just create a free account if you want to
          track your progress.
        </p>
      </div>
    </section>
  )
}
