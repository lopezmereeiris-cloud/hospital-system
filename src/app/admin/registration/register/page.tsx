"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import PatientRegistrationForm from "@/components/PatientRegistrationForm";
import { RegistrationFormData } from "@/components/PatientRegistrationForm/interface";



export default function PatientRegistrationPage() {
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  const handleSubmit = (data: RegistrationFormData) => {
    void data;
    setSuccess(true);
    setTimeout(() => {
      router.push("/admin/registration");
    }, 2000);
  };

  return (
    <Box sx={{ maxWidth: 1040, mx: "auto" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          mb: 3,
          flexWrap: "wrap",
        }}
      >
        <Link
          href="/admin/registration"
          style={{
            textDecoration: "none",
            fontSize: "0.82rem",
            fontWeight: 500,
            color: "#4361EE",
          }}
        >
          Patient
        </Link>
        <NavigateNextRoundedIcon sx={{ fontSize: 16, color: "#9CA3AF" }} />
        <Chip
          label="Register Patient"
          size="small"
          sx={{
            bgcolor: "rgba(13, 138, 63, 0.08)",
            color: "#4361EE",
            fontWeight: 600,
            fontSize: "0.75rem",
          }}
        />
      </Box>

      <PatientRegistrationForm onSubmit={handleSubmit} />

      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          Patient registered successfully! Redirecting...
        </Alert>
      </Snackbar>
    </Box>
  );
}
