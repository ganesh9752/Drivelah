import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../../store'
import type { SubscriptionPlan } from '../../store'
import { SUBSCRIPTION_PLANS } from '../../constants'
import Button from '../../components/Button'
import './Subscription.scss'

interface SubscriptionProps {
  isMobile?: boolean
  isFrozen?: boolean
}

type FeatureIcon = 'info' | 'check' | 'lock'

const renderFeatureIcon = (icon: FeatureIcon) => {
  if (icon === 'info') {
    return (
      <img
        src="/Group 5171.svg"
        alt=""
        className="subscription__feature-icon subscription__feature-icon--info"
        aria-hidden="true"
      />
    )
  }

  if (icon === 'lock') {
    return (
      <svg
        className="subscription__feature-icon subscription__feature-icon--lock"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect x="4" y="8" width="12" height="9" rx="2" fill="#026786" />
        <path
          d="M7 8V6a3 3 0 116 0v2"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="10" cy="12" r="1.25" fill="white" />
      </svg>
    )
  }

  return (
    <svg
      className="subscription__feature-icon subscription__feature-icon--check"
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
  )
}

const Subscription = ({ isMobile = false, isFrozen = false }: SubscriptionProps) => {
  const navigate = useNavigate()
  const { selectedPlan, setSelectedPlan, addons, toggleAddon, cardDetails, setCardDetails } =
    useAppStore()
  const [showPlanSelection, setShowPlanSelection] = useState(false)

  const handlePlanSelect = (planId: SubscriptionPlan) => {
    if (!isFrozen) {
      setSelectedPlan(planId)
    }
  }

  const handlePlanCardClick = (planId: SubscriptionPlan) => {
    setSelectedPlan(planId)
    setShowPlanSelection(true)
  }

  const handleNext = () => {
    if (selectedPlan && !isFrozen) {
      navigate('/device')
    }
  }

  // For frozen state, only show limited plans
  const availablePlans = isFrozen
    ? Object.entries(SUBSCRIPTION_PLANS).filter(
        ([id]) => id === 'just-mates' || id === 'good-mates'
      )
    : Object.entries(SUBSCRIPTION_PLANS)

  // Show learn more content initially, then plan selection after clicking Good mates
  if (!showPlanSelection && !isFrozen) {
    return (
      <div className={`subscription ${isMobile ? 'subscription--mobile' : 'subscription--desktop'}`}>
        <div className="subscription__container">
          <div className="subscription__header">
            <h1 className="subscription__title">Subscription plan</h1>
            <p className="subscription__subtitle">
              Learn more about our subscription plans and choose the one that fits your needs.
            </p>
          </div>

          <div className="subscription__content">
            <div className="subscription__learn-more">
              <h2 className="subscription__section-title">What is the right plan for me?</h2>
              
              <div className="subscription__plans-overview">
                {Object.entries(SUBSCRIPTION_PLANS).map(([planId, plan]) => {
                  const planKey = planId as SubscriptionPlan
                  const isClickable = planId === 'just-mates' || planId === 'good-mates'

                  return (
                    <div
                      key={planId}
                      className={`subscription__plan-overview-card ${
                        isClickable ? 'subscription__plan-overview-card--clickable' : ''
                      }`}
                      onClick={isClickable ? () => handlePlanCardClick(planKey) : undefined}
                      role={isClickable ? 'button' : undefined}
                      tabIndex={isClickable ? 0 : undefined}
                      onKeyDown={
                        isClickable
                          ? (e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                handlePlanCardClick(planKey)
                              }
                            }
                          : undefined
                      }
                    >
                      <div className="subscription__plan-header">
                        <h3 className="subscription__plan-name">{plan.name}</h3>
                        <div className="subscription__plan-price">{plan.price}</div>
                      </div>

                      <ul className="subscription__plan-features">
                        {plan.features.map(({ label, icon }, index) => {
                          const iconType: FeatureIcon =
                            icon || (planId === 'just-mates' ? 'info' : 'check')

                          return (
                            <li key={index} className="subscription__plan-feature">
                              {renderFeatureIcon(iconType)}
                              <span>{label}</span>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  )
                })}
              </div>

              <p className="subscription__info">
                You will be able to switch between plans easily later as well. Speak to our host
                success team if you need any clarifications.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`subscription ${isMobile ? 'subscription--mobile' : 'subscription--desktop'}`}>
      <div className="subscription__container">
        <div className="subscription__header">
          <h1 className="subscription__title">Subscription plan</h1>
          <p className="subscription__subtitle">
            Select the ideal subscription plan for your listing.
          </p>
        </div>

        <div className="subscription__content">
          <h2 className="subscription__section-title">Select your plan</h2>

          <div className="subscription__plans">
            {availablePlans.map(([planId, plan]) => {
              const isSelected = selectedPlan === planId
              const planKey = planId as SubscriptionPlan

              return (
                <div
                  key={planId}
                  className={`subscription__plan-card ${
                    isSelected ? 'subscription__plan-card--selected' : ''
                  } ${isFrozen ? 'subscription__plan-card--disabled' : ''}`}
                  onClick={() => handlePlanSelect(planKey)}
                  role="button"
                  tabIndex={isFrozen ? -1 : 0}
                  onKeyDown={(e) => {
                    if ((e.key === 'Enter' || e.key === ' ') && !isFrozen) {
                      handlePlanSelect(planKey)
                    }
                  }}
                  aria-pressed={isSelected}
                  aria-disabled={isFrozen}
                >
                  <div className="subscription__plan-header">
                    <h3 className="subscription__plan-name">{plan.name}</h3>
                    <div className="subscription__plan-price">{plan.price}</div>
                  </div>

                  <ul className="subscription__plan-features">
                    {plan.features.map(({ label, icon }, index) => {
                      const iconType: FeatureIcon =
                        icon || (planId === 'just-mates' ? 'info' : 'check')

                      return (
                        <li key={index} className="subscription__plan-feature">
                          {renderFeatureIcon(iconType)}
                          <span>{label}</span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
          </div>

          {!isFrozen && !isMobile && (selectedPlan === 'just-mates' || selectedPlan === 'good-mates' || selectedPlan === 'best-mates') && (
            <>
              <div className="subscription__addons">
                <h2 className="subscription__section-title">Select add-ons for your subscription</h2>
                <div className="subscription__addons-list">
                  {(selectedPlan === 'just-mates'
                    ? addons.filter((addon) => addon.id === 'byo-lockbox')
                    : selectedPlan === 'good-mates' || selectedPlan === 'best-mates'
                    ? addons.filter((addon) => addon.id !== 'between-trip-insurance')
                    : addons
                  ).map((addon) => {
                    // For best-mates, show "Between trip insurance" instead of "BYO secondary GPS"
                    const displayName = selectedPlan === 'best-mates' && addon.id === 'byo-secondary-gps'
                      ? 'Between trip insurance'
                      : addon.name
                    
                    return (
                    <label
                      key={addon.id}
                      className={`subscription__addon-item ${
                        addon.selected ? 'subscription__addon-item--selected' : ''
                      } ${addon.id === 'between-trip-insurance' ? 'subscription__addon-item--disabled' : ''}`}
                    >
                      <div className="subscription__addon-content">
                        <span className="subscription__addon-name">{displayName}</span>
                        <span className="subscription__addon-price"> - {addon.price}</span>
                      </div>
                      <input
                        type="radio"
                        name="addon"
                        checked={addon.selected}
                        onChange={() => {
                          if (addon.id !== 'between-trip-insurance') {
                            toggleAddon(addon.id)
                          }
                        }}
                        disabled={addon.id === 'between-trip-insurance'}
                        className="subscription__addon-radio"
                      />
                    </label>
                    )
                  })}
                </div>
              </div>

            {(selectedPlan === 'good-mates' || selectedPlan === 'best-mates') && (
              <div className="subscription__card-details">
                <h2 className="subscription__section-title">Add card details</h2>
                <div className="subscription__card-form">
                  <div className="subscription__card-inline">
                    <img
                      src="/Lock.svg"
                      alt=""
                      className="subscription__card-icon"
                      aria-hidden="true"
                    />
                    <input
                      type="text"
                      className="subscription__card-inline-input subscription__card-inline-input--number"
                      placeholder="1234 5678 1234 5678"
                      value={cardDetails?.cardNumber || ''}
                      onChange={(e) =>
                        setCardDetails({
                          ...(cardDetails || { expiryDate: '', cvc: '' }),
                          cardNumber: e.target.value,
                        })
                      }
                      maxLength={19}
                    />
                    <input
                      type="text"
                      className="subscription__card-inline-input subscription__card-inline-input--small"
                      placeholder="MM/YY"
                      value={cardDetails?.expiryDate || ''}
                      onChange={(e) =>
                        setCardDetails({
                          ...(cardDetails || { cardNumber: '', cvc: '' }),
                          expiryDate: e.target.value,
                        })
                      }
                      maxLength={5}
                    />
                    <input
                      type="text"
                      className="subscription__card-inline-input subscription__card-inline-input--small"
                      placeholder="CVC"
                      value={cardDetails?.cvc || ''}
                      onChange={(e) =>
                        setCardDetails({
                          ...(cardDetails || { cardNumber: '', expiryDate: '' }),
                          cvc: e.target.value,
                        })
                      }
                      maxLength={4}
                    />
                  </div>
                  <p className="subscription__card-info">
                    You will not be charged right now. Subscription will only start once your listing
                    is published and live.
                  </p>
                </div>
              </div>
            )}

            </>
          )}

          {!isFrozen && (selectedPlan === 'just-mates' || selectedPlan === 'good-mates' || selectedPlan === 'best-mates') && (
            <>
              <p className="subscription__info">
                Learn more about the plans here -{' '}
                <a href="#learn-more" className="subscription__link">
                  What is the right plan for me?
                </a>
              </p>
              <p className="subscription__info">
                You will be able to switch between plans easily later as well. Speak to our host
                success team if you need any clarifications.
              </p>
            </>
          )}

          {isFrozen && (
            <div className="subscription__frozen-message">
              <p>
                Active listings cannot change their Subscription directly. Please contact our
                support team for assistance.
              </p>
            </div>
          )}

          <div className="subscription__actions">
            <Button
              onClick={handleNext}
              disabled={!selectedPlan || isFrozen}
              className="subscription__next-button"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Subscription

