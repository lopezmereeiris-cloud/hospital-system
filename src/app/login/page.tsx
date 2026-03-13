'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

const EYE_OPEN_PATH = (
  <>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </>
);

const EYE_CLOSE_PATH = (
  <>
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </>
);

function getStrength(val: string): { score: number; label: string; color: string } {
  if (!val) return { score: 0, label: '', color: '' };
  let score = 0;
  if (val.length >= 8) score++;
  if (/[A-Z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;
  const labels = ['Weak', 'Fair', 'Good', 'Strong'];
  const colors = ['#E74C3C', '#E67E22', '#d4ac0d', '#27AE60'];
  return { score, label: labels[score - 1] || '', color: colors[score - 1] || '' };
}

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<'login' | 'register'>('login');

  // Login state
  const [loginError, setLoginError] = useState(false);
  const [loginShake, setLoginShake] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginPwVisible, setLoginPwVisible] = useState(false);

  // Register state
  const [regFirst, setRegFirst] = useState('');
  const [regLast, setRegLast] = useState('');
  const [regDob, setRegDob] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPw, setRegPw] = useState('');
  const [regPw2, setRegPw2] = useState('');
  const [regPw2Invalid, setRegPw2Invalid] = useState(false);
  const [regPwVisible, setRegPwVisible] = useState(false);
  const [regPw2Visible, setRegPw2Visible] = useState(false);
  const [regTerms, setRegTerms] = useState(false);
  const [regError, setRegError] = useState('');
  const [regLoading, setRegLoading] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);

  const strength = getStrength(regPw);

  // Lock body scroll when on login page
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginLoading(true);
    setTimeout(() => {
      router.push('/admin');
    }, 800);
  }

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setRegError('');
    setRegPw2Invalid(false);

    if (!regFirst || !regLast || !regDob || !regEmail) {
      setRegError('Please fill in all required fields.'); return;
    }
    if (regPw.length < 8) {
      setRegError('Password must be at least 8 characters.'); return;
    }
    if (regPw !== regPw2) {
      setRegError('Passwords do not match.');
      setRegPw2Invalid(true); return;
    }
    if (!regTerms) {
      setRegError('Please accept the Terms of Service to continue.'); return;
    }

    setRegLoading(true);
    setTimeout(() => {
      setRegLoading(false);
      setRegSuccess(true);
    }, 2000);
  }

  const isRegActive = tab === 'register';

  return (
    <div
      className={styles.layout}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── LEFT PANEL ── */}
      <div className={styles.panelLeft}>
        <div className={styles.cross} />
        <div className={`${styles.ring} ${styles.ringOne}`} />
        <div className={`${styles.ring} ${styles.ringTwo}`} />

        <div className={styles.brand}>
          <div className={styles.brandMark}>
            <div className={styles.brandIcon} />
            <span className={styles.brandName}>Meridian Health</span>
          </div>
          <div className={styles.brandSub}>Patient Portal</div>
        </div>

        <div className={styles.leftMid}>
          {/* Login copy */}
          <div className={`${styles.leftSlot} ${isRegActive ? styles.leftSlotHidden : ''}`}>
            <div className={styles.tagline}>
              <h1>Care that centers<br /><em>you.</em></h1>
              <p>Access your medical records, appointments, prescriptions, and care team — all in one secure place.</p>
            </div>
          </div>

          {/* Register copy */}
          <div className={`${styles.leftSlot} ${!isRegActive ? styles.leftSlotHidden : ''}`}>
            <div className={`${styles.regIntro} ${styles.tagline}`}>
              <h1>Join<br /><em>Meridian.</em></h1>
              <p>Create your account in minutes and connect with your full care team.</p>
            </div>
            <div className={styles.regSteps}>
              {[
                { n: '1', title: 'Create your account', desc: 'Provide your basic personal and contact details.' },
                { n: '2', title: 'Verify your identity', desc: "We'll send a confirmation link to your email." },
                { n: '3', title: 'Access your portal', desc: 'View records, book appointments, message your care team.' },
              ].map(step => (
                <div className={styles.regStep} key={step.n}>
                  <div className={styles.stepNum}>{step.n}</div>
                  <div className={styles.stepText}>
                    <h4>{step.title}</h4>
                    <p>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.stats} style={{ opacity: isRegActive ? 0 : 1 }}>
          <div><div className={styles.statValue}>98%</div><div className={styles.statLabel}>Satisfaction</div></div>
          <div className={styles.statDivider} />
          <div><div className={styles.statValue}>240+</div><div className={styles.statLabel}>Specialists</div></div>
          <div className={styles.statDivider} />
          <div><div className={styles.statValue}>24/7</div><div className={styles.statLabel}>Support</div></div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className={styles.panelRight}>
        {/* Tabs */}
        <div className={`${styles.tabs} ${isRegActive ? styles.tabsRegActive : ''}`}>
          <div className={styles.tabSlider} />
          <button
            className={`${styles.tabBtn} ${!isRegActive ? styles.active : ''}`}
            onClick={() => setTab('login')}
          >Sign In</button>
          <button
            className={`${styles.tabBtn} ${isRegActive ? styles.active : ''}`}
            onClick={() => setTab('register')}
          >Create Account</button>
        </div>

        <div className={styles.views}>

          {/* ── LOGIN VIEW ── */}
          <div className={`${styles.view} ${isRegActive ? styles.viewHidden : ''}`}>
            <div className={styles.formHeader}>
              <div className={styles.eyebrow}>Welcome back</div>
              <h2>Sign in to<br />your account</h2>
              <p>Enter your credentials to access your patient portal.</p>
            </div>

            {/* Error alert */}
            <div
              className={`${styles.alert} ${styles.alertError} ${loginError ? styles.alertShow : ''} ${loginShake ? styles.shake : ''}`}
            >
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>Invalid email or password. Please try again.</span>
            </div>

            <form onSubmit={handleLogin} autoComplete="on">
              <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor="lEmail">Email Address</label>
                <div className={styles.inputWrap}>
                  <svg className={styles.fieldIcon} viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 7 10-7" />
                  </svg>
                  <input type="email" id="lEmail" placeholder="your@email.com" autoComplete="email" required />
                </div>
              </div>

              <div className={styles.field}>
                <div className={styles.fieldRow}>
                  <label className={styles.fieldLabel} htmlFor="lPw">Password</label>
                  <a href="#" className={styles.forgot}>Forgot password?</a>
                </div>
                <div className={styles.inputWrap}>
                  <svg className={styles.fieldIcon} viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input type={loginPwVisible ? 'text' : 'password'} id="lPw" placeholder="••••••••" autoComplete="current-password" required />
                  <button type="button" className={styles.togglePw} onClick={() => setLoginPwVisible(v => !v)}>
                    <svg viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      {loginPwVisible ? EYE_CLOSE_PATH : EYE_OPEN_PATH}
                    </svg>
                  </button>
                </div>
              </div>

              <div className={`${styles.checkRow}`} style={{ marginBottom: 20 }}>
                <input type="checkbox" id="remMe" />
                <span onClick={() => (document.getElementById('remMe') as HTMLInputElement)?.click()}>
                  Keep me signed in for 30 days
                </span>
              </div>

              <button type="submit" className={styles.btnPrimary} disabled={loginLoading}>
                {loginLoading && (
                  <svg className={styles.spinner} viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2 A10 10 0 0 1 22 12" />
                  </svg>
                )}
                <span>{loginLoading ? 'Signing in…' : 'Sign In'}</span>
              </button>
            </form>

            <div className={styles.divider}><span>or</span></div>

            <button
              className={styles.btnSecondary}
              onClick={() => alert('Hospital SSO coming soon')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
              </svg>
              Sign in with Hospital SSO
            </button>

            <div className={styles.securityNote}>
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              256-bit SSL encrypted · HIPAA compliant
            </div>
          </div>

          {/* ── REGISTER VIEW ── */}
          <div className={`${styles.view} ${!isRegActive ? styles.viewHidden : ''}`}>

            {/* Success screen */}
            <div className={`${styles.successScreen} ${regSuccess ? styles.successScreenShow : ''}`}>
              <div className={styles.successIcon}>
                <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3>Account Created!</h3>
              <p>We&apos;ve sent a verification link to your email. Please check your inbox to activate your account.</p>
              <button className={styles.btnPrimary} onClick={() => { setTab('login'); setRegSuccess(false); }}>
                Back to Sign In
              </button>
            </div>

            {/* Register form */}
            {!regSuccess && (
              <div>
                <div className={styles.formHeader}>
                  <div className={styles.eyebrow}>New patient</div>
                  <h2>Create your<br />account</h2>
                  <p>Fill in your details to get started with your patient portal.</p>
                </div>

                {regError && (
                  <div className={`${styles.alert} ${styles.alertError} ${styles.alertShow}`}>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span>{regError}</span>
                  </div>
                )}

                <form onSubmit={handleRegister} autoComplete="on" noValidate>
                  <div className={styles.twoCol}>
                    <div className={styles.field}>
                      <label className={styles.fieldLabel} htmlFor="rFirst">First Name</label>
                      <div className={styles.inputWrap}>
                        <svg className={styles.fieldIcon} viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                        </svg>
                        <input type="text" id="rFirst" placeholder="Jane" autoComplete="given-name" value={regFirst} onChange={e => setRegFirst(e.target.value)} required />
                      </div>
                    </div>
                    <div className={styles.field}>
                      <label className={styles.fieldLabel} htmlFor="rLast">Last Name</label>
                      <div className={styles.inputWrap}>
                        <svg className={styles.fieldIcon} viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                        </svg>
                        <input type="text" id="rLast" placeholder="Doe" autoComplete="family-name" value={regLast} onChange={e => setRegLast(e.target.value)} required />
                      </div>
                    </div>
                  </div>

                  <div className={styles.twoCol}>
                    <div className={styles.field}>
                      <label className={styles.fieldLabel} htmlFor="rDob">Date of Birth</label>
                      <div className={styles.inputWrap}>
                        <svg className={styles.fieldIcon} viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        <input type="date" id="rDob" autoComplete="bday" value={regDob} onChange={e => setRegDob(e.target.value)} required />
                      </div>
                    </div>
                    <div className={styles.field}>
                      <label className={styles.fieldLabel} htmlFor="rPhone">Phone</label>
                      <div className={styles.inputWrap}>
                        <svg className={styles.fieldIcon} viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.76a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z" />
                        </svg>
                        <input type="tel" id="rPhone" placeholder="+1 (555) 000-0000" autoComplete="tel" value={regPhone} onChange={e => setRegPhone(e.target.value)} />
                      </div>
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.fieldLabel} htmlFor="rEmail">Email Address</label>
                    <div className={styles.inputWrap}>
                      <svg className={styles.fieldIcon} viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 7 10-7" />
                      </svg>
                      <input type="email" id="rEmail" placeholder="your@email.com" autoComplete="email" value={regEmail} onChange={e => setRegEmail(e.target.value)} required />
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.fieldLabel} htmlFor="rPw">Password</label>
                    <div className={styles.inputWrap}>
                      <svg className={styles.fieldIcon} viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      <input
                        type={regPwVisible ? 'text' : 'password'}
                        id="rPw"
                        placeholder="Min. 8 characters"
                        autoComplete="new-password"
                        value={regPw}
                        onChange={e => setRegPw(e.target.value)}
                        required
                      />
                      <button type="button" className={styles.togglePw} onClick={() => setRegPwVisible(v => !v)}>
                        <svg viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          {regPwVisible ? EYE_CLOSE_PATH : EYE_OPEN_PATH}
                        </svg>
                      </button>
                    </div>
                    {/* Password strength */}
                    {regPw && (
                      <div className={styles.pwStrength}>
                        <div className={styles.strengthBars}>
                          {[1, 2, 3, 4].map(i => (
                            <div
                              key={i}
                              className={`${styles.strengthBar} ${i <= strength.score ? styles[`s${strength.score}` as keyof typeof styles] : ''}`}
                            />
                          ))}
                        </div>
                        <div className={styles.strengthLbl} style={{ color: strength.color }}>{strength.label}</div>
                      </div>
                    )}
                  </div>

                  <div className={styles.field}>
                    <label className={styles.fieldLabel} htmlFor="rPw2">Confirm Password</label>
                    <div className={styles.inputWrap}>
                      <svg className={styles.fieldIcon} viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      <input
                        type={regPw2Visible ? 'text' : 'password'}
                        id="rPw2"
                        placeholder="Re-enter password"
                        autoComplete="new-password"
                        value={regPw2}
                        onChange={e => { setRegPw2(e.target.value); setRegPw2Invalid(false); }}
                        className={regPw2Invalid ? 'invalid' : ''}
                        required
                      />
                      <button type="button" className={styles.togglePw} onClick={() => setRegPw2Visible(v => !v)}>
                        <svg viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          {regPw2Visible ? EYE_CLOSE_PATH : EYE_OPEN_PATH}
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className={styles.checkRow}>
                    <input type="checkbox" id="terms" checked={regTerms} onChange={e => setRegTerms(e.target.checked)} required />
                    <span onClick={() => setRegTerms(v => !v)}>
                      I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>, and consent to electronic collection of my health information per HIPAA regulations.
                    </span>
                  </div>

                  <button type="submit" className={styles.btnPrimary} disabled={regLoading}>
                    {regLoading && (
                      <svg className={styles.spinner} viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 2 A10 10 0 0 1 22 12" />
                      </svg>
                    )}
                    <span>{regLoading ? 'Creating account…' : 'Create Account'}</span>
                  </button>
                </form>

                <div className={styles.securityNote} style={{ marginTop: 14 }}>
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  256-bit SSL encrypted · HIPAA compliant
                </div>
              </div>
            )}
          </div>

        </div>{/* /views */}
      </div>{/* /panel-right */}
    </div>
  );
}
