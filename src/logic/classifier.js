import { TASK_CONTENT, VERIFY_TIPS, ZONES, RESPONSIBILITY_REMINDER } from '../data/classifier.js';

/*
 * Rule-based task classifier (no AI involved).
 *
 * 1. Each answer adds weight toward the Human-First end of the spectrum.
 *    The total "human-first score" ranges from 0 to MAX_SCORE.
 * 2. The score is mapped to a zone with two thresholds.
 * 3. Explicit rules then adjust the zone for combinations that a plain sum
 *    would get wrong (e.g. you cannot verify what you do not understand).
 */

export const WEIGHTS = {
  task: { routine: 0, other: 1.5, programming: 2, research: 2, essay: 3, math: 3 },
  goal: { efficient: 0, both: 2, learn: 3 },
  understanding: { well: 0, basics: 1, barely: 2 },
  attempt: { yes: 0, partially: 0.5, no: 1 },
};

export const MAX_SCORE = 9;
export const GREEN_MAX = 3; // score <= 3   -> green
export const YELLOW_MAX = 5.5; // score <= 5.5 -> yellow, above -> red

const ZONE_ORDER = ['green', 'yellow', 'red'];
const atLeast = (zone, min) => (ZONE_ORDER.indexOf(zone) < ZONE_ORDER.indexOf(min) ? min : zone);

// Task types that should never be fully automated in an academic context.
const NEVER_FULLY_AUTOMATED = {
  essay: 'Academic writing is never fully delegated: the argument and authorship must remain yours.',
  research: 'Research is never fully delegated: analysis and interpretation must remain yours.',
  math: 'Problem solving is not fully delegated in a study context: you need to be able to reproduce the solution.',
};

const FACTOR_TEXT = {
  task: {
    routine: ['ai', 'Routine work like formatting, translation or summarizing builds few new skills, so delegating it frees time for real thinking.'],
    programming: ['neutral', 'Programming mixes routine boilerplate with problem solving that builds core skills. The two deserve different strategies.'],
    essay: ['human', 'Academic writing is where you form and defend your own arguments, so authorship matters.'],
    research: ['neutral', 'Research benefits from AI for searching and checking, but analysis and interpretation must be your own.'],
    math: ['human', 'Problem solving is learned by working through problems yourself. Reading solutions is not enough.'],
    other: ['neutral', 'For general tasks, the right balance depends mostly on your goal and understanding.'],
  },
  goal: {
    learn: ['human', 'Your goal is to learn. Understanding comes from your own effort, so outsourcing the thinking would defeat the purpose.'],
    efficient: ['ai', 'Your goal is efficiency, so automation is acceptable wherever you can still check the result.'],
    both: ['neutral', 'You want both learning and efficiency: keep the parts that teach you something and delegate the rest.'],
  },
  understanding: {
    well: ['ai', 'You understand the topic well, so you can critically evaluate what AI produces.'],
    basics: ['neutral', 'You know the basics. That is enough to evaluate some AI output, but gaps in understanding can hide errors.'],
    barely: ['human', 'You barely understand the topic yet. Without understanding, you cannot tell whether an AI answer is correct.'],
  },
  attempt: {
    yes: ['ai', 'You can attempt the task on your own, so AI can play a supporting role rather than a leading one.'],
    partially: ['neutral', 'You can make a partial attempt, which is a good starting point: your draft shows exactly where help is needed.'],
    no: ['human', "You can't attempt it independently yet. That suggests building foundations first instead of reaching for a finished solution."],
  },
};

function zoneFromScore(score) {
  if (score <= GREEN_MAX) return 'green';
  if (score <= YELLOW_MAX) return 'yellow';
  return 'red';
}

function headlineFor(zone, { task, goal, understanding, attempt }) {
  if (zone === 'green') return 'Delegate the routine, keep the judgement';
  if (zone === 'yellow') {
    if (goal === 'efficient' && understanding === 'barely') return 'Get help, but learn enough to check it';
    if (task === 'routine') return 'Practise first, then compare with AI';
    return "Work alongside AI, and stay in the driver's seat";
  }
  if (attempt === 'no') return 'Build the foundations, then try it yourself';
  return 'Think first, then use AI as a tutor';
}

function summaryFor(zone, answers) {
  const { goal, understanding } = answers;
  if (zone === 'green') {
    return 'This task is mostly routine for you, and you understand it well enough to check the result. Let AI handle the mechanical work while you define what is needed and review what comes back.';
  }
  if (zone === 'yellow') {
    if (goal === 'efficient' && understanding === 'barely') {
      return 'You want to finish efficiently, but you do not yet understand the topic well enough to verify AI output. AI can assist, but only if you learn enough along the way to judge its answers.';
    }
    return 'AI can genuinely help with this task, but the key decisions should stay with you. Start with your own attempt, use AI for targeted support, and verify everything before you accept it.';
  }
  if (understanding === 'barely') {
    return 'You are still building your understanding, and this task is part of how that happens. If AI does the thinking now, you lose the learning and also the ability to check its answers. Work on it yourself first, then use AI only as a tutor.';
  }
  return 'The value of this task lies in the thinking it requires. Give yourself protected time to work on it independently. Use AI afterwards for hints, explanations or feedback, never as a replacement for your own reasoning.';
}

