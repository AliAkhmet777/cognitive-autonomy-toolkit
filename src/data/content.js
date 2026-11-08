// Static educational content: guide principles, self-assessment items,
// verification checklist and philosophical foundations.

export const PRINCIPLES = [
  {
    number: 1,
    title: 'Think First',
    summary:
      'Before asking AI for a solution, take time to understand the problem and develop your own approach.',
    explanation:
      'The first minutes with a problem are when your mind does its most important work: noticing what is known, what is missing, and which strategy might work. If AI answers immediately, that work never happens and you see a solution without understanding it.',
    example:
      'You get a sorting-algorithm assignment. Before opening any AI tool, you spend 25 minutes sketching the steps on paper and tracing them on a small example. Only then do you decide whether you need help, and with what.',
    practice: 'Set a timer for 20 minutes of independent work before your first prompt.',
  },
  {
    number: 2,
    title: 'AI as Assistant, Not Author',
    summary: 'Use AI to improve your work, not to replace the entire thinking process.',
    explanation:
      'There is a big difference between "check my argument for weaknesses" and "write my essay." In the first case you remain the author and AI sharpens your work. In the second you become an editor of someone else’s thinking.',
    example:
      'You write the essay draft yourself, then ask AI: "Which of my three arguments is weakest, and why?" You decide what to change, and you write the changes yourself.',
    practice: 'Ask questions about your work rather than asking for the work.',
  },
  {
    number: 3,
    title: 'Verification Before Acceptance',
    summary: 'Never trust AI-generated answers blindly. Check facts, logic, calculations and code.',
    explanation:
      'AI tools produce fluent, confident text, and fluency is not the same as truth. They can invent sources, make calculation errors, and write code that looks right but fails on edge cases. Verifying is part of the work, not an optional extra.',
    example:
      'AI suggests three journal articles for your literature review. You search for each one in your library database. One of them does not exist, so you remove it.',
    practice: 'Treat every AI answer as a hypothesis until you have checked it.',
  },
  {
    number: 4,
    title: 'Protected Learning Time',
    summary: 'Regularly set aside time to study and solve problems without AI assistance.',
    explanation:
      'Skills you never practise unaided slowly fade, much like muscles you never use. Protected learning time helps you keep, and keep building, your ability to think independently, so that you still have a choice about whether to use AI.',
    example:
      'Every Tuesday and Thursday you spend one hour on exercises with only your notes and textbook. You keep track of which problems you solved without help.',
    practice: 'Schedule AI-free study blocks into your week, just like lectures.',
  },
  {
    number: 5,
    title: 'Human Responsibility',
    summary: 'You are responsible for the final result, even when AI helped produce it.',
    explanation:
      '"The AI wrote it" is not an excuse your professor, employer or users will accept. When you submit work, you are claiming you stand behind it. That claim is only honest if you understand and have verified what you submit.',
    example:
      'Your code passes the tests, but one function was generated and you do not understand it. Before submitting, you study it until you can explain it line by line, or you rewrite it yourself.',
    practice: 'Only submit what you could explain and defend in person.',
  },
];

export const ASSESSMENT_ITEMS = [
  { id: 1, text: 'I can start difficult tasks without AI assistance.', dimension: 'independence', reverse: false },
  { id: 2, text: 'I understand the AI-generated results that I submit.', dimension: 'understanding', reverse: false },
  { id: 3, text: 'I verify AI-generated information before using it.', dimension: 'understanding', reverse: false },
  { id: 4, text: 'I can solve academic problems independently.', dimension: 'independence', reverse: false },
  { id: 5, text: 'I sometimes use AI because I am afraid of falling behind others.', dimension: 'pressure', reverse: true },
  { id: 6, text: 'I feel confident working without AI tools.', dimension: 'independence', reverse: false },
];

export const SCALE_LABELS = ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'];

