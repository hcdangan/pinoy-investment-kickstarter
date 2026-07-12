const steps = [
  {
    number: '01',
    title: 'Create a free account',
    desc: 'Sign up with your email — it takes less than a minute. We don\'t ask for payment, and we never sell your data.',
  },
  {
    number: '02',
    title: 'Talk to the AI guide',
    desc: 'Our AI assistant asks a few simple questions about your goals, income, and comfort with risk. No wrong answers — just honest conversation.',
  },
  {
    number: '03',
    title: 'Get a learning path',
    desc: 'Based on your answers, you\'ll get a suggested roadmap of lessons and topics — not financial advice, but a starting point for your own learning.',
  },
  {
    number: '04',
    title: 'Grow your knowledge',
    desc: 'Set goals, explore investment options, and build confidence at your own pace. We\'re here whenever you\'re ready to learn more.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding bg-slate-50">
      <div className="container-max">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-700">
            How It Works
          </span>
          <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Four simple steps, no pressure
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            From "I don't know anything about investing" to "I understand the basics" — at your own pace.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <div className="text-5xl font-extrabold text-secondary-100">{step.number}</div>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
