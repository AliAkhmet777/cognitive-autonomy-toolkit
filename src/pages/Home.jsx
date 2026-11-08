import { Button, ZoneTag } from '../components/ui.jsx';
import { Link } from '../router.jsx';
import { ZONES } from '../data/classifier.js';
import { PHILOSOPHERS } from '../data/content.js';
import './Home.css';

const PROBLEMS = [
  'Becoming overly dependent on AI-generated solutions',
  'Losing confidence in their ability to solve problems alone',
  'Submitting code or assignments they do not fully understand',
  'Spending less time developing fundamental skills',
  'Feeling pressure to use AI simply because everyone else does',
  'Reviewing and correcting AI output instead of thinking independently',
];

const PRINCIPLES = [
  {
    n: 'I',
    title: 'Think independently',
    text: 'Your own reasoning comes first. Engage with a problem before asking a machine about it, because that effort is how understanding is built.',
  },
  {
    n: 'II',
    title: 'Use AI consciously',
    text: 'Decide deliberately when AI helps and when it harms, based on the goal of the task rather than habit or pressure.',
  },
  {
    n: 'III',
    title: 'Stay responsible for your work',
    text: 'Whatever AI contributed, you are the author. Understand, verify and stand behind everything you submit.',
  },
];

const TOOLS = [
  { to: '/classifier', n: '01', title: 'Task Classifier', text: 'Answer four questions and get a recommendation on how to approach your task: automate, collaborate, or think first.' },
  { to: '/guide', n: '02', title: 'Autonomy Guide', text: 'Five practical principles for working with AI without giving up your own thinking.' },
  { to: '/assessment', n: '03', title: 'Self-Assessment', text: 'A short reflection on your current relationship with AI tools, with personal recommendations.' },
  { to: '/checklist', n: '04', title: 'Verification Checklist', text: 'Seven questions to ask yourself before submitting any AI-assisted work.' },
];

