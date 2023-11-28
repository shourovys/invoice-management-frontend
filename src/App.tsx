import ErrorBoundary from './ErrorBoundary'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import { SWRConfig } from 'swr'
import { HelmetProvider } from 'react-helmet-async'

import { RenderRoutes } from './components/common/RenderRoutes'
import MainLayout from './components/layout/MainLayout'
import AlertDialogProvider from './context/AlertDialogContext/AlertDialogProvider'
import { ReactRoutes } from './routes/routeProperty'
import { swrConfig } from './api/swrConfig'
import AuthProvider from './context/AuthContext/AuthContextProvider'
import AuthGuard from './guards/AuthGuard'
import AlertDialog from './components/common/AlertDialog'
import LicenseEulaModal from './components/pages/license/LicenseEulaModal'

import '@fortawesome/fontawesome-svg-core/styles.css'
import './styles/globals.scss'

export default function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <SWRConfig value={swrConfig}>
          <Toaster position="bottom-center" />
          <AuthProvider>
            <AuthGuard>
              <AlertDialogProvider>
                <MainLayout>
                  <AlertDialog />
                  <LicenseEulaModal />
                  <RenderRoutes routes={ReactRoutes} />
                </MainLayout>
              </AlertDialogProvider>
            </AuthGuard>
          </AuthProvider>
        </SWRConfig>
      </HelmetProvider>
    </ErrorBoundary>
  )
}
