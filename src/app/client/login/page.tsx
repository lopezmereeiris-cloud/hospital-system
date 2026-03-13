
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { typography } from "@/theme/typography";

export default function ClientLoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError("");
		if (!email || !password) {
			setError("Please fill in all fields.");
			return;
		}
		setLoading(true);
		setTimeout(() => {
			router.push("/client");
		}, 800);
	}

	return (
		<>
			<style>{`
				@media (max-width: 900px) {
					.login-wrapper { flex-direction: column !important; min-width: 0 !important; }
					.login-hero { width: 100% !important; margin: 0 !important; border-radius: 0 0 16px 16px !important; padding: 32px 18px 24px !important; }
					.login-form { padding: 32px 18px !important; }
				}
				@media (max-width: 600px) {
					.login-form { padding: 22px 6vw !important; }
					.login-hero { padding: 22px 6vw 18px !important; }
					.login-wrapper { border-radius: 0 !important; box-shadow: none !important; }
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
					className="login-wrapper"
					style={{
						background: "#fff",
						borderRadius: 20,
						width: "100%",
						maxWidth: 900,
						minHeight: 580,
						display: "flex",
						overflow: "hidden",
						boxShadow: "0 8px 40px rgba(0,0,0,0.13)",
						minWidth: 0,
					}}
				>
					{/* LEFT: FORM */}
					<div
						className="login-form"
						style={{
							flex: 1,
							padding: "44px 48px",
							display: "flex",
							flexDirection: "column",
							minWidth: 0,
						}}
					>
					<div style={{ fontFamily: "DM Serif Display, serif", fontStyle: "italic", fontSize: 17, color: "#b0b0a8", marginBottom: 48 }}>
						Lorem Ipsum
					</div>
					<div style={{ width: 52, height: 52, background: "#1a3a2a", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28 }}>
						<svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2}>
							<path strokeLinecap="round" strokeLinejoin="round" d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 6v4m0 0v4m0-4h4m-4 0H8" />
						</svg>
					</div>
					<div style={{ ...typography.h2, color: "#111", marginBottom: 5, letterSpacing: "-0.02em" }}>
						Welcome Back
					</div>
					<div style={{ ...typography.body1, color: "#999", marginBottom: 36, fontSize: 13.5 }}>
						Sign in to your hospital account
					</div>
					{error && (
						<div style={{ color: "#b71c1c", background: "#fdecea", borderRadius: 6, padding: "8px 12px", marginBottom: 16, fontSize: 13 }}>{error}</div>
					)}
					<form onSubmit={handleSubmit} style={{ width: "100%" }}>
						<div className="field" style={{ marginBottom: 22, position: "relative" }}>
							<label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#888", marginBottom: 7 }}>Email</label>
							<input
								type="email"
								placeholder="you@hospital.gov.ph"
								value={email}
								onChange={e => setEmail(e.target.value)}
								style={{
									width: "100%",
									border: "none",
									borderBottom: "1.5px solid #ddd",
									padding: "9px 0",
									fontSize: 14,
									color: "#111",
									background: "transparent",
									outline: "none",
									transition: "border-color 0.2s",
								}}
							/>
						</div>
						<div className="field" style={{ marginBottom: 22, position: "relative" }}>
							<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
								<label style={{ fontSize: 12, fontWeight: 500, color: "#888", marginBottom: 0 }}>Password</label>
								<a href="#" style={{ fontSize: 12, color: "#999", textDecoration: "none" }}>Forgot?</a>
							</div>
							<input
								type={showPassword ? "text" : "password"}
								placeholder="••••••••"
								value={password}
								onChange={e => setPassword(e.target.value)}
								style={{
									width: "100%",
									border: "none",
									borderBottom: "1.5px solid #ddd",
									padding: "9px 0",
									fontSize: 14,
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
								marginTop: 28,
								letterSpacing: "0.02em",
								transition: "background 0.2s",
								opacity: loading ? 0.7 : 1,
							}}
						>
							{loading ? "Signing in..." : "Sign in"}
						</button>
						<p style={{ textAlign: "center", fontSize: 13, color: "#aaa", marginTop: 18 }}>
							Don't have an account? <Link href="/client/signup" style={{ color: "#1a3a2a", fontWeight: 500, textDecoration: "none" }}>Register</Link>
						</p>
					</form>
				</div>
				{/* RIGHT: HERO */}
				<div
					className="login-hero"
					style={{
						width: "52%",
						background: "radial-gradient(ellipse at 30% 20%, #2d6a4a 0%, #1a3a2a 42%, #0d1f16 100%)",
						borderRadius: 16,
						margin: 10,
						position: "relative",
						overflow: "hidden",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
						padding: "44px 40px 36px",
						minWidth: 0,
					}}
				>
					<div className="hero-text" style={{ position: "relative", zIndex: 1 }}>
						<h2 style={{ fontFamily: "DM Serif Display, serif", fontStyle: "italic", fontSize: 46, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 10 }}>
							Your Health,<br /><span style={{ fontStyle: "normal", fontSize: 42 }}>Always Within</span><br />Reach.
						</h2>
					</div>
					<div className="card-area" style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "flex-end", gap: 10 }}>
						<div className="mini-nav" style={{ width: 42, background: "rgba(255,255,255,0.08)", borderRadius: 14, padding: "14px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 18, backdropFilter: "blur(8px)" }}>
							<div style={{ width: 20, height: 20, borderRadius: 5, background: "rgba(255,255,255,0.15)" }}></div>
							<div style={{ width: 20, height: 20, borderRadius: 5, background: "rgba(255,255,255,0.15)", opacity: 0.5 }}></div>
							<div style={{ width: 20, height: 20, borderRadius: 5, background: "rgba(255,255,255,0.15)", opacity: 0.3 }}></div>
						</div>
						<div className="patient-card" style={{ flex: 1, background: "rgba(255,255,255,0.95)", borderRadius: 16, padding: "20px 20px 18px" }}>
							<div className="card-logo" style={{ width: 26, height: 26, background: "#1a3a2a", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
								<svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2.5}>
									<path strokeLinecap="round" strokeLinejoin="round" d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 6v4m0 0v4m0-4h4m-4 0H8" />
								</svg>
							</div>
							<div className="card-balance-label" style={{ fontSize: 10.5, color: "#aaa", marginBottom: 2 }}>Active Consultations</div>
							<div className="card-balance" style={{ fontSize: 22, fontWeight: 600, color: "#111", letterSpacing: "-0.03em", marginBottom: 16 }}>3 Pending</div>
							<div className="card-divider" style={{ height: 1, background: "#eee", marginBottom: 14 }}></div>
							<div className="card-info" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
								<div>
									<div className="card-name" style={{ fontSize: 11.5, fontWeight: 500, color: "#333" }}>Juan D. Santos</div>
									<div className="card-id" style={{ fontSize: 10.5, color: "#aaa", marginTop: 2 }}>Patient ID: #00-4921</div>
								</div>
								<div className="card-tag" style={{ fontSize: 10, fontWeight: 600, color: "#fff", background: "#1a3a2a", padding: "4px 10px", borderRadius: 20 }}>Active</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			</div>
		</>
	);
}