export default function Home() {
  return (
    <div className="home">
      {/* Hero ------------------------------------------------------------ */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__copy">
            <span className="eyebrow">A Social IT Project in Philosophy</span>
            <h1>
              Cognitive Autonomy <br />
              <em>Toolkit</em>
            </h1>
            <p className="hero__tagline">Make AI work for you, not the other way around.</p>
            <p className="lead">
              An interactive toolkit that helps students decide consciously when to use AI and when to rely on their
              own thinking. It deliberately uses no AI itself.
            </p>
            <div className="hero__actions">
              <Button to="/classifier" size="lg" arrow>
                Start Toolkit
              </Button>
              <Button to="/foundations" variant="secondary" size="lg">
                Philosophical foundations
              </Button>
            </div>
          </div>

          <figure className="hero__figure" aria-hidden="true">
            <div className="spectrum-card">
              <div className="spectrum-card__head">
                <span>Who does the thinking?</span>
              </div>
              {['green', 'yellow', 'red'].map((z, i) => (
                <div key={z} className={`spectrum-row spectrum-row--${z}`} style={{ animationDelay: `${0.15 + i * 0.12}s` }}>
                  <span className="spectrum-row__dot" />
                  <div>
                    <strong>{ZONES[z].name}</strong>
                    <span>{ZONES[z].short}</span>
                  </div>
                  <span className="spectrum-row__bar">
                    <span style={{ width: `${[28, 58, 92][i]}%` }} />
                  </span>
                </div>
              ))}
              <div className="spectrum-card__foot">
                <span>AI</span>
                <span className="spectrum-card__line" />
                <span>Human</span>
              </div>
            </div>
          </figure>
        </div>
      </section>

      {/* Quote ----------------------------------------------------------- */}
      <section className="motto">
        <div className="container">
          <blockquote>
            “AI should <span>assist</span> human intelligence, not <span>replace</span> it.”
          </blockquote>
        </div>
      </section>

      {/* Problem --------------------------------------------------------- */}
      <section className="section">
        <div className="container problem">
          <div className="problem__text">
            <span className="eyebrow">The social problem</span>
            <h2>AI promised to save time. It may have started a new productivity race.</h2>
            <p className="lead">
              Tools like ChatGPT, Claude and GitHub Copilot were introduced to reduce workload. In practice, many
              students and junior professionals now feel expected to do more, faster, with fewer resources. Thinking
              risks becoming reviewing.
            </p>
          </div>
          <div className="problem__list card">
            <p className="problem__list-title">Some students are</p>
            <ul>
              {PROBLEMS.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Why it matters ------------------------------------------------- */}
      <section className="section section--sunken">
        <div className="container why">
          <div className="section-head">
            <span className="eyebrow">Why cognitive autonomy matters</span>
            <h2>The ability to think for yourself is a skill, and skills fade without practice.</h2>
          </div>
          <div className="grid grid--3">
            <article className="why__item">
              <h3>Learning needs effort</h3>
              <p>
                Understanding grows from working through difficulty. A finished answer delivered instantly skips the
                part where learning actually happens.
              </p>
            </article>
            <article className="why__item">
              <h3>You can't verify what you don't understand</h3>
              <p>
                AI makes confident mistakes. Only someone with real knowledge of the subject can recognise them, so
                dependence and blind trust tend to grow together.
              </p>
            </article>
            <article className="why__item">
              <h3>Autonomy means having a choice</h3>
              <p>
                The goal is not to avoid AI. It is to stay capable enough that using AI remains your decision, not
                a necessity or a reaction to pressure.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Principles ------------------------------------------------------ */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Three principles</span>
            <h2>The core of the toolkit</h2>
          </div>
          <div className="grid grid--3">
            {PRINCIPLES.map((p) => (
              <article key={p.n} className="card principle">
                <span className="principle__n">{p.n}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Zones ----------------------------------------------------------- */}
      <section className="section section--sunken">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Three zones</span>
            <h2>Not every task deserves the same approach</h2>
            <p>
              The Task Classifier places your task in one of three zones. It looks at more than the type of task:
              your goal, your understanding and your ability to start on your own all matter.
            </p>
          </div>
          <div className="grid grid--3">
            {Object.values(ZONES).map((z) => (
              <article key={z.key} className={`card zone-card zone-card--${z.key}`}>
                <ZoneTag zone={z.key}>{z.code}</ZoneTag>
                <h3>{z.name}</h3>
                <p>{z.description}</p>
                <ul>
                  {z.examples.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Tools ----------------------------------------------------------- */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">The toolkit</span>
            <h2>Four tools for working with AI consciously</h2>
          </div>
          <div className="grid grid--2 tools">
            {TOOLS.map((t) => (
              <Link key={t.to} to={t.to} className="card card--hover tool">
                <span className="tool__n">{t.n}</span>
                <div>
                  <h3>{t.title}</h3>
                  <p>{t.text}</p>
                </div>
                <span className="tool__go" aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy teaser ---------------------------------------------- */}
      <section className="section section--sunken">
        <div className="container philosophy-teaser">
          <div>
            <span className="eyebrow">Philosophical foundations</span>
            <h2>Old questions, new tools</h2>
            <p className="lead">
              The project draws on three classical thinkers. None of them wrote about AI, but their ideas offer a
              useful way to interpret our relationship with it today.
            </p>
            <Button to="/foundations" variant="secondary" arrow>
              Read the foundations
            </Button>
          </div>
          <ul className="thinkers">
            {PHILOSOPHERS.map((p) => (
              <li key={p.id}>
                <strong>{p.name}</strong>
                <span>{p.concept}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA ------------------------------------------------------------- */}
      <section className="section">
        <div className="container">
          <div className="cta">
            <div>
              <h2>Have a task in front of you right now?</h2>
              <p>Four questions, one minute, and a clear plan for what to do yourself and what to delegate.</p>
            </div>
            <Button to="/classifier" size="lg" arrow className="cta__btn">
              Start Toolkit
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