export const DIMENSIONS = {
  independence: {
    name: 'Independent thinking',
    description: 'Starting and solving tasks on your own, and feeling confident without AI.',
    advice: {
      low: 'Rebuild confidence gradually: pick one small task per day and complete it entirely without AI. Start easy, so that success is likely and confidence can grow.',
      medium: 'Add regular protected learning time, such as two AI-free study sessions a week, and notice how your independence develops.',
      high: 'You are comfortable working independently. Keep it that way by continuing to solve problems from scratch now and then.',
    },
  },
  understanding: {
    name: 'Understanding & verification',
    description: 'Knowing what you submit and checking AI output before using it.',
    advice: {
      low: 'Before submitting anything AI-assisted, use the Verification Checklist. A good rule: if you cannot explain it, do not submit it.',
      medium: 'Make verification a habit. Check one fact, one source or one test case for every AI answer you use.',
      high: 'You take ownership of your work. Consider sharing your verification habits with classmates.',
    },
  },
  pressure: {
    name: 'Freedom from external pressure',
    description: 'Using AI because you choose to, rather than out of fear of falling behind.',
    advice: {
      low: 'Fear of falling behind is a common reaction to a productivity race, not a personal failure. Ask yourself whether a task needs speed or understanding, and talk with peers: many feel the same.',
      medium: 'Pressure influences you sometimes. Before using AI, ask: "Am I choosing this, or am I reacting to what others do?"',
      high: 'Your AI use seems to be your own choice rather than a reaction to pressure, which is what autonomy means in practice.',
    },
  },
};

export const CHECKLIST_ITEMS = [
  { id: 'understand', text: 'Do I understand the solution?', hint: 'Could you walk someone through it step by step?' },
  { id: 'explain', text: 'Can I explain the result without AI?', hint: 'Close all tools and explain it aloud or on paper.' },
  { id: 'sources', text: 'Have I checked the facts and sources?', hint: 'Every citation should exist and say what you claim it says.' },
  { id: 'tested', text: 'Have I tested the generated code?', hint: 'Run it, including edge cases. Tick this if your work contains no code.' },
  { id: 'logic', text: 'Did I verify calculations and logic?', hint: 'Recalculate key numbers and check that each conclusion follows.' },
  { id: 'own', text: 'Does the final result reflect my own understanding?', hint: 'The ideas and judgement should be yours, not just the wording.' },
  { id: 'policy', text: "Am I following my university's AI usage policies?", hint: 'Check your course syllabus and disclose AI use where required.' },
];

export const PHILOSOPHERS = [
  {
    id: 'hegel',
    name: 'G. W. F. Hegel',
    years: '1770–1831',
    concept: 'Master and Slave Dialectic',
    source: 'Phenomenology of Spirit (1807)',
    idea:
      'In Hegel’s account, a master who depends on a servant’s labour gradually becomes dependent on that servant. The servant, through working on the world, develops skill and self-consciousness, while the master’s independence turns out to be hollow.',
    interpretation:
      'Read today, the dialectic suggests a possible inversion between people and their tools. We create AI to serve us, but if we hand it all of our cognitive work, we may become dependent on it, and on the productivity standards it sets. The skill-building that Hegel locates in labour is exactly what we risk giving up.',
    toolkit: 'The Task Classifier keeps the skill-building parts of a task, the "labour" that develops you, in your own hands.',
  },
  {
    id: 'kant',
    name: 'Immanuel Kant',
    years: '1724–1804',
    concept: 'Autonomy and Heteronomy',
    source: 'Groundwork of the Metaphysics of Morals (1785); "What is Enlightenment?" (1784)',
    idea:
      'For Kant, autonomy means giving the law to oneself through one’s own reason; heteronomy means being determined by external forces. In "What is Enlightenment?" he urges: Sapere aude, "have the courage to use your own understanding" without the guidance of another.',
    interpretation:
      'A student who uses AI because everyone else does, or out of fear of falling behind, acts heteronomously: the decision comes from outside pressure. Choosing deliberately when and why to use AI, based on one’s own reasoning about the goal of a task, is a contemporary form of autonomy.',
    toolkit: 'The Self-Assessment asks whether your AI use is a choice or a reaction to pressure.',
  },
  {
    id: 'marx',
    name: 'Karl Marx',
    years: '1818–1883',
    concept: 'Alienation of Labour',
    source: 'Economic and Philosophic Manuscripts (1844)',
    idea:
      'Marx described four forms of alienation under industrial capitalism: from the product of one’s labour, from the process of working, from one’s human essence as a creative being, and from other people.',
    interpretation:
      'These categories can be applied, by analogy, to AI-assisted study: submitting work we do not understand (the product); reviewing machine output instead of creating (the process); losing the creative, problem-solving activity that makes work meaningful (human essence); and competing in a productivity race instead of learning together (other people).',
    toolkit: 'The Verification Checklist asks whether the final result truly reflects your own understanding.',
  },
];
