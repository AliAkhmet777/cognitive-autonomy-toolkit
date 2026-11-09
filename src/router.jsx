import { useEffect, useState } from 'react';

// Minimal hash-based router. Hash URLs (#/guide) work on GitHub Pages
// without any server configuration, and avoid an extra dependency.

export const ROUTES = [
  { path: '/', label: 'Home' },
  { path: '/classifier', label: 'Task Classifier' },
  { path: '/guide', label: 'Guide' },
  { path: '/assessment', label: 'Self-Assessment' },
  { path: '/checklist', label: 'Checklist' },
  { path: '/foundations', label: 'Foundations' },
  { path: '/manifesto', label: 'Manifesto' },
];

const readPath = () => window.location.hash.replace(/^#/, '') || '/';

export function useHashRoute() {
  const [path, setPath] = useState(readPath);

  useEffect(() => {
    const onChange = () => {
      setPath(readPath());
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return path;
}

export function Link({ to, children, ...rest }) {
  return (
    <a href={`#${to}`} {...rest}>
      {children}
    </a>
  );
}
