import { PageHeader, Button, Notice } from '../components/ui.jsx';
import { PHILOSOPHERS } from '../data/content.js';
import './Foundations.css';

export default function Foundations() {
  return (
    <>
      <PageHeader
        eyebrow="Philosophical Foundations"
        title="Why autonomy? Three perspectives"
        lead="The toolkit is grounded in three classical ideas about labour, freedom and the relationship between people and the things they create. We read them as lenses for understanding our relationship with AI today."
      />

      <section className="section section--tight">
        <div className="container container--narrow">
          <Notice>
            <strong>A note on interpretation.</strong> Hegel, Kant and Marx did not write about artificial intelligence.
            The connections below are contemporary interpretations of their ideas, offered as a framework for
            reflection rather than as claims about what these philosophers believed about modern technology.
          </Notice>

          <div className="thinker-list">
            {PHILOSOPHERS.map((p, i) => (
              <article key={p.id} className="thinker" style={{ animationDelay: `${i * 0.08}s` }}>
                <header className="thinker__head">
                  <span className="thinker__index">{['I', 'II', 'III'][i]}</span>
                  <div>
                    <h2>{p.name}</h2>
                    <p className="thinker__meta">
                      {p.years} · <em>{p.source}</em>
                    </p>
                  </div>
                </header>

                <h3 className="thinker__concept">{p.concept}</h3>

                <div className="thinker__grid">
                  <div>
                    <span className="thinker__label">The original idea</span>
                    <p>{p.idea}</p>
                  </div>
                  <div>
                    <span className="thinker__label">A contemporary reading</span>
                    <p>{p.interpretation}</p>
                  </div>
                </div>

                <p className="thinker__toolkit">
                  <span>In the toolkit</span>
                  {p.toolkit}
                </p>
              </article>
            ))}
          </div>

          <section className="synthesis">
            <span className="eyebrow">Synthesis</span>
            <h2>What connects them</h2>
            <p className="lead">
              Read together, the three perspectives point to a common risk: a tool built to serve people can come to
              shape how they work and think. Hegel suggests that dependence can quietly reverse a relationship. Kant
              shows the difference between deciding for ourselves and being driven by outside pressure. Marx
              describes what is lost when people become estranged from their own work.
            </p>
            <p className="lead">
              <strong>Cognitive autonomy</strong> is our name for the practical answer: using AI deliberately, keeping
              the skill-building parts of our work in our own hands, and remaining the responsible authors of what we
              produce.
            </p>
            <div className="synthesis__actions">
              <Button to="/classifier" arrow>
                Put it into practice
              </Button>
              <Button to="/guide" variant="secondary">
                Read the guide
              </Button>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
