import { CheckIcon } from '../ui.jsx';

export default function QuestionStep({ index, total, question, value, onSelect }) {
  const name = `q-${question.id}`;
  return (
    <fieldset className="question fade-up">
      <legend className="question__legend">
        <span className="question__count">
          Question {index + 1} of {total}
        </span>
        <span className="question__title">{question.title}</span>
      </legend>
      <p className="question__hint">{question.hint}</p>

      <div className={`question__options ${question.options.length > 3 ? 'question__options--grid' : ''}`}>
        {question.options.map((opt, i) => {
          const checked = value === opt.value;
          return (
            <label key={opt.value} className={`option ${checked ? 'is-selected' : ''}`}>
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={checked}
                onChange={() => onSelect(opt.value)}
                className="visually-hidden"
              />
              <span className="option__key">{String.fromCharCode(65 + i)}</span>
              <span className="option__text">
                <strong>{opt.label}</strong>
                <span>{opt.detail}</span>
              </span>
              <span className="option__check" aria-hidden="true">
                <CheckIcon />
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
