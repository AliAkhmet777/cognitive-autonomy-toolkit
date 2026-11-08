# Cognitive Autonomy Toolkit

> *Make AI work for you, not the other way around.*

An interactive web application that helps students make conscious decisions about **when to use AI and when to rely on their own thinking**. Built as a university **Social IT Project** for a Philosophy course.

**Core idea:** AI should assist human intelligence, not replace it.

---

## The social problem

Generative AI tools such as ChatGPT, Claude and GitHub Copilot were introduced to save time. In practice they may also have started a new productivity race, in which students and junior professionals feel expected to do more, faster, with fewer resources. As a result, some students:

- become overly dependent on AI-generated solutions,
- lose confidence in solving problems independently,
- submit code or assignments they do not fully understand,
- spend less time developing fundamental skills,
- feel pressure to use AI because everyone else does,
- end up reviewing AI output instead of thinking for themselves.

## Our solution

A browser-based toolkit that **deliberately uses no AI**. It does not create a new AI dependency. Every recommendation comes from transparent, predefined rules that anyone can read in the source code.

| Page | What it does |
|---|---|
| **Home** | Introduces the problem, why cognitive autonomy matters, and the three principles: *think independently, use AI consciously, stay responsible*. |
| **Task Classifier** | A 4-question questionnaire (task type, goal, understanding, ability to attempt independently) that classifies the task as **GREEN: AI Automation**, **YELLOW: AI Assistance** or **RED: Human-First Zone**. Each result explains why, lists what to do yourself and what to delegate, gives a step-by-step workflow, and reminds you of your responsibility. |
| **Guide** | Five practical principles (Think First · AI as Assistant, Not Author · Verification Before Acceptance · Protected Learning Time · Human Responsibility), each with an example. |
| **Self-Assessment** | Six statements rated 1–5, with a reflective summary across three dimensions and practical recommendations. *A self-reflection tool, not a validated psychological test.* |
| **Checklist** | Seven questions to answer before submitting AI-assisted work, with a live completion indicator. |
| **Foundations** | Hegel (master–slave dialectic), Kant (autonomy vs. heteronomy) and Marx (alienation of labour), presented as *contemporary interpretations*. None of them wrote about AI. |

### How the classifier decides

The logic lives in [`src/logic/classifier.js`](src/logic/classifier.js):

1. **Weighted score.** Each answer adds weight toward the human-first end of a 0–9 scale (e.g. goal *learn* = 3, *efficient* = 0; understanding *barely* = 2, *well* = 0).
2. **Thresholds.** A score of ≤ 3 gives GREEN, ≤ 5.5 gives YELLOW, and anything higher gives RED.
3. **Explicit rules** handle cases a plain sum would get wrong, for example:
   - Routine tasks are GREEN, unless the goal is to *learn* that routine skill (then YELLOW).
   - Essays, research and maths are never fully automated (at least YELLOW).
   - Barely understanding the topic while wanting to learn always gives RED, because you cannot verify what you don't understand.

The task type alone never fixes the result. This is verified by the test suite, which checks all 162 answer combinations.

## Tech stack

- **React 18 + Vite 5**, plain JavaScript and CSS
- No backend, no database, no API keys, no AI services, no tracking
- Only runtime dependencies: `react` and `react-dom`
- Hash-based routing (`#/guide`), so the site works on GitHub Pages without server configuration

## Getting started

Requires **Node.js 18 or newer** ([download](https://nodejs.org/)).

```bash
npm install      # install dependencies
npm run dev      # start the dev server at http://localhost:5173
```

Other scripts:

```bash
npm test         # run the logic tests (classifier + self-assessment)
npm run build    # production build into dist/
npm run preview  # serve the production build locally
```

## Project structure

```
├── index.html
├── public/favicon.svg
├── scripts/test-logic.mjs        # logic tests (no extra dependencies)
├── .github/workflows/deploy.yml  # automatic GitHub Pages deployment
└── src/
    ├── main.jsx                  # entry point
    ├── App.jsx                   # layout + page switching
    ├── router.jsx                # tiny hash router
    ├── styles/global.css         # design tokens & shared styles
    ├── components/
    │   ├── Layout.jsx / .css     # navbar & footer
    │   ├── ui.jsx                # Button, ZoneTag, PageHeader, Notice, ProgressRing…
    │   └── classifier/           # QuestionStep, ResultCard
    ├── pages/                    # Home, Classifier, Guide, Assessment, Checklist, Foundations
    ├── logic/                    # classifier.js, assessment.js (pure functions)
    └── data/                     # all texts: questions, zones, principles, philosophers…
```

Content and logic are kept apart: to change any wording, edit the files in `src/data/`, and the components will pick it up.

## Deploying to GitHub Pages

The repository includes a GitHub Actions workflow that tests, builds and deploys automatically.

1. Create a GitHub repository and push this project to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Cognitive Autonomy Toolkit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. On GitHub, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. The workflow runs on every push to `main`. After about a minute the site is live at
   `https://<your-username>.github.io/<repo-name>/`.

Because `vite.config.js` uses `base: './'` and the app uses hash routing, no extra configuration is needed for the repository name.

## Privacy and ethics

- No registration, no personal data, no cookies, no analytics.
- All answers live only in React state and disappear when you reload the page.
- The self-assessment is **not** a scientifically validated instrument or a diagnosis; it is only a prompt for reflection.
- The philosophical section presents contemporary interpretations and does not claim that Hegel, Kant or Marx discussed artificial intelligence.
