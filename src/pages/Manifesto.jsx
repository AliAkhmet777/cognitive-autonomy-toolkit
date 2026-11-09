import { PageHeader, ArrowIcon } from '../components/ui.jsx';
import { SUPPORT_FORM_URL, isSupportFormReady } from '../config.js';
import {
  MANIFESTO_TITLE,
  MANIFESTO_SUBTITLE,
  WHY_WE_WROTE,
  WHY_TOGETHER,
  MANIFESTO_PRINCIPLES,
  WHAT_IT_IS_NOT,
  MESSAGE_TO_INSTITUTIONS,
  JOIN_US,
} from '../data/manifesto.js';
// The principle cards reuse the numbered-rule styles of the Guide page.
import './Guide.css';
import './Manifesto.css';

function SupportButton() {
  if (!isSupportFormReady()) {
    return (
      <div className="support-pending">
        <button type="button" className="btn btn--primary btn--lg" disabled aria-describedby="support-pending-label">
          {JOIN_US.button}
        </button>
        <span id="support-pending-label" className="support-pending__badge">
          Link coming soon
        </span>
      </div>
    );
  }
  return (
    <a className="btn btn--primary btn--lg" href={SUPPORT_FORM_URL} target="_blank" rel="noopener noreferrer">
      {JOIN_US.button}
      <ArrowIcon />
      <span className="visually-hidden"> (opens in a new tab)</span>
    </a>
  );
}

export default function Manifesto() {
  return (
    <>
      <PageHeader eyebrow="Manifesto" title={MANIFESTO_TITLE} lead={MANIFESTO_SUBTITLE} />

      <section className="section section--tight">
        <div className="container container--narrow manifesto-prose">
          <div className="manifesto-block">
            <h2>Why we wrote this</h2>
            {WHY_WE_WROTE.map((p) => (
              <p key={p} className="lead">
                {p}
              </p>
            ))}
          </div>
          <div className="manifesto-block">
            <h2>Why together</h2>
            {WHY_TOGETHER.map((p) => (
              <p key={p} className="lead">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--sunken" aria-labelledby="principles-heading">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Six principles</span>
            <h2 id="principles-heading">Our principles</h2>
          </div>

          <ol className="rules manifesto-rules">
            {MANIFESTO_PRINCIPLES.map((p, i) => (
              <li key={p.numeral} className="card rule manifesto-rule" style={{ animationDelay: `${i * 0.06}s` }}>
                <div className="rule__aside">
                  <span className="rule__label">Principle</span>
                  <span className="rule__number" aria-hidden="true">
                    {p.numeral}
                  </span>
                </div>
                <div className="rule__main">
                  <h3>
                    <span className="visually-hidden">Principle {p.numeral}: </span>
                    {p.title}
                  </h3>
                  <p className="rule__explanation">{p.text}</p>
                  <div className="rule__example">
                    <span>Ask yourself</span>
                    <p>{p.question}</p>
                  </div>
                  <p className="manifesto-rule__source">
                    <strong>{p.philosopher}:</strong> {p.note}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="not-heading">
        <div className="container">
          <div className="section-head">
            <h2 id="not-heading">What this manifesto is not</h2>
          </div>
          <ul className="grid grid--3 manifesto-not">
            {WHAT_IT_IS_NOT.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="message-heading">
        <div className="container container--narrow">
          <div className="manifesto-message">
            <h2 id="message-heading">Our message to universities and employers</h2>
            <p className="manifesto-message__lead">{MESSAGE_TO_INSTITUTIONS[0]}</p>
            <p>{MESSAGE_TO_INSTITUTIONS[1]}</p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="join-heading">
        <div className="container container--narrow">
          <div className="manifesto-join">
            <h2 id="join-heading">Join us</h2>
            <p className="lead">{JOIN_US.text}</p>
            <SupportButton />
            <p className="manifesto-join__note">{JOIN_US.note}</p>
          </div>
        </div>
      </section>
    </>
  );
}
