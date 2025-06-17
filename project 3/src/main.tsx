import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import './index.css';

// Enhanced error handling for production
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

// Global error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  
  // In production, you might want to send errors to a logging service
  if (import.meta.env.PROD) {
    console.error('Production error details:', {
      message: event.error?.message,
      stack: event.error?.stack,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno
    });
  }
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  
  if (import.meta.env.PROD) {
    console.error('Production promise rejection:', {
      reason: event.reason,
      promise: event.promise
    });
  }
});

// Check if modules are loading correctly
console.log('🚀 Application starting...');
console.log('Environment:', import.meta.env.MODE);
console.log('Base URL:', import.meta.env.BASE_URL);

// Enhanced error boundary for production
const renderApp = () => {
  try {
    createRoot(rootElement).render(
      <StrictMode>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </StrictMode>
    );
    console.log('✅ Application rendered successfully');
  } catch (error) {
    console.error('❌ Failed to render app:', error);
    
    // Fallback error display
    rootElement.innerHTML = `
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        background: #111827;
        color: white;
        font-family: system-ui, -apple-system, sans-serif;
        text-align: center;
        padding: 2rem;
      ">
        <h1 style="color: #ef4444; margin-bottom: 1rem;">Application Error</h1>
        <p style="color: #9ca3af; margin-bottom: 1rem;">
          The application failed to load. Please check the console for details.
        </p>
        <p style="color: #6b7280; margin-bottom: 2rem; font-size: 0.875rem;">
          Error: ${error.message || 'Unknown error'}
        </p>
        <button 
          onclick="window.location.reload()" 
          style="
            background: #7c3aed;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            cursor: pointer;
            font-size: 1rem;
          "
        >
          Reload Page
        </button>
      </div>
    `;
  }
};

// Render with additional safety checks
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}