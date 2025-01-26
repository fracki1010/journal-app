import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { JournalApp } from './JournalApp'
import { BrowserRouter } from 'react-router'
import { Provider } from 'react-redux'
import { store } from './store'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={ store }>
    <BrowserRouter>
      <JournalApp />
    </BrowserRouter>
    </Provider>
  </StrictMode>,
)
