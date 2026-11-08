import { ZoneTag, CheckIcon } from '../ui.jsx';
import { QUESTIONS } from '../../data/classifier.js';
import { GREEN_MAX, YELLOW_MAX, MAX_SCORE } from '../../logic/classifier.js';

const DIRECTION_LABEL = {
  ai: 'Toward AI',
  neutral: 'Balanced',
  human: 'Toward human-first',
};

function labelFor(questionId, value) {
  const q = QUESTIONS.find((x) => x.id === questionId);
  return q.options.find((o) => o.value === value)?.label ?? value;
}

function Spectrum({ position, zone }) {
  const g = (GREEN_MAX / MAX_SCORE) * 100;
  const y = (YELLOW_MAX / MAX_SCORE) * 100;
  // Keep the marker inside the bar visually.
  const left = Math.min(97, Math.max(3, position * 100));
  return (
    <div className="spectrum" aria-label="Position on the AI-to-human spectrum">
      <div className="spectrum__bar">
        <span className="spectrum__seg spectrum__seg--green" style={{ width: `${g}%` }} />
        <span className="spectrum__seg spectrum__seg--yellow" style={{ width: `${y - g}%` }} />
        <span className="spectrum__seg spectrum__seg--red" style={{ width: `${100 - y}%` }} />
        <span className={`spectrum__marker spectrum__marker--${zone}`} style={{ left: `${left}%` }} />
      </div>
      <div className="spectrum__labels">
        <span>AI Automation</span>
        <span>AI Assistance</span>
        <span>Human-First</span>
      </div>
    </div>
  );
}

export default function ResultCard({ result, answers }) {
  const { zone, zoneInfo } = result;

  return (
    <article className={`result result--${zone}`} aria-live="polite">
      {/* 1. Category -------------------------------------------------- */}
      <header className="result__head">
        <span className="result__kicker">Your recommendation</span>
        <ZoneTag zone={zone}>
          {zoneInfo.code} · {zoneInfo.name}
        </ZoneTag>
        <h2>{result.headline}</h2>
        <p className="result__summary">{result.summary}</p>
        <Spectrum position={result.position} zone={zone} />
      </header>

      <div className="result__body">
        {/* 2. Why ---------------------------------------------------- */}
        <section className="result__section">
          <h3>Why this category?</h3>
          <ul className="factors">
            {result.factors.map((f) => (
              <li key={f.key} className={`factor factor--${f.direction}`}>
                <div className="factor__meta">
                  <span className="factor__answer">{labelFor(f.key, answers[f.key])}</span>
                  <span className="factor__dir">{DIRECTION_LABEL[f.direction]}</span>
                </div>
                <p>{f.text}</p>
              </li>
            ))}
          </ul>
          {result.adjustments.length > 0 && (
            <div className="adjustments">
              <strong>Rules applied</strong>
              <ul>
                {result.adjustments.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* 3 & 4. Independent vs delegate ------------------------------ */}
        <section className="result__section split">
          <div className="split__col split__col--human">
            <h3>Do this yourself</h3>
            <ul>
              {result.independent.map((item) => (
                <li key={item}>
                  <span className="split__icon">
                    <CheckIcon size={12} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="split__col split__col--ai">
            <h3>{zone === 'red' ? 'AI may support you with' : 'You can delegate to AI'}</h3>
            <ul>
              {result.delegate.map((item) => (
                <li key={item}>
                  <span className="split__icon">
                    <CheckIcon size={12} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5. Workflow ------------------------------------------------ */}
        <section className="result__section">
          <h3>Your step-by-step workflow</h3>
          <ol className="workflow">
            {result.workflow.map((s, i) => (
              <li key={s.title}>
                <span className="workflow__n">{i + 1}</span>
                <div>
                  <strong>{s.title}</strong>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* 6. Responsibility --------------------------------------- */}
        <aside className="responsibility">
          <span className="responsibility__label">Final responsibility</span>
          <p>{result.reminder}</p>
        </aside>
      </div>
    </article>
  );
}
