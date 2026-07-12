const steps = [
  {
    number: '01',
    title: 'Create your account',
    desc: 'Sign up for free with your email. Your data is secure and private.',
  },
  {
    number: '02',
    title: 'Chat with the AI assistant',
    desc: 'Our AI guide asks about your goals, income, risk comfort, and experience to understand your profile.',
  },
  {
    number: '03',
    title: 'Get personalized guidance',
    desc: 'Receive educational recommendations based on your profile — not licensed financial advice, but a learning roadmap.',
  },
  {
    number: '04',
    title: 'Track your progress',
    desc: 'Set investment goals, build a watchlist, and track your learning progress as you grow.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding bg-white">
      <div className="container-max">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">How it works</h2>
          <p className="mt-4 text-lg text-slate-600">
            Four simple steps from curious beginner to confident investor.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <div className="text-5xl font-extrabold text-primary-100">{step.number}</div>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
