"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Alert from "@mui/material/Alert";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";
import VisibilityRounded from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRounded from "@mui/icons-material/VisibilityOffRounded";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import LocalHospitalRounded from "@mui/icons-material/LocalHospitalRounded";
import { palette } from "../../theme/palette";

function getStrength(val: string): { score: number; label: string; color: string } {
  if (!val) return { score: 0, label: "", color: "" };
  const colors = [palette.error.main, palette.warning.main, palette.info.dark, palette.success.main];
  let score = 0;
  if (val.length >= 8) score++;
  if (/[A-Z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;
  const labels = ["Weak", "Fair", "Good", "Strong"];
  return { score, label: labels[score - 1] || "", color: colors[score - 1] || "" };
}

export default function SignupPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const strength = getStrength(password);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!firstName || !lastName || !email) {
      setError("Please fill in all required fields.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!terms) {
      setError("Please accept the Terms of Service to continue.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: palette.grey[100],
        p: { xs: 2, sm: 4 },
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          width: "100%",
          maxWidth: 960,
          borderRadius: 4,
          overflow: "hidden",
          bgcolor: palette.background.paper,
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        }}
      >
        {/* ── Left: Form ── */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            px: { xs: 3, sm: 5, lg: 6 },
            py: { xs: 4, md: 5 },
            overflowY: "auto",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                background: "linear-gradient(135deg, #4A8CA8 0%, #1B5E7B 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LocalHospitalRounded sx={{ color: "#fff", fontSize: 22 }} />
            </Box>
            <Typography fontWeight={700} sx={{ fontSize: "1.1rem", color: palette.text.primary }}>
              MedAdmin
            </Typography>
          </Box>

          {success ? (
            <Box textAlign="center" py={4}>
              <CheckCircleRounded sx={{ fontSize: 52, color: palette.success.main, mb: 2 }} />
              <Typography fontWeight={700} sx={{ fontSize: "1.4rem", mb: 1 }}>
                Account Created!
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={3} maxWidth={320} mx="auto">
                Check your email inbox to verify and activate your account.
              </Typography>
              <Button
                variant="contained"
                onClick={() => router.push("/login")}
                sx={{ py: 1.2, px: 4, borderRadius: 2.5, fontWeight: 600 }}
              >
                Back to Sign In
              </Button>
            </Box>
          ) : (
            <>
              <Typography fontWeight={700} sx={{ fontSize: "1.5rem", mb: 0.5, color: palette.text.primary }}>
                Get Started
              </Typography>
              <Typography variant="body2" sx={{ color: palette.text.secondary, mb: 1.5 }}>
                Create your admin account
              </Typography>

              <Divider sx={{ mb: 3 }} />

              {error && (
                <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                  {error}
                </Alert>
              )}

              <form onSubmit={handleSubmit} autoComplete="on" noValidate>
                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, mb: 2 }}>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600} mb={0.75} color="text.primary">
                      First Name
                    </Typography>
                    <TextField
                      placeholder="Jane"
                      fullWidth
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      size="small"
                    />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600} mb={0.75} color="text.primary">
                      Last Name
                    </Typography>
                    <TextField
                      placeholder="Doe"
                      fullWidth
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      size="small"
                    />
                  </Box>
                </Box>

                <Typography variant="subtitle2" fontWeight={600} mb={0.75} color="text.primary">
                  Email
                </Typography>
                <TextField
                  type="email"
                  placeholder="you@hospital.com"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  size="small"
                  sx={{ mb: 2 }}
                />

                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, mb: 0.5 }}>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600} mb={0.75} color="text.primary">
                      Password
                    </Typography>
                    <TextField
                      type={showPassword ? "text" : "password"}
                      placeholder="Min. 8 characters"
                      fullWidth
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      size="small"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword((v) => !v)} edge="end" size="small">
                              {showPassword ? (
                                <VisibilityOffRounded sx={{ fontSize: 20, color: palette.grey[400] }} />
                              ) : (
                                <VisibilityRounded sx={{ fontSize: 20, color: palette.grey[400] }} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600} mb={0.75} color="text.primary">
                      Confirm Password
                    </Typography>
                    <TextField
                      type={showConfirm ? "text" : "password"}
                      placeholder="Re-enter password"
                      fullWidth
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      size="small"
                      error={!!confirmPassword && confirmPassword !== password}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowConfirm((v) => !v)} edge="end" size="small">
                              {showConfirm ? (
                                <VisibilityOffRounded sx={{ fontSize: 20, color: palette.grey[400] }} />
                              ) : (
                                <VisibilityRounded sx={{ fontSize: 20, color: palette.grey[400] }} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </Box>

                {password && (
                  <Box mt={0.5} mb={1}>
                    <LinearProgress
                      variant="determinate"
                      value={strength.score * 25}
                      sx={{
                        height: 4,
                        borderRadius: 2,
                        bgcolor: palette.grey[200],
                        "& .MuiLinearProgress-bar": { bgcolor: strength.color, borderRadius: 2 },
                      }}
                    />
                    <Typography variant="caption" sx={{ color: strength.color, mt: 0.25, display: "block" }}>
                      {strength.label}
                    </Typography>
                  </Box>
                )}

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={terms}
                      onChange={(e) => setTerms(e.target.checked)}
                      sx={{ color: palette.grey[400], "&.Mui-checked": { color: "#1B5E7B" } }}
                    />
                  }
                  label={
                    <Typography variant="caption" color="text.secondary">
                      I agree to the{" "}
                      <Link href="#" style={{ color: "#1B5E7B", textDecoration: "none", fontWeight: 600 }}>
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="#" style={{ color: "#1B5E7B", textDecoration: "none", fontWeight: 600 }}>
                        Privacy Policy
                      </Link>
                    </Typography>
                  }
                  sx={{ alignItems: "flex-start", mt: 1, mb: 2.5, mx: 0 }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                  sx={{ py: 1.3, fontWeight: 600, borderRadius: 2.5 }}
                >
                  {loading ? "Creating account…" : "Sign Up"}
                </Button>
              </form>

              <Typography variant="body2" color="text.secondary" textAlign="center" mt={3}>
                Already have an account?{" "}
                <Link
                  href="/login"
                  style={{ color: "#1B5E7B", fontWeight: 600, textDecoration: "none" }}
                >
                  Log in
                </Link>
              </Typography>
            </>
          )}
        </Box>

        {/* ── Right: Brand Panel ── */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(160deg, #1B5E7B 0%, #4A8CA8 100%)",
            color: "#fff",
            px: 6,
            py: 8,
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "2.4rem",
              lineHeight: 1.2,
              textAlign: "center",
              mb: 2,
            }}
          >
            Join{" "}
            <Box component="span" sx={{ fontStyle: "italic", fontWeight: 400 }}>
              the Future
            </Box>
            <br />
            of Healthcare
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "rgba(255,255,255,0.65)", textAlign: "center", maxWidth: 320, lineHeight: 1.7 }}
          >
            Start managing your hospital with a powerful, intuitive platform built for modern healthcare.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
