import { useState } from 'react';
import { PageHeader, Button, CheckIcon, ProgressRing } from '../components/ui.jsx';
import { CHECKLIST_ITEMS } from '../data/content.js';
import './Checklist.css';

export default function Checklist() {
  const [checked, setChecked] = useState(() => new Set());

  const toggle = (id) =>
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const total = CHECKLIST_ITEMS.length;
  const done = checked.size;
  const percent = Math.round((done / total) * 100);
  const allDone = done === total;

  const status = allDone
    ? 'Ready to submit'
    : done === 0
      ? 'Not started'
      : done >= total - 2
        ? 'Almost there'
        : 'In progress';

  return (
    <>
      <PageHeader
        eyebrow="Verification Checklist"
        title="Before you submit AI-assisted work"
        lead="Go through each question honestly. Tick an item only when you can truly answer yes. If you can't, that item is your next task."
      />

      <section className="section section--tight">
        <div className="container checklist-layout">
          <div className="checklist">
            {CHECKLIST_ITEMS.map((item, i) => {
              const isChecked = checked.has(item.id);
              return (
                <label key={item.id} className={`check-item ${isChecked ? 'is-checked' : ''}`}>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggle(item.id)}
                    className="visually-hidden"
                  />
                  <span className="check-item__box" aria-hidden="true">
                    <CheckIcon size={15} />
                  </span>
                  <span className="check-item__text">
                    <strong>{item.text}</strong>
                    <span>{item.hint}</span>
                  </span>
                  <span className="check-item__n" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </label>
              );
            })}
          </div>

          <aside className="checklist-status">
            <div className="card checklist-status__card">
              <ProgressRing
                value={done}
                max={total}
                size={140}
                stroke={10}
                color={allDone ? 'var(--green)' : 'var(--purple)'}
                label={
                  <>
                    <strong>
                      {done}/{total}
                    </strong>
                    <span>completed</span>
                  </>
                }
              />
              <div className="checklist-status__text">
                <span className={`checklist-status__badge ${allDone ? 'is-done' : ''}`}>{status}</span>
                <div className="checklist-status__bar" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} aria-label="Checklist progress">
                  <span style={{ width: `${percent}%` }} />
                </div>
                <p>
                  {allDone
                    ? 'You understand, have verified, and stand behind your work. That is what responsible AI use looks like.'
                    : `${total - done} item${total - done === 1 ? '' : 's'} left. An unchecked item is not a failure; it shows you what to do next.`}
                </p>
              </div>
              <div className="checklist-status__actions no-print">
                <Button variant="secondary" onClick={() => setChecked(new Set())} disabled={done === 0}>
                  Reset checklist
                </Button>
                <Button variant="ghost" onClick={() => window.print()}>
                  Print
                </Button>
              </div>
            </div>
            <p className="checklist-note">
              Tip: if you can't tick “Can I explain the result without AI?”, go back to the{' '}
              <a href="#/guide">Guide</a> and re-read Rule 5.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
