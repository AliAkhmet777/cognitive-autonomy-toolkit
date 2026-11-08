// Questions, zones and task-specific content for the Interactive Task Classifier.
// All recommendations are produced locally by the rules in src/logic/classifier.js.

export const QUESTIONS = [
  {
    id: 'task',
    title: 'What type of task are you working on?',
    hint: 'Pick the closest match. The type alone does not decide the result; your other answers matter just as much.',
    options: [
      { value: 'programming', label: 'Programming assignment', detail: 'Code, algorithms, debugging' },
      { value: 'essay', label: 'Essay / Academic writing', detail: 'Arguments, reports, papers' },
      { value: 'research', label: 'Research / Data analysis', detail: 'Sources, statistics, interpretation' },
      { value: 'math', label: 'Mathematics / Problem solving', detail: 'Proofs, exercises, calculations' },
      { value: 'routine', label: 'Routine task', detail: 'Formatting, translation, summarization' },
      { value: 'other', label: 'Other', detail: 'Anything else' },
    ],
  },
  {
    id: 'goal',
    title: 'What is your main goal?',
    hint: 'Be honest. There is nothing wrong with wanting efficiency, but it changes the right strategy.',
    options: [
      { value: 'learn', label: 'Learn and understand the topic', detail: 'The process matters more than speed' },
      { value: 'efficient', label: 'Complete the task efficiently', detail: 'The result matters more than the process' },
      { value: 'both', label: 'Both learning and efficiency', detail: 'A balance of the two' },
    ],
  },
  {
    id: 'understanding',
    title: 'How well do you understand the topic?',
    hint: 'Your understanding decides whether you can judge if an AI answer is right.',
    options: [
      { value: 'well', label: 'I understand it well', detail: 'I could explain it to a classmate' },
      { value: 'basics', label: 'I understand the basics', detail: 'I know the main ideas, with some gaps' },
      { value: 'barely', label: 'I barely understand it', detail: 'Most of it is still new to me' },
    ],
  },
  {
    id: 'attempt',
    title: 'Can you attempt this task independently before using AI?',
    hint: 'A rough or incomplete attempt still counts.',
    options: [
      { value: 'yes', label: 'Yes', detail: 'I can make a real first attempt' },
      { value: 'partially', label: 'Partially', detail: 'I can start, but I will get stuck' },
      { value: 'no', label: 'No', detail: "I don't know where to begin" },
    ],
  },
];

export const ZONES = {
  green: {
    key: 'green',
    code: 'GREEN',
    name: 'AI Automation',
    short: 'Delegate routine work',
    description:
      'Routine work that builds few new skills. AI can do it while you set the requirements and check the result.',
    examples: ['Formatting', 'Grammar correction', 'Routine summaries', 'Repetitive code', 'Administrative tasks'],
  },
  yellow: {
    key: 'yellow',
    code: 'YELLOW',
    name: 'AI Assistance',
    short: 'Collaborate, stay in control',
    description:
      'AI can help, but you stay actively involved: you think, decide and verify, and AI supports you.',
    examples: ['Debugging code', 'Explaining concepts', 'Reviewing solutions', 'Data analysis', 'Research assistance'],
  },
  red: {
    key: 'red',
    code: 'RED',
    name: 'Human-First Zone',
    short: 'Think independently first',
    description:
      'Your own thinking comes first, especially when the goal is learning. AI is used later, if at all, as a tutor and not as an author.',
    examples: ['Educational problems', 'Learning algorithms', 'Original hypotheses', 'Independent arguments', 'Fundamental concepts'],
  },
};

// How to verify AI-assisted output for each task type.
export const VERIFY_TIPS = {
  programming: 'Run the code, write tests for edge cases, and read every line you did not write.',
  essay: 'Check every claim and citation against the original source. AI often invents references.',
  research: 'Confirm that sources exist, that data is reported correctly, and that conclusions follow from the evidence.',
  math: 'Re-derive each step yourself and check the answer by substitution, estimation or a special case.',
  routine: 'Spot-check the output against the original, especially names, numbers and meaning in translations.',
  other: 'Check facts, logic and consistency against reliable, non-AI sources.',
};

