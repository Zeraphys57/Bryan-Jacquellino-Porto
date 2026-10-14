import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LanguageProvider } from './i18n/LanguageContext.jsx'

/* The invoice tool (jsPDF + html2canvas, ~600 KB) loads only on /invoice,
   so portfolio visitors never download it. */
const InvoiceApp = lazy(() => import('./invoice/InvoiceApp.jsx'))

let storedTheme = null
try { storedTheme = localStorage.getItem('theme') } catch { /* storage blocked */ }
if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

const isInvoice = window.location.pathname.startsWith('/invoice');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isInvoice ? (
      <Suspense fallback={null}>
        <InvoiceApp />
      </Suspense>
    ) : (
      <LanguageProvider>
        <App />
      </LanguageProvider>
    )}
  </StrictMode>,
)
