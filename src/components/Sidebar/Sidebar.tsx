import { STEPS } from '../../constants'
import './Sidebar.scss'

interface SidebarProps {
  currentStep: 'subscription' | 'device'
}

const Sidebar = ({ currentStep }: SidebarProps) => {
  const getStepIndex = (step: string) => {
    return STEPS.indexOf(step as typeof STEPS[number])
  }

  const subscriptionIndex = getStepIndex('Subscription')
  const deviceIndex = getStepIndex('Device')
  const currentIndex = currentStep === 'subscription' ? subscriptionIndex : deviceIndex

  return (
    <aside className="sidebar" role="complementary" aria-label="Navigation steps">
      <nav className="sidebar__nav">
        {STEPS.map((step, index) => {
          const isCompleted = index < currentIndex
          const isActive = index === currentIndex
          const isDisabled = index > currentIndex + 1

          return (
            <div
              key={step}
              className={`sidebar__step ${isActive ? 'sidebar__step--active' : ''} ${
                isCompleted ? 'sidebar__step--completed' : ''
              } ${isDisabled ? 'sidebar__step--disabled' : ''}`}
            >
              {isCompleted && (
                <svg
                  className="sidebar__check-icon"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <circle cx="10" cy="10" r="9" fill="#4CAF50" />
                  <path
                    d="M6 10L9 13L14 7"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              {isActive && <div className="sidebar__indicator" aria-hidden="true" />}
              <span className="sidebar__step-text">{step}</span>
            </div>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar

