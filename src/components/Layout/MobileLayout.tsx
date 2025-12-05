import type { ReactNode } from 'react'
import Header from '../Header'
import './Layout.scss'

interface MobileLayoutProps {
  children: ReactNode
}

const MobileLayout = ({ children }: MobileLayoutProps) => {
  return (
    <div className="layout layout--mobile">
      <Header isMobile={true} />
      <main className="layout__main" role="main">
        {children}
      </main>
    </div>
  )
}

export default MobileLayout

