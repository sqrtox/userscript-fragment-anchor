import App from '~/App';
import { injectCss } from '~/utils/injectCss';

const { createRoot } = window.ReactDOM as unknown as typeof import('react-dom/client');
const { StrictMode } = window.React;

const rootElement = document.createElement('div');
const className = `userscript-${Math.random().toString(36).slice(2)}`;

injectCss(className, {
  position: 'fixed',
  zIndex: '99999'
});
rootElement.classList.add(className);
document.body.appendChild(rootElement);

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
