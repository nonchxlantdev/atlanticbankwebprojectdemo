import React from 'react';
import { useEffect, useMemo, useState } from 'react';
import appStoreBadge from './assets/appstore.png';
import FadeContent from './FadeContent.jsx';
import heroImage from './assets/belize-coast-hero.png';
import googlePlayBadge from './assets/googleplay.png';
import mobileLoginScreen from './assets/mobileloginscreen.jpeg';

const navItems = ['Personal', 'Business', 'Loans', 'Cards', 'About Us', 'Help & Support'];

const benefits = [
  { icon: 'shield', title: 'Safe & Secure', copy: 'Your security is our priority' },
  { icon: 'clock', title: 'Fast & Convenient', copy: 'Bank anytime, anywhere' },
  { icon: 'user', title: 'Here For Belize', copy: 'Supporting you and our community' }
];

const products = [
  { icon: 'users', title: 'Personal Banking', copy: 'Accounts, savings, loans and more.', tone: 'blue' },
  { icon: 'briefcase', title: 'Business Banking', copy: 'Solutions to help your business grow.', tone: 'green' },
  { icon: 'home', title: 'Loans', copy: 'Personal, mortgage, vehicle and business loans.', tone: 'red' },
  { icon: 'card', title: 'Cards', copy: 'Credit cards that fit your lifestyle.', tone: 'gold' }
];

const reasons = [
  { icon: 'shield', title: '100% Secure', copy: 'Advanced security to protect your information.' },
  { icon: 'clock', title: 'Fast Approvals', copy: 'Quick decisions so you can move forward.' },
  { icon: 'users', title: 'Local Support', copy: 'Real people, real solutions, right here in Belize.' },
  { icon: 'bank', title: 'Strong & Stable', copy: 'Over 100 years of strength, trust and commitment.' }
];

const quickLinks = [
  { icon: 'pin', title: 'Find a Branch or ATM', copy: 'Locations across Belize' },
  { icon: 'phone', title: 'Contact Us', copy: "We're here to help" },
  { icon: 'rates', title: 'Exchange Rates', copy: "View today's rates" },
  { icon: 'book', title: 'Financial Tips', copy: 'Helpful tips for your financial wellness' }
];

function Icon({ name, size = 24, className = '' }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2.2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
    'aria-hidden': true
  };

  const paths = {
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    bank: (
      <>
        <path d="m3 10 9-6 9 6" />
        <path d="M5 10v9m5-9v9m4-9v9m5-9v9M3 19h18" />
      </>
    ),
    book: (
      <>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z" />
      </>
    ),
    briefcase: (
      <>
        <path d="M10 6V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1" />
        <path d="M4 7h16v13H4z" />
        <path d="M4 12h16" />
      </>
    ),
    card: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 10h18M7 15h3" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v6l4 2" />
      </>
    ),
    home: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v10h14V10" />
        <path d="M9 20v-6h6v6" />
      </>
    ),
    lock: (
      <>
        <rect x="5" y="10" width="14" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    phone: (
      <>
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 2.6a2 2 0 0 1-.5 1.8L8 9.1a16 16 0 0 0 6.9 6.9l1.1-1.1a2 2 0 0 1 1.8-.5l2.6.5a2 2 0 0 1 1.6 2z" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
    rates: (
      <>
        <path d="M7 7h10M7 17h10M9 21l6-18" />
        <path d="M5 12a7 7 0 0 0 7 7M19 12a7 7 0 0 0-7-7" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-5" />
      </>
    ),
    smartphone: (
      <>
        <rect x="7" y="2" width="10" height="20" rx="2" />
        <path d="M11 18h4" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 22a8 8 0 0 1 16 0" />
      </>
    ),
    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
      </>
    )
  };

  return <svg {...common}>{paths[name]}</svg>;
}

function Logo() {
  return (
    <a className="logo" href="#" aria-label="Atlantic Bank home">
      <span className="logo-mark" aria-hidden="true">
        <span />
      </span>
      <span>
        <strong>Atlantic Bank</strong>
        <small>Building the future together</small>
      </span>
    </a>
  );
}

