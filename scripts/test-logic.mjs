// Sanity tests for the rule-based logic. Run with: npm test
import assert from 'node:assert/strict';
import { classifyTask, WEIGHTS } from '../src/logic/classifier.js';
import { evaluateAssessment } from '../src/logic/assessment.js';
import { ASSESSMENT_ITEMS } from '../src/data/content.js';

let passed = 0;
const test = (name, fn) => {
  try {
    fn();
    passed++;
  } catch (err) {
    console.error(`✗ ${name}\n  ${err.message}`);
    process.exitCode = 1;
  }
};

// --- Classifier: every combination produces a complete result -------------
const combos = [];
for (const task of Object.keys(WEIGHTS.task))
  for (const goal of Object.keys(WEIGHTS.goal))
    for (const understanding of Object.keys(WEIGHTS.understanding))
      for (const attempt of Object.keys(WEIGHTS.attempt)) combos.push({ task, goal, understanding, attempt });

const counts = { green: 0, yellow: 0, red: 0 };
test(`all ${combos.length} answer combinations produce a valid result`, () => {
  for (const a of combos) {
    const r = classifyTask(a);
    const label = JSON.stringify(a);
    assert.ok(['green', 'yellow', 'red'].includes(r.zone), label);
    assert.ok(r.headline && r.summary && r.reminder, `text missing ${label}`);
    assert.equal(r.factors.length, 4, label);
    assert.ok(r.independent.length > 0 && r.delegate.length > 0, `lists missing ${label}`);
    assert.ok(r.workflow.length >= 4, `workflow too short ${label}`);
    assert.ok(r.position >= 0 && r.position <= 1, `position out of range ${label}`);
    counts[r.zone]++;
  }
});

test('every zone is reachable', () => {
  assert.ok(counts.green > 0 && counts.yellow > 0 && counts.red > 0, JSON.stringify(counts));
});

test('task type alone does not fix the category', () => {
  for (const task of Object.keys(WEIGHTS.task)) {
    const zones = new Set(combos.filter((c) => c.task === task).map((c) => classifyTask(c).zone));
    assert.ok(zones.size >= 2, `${task} always gives ${[...zones]}`);
  }
});

// --- Scenarios from the project brief ------------------------------------
const zoneOf = (a) => classifyTask(a).zone;

test('learning programming without understanding → RED (attempt first, AI as tutor)', () => {
  const r = classifyTask({ task: 'programming', goal: 'learn', understanding: 'barely', attempt: 'no' });
  assert.equal(r.zone, 'red');
  assert.ok(r.workflow.some((s) => /tutor/i.test(s.title)));
});

test('formatting a document efficiently → GREEN', () => {
  assert.equal(zoneOf({ task: 'routine', goal: 'efficient', understanding: 'well', attempt: 'yes' }), 'green');
});

test('research assignment → independent analysis + AI-assisted verification (YELLOW)', () => {
  assert.equal(zoneOf({ task: 'research', goal: 'both', understanding: 'basics', attempt: 'partially' }), 'yellow');
});

test('essays are never fully automated', () => {
  for (const c of combos.filter((c) => c.task === 'essay')) assert.notEqual(zoneOf(c), 'green', JSON.stringify(c));
});

test('barely understanding + learning goal is always RED (non-routine)', () => {
  for (const c of combos.filter((c) => c.task !== 'routine' && c.understanding === 'barely' && c.goal !== 'efficient'))
    assert.equal(zoneOf(c), 'red', JSON.stringify(c));
});

test('experienced programmer wanting efficiency → GREEN (boilerplate)', () => {
  assert.equal(zoneOf({ task: 'programming', goal: 'efficient', understanding: 'well', attempt: 'yes' }), 'green');
});

test('invalid answers are rejected', () => {
  assert.throws(() => classifyTask({ task: 'x', goal: 'learn', understanding: 'well', attempt: 'yes' }));
});

// --- Self-assessment -----------------------------------------------------
const all = (v) => Object.fromEntries(ASSESSMENT_ITEMS.map((i) => [i.id, v]));

test('maximum autonomy scores 100 (item 5 is reverse-scored)', () => {
  const answers = all(5);
  answers[5] = 1;
  const r = evaluateAssessment(answers);
  assert.equal(r.overall, 100);
  assert.equal(r.band.title, 'Strong cognitive autonomy');
  assert.ok(r.dimensions.every((d) => d.level === 'high'));
});

test('minimum autonomy scores 0', () => {
  const answers = all(1);
  answers[5] = 5;
  const r = evaluateAssessment(answers);
  assert.equal(r.overall, 0);
  assert.equal(r.band.title, 'Leaning on AI');
});

test('neutral answers give a middle band and recommendations for every dimension', () => {
  const r = evaluateAssessment(all(3));
  assert.equal(r.overall, 50);
  assert.equal(r.recommendations.length, 3);
  assert.ok(r.recommendations.every((d) => d.advice));
});

test('incomplete assessment is rejected', () => {
  assert.throws(() => evaluateAssessment({ 1: 3 }));
});

console.log(`\n${passed} tests passed · zone distribution over all combinations: ${JSON.stringify(counts)}`);