function buildWorkflow(zone, { task, attempt }) {
  const verify = VERIFY_TIPS[task];

  if (zone === 'green') {
    return [
      { title: 'Define the task precisely', text: 'Write down what you need: format, style, constraints and audience. Clear instructions are your intellectual contribution.' },
      { title: 'Delegate the routine part', text: 'Let AI produce the mechanical output. Never share confidential or personal data.' },
      { title: 'Review critically', text: verify },
      { title: 'Own the result', text: 'Edit and integrate the output, and make sure you could defend every part of it.' },
    ];
  }

  if (zone === 'yellow') {
    return [
      attempt === 'no'
        ? { title: 'Build a starting point', text: 'Review lecture notes, the textbook or a tutorial until you can sketch a first approach, even a rough one.' }
        : { title: 'Make your own attempt', text: 'Spend 20–30 minutes on your own approach or draft before opening any AI tool.' },
      { title: 'Pinpoint what you need', text: 'Turn your difficulty into a specific question, such as an explanation, a review or a hint about a bug. Avoid "do it for me".' },
      { title: 'Use AI as an assistant', text: 'Ask your specific question. Treat the answer as a suggestion to evaluate, not as a fact.' },
      { title: 'Verify independently', text: verify },
      { title: 'Integrate in your own words', text: 'Keep only what you understand. Test yourself: can you explain the result without AI?' },
    ];
  }

  const steps = [];
  if (attempt === 'no') {
    steps.push({ title: 'Build the foundations first', text: 'Go back to lecture notes, textbook chapters or worked examples until you can make a first move on your own.' });
  }
  steps.push(
    { title: 'Protected thinking time', text: 'Work on the task for 30–60 minutes without any AI. Struggling with it is part of learning.' },
    { title: 'Write down where you are stuck', text: 'Name the exact step, concept or decision that blocks you. This alone often unblocks you.' },
    { title: 'Use human resources', text: 'Check your notes and textbook, ask classmates, or visit your instructor or TA during office hours.' },
    { title: 'Ask AI as a tutor, not an author', text: 'Ask for a hint, an explanation of the concept, or questions that guide you. Say explicitly that you do not want the full solution.' },
    { title: 'Finish it yourself', text: 'Complete the task with your own reasoning, then verify it. ' + verify },
    { title: 'Compare and reflect', text: 'Afterwards, you may compare with an AI solution to see alternative approaches, and note what you learned.' },
  );
  return steps;
}

/**
 * Classify a task from the four questionnaire answers.
 * @param {{task: string, goal: string, understanding: string, attempt: string}} answers
 */
export function classifyTask(answers) {
  const { task, goal, understanding, attempt } = answers;
  for (const key of Object.keys(WEIGHTS)) {
    if (!(answers[key] in WEIGHTS[key])) throw new Error(`Invalid answer for "${key}": ${answers[key]}`);
  }

  const score =
    WEIGHTS.task[task] + WEIGHTS.goal[goal] + WEIGHTS.understanding[understanding] + WEIGHTS.attempt[attempt];

  let zone = zoneFromScore(score);
  const adjustments = [];

  if (task === 'routine') {
    // Routine work is automatable, unless the routine skill itself is what you want to learn.
    const routineZone = goal === 'learn' ? 'yellow' : 'green';
    if (routineZone !== zone) {
      adjustments.push(
        goal === 'learn'
          ? 'Because you want to learn this routine skill, practising it yourself matters more than saving time.'
          : 'Routine tasks with an efficiency goal are a good fit for automation, as long as you review the result.',
      );
    }
    zone = routineZone;
  } else {
    if (NEVER_FULLY_AUTOMATED[task] && zone === 'green') {
      zone = 'yellow';
      adjustments.push(NEVER_FULLY_AUTOMATED[task]);
    }
    if (understanding === 'barely' && goal !== 'efficient' && zone !== 'red') {
      zone = 'red';
      adjustments.push('Learning is part of your goal and the topic is still new to you, so independent work comes first.');
    }
    if (understanding === 'barely' && goal === 'efficient' && zone === 'green') {
      zone = 'yellow';
      adjustments.push('Even when speed is the goal, you cannot verify output on a topic you barely understand. Full automation would be risky.');
    }
    if (goal === 'learn' && attempt === 'no') {
      zone = atLeast(zone, 'red');
    }
  }

  const factors = Object.keys(FACTOR_TEXT).map((key) => {
    const [direction, text] = FACTOR_TEXT[key][answers[key]];
    return { key, direction, text };
  });

  const content = TASK_CONTENT[task][zone];

  // Where to draw the marker on the spectrum. If a rule moved the task into a
  // different zone, keep the marker inside that zone's segment.
  const ranges = { green: [0, GREEN_MAX], yellow: [GREEN_MAX + 0.4, YELLOW_MAX], red: [YELLOW_MAX + 0.4, MAX_SCORE] };
  const [lo, hi] = ranges[zone];
  const displayScore = Math.min(hi, Math.max(lo, score));

  return {
    zone,
    zoneInfo: ZONES[zone],
    score,
    maxScore: MAX_SCORE,
    position: displayScore / MAX_SCORE, // 0 = full automation, 1 = fully human-first
    headline: headlineFor(zone, answers),
    summary: summaryFor(zone, answers),
    factors,
    adjustments,
    independent: content.independent,
    delegate: content.delegate,
    workflow: buildWorkflow(zone, answers),
    reminder: RESPONSIBILITY_REMINDER,
  };
}
