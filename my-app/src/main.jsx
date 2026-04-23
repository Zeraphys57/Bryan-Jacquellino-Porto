import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import InvoiceApp from './invoice/InvoiceApp.jsx'

if (
  localStorage.getItem('theme') === 'dark' ||
  (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

const isInvoice = window.location.pathname.startsWith('/invoice');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isInvoice ? <InvoiceApp /> : <App />}
  </StrictMode>,
)
