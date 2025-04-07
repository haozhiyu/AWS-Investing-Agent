"use client";

export function Header() {
  // Inline styles
  const headerStyle = {
    borderBottom: '1px solid #e5e7eb',
    backgroundColor: '#ffffff'
  };

  const headerContentStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0.5rem 1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  const logoContainerStyle = {
    display: 'flex',
    alignItems: 'center'
  };

  const logoIconStyle = {
    width: '2rem',
    height: '2rem',
    borderRadius: '9999px',
    backgroundColor: '#f3e8ff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '0.5rem'
  };

  const logoTextStyle = {
    fontSize: '1.125rem',
    fontWeight: 'bold',
    background: 'linear-gradient(to right, #7e22ce, #0ea5e9)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'transparent'
  };

  const navStyle = {
    display: 'flex'
  };

  const navListStyle = {
    display: 'flex',
    gap: '0.75rem'
  };

  const navLinkStyle = {
    color: '#6b7280',
    fontSize: '0.875rem',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    transition: 'color 0.2s'
  };

  const navIconStyle = {
    marginRight: '0.25rem'
  };

  return (
    <header style={headerStyle}>
      <div style={headerContentStyle}>
        <div style={logoContainerStyle}>
          <div style={logoIconStyle}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#7e22ce" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1rem', height: '1rem' }}>
              <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727" />
            </svg>
          </div>
          <h1 style={logoTextStyle}>
            Crypto Advisor
          </h1>
        </div>
        
        <nav style={navStyle}>
          <ul style={navListStyle}>
            <li>
              <a href="/" style={navLinkStyle}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={navIconStyle}>
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span>Home</span>
              </a>
            </li>
            <li>
              <a href="/about" style={navLinkStyle}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={navIconStyle}>
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                <span>About</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  // Inline styles
  const footerStyle = {
    borderTop: '1px solid #e5e7eb',
    backgroundColor: '#ffffff',
    marginTop: 'auto'
  };

  const footerContentStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '0.5rem'
  };

  const copyrightStyle = {
    fontSize: '0.875rem',
    color: '#6b7280'
  };

  const socialLinksStyle = {
    display: 'flex',
    gap: '1rem'
  };

  const socialLinkStyle = {
    color: '#6b7280',
    transition: 'color 0.2s'
  };

  return (
    <footer style={footerStyle}>
      <div style={footerContentStyle}>
        <p style={copyrightStyle}>
          © {new Date().getFullYear()} Crypto Advisor. All rights reserved.
        </p>
        <div style={socialLinksStyle}>
          <a href="#" style={socialLinkStyle} aria-label="Twitter">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
            </svg>
          </a>
          <a href="#" style={socialLinkStyle} aria-label="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>
          </a>
          <a href="#" style={socialLinkStyle} aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