// What the student does independently vs. what may be delegated,
// per task type and per zone.
export const TASK_CONTENT = {
  programming: {
    green: {
      independent: [
        'Decide the structure, requirements and constraints of the code',
        'Review every generated line before you commit it',
        'Run and test the code yourself',
      ],
      delegate: [
        'Boilerplate and repetitive code (configs, CRUD, getters/setters)',
        'Formatting, linting fixes and renaming',
        'Test data and documentation comments',
      ],
    },
    yellow: {
      independent: [
        'Write your own first version, or reproduce the bug yourself',
        'Form a hypothesis about what is wrong before asking for help',
        'Understand and test any suggested fix before applying it',
      ],
      delegate: [
        'Explaining unfamiliar error messages',
        'Reviewing your code and suggesting improvements',
        'Pointing you to relevant documentation or concepts',
      ],
    },
    red: {
      independent: [
        'Design the algorithm on paper before writing code',
        'Write the core logic yourself, even if it is slow',
        'Debug your own mistakes, because that is where most of the learning happens',
      ],
      delegate: [
        'Explaining a concept you are stuck on (e.g. recursion, pointers)',
        'Giving a hint for the next step, not the full solution',
        'Reviewing your finished solution afterwards',
      ],
    },
  },
  essay: {
    green: {
      independent: [
        'Your thesis, argument, structure and conclusions',
        'Choosing and reading your sources',
        'Final proofreading of meaning and tone',
      ],
      delegate: ['Grammar and spelling correction', 'Citation formatting', 'Consistent layout and formatting'],
    },
    yellow: {
      independent: [
        'Formulate your thesis and main arguments',
        'Write the first draft in your own words',
        'Choose and read your sources yourself',
      ],
      delegate: [
        'Feedback on clarity, grammar and style of your draft',
        'Counter-arguments to stress-test your position',
        'Citation and reference formatting',
      ],
    },
    red: {
      independent: [
        'Develop your own thesis and line of argument',
        'Read the sources and take your own notes',
        'Write the complete draft yourself',
      ],
      delegate: [
        'Explaining a difficult theory or term',
        'Asking you questions that challenge your argument',
        'Proofreading, once the thinking is done',
      ],
    },
  },
  research: {
    green: {
      independent: [
        'Define the research question and selection criteria',
        'Check that summaries match the original sources',
        'Decide what the findings mean',
      ],
      delegate: [
        'Formatting tables, figures and references',
        'Summarising documents you have already selected',
        'Writing routine data-cleaning scripts',
      ],
    },
    yellow: {
      independent: [
        'Formulate the research question and hypotheses',
        'Choose the methods and interpret the results',
        'Read the key sources yourself',
      ],
      delegate: [
        'Suggesting candidate sources (which you then verify)',
        'Suggesting analysis methods or statistics code',
        'Checking your reasoning for gaps',
      ],
    },
    red: {
      independent: [
        'Formulate your own hypothesis',
        'Carry out the analysis and interpretation yourself',
        'Draw conclusions and state their limitations',
      ],
      delegate: [
        "Explaining a statistical method you don't yet understand",
        'Verifying your calculations after you finish',
        'Suggesting what you might have overlooked',
      ],
    },
  },
  math: {
    green: {
      independent: [
        'Set up the problem and choose the method',
        'Check that the answer is plausible',
        'Understand each step you hand in',
      ],
      delegate: ['Routine arithmetic or symbolic manipulation', 'Typesetting formulas (e.g. LaTeX)', 'Plotting functions'],
    },
    yellow: {
      independent: [
        'Attempt the solution and write down every step',
        'Check each step of any AI explanation',
        'Redo the problem without help afterwards',
      ],
      delegate: [
        "Explaining a step you don't follow",
        'Checking your final answer',
        'Generating similar practice problems',
      ],
    },
    red: {
      independent: [
        'Work through the problem with pen and paper',
        'Identify exactly which step blocks you',
        'Solve it again from scratch after getting a hint',
      ],
      delegate: [
        'A hint for the next step, not the full solution',
        'Explaining the underlying theorem or method',
        'Practice problems for repetition',
      ],
    },
  },
  routine: {
    green: {
      independent: [
        'Give clear instructions: style, tone, format',
        'Spot-check the result for errors',
        'Make sure no confidential or personal data is shared',
      ],
      delegate: ['Formatting and layout', 'Grammar and spelling correction', 'Translation drafts and routine summaries'],
    },
    yellow: {
      independent: [
        'Do the task yourself first to practise the skill',
        "Compare your version with the AI's and note the differences",
        'Learn the rules behind each correction',
      ],
      delegate: [
        'Feedback on your own version',
        'Explanations of grammar or style rules',
        'Repetitive parts once you have mastered them',
      ],
    },
    red: {
      independent: [
        'Do the task entirely yourself to build the skill',
        'Keep a list of your recurring mistakes',
        'Ask a person for feedback',
      ],
      delegate: ['Explanations of rules you got wrong', 'Extra practice material'],
    },
  },
  other: {
    green: {
      independent: [
        'Define exactly what result you need',
        'Review the output carefully',
        'Decide what to keep and what to change',
      ],
      delegate: ['Repetitive and mechanical parts', 'Formatting and clean-up', 'First drafts of routine text'],
    },
    yellow: {
      independent: [
        'Make your own first attempt or plan',
        'Make the key decisions yourself',
        'Verify everything AI contributes',
      ],
      delegate: ['Explanations and background information', 'Feedback on your attempt', 'Suggestions you then evaluate'],
    },
    red: {
      independent: [
        'Think the problem through on your own first',
        'Produce your own solution or argument',
        'Reflect on what you learned',
      ],
      delegate: ['Explanations of concepts you are stuck on', 'Hints, not answers', 'Feedback after you finish'],
    },
  },
};

export const RESPONSIBILITY_REMINDER =
  'Whatever AI contributed, you are the author. You are responsible for the correctness, originality and honesty of your work, and for following your university’s AI usage policy.';
