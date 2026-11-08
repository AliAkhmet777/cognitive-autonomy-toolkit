import { PageHeader, Button } from '../components/ui.jsx';
import { PRINCIPLES } from '../data/content.js';
import './Guide.css';

const scrollToRule = (n) =>
  document.getElementById(`rule-${n}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

export default function Guide() {
  return (
    <>
      <PageHeader
        eyebrow="Cognitive Autonomy Guide"
        title="Five principles for thinking alongside AI"
        lead="Practical rules for using AI without giving up the thinking that makes your work, and your learning, your own. Each comes with an example from everyday student life."
      />

      <section className="section section--tight">
        <div className="container">
          <nav className="guide-index" aria-label="Principles">
            {PRINCIPLES.map((p) => (
              <button key={p.number} type="button" onClick={() => scrollToRule(p.number)}>
                <span>{String(p.number).padStart(2, '0')}</span>
                {p.title}
              </button>
            ))}
          </nav>

          <div className="rules">
            {PRINCIPLES.map((p, i) => (
              <article key={p.number} id={`rule-${p.number}`} className="card rule" style={{ animationDelay: `${i * 0.06}s` }}>
                <div className="rule__aside">
                  <span className="rule__label">Rule</span>
                  <span className="rule__number">{p.number}</span>
                </div>
                <div className="rule__main">
                  <h2>{p.title}</h2>
                  <p className="rule__summary">{p.summary}</p>
                  <p className="rule__explanation">{p.explanation}</p>
                  <div className="rule__example">
                    <span>In practice</span>
                    <p>{p.example}</p>
                  </div>
                  <p className="rule__practice">
                    <strong>Try this:</strong> {p.practice}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="guide-next">
            <p>Ready to apply the principles to a real task?</p>
            <div>
              <Button to="/classifier" arrow>
                Classify a task
              </Button>
              <Button to="/assessment" variant="secondary">
                Reflect on your habits
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
