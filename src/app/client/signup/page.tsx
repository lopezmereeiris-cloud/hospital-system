"use client";


import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { typography } from "@/theme/typography";


export default function ClientSignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!fullName || !mobile || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!terms) {
      setError("Please accept the terms and conditions.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1200);
  }

  return (
    <>
      <style>{`
        @media (max-width: 900px) {
          .signup-wrapper { flex-direction: column !important; min-width: 0 !important; }
          .signup-hero { width: 100% !important; margin: 0 !important; border-radius: 0 0 16px 16px !important; padding: 32px 18px 24px !important; }
          .signup-form { padding: 32px 18px !important; }
        }
        @media (max-width: 600px) {
          .signup-form { padding: 22px 6vw !important; }
          .signup-hero { padding: 22px 6vw 18px !important; }
          .signup-wrapper { border-radius: 0 !important; box-shadow: none !important; }
        }
      `}</style>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#e8e8e4",
          fontFamily: typography.fontFamily,
          padding: 24,
        }}
      >
        <div
          className="signup-wrapper"
          style={{
            background: "#fff",
            borderRadius: 20,
            width: "100%",
            maxWidth: 900,
            display: "flex",
            overflow: "hidden",
            boxShadow: "0 8px 40px rgba(0,0,0,0.13)",
            minWidth: 0,
          }}
        >
          {/* LEFT: FORM */}
          <div
            className="signup-form"
            style={{
              flex: 1,
              padding: "40px 48px",
              display: "flex",
              flexDirection: "column",
              minWidth: 0,
            }}
          >
          <div style={{ fontFamily: "DM Serif Display, serif", fontStyle: "italic", fontSize: 17, color: "#b0b0a8", marginBottom: 36 }}>
            Lorem Ipsum
          </div>
          <div style={{ width: 50, height: 50, background: "#1a3a2a", borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 22 }}>
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 6v4m0 0v4m0-4h4m-4 0H8" />
            </svg>
          </div>
          <div style={{ fontSize: 21, fontWeight: 600, color: "#111", marginBottom: 4, letterSpacing: "-0.02em" }}>
            Create Account
          </div>
          <div style={{ fontSize: 13, color: "#999", marginBottom: 28 }}>
            Register as a new patient — it only takes a minute
          </div>
          {success ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ fontSize: 44, color: "#1a3a2a", marginBottom: 10 }}>✓</div>
              <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 8 }}>Account Created!</div>
              <div style={{ fontSize: 14, color: "#888", marginBottom: 24 }}>Check your email inbox to verify and activate your account.</div>
              <button
                type="button"
                onClick={() => router.push("/client/login")}
                style={{ padding: "12px 32px", background: "#1a3a2a", color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, fontSize: 15, cursor: "pointer" }}
              >
                Back to Sign In
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              {error && (
                <div style={{ color: "#b71c1c", background: "#fdecea", borderRadius: 6, padding: "8px 12px", marginBottom: 16, fontSize: 13 }}>{error}</div>
              )}
              <div style={{ display: "flex", gap: 20, marginBottom: 0 }}>
                <div className="field" style={{ flex: 1, marginBottom: 18 }}>
                  <label style={{ display: "block", fontSize: 11.5, fontWeight: 500, color: "#888", marginBottom: 6, letterSpacing: "0.01em" }}>Full Name</label>
                  <input
                    type="text"
                    placeholder="Juan D. Santos"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    style={{
                      width: "100%",
                      border: "none",
                      borderBottom: "1.5px solid #ddd",
                      padding: "8px 0",
                      fontSize: 13.5,
                      color: "#111",
                      background: "transparent",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                  />
                </div>
                <div className="field" style={{ flex: 1, marginBottom: 18 }}>
                  <label style={{ display: "block", fontSize: 11.5, fontWeight: 500, color: "#888", marginBottom: 6, letterSpacing: "0.01em" }}>Mobile Number</label>
                  <input
                    type="tel"
                    placeholder="+63 912 345 6789"
                    value={mobile}
                    onChange={e => setMobile(e.target.value)}
                    style={{
                      width: "100%",
                      border: "none",
                      borderBottom: "1.5px solid #ddd",
                      padding: "8px 0",
                      fontSize: 13.5,
                      color: "#111",
                      background: "transparent",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                  />
                </div>
              </div>
              <div className="field" style={{ marginBottom: 18 }}>
                <label style={{ display: "block", fontSize: 11.5, fontWeight: 500, color: "#888", marginBottom: 6, letterSpacing: "0.01em" }}>Email Address</label>
                <input
                  type="email"
                  placeholder="you@hospital.gov.ph"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    border: "none",
                    borderBottom: "1.5px solid #ddd",
                    padding: "8px 0",
                    fontSize: 13.5,
                    color: "#111",
                    background: "transparent",
                    outline: "none",
                    transition: "border-color 0.2s",
                  }}
                />
              </div>
              <div style={{ display: "flex", gap: 20 }}>
                <div className="field" style={{ flex: 1, marginBottom: 18 }}>
                  <label style={{ display: "block", fontSize: 11.5, fontWeight: 500, color: "#888", marginBottom: 6, letterSpacing: "0.01em" }}>Password</label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      style={{
                        width: "100%",
                        border: "none",
                        borderBottom: "1.5px solid #ddd",
                        padding: "8px 0",
                        fontSize: 13.5,
                        color: "#111",
                        background: "transparent",
                        outline: "none",
                        transition: "border-color 0.2s",
                        paddingRight: 28,
                      }}
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowPassword(v => !v)}
                      style={{
                        position: "absolute",
                        right: 0,
                        bottom: 8,
                        cursor: "pointer",
                        color: showPassword ? "#1a3a2a" : "#bbb",
                        background: "none",
                        border: "none",
                        padding: 0,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="field" style={{ flex: 1, marginBottom: 18 }}>
                  <label style={{ display: "block", fontSize: 11.5, fontWeight: 500, color: "#888", marginBottom: 6, letterSpacing: "0.01em" }}>Confirm Password</label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showConfirm ? "text" : "password"}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      style={{
                        width: "100%",
                        border: "none",
                        borderBottom: "1.5px solid #ddd",
                        padding: "8px 0",
                        fontSize: 13.5,
                        color: "#111",
                        background: "transparent",
                        outline: "none",
                        transition: "border-color 0.2s",
                        paddingRight: 28,
                      }}
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowConfirm(v => !v)}
                      style={{
                        position: "absolute",
                        right: 0,
                        bottom: 8,
                        cursor: "pointer",
                        color: showConfirm ? "#1a3a2a" : "#bbb",
                        background: "none",
                        border: "none",
                        padding: 0,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="terms" style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 22, marginTop: 4 }}>
                <input
                  type="checkbox"
                  id="tc"
                  checked={terms}
                  onChange={e => setTerms(e.target.checked)}
                  style={{ width: 16, height: 16, minWidth: 16, accentColor: "#1a3a2a", marginTop: 1, cursor: "pointer" }}
                />
                <label htmlFor="tc" style={{ fontSize: 12, color: "#888", lineHeight: 1.5, cursor: "pointer" }}>
                  I agree to the <a href="#" style={{ color: "#1a3a2a", fontWeight: 500, textDecoration: "none" }}>Terms & Conditions</a> and <a href="#" style={{ color: "#1a3a2a", fontWeight: 500, textDecoration: "none" }}>Privacy Policy</a> of MediCare Hospital
                </label>
              </div>
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: 13,
                  background: "#1a3a2a",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: loading ? "not-allowed" : "pointer",
                  letterSpacing: "0.02em",
                  transition: "background 0.2s",
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? "Creating account…" : "Create Account"}
              </button>
              <p style={{ textAlign: "center", fontSize: 13, color: "#aaa", marginTop: 16 }}>
                Already have an account? <Link href="/client/login" style={{ color: "#1a3a2a", fontWeight: 500, textDecoration: "none" }}>Log in</Link>
              </p>
            </form>
          )}
        </div>
        {/* RIGHT: HERO */}
        <div
          className="signup-hero"
          style={{
            width: "48%",
            background: "radial-gradient(ellipse at 30% 20%, #2d6a4a 0%, #1a3a2a 42%, #0d1f16 100%)",
            borderRadius: 16,
            margin: 10,
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "44px 36px 36px",
            minWidth: 0,
          }}
        >
          <div className="hero-text" style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{ fontFamily: "DM Serif Display, serif", fontStyle: "italic", fontSize: 42, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 16 }}>
              Begin Your<br /><span style={{ fontStyle: "normal" }}>Care</span><br />Journey.
            </h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, maxWidth: 240 }}>
              Join thousands of patients managing their health with ease through our secure portal.
            </p>
          </div>
          <div className="steps" style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
            <div className="step" style={{ display: "flex", alignItems: "center", gap: 13, background: "rgba(255,255,255,0.07)", borderRadius: 12, padding: "13px 16px", backdropFilter: "blur(6px)" }}>
              <div className="step-num done" style={{ width: 26, height: 26, minWidth: 26, borderRadius: "50%", background: "#fff", color: "#1a3a2a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600 }}>1</div>
              <div className="step-info" style={{ flex: 1 }}>
                <div className="step-title" style={{ fontSize: 12, fontWeight: 500, color: "#fff" }}>Create your account</div>
                <div className="step-sub" style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 1 }}>Fill in your basic details</div>
              </div>
              <svg className="step-check done" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="step" style={{ display: "flex", alignItems: "center", gap: 13, background: "rgba(255,255,255,0.07)", borderRadius: 12, padding: "13px 16px", backdropFilter: "blur(6px)" }}>
              <div className="step-num" style={{ width: 26, height: 26, minWidth: 26, borderRadius: "50%", background: "rgba(255,255,255,0.12)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600 }}>2</div>
              <div className="step-info" style={{ flex: 1 }}>
                <div className="step-title" style={{ fontSize: 12, fontWeight: 500, color: "#fff" }}>Verify your identity</div>
                <div className="step-sub" style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 1 }}>Email & mobile confirmation</div>
              </div>
              <svg className="step-check" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="step" style={{ display: "flex", alignItems: "center", gap: 13, background: "rgba(255,255,255,0.07)", borderRadius: 12, padding: "13px 16px", backdropFilter: "blur(6px)" }}>
              <div className="step-num" style={{ width: 26, height: 26, minWidth: 26, borderRadius: "50%", background: "rgba(255,255,255,0.12)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600 }}>3</div>
              <div className="step-info" style={{ flex: 1 }}>
                <div className="step-title" style={{ fontSize: 12, fontWeight: 500, color: "#fff" }}>Access your portal</div>
                <div className="step-sub" style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 1 }}>View records & appointments</div>
              </div>
              <svg className="step-check" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
