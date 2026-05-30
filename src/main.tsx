import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Removed <StrictMode> to prevent double-mounting the WebGL Canvas
createRoot(document.getElementById('root')!).render(
  <App />
);