import type { ReactNode } from 'react'
import Header from '../Header'
import Sidebar from '../Sidebar'
import { useAppStore } from '../../store'
import './Layout.scss'

interface DesktopLayoutProps {
  children: ReactNode
}

const DesktopLayout = ({ children }: DesktopLayoutProps) => {
  const { currentStep } = useAppStore()

  return (
    <div className="layout layout--desktop">
      <Header isMobile={false} />
      <div className="layout__content">
        <Sidebar currentStep={currentStep} />
        <main className="layout__main" role="main">
          {children}
        </main>
      </div>
    </div>
  )
}

export default DesktopLayout

