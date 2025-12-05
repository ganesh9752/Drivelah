import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAppStore } from './store'
import { DesktopLayout, MobileLayout } from './components/Layout'
import Subscription from './pages/Subscription'
import Device from './pages/Device'
import { isMobile } from './utils'
import './App.scss'

const SubscriptionPage = ({ mobile }: { mobile: boolean }) => {
  const { setCurrentStep, isFrozen } = useAppStore()
  useEffect(() => {
    setCurrentStep('subscription')
  }, [setCurrentStep])
  return <Subscription isMobile={mobile} isFrozen={isFrozen} />
}

const DevicePage = ({ mobile }: { mobile: boolean }) => {
  const { setCurrentStep } = useAppStore()
  useEffect(() => {
    setCurrentStep('device')
  }, [setCurrentStep])
  return <Device isMobile={mobile} />
}

const FrozenSubscriptionPage = ({ mobile }: { mobile: boolean }) => {
  const { setCurrentStep } = useAppStore()
  useEffect(() => {
    setCurrentStep('subscription')
  }, [setCurrentStep])
  return <Subscription isMobile={mobile} isFrozen={true} />
}

const AppRoutes = () => {
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setMobile(isMobile())
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const Layout = mobile ? MobileLayout : DesktopLayout

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/subscription" replace />} />
          <Route path="/subscription" element={<SubscriptionPage mobile={mobile} />} />
          <Route path="/device" element={<DevicePage mobile={mobile} />} />
          {mobile && <Route path="/subscription-frozen" element={<FrozenSubscriptionPage mobile={mobile} />} />}
          <Route path="*" element={<Navigate to="/subscription" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

function App() {
  return <AppRoutes />
}

export default App
