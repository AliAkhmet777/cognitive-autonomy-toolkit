import { useRef, useState } from 'react';
import { PageHeader, ZoneTag, Button } from '../components/ui.jsx';
import QuestionStep from '../components/classifier/QuestionStep.jsx';
import ResultCard from '../components/classifier/ResultCard.jsx';
import { QUESTIONS, ZONES } from '../data/classifier.js';
import { classifyTask } from '../logic/classifier.js';
import './Classifier.css';

export default function Classifier() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const topRef = useRef(null);

  const question = QUESTIONS[step];
  const isLast = step === QUESTIONS.length - 1;

  const scrollToTool = () => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const select = (value) => setAnswers((a) => ({ ...a, [question.id]: value }));

  const next = () => {
    if (!answers[question.id]) return;
    if (isLast) {
      setResult(classifyTask(answers));
      scrollToTool();
    } else {
      setStep((s) => s + 1);
    }
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

  const restart = () => {
    setAnswers({});
    setResult(null);
    setStep(0);
    scrollToTool();
  };

  const editAnswers = () => {
    setResult(null);
    setStep(0);
    scrollToTool();
  };

  return (
    <>
      <PageHeader
        eyebrow="Interactive Task Classifier"
        title="How should you approach this task?"
        lead="Answer four short questions about the task in front of you. The toolkit applies transparent, predefined rules to recommend what to do yourself, what to delegate, and in which order. No AI is involved."
      >
        <div className="zone-legend">
          {Object.values(ZONES).map((z) => (
            <span key={z.key} className="zone-legend__item">
              <ZoneTag zone={z.key}>{z.code}</ZoneTag>
              <span>{z.name}</span>
            </span>
          ))}
        </div>
      </PageHeader>

      <section className="section section--tight classifier" ref={topRef}>
        <div className="container container--narrow">
          {result ? (
            <div className="fade-up" key="result">
              <ResultCard result={result} answers={answers} />
              <div className="classifier__after no-print">
                <Button onClick={restart} arrow>
                  Restart questionnaire
                </Button>
                <Button onClick={editAnswers} variant="secondary">
                  Change my answers
                </Button>
                <Button to="/checklist" variant="ghost">
                  Go to verification checklist
                </Button>
              </div>
            </div>
          ) : (
            <div className="card classifier__panel">
              <div className="classifier__progress" aria-hidden="true">
                {QUESTIONS.map((q, i) => (
                  <span key={q.id} className={i < step ? 'is-done' : i === step ? 'is-current' : ''} />
                ))}
              </div>

              <QuestionStep
                key={question.id}
                index={step}
                total={QUESTIONS.length}
                question={question}
                value={answers[question.id]}
                onSelect={select}
              />

              <div className="classifier__nav">
                <Button variant="ghost" onClick={back} disabled={step === 0}>
                  ← Back
                </Button>
                <Button onClick={next} disabled={!answers[question.id]} arrow>
                  {isLast ? 'See recommendation' : 'Next question'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
