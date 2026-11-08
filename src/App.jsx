import { useEffect } from 'react';
import { useHashRoute, ROUTES } from './router.jsx';
import { Navbar, Footer } from './components/Layout.jsx';
import { PageHeader, Button } from './components/ui.jsx';
import Home from './pages/Home.jsx';
import Classifier from './pages/Classifier.jsx';
import Guide from './pages/Guide.jsx';
import Assessment from './pages/Assessment.jsx';
import Checklist from './pages/Checklist.jsx';
import Foundations from './pages/Foundations.jsx';

const PAGES = {
  '/': Home,
  '/classifier': Classifier,
  '/guide': Guide,
  '/assessment': Assessment,
  '/checklist': Checklist,
  '/foundations': Foundations,
};

function NotFound() {
  return (
    <PageHeader eyebrow="Page not found" title="This page does not exist" lead="The link may be outdated. Let's get you back on track.">
      <div style={{ marginTop: 28 }}>
        <Button to="/" arrow>
          Back to home
        </Button>
      </div>
    </PageHeader>
  );
}

export default function App() {
  const path = useHashRoute();
  const Page = PAGES[path] ?? NotFound;

  useEffect(() => {
    const route = ROUTES.find((r) => r.path === path);
    document.title =
      route && route.path !== '/' ? `${route.label} · Cognitive Autonomy Toolkit` : 'Cognitive Autonomy Toolkit';
  }, [path]);

  return (
    <div className="app">
      <a className="skip-link" href="#main" onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus(); }}>
        Skip to content
      </a>
      <Navbar current={path} />
      <main id="main" className="main" tabIndex={-1}>
        <div className="page-enter" key={path}>
          <Page />
        </div>
      </main>
      <Footer />
    </div>
  );
}
