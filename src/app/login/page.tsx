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
import Alert from "@mui/material/Alert";
import Divider from "@mui/material/Divider";
import VisibilityRounded from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRounded from "@mui/icons-material/VisibilityOffRounded";
import LocalHospitalRounded from "@mui/icons-material/LocalHospitalRounded";
import { palette } from "../../theme/palette";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      router.push("/admin");
    }, 800);
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
          minHeight: { md: 560 },
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
            py: { xs: 5, md: 6 },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 4 }}>
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

          <Typography fontWeight={700} sx={{ fontSize: "1.5rem", mb: 0.5, color: palette.text.primary }}>
            Welcome Back
          </Typography>
          <Typography variant="body2" sx={{ color: palette.text.secondary, mb: 1.5 }}>
            Sign in to your admin account
          </Typography>

          <Divider sx={{ mb: 3 }} />

          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit} autoComplete="on">
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
              sx={{ mb: 2.5 }}
            />

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.75 }}>
              <Typography variant="subtitle2" fontWeight={600} color="text.primary">
                Password
              </Typography>
              <Link
                href="#"
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "#1B5E7B",
                  textDecoration: "none",
                }}
              >
                Forgot?
              </Link>
            </Box>
            <TextField
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              size="small"
              sx={{ mb: 3.5 }}
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

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{ py: 1.3, fontWeight: 600, borderRadius: 2.5 }}
            >
              {loading ? "Signing in…" : "Sign In"}
            </Button>
          </form>

          <Typography variant="body2" color="text.secondary" textAlign="center" mt={3}>
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              style={{ color: "#1B5E7B", fontWeight: 600, textDecoration: "none" }}
            >
              Sign up
            </Link>
          </Typography>
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
            position: "relative",
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
            Hospital{" "}
            <Box component="span" sx={{ fontStyle: "italic", fontWeight: 400 }}>
              Administration
            </Box>
            <br />
            System
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "rgba(255,255,255,0.65)", textAlign: "center", maxWidth: 320, lineHeight: 1.7 }}
          >
            Manage patients, appointments, billing, inventory and more — all in one place.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