function App() {
  const [currentStep, setCurrentStep] = useState('start');
  const [progress, setProgress] = useState(13);
  const [loanType, setLoanType] = useState('Personal Loan');
  const [monthlyIncome, setMonthlyIncome] = useState('BZD 2,000');
  const [loanAmount, setLoanAmount] = useState(10000);
  const [loanAmountText, setLoanAmountText] = useState('BZD 10,000');
  const [eligibilityForm, setEligibilityForm] = useState({
    fullName: 'John Doe',
    employmentLength: '3 - 5 years',
    email: 'john.doe@email.com',
    phone: '501-123-4567'
  });
  const formattedLoanAmount = useMemo(
    () => `BZD ${loanAmount.toLocaleString('en-US')}`,
    [loanAmount]
  );
  const isEligibilityStep = currentStep === 'eligibility';
  const isLoadingStep = currentStep === 'loading';

  useEffect(() => {
    if (!isLoadingStep) return undefined;

    setProgress(13);
    const midTimer = setTimeout(() => setProgress(66), 150);
    const doneTimer = setTimeout(() => setProgress(100), 650);
    const nextTimer = setTimeout(() => {
      setCurrentStep('eligibility');
      requestAnimationFrame(() => {
        document.getElementById('eligibility-card-title')?.focus();
      });
    }, 950);

    return () => {
      clearTimeout(midTimer);
      clearTimeout(doneTimer);
      clearTimeout(nextTimer);
    };
  }, [isLoadingStep]);

  function updateLoanAmount(value) {
    const nextAmount = Number(value);
    setLoanAmount(nextAmount);
    setLoanAmountText(`BZD ${nextAmount.toLocaleString('en-US')}`);
  }

  function handleEligibilityChange(field, value) {
    setEligibilityForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if (currentStep === 'start') {
      setCurrentStep('loading');
    }
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <Logo />

        <nav className="nav-links" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a href="#" key={item}>
              {item}
              <span aria-hidden="true">v</span>
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button className="icon-button" type="button" aria-label="Find a location">
            <Icon name="pin" size={20} />
          </button>
          <span className="divider" aria-hidden="true" />
          <button className="login-button" type="button">
            <Icon name="lock" size={18} />
            Login
          </button>
          <button className="primary-button compact" type="button">
            Apply Online
          </button>
          <button className="icon-button menu-button" type="button" aria-label="Open menu">
            <Icon name="menu" size={22} />
          </button>
        </div>
      </header>

      <main>
        <section
          className="hero"
          style={{ '--hero-image': `url(${heroImage})` }}
          aria-label="Atlantic Bank loan application"
        >
          <div className="hero-content">
            <div className="hero-copy">
              <h1>Bank with Confidence. Build Your Future.</h1>
              <p>Secure financial solutions for you, your family and your business.</p>

              <div className="benefit-row">
                {benefits.map(({ icon, title, copy }) => (
                  <div className="benefit" key={title}>
                    <span className="round-icon">
                      <Icon name={icon} size={24} />
                    </span>
                    <span>
                      <strong>{title}</strong>
                      <small>{copy}</small>
                    </span>
                  </div>
                ))}
              </div>

              <div className="hero-actions">
                <button className="primary-button" type="button">
                  Apply for a Loan
                  <Icon name="arrow" size={18} />
                </button>
                <button className="secondary-button" type="button">
                  Open an Account
                  <Icon name="arrow" size={18} />
                </button>
              </div>
            </div>

            <form
              className="loan-card"
              aria-label={isEligibilityStep ? 'Detailed eligibility form' : 'Loan application starter form'}
              onSubmit={handleFormSubmit}
            >
              <FadeContent key={currentStep} blur duration={650} threshold={0} className="loan-card-fade">
                <div className="loan-heading">
                  <div>
                    <h2
                      id={isEligibilityStep ? 'eligibility-card-title' : undefined}
                      tabIndex={isEligibilityStep ? -1 : undefined}
                    >
                      {isEligibilityStep
                        ? 'Check Your Eligibility'
                        : isLoadingStep
                          ? 'Checking Your Details'
                          : 'Apply for a Loan Online'}
                    </h2>
                    <p>
                      {isEligibilityStep
                        ? 'Complete the short form below to see if you may qualify.'
                        : isLoadingStep
                          ? 'Preparing your secure eligibility form.'
                          : 'Quick. Easy. Secure.'}
                    </p>
                  </div>
                  <span className={isEligibilityStep || isLoadingStep ? 'secure-badge encrypted-badge' : 'secure-badge'}>
                    <Icon name="shield" size={22} />
                    {isEligibilityStep || isLoadingStep ? 'Secure & Encrypted' : 'Secure Application'}
                  </span>
                </div>

                {isLoadingStep ? (
                  <div className="eligibility-loading" role="status" aria-live="polite">
                    <span className="loading-icon">
                      <Icon name="shield" size={30} />
                    </span>
                    <strong>Reviewing your loan details</strong>
                    <p>Loan type, income, and requested amount are being carried into the next step.</p>
                    <div
                      className="progress-track"
                      role="progressbar"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-valuenow={progress}
                      aria-label="Eligibility form loading progress"
                    >
                      <span style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                ) : isEligibilityStep ? (
                  <div className="eligibility-grid">
                    <label htmlFor="fullName">
                      <span>Full Name</span>
                      <input
                        id="fullName"
                        value={eligibilityForm.fullName}
                        onChange={(event) => handleEligibilityChange('fullName', event.target.value)}
                        type="text"
                        autoComplete="name"
                      />
                    </label>

                    <label htmlFor="eligibilityIncome">
                      <span>Monthly Income</span>
                      <select
                        id="eligibilityIncome"
                        value={monthlyIncome}
                        onChange={(event) => setMonthlyIncome(event.target.value)}
                      >
                        <option>BZD 2,000</option>
                        <option>BZD 3,500</option>
                        <option>BZD 5,000</option>
                        <option>BZD 8,000+</option>
                      </select>
                    </label>

                    <label htmlFor="employmentLength">
                      <span>Length of Employment</span>
                      <select
                        id="employmentLength"
                        value={eligibilityForm.employmentLength}
                        onChange={(event) => handleEligibilityChange('employmentLength', event.target.value)}
                      >
                        <option>Less than 1 year</option>
                        <option>1 - 2 years</option>
                        <option>3 - 5 years</option>
                        <option>5+ years</option>
                      </select>
                    </label>

                    <label htmlFor="email">
                      <span>Email Address</span>
                      <input
                        id="email"
                        value={eligibilityForm.email}
                        onChange={(event) => handleEligibilityChange('email', event.target.value)}
                        type="email"
                        autoComplete="email"
                      />
                    </label>

                    <label htmlFor="phone">
                      <span>Phone Number</span>
                      <input
                        id="phone"
                        value={eligibilityForm.phone}
                        onChange={(event) => handleEligibilityChange('phone', event.target.value)}
                        type="tel"
                        autoComplete="tel"
                      />
                    </label>

                    <label htmlFor="eligibilityLoanType">
                      <span>Loan Type</span>
                      <select
                        id="eligibilityLoanType"
                        value={loanType}
                        onChange={(event) => setLoanType(event.target.value)}
                      >
                        <option>Personal Loan</option>
                        <option>Mortgage Loan</option>
                        <option>Vehicle Loan</option>
                        <option>Business Loan</option>
                      </select>
                    </label>

                    <label htmlFor="loanAmountRequested">
                      <span>Loan Amount Requested</span>
                      <input
                        id="loanAmountRequested"
                        value={loanAmountText}
                        onChange={(event) => setLoanAmountText(event.target.value)}
                        type="text"
                        inputMode="decimal"
                      />
                    </label>
                  </div>
                ) : (
                  <>
                    <label htmlFor="starterLoanType">
                      <span>I want to apply for</span>
                      <select
                        id="starterLoanType"
                        value={loanType}
                        onChange={(event) => setLoanType(event.target.value)}
                      >
                        <option>Personal Loan</option>
                        <option>Mortgage Loan</option>
                        <option>Vehicle Loan</option>
                        <option>Business Loan</option>
                      </select>
                    </label>

                    <label htmlFor="starterMonthlyIncome">
                      <span>My estimated monthly income</span>
                      <select
                        id="starterMonthlyIncome"
                        value={monthlyIncome}
                        onChange={(event) => setMonthlyIncome(event.target.value)}
                      >
                        <option>BZD 2,000</option>
                        <option>BZD 3,500</option>
                        <option>BZD 5,000</option>
                        <option>BZD 8,000+</option>
                      </select>
                    </label>

                    <label htmlFor="starterLoanAmount">
                      <span>How much would you like to borrow?</span>
                      <input id="starterLoanAmount" value={formattedLoanAmount} type="text" readOnly />
                    </label>

                    <input
                      className="range"
                      type="range"
                      min="1000"
                      max="100000"
                      step="500"
                      value={loanAmount}
                      onChange={(event) => updateLoanAmount(event.target.value)}
                      aria-label="Loan amount"
                    />
                    <div className="range-labels">
                      <span>BZD 1,000</span>
                      <span>BZD 100,000</span>
                    </div>
                  </>
                )}

                <button className="primary-button full" type="submit" disabled={isLoadingStep}>
                  {isEligibilityStep ? (
                    <>
                      Continue
                      <Icon name="arrow" size={18} />
                    </>
                  ) : isLoadingStep ? (
                    'Loading...'
                  ) : (
                    <>
                      <Icon name="lock" size={18} />
                      Check Eligibility
                    </>
                  )}
                </button>
                <p className="safe-note">
                  <Icon name="lock" size={14} />
                  Your information is safe and secure
                </p>
              </FadeContent>
            </form>
          </div>
        </section>

        <section className="product-grid" aria-label="Banking categories">
          {products.map(({ icon, title, copy, tone }) => (
            <a className={`product-card ${tone}`} href="#" key={title}>
              <Icon name={icon} size={42} />
              <span>
                <strong>{title}</strong>
                <small>{copy}</small>
              </span>
              <span className="product-arrow" aria-hidden="true">&gt;</span>
            </a>
          ))}
        </section>

        <section className="trust-band" aria-label="Why bank with Atlantic Bank">
          <div className="trust-inner">
            <div className="reasons">
              <h2>Why Bank with Atlantic Bank?</h2>
              <div className="reason-grid">
                {reasons.map(({ icon, title, copy }) => (
                  <article className="reason" key={title}>
                    <Icon name={icon} size={35} />
                    <div>
                      <strong>{title}</strong>
                      <p>{copy}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="app-panel">
              <div>
                <h2>Bank Anytime, Anywhere</h2>
                <p>Download the Atlantic Bank Belize App.</p>
                <div className="store-buttons" aria-label="App download links">
                  <a href="#" aria-label="Download Atlantic Bank on the App Store">
                    <img src={appStoreBadge} alt="Download on the App Store" />
                  </a>
                  <a href="#" aria-label="Get Atlantic Bank on Google Play">
                    <img src={googlePlayBadge} alt="Get it on Google Play" />
                  </a>
                </div>
              </div>

              <div className="phone-preview" aria-label="Mobile app preview">
                <img src={mobileLoginScreen} alt="Atlantic Bank mobile app login screen" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="quick-bar" aria-label="Quick actions">
        {quickLinks.map(({ icon, title, copy }) => (
          <a href="#" key={title}>
            <Icon name={icon} size={30} />
            <span>
              <strong>{title}</strong>
              <small>{copy}</small>
            </span>
          </a>
        ))}
      </footer>
    </div>
  );
}

export default App;
