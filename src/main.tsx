import './index.css'

import { HeroUIProvider } from '@heroui/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <HeroUIProvider locale="es-ES">
            <App />
        </HeroUIProvider>
    </StrictMode>,
)
