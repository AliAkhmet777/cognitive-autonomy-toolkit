import { ASSESSMENT_ITEMS, DIMENSIONS } from '../data/content.js';

// Converts a 1–5 rating to 0–1, where 1 always means "more autonomy".
// Reverse-scored items (e.g. "I use AI because I fear falling behind") are flipped.
const normalize = (value, reverse) => (reverse ? (5 - value) / 4 : (value - 1) / 4);

const levelOf = (ratio) => (ratio < 0.5 ? 'low' : ratio < 0.75 ? 'medium' : 'high');

const BANDS = [
  {
    min: 75,
    title: 'Strong cognitive autonomy',
    text: 'Your answers suggest you use AI on your own terms: you can work independently, you understand and check what you submit, and pressure does not drive your choices much. Keep reflecting, because habits shift quietly over time.',
  },
  {
    min: 50,
    title: 'Developing autonomy',
    text: 'Your answers show a mix of independence and reliance. Some habits support your autonomy, while others may let AI or external pressure decide for you. The suggestions below focus on the areas that scored lower.',
  },
  {
    min: 0,
    title: 'Leaning on AI',
    text: 'Your answers suggest that AI, or the pressure to keep up, may currently shape much of how you work. This is common and can be changed. Small, regular steps of independent work can rebuild confidence.',
  },
];

/**
 * @param {Record<number, number>} answers map of item id -> rating (1–5)
 */
export function evaluateAssessment(answers) {
  const missing = ASSESSMENT_ITEMS.filter((item) => !answers[item.id]);
  if (missing.length) throw new Error('All statements must be rated.');

  const totals = {};
  for (const item of ASSESSMENT_ITEMS) {
    const t = (totals[item.dimension] ??= { sum: 0, count: 0 });
    t.sum += normalize(answers[item.id], item.reverse);
    t.count += 1;
  }

  const dimensions = Object.entries(totals).map(([key, { sum, count }]) => {
    const ratio = sum / count;
    const level = levelOf(ratio);
    return {
      key,
      name: DIMENSIONS[key].name,
      description: DIMENSIONS[key].description,
      percent: Math.round(ratio * 100),
      level,
      advice: DIMENSIONS[key].advice[level],
    };
  });

  const allNormalized = ASSESSMENT_ITEMS.map((item) => normalize(answers[item.id], item.reverse));
  const overall = Math.round((allNormalized.reduce((a, b) => a + b, 0) / allNormalized.length) * 100);
  const band = BANDS.find((b) => overall >= b.min);

  // Lowest-scoring areas first, so the most relevant advice is on top.
  const recommendations = [...dimensions].sort((a, b) => a.percent - b.percent);

  return { overall, band, dimensions, recommendations };
}
