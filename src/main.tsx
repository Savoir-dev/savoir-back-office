import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@radix-ui/themes/styles.css'
import 'react-h5-audio-player/lib/styles.css'
import { Theme } from '@radix-ui/themes'
import { TokenProvider } from './services/token.context.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TokenProvider>
      <Theme>
        <App />
      </Theme>
    </TokenProvider>
  </React.StrictMode>,
)
