import './Header.scss'

interface HeaderProps {
  isMobile?: boolean
}

const Header = ({ isMobile = false }: HeaderProps) => {
  const handleMenuClick = () => {
    // Menu functionality can be implemented here in the future
  }

  if (isMobile) {
    return (
      <header className="header header--mobile" role="banner">
        <div className="header__container">
          <button
            className="header__menu-button"
            aria-label="Open menu"
            onClick={handleMenuClick}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 12H21M3 6H21M3 18H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <div className="header__logo">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="#00A3AD"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="#00A3AD"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="#00A3AD"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="header__logo-text">Drive lah</span>
          </div>
          <div className="header__profile">
            <div className="header__profile-icon" aria-label="User profile">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M6 21C6 17.6863 8.68629 15 12 15C15.3137 15 18 17.6863 18 21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="header header--desktop" role="banner">
      <div className="header__teal-bar">
        <div className="header__container">
          <div className="header__logo">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="header__logo-text">Drive lah</span>
          </div>
          <nav className="header__nav" role="navigation">
            <a href="#learn-more" className="header__nav-link">
              Learn more
            </a>
            <a href="#list-car" className="header__nav-link">
              List your car
            </a>
            <a href="#inbox" className="header__nav-link">
              Inbox
            </a>
            <div className="header__profile-icon" aria-label="User profile">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="16" cy="12" r="6" fill="white" />
                <path
                  d="M8 28C8 22.4772 12.4772 18 18 18C23.5228 18 28 22.4772 28 28"
                  fill="white"
                />
              </svg>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header

