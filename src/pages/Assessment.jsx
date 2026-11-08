import { useRef, useState } from 'react';
import { PageHeader, Button, Notice, ProgressRing } from '../components/ui.jsx';
import { ASSESSMENT_ITEMS, SCALE_LABELS } from '../data/content.js';
import { evaluateAssessment } from '../logic/assessment.js';
import './Assessment.css';

const LEVEL_LABEL = { low: 'Needs attention', medium: 'Developing', high: 'Strong' };
const LEVEL_COLOR = { low: 'var(--red)', medium: 'var(--amber-bright)', high: 'var(--green)' };

export default function Assessment() {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const topRef = useRef(null);

  const answered = Object.keys(answers).length;
  const complete = answered === ASSESSMENT_ITEMS.length;

  const rate = (id, value) => setAnswers((a) => ({ ...a, [id]: value }));

  const submit = (e) => {
    e.preventDefault();
    if (!complete) return;
    setResult(evaluateAssessment(answers));
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const reset = () => {
    setAnswers({});
    setResult(null);
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const overallColor = result
    ? result.overall >= 75
      ? 'var(--green)'
      : result.overall >= 50
        ? 'var(--amber-bright)'
        : 'var(--red)'
    : undefined;

  return (
    <>
      <PageHeader
        eyebrow="Self-Assessment"
        title="How autonomous is your thinking?"
        lead="Rate six statements about your current relationship with AI tools. You will get a short reflective summary with practical suggestions. Nothing is stored or sent anywhere."
      />

      <section className="section section--tight" ref={topRef}>
        <div className="container container--narrow">
          <Notice>
            <strong>This is a self-reflection tool, not a test.</strong> It is not scientifically validated and is not a
            psychological assessment or diagnosis. Its only purpose is to help you think about your own habits.
          </Notice>

          {result ? (
            <div className="assessment-result fade-up">
              <div className="card assessment-summary">
                <ProgressRing
                  value={result.overall}
                  max={100}
                  size={132}
                  color={overallColor}
                  label={
                    <>
                      <strong>{result.overall}</strong>
                      <span>of 100</span>
                    </>
                  }
                />
                <div>
                  <span className="eyebrow">Your reflection</span>
                  <h2>{result.band.title}</h2>
                  <p>{result.band.text}</p>
                </div>
              </div>

              <div className="card">
                <h3 className="assessment-h3">Three dimensions</h3>
                <div className="dimensions">
                  {result.dimensions.map((d) => (
                    <div key={d.key} className="dimension">
                      <div className="dimension__head">
                        <strong>{d.name}</strong>
                        <span style={{ color: LEVEL_COLOR[d.level] }}>{LEVEL_LABEL[d.level]}</span>
                      </div>
                      <div className="dimension__bar">
                        <span style={{ width: `${Math.max(d.percent, 3)}%`, background: LEVEL_COLOR[d.level] }} />
                      </div>
                      <p>{d.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <h3 className="assessment-h3">Practical recommendations</h3>
                <ol className="recommendations">
                  {result.recommendations.map((d) => (
                    <li key={d.key}>
                      <span className="recommendations__area">{d.name}</span>
                      <p>{d.advice}</p>
                    </li>
                  ))}
                  <li>
                    <span className="recommendations__area">For everyone</span>
                    <p>
                      Use the Task Classifier before your next AI-assisted assignment, and run through the
                      Verification Checklist before you submit it.
                    </p>
                  </li>
                </ol>
              </div>

              <div className="assessment-actions no-print">
                <Button onClick={reset} arrow>
                  Take it again
                </Button>
                <Button to="/classifier" variant="secondary">
                  Open Task Classifier
                </Button>
                <Button to="/checklist" variant="ghost">
                  Verification Checklist
                </Button>
              </div>
            </div>
          ) : (
            <form className="assessment-form" onSubmit={submit}>
              <div className="scale-legend" aria-hidden="true">
                <span>1 · {SCALE_LABELS[0]}</span>
                <span>5 · {SCALE_LABELS[4]}</span>
              </div>

              {ASSESSMENT_ITEMS.map((item, i) => (
                <fieldset key={item.id} className={`card statement ${answers[item.id] ? 'is-answered' : ''}`}>
                  <legend className="visually-hidden">Statement {i + 1}</legend>
                  <p className="statement__text">
                    <span>{i + 1}</span>
                    {item.text}
                  </p>
                  <div className="scale" role="radiogroup" aria-label={item.text}>
                    {SCALE_LABELS.map((label, idx) => {
                      const value = idx + 1;
                      const checked = answers[item.id] === value;
                      return (
                        <label key={value} className={`scale__opt ${checked ? 'is-selected' : ''}`} title={label}>
                          <input
                            type="radio"
                            name={`s-${item.id}`}
                            value={value}
                            checked={checked}
                            onChange={() => rate(item.id, value)}
                            className="visually-hidden"
                          />
                          <span className="scale__num">{value}</span>
                          <span className="scale__label">{label}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              ))}

              <div className="assessment-submit">
                <span className="muted">
                  {answered} of {ASSESSMENT_ITEMS.length} answered
                </span>
                <button type="submit" className="btn btn--primary btn--lg" disabled={!complete}>
                  Show my reflection
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
