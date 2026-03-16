"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import Divider from "@mui/material/Divider";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { alpha } from "@mui/material/styles";
import { palette } from "@/theme/palette";
import { useHospitalSettings, HospitalSettings } from "@/lib/HospitalSettingsContext";

type Section = "general" | "notifications" | "system";

const SECTIONS: { value: Section; label: string; icon: React.ReactNode; description: string }[] = [
  { value: "general", label: "General", icon: <LocalHospitalRoundedIcon sx={{ fontSize: 20 }} />, description: "Hospital profile and contact" },
  { value: "notifications", label: "Notifications", icon: <NotificationsRoundedIcon sx={{ fontSize: 20 }} />, description: "Alerts and reminders" },
  { value: "system", label: "System", icon: <TuneRoundedIcon sx={{ fontSize: 20 }} />, description: "Localization and formatting" },
];

const inputSx = { "& .MuiOutlinedInput-root": { borderRadius: "10px" } };

export default function AuditorSettingsPage() {
  const { settings } = useHospitalSettings();
  const [form] = useState<HospitalSettings>(settings);
  const [section, setSection] = useState<Section>("general");

  return (
    <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start", flexDirection: { xs: "column", md: "row" } }}>
      <Paper elevation={0} sx={{ width: { xs: "100%", md: 240 }, flexShrink: 0, borderRadius: "16px", border: `1px solid ${palette.grey[200]}`, overflow: "hidden" }}>
        <Box sx={{ p: 2.5, borderBottom: `1px solid ${palette.grey[200]}` }}>
          <Typography sx={{ fontSize: "0.72rem", fontWeight: 700, color: "text.secondary", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Auditor View
          </Typography>
        </Box>
        <Box sx={{ p: 1 }}>
          {SECTIONS.map((s) => (
            <Box
              key={s.value}
              onClick={() => setSection(s.value)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                p: "10px 14px",
                borderRadius: "10px",
                cursor: "pointer",
                mb: 0.4,
                backgroundColor: section === s.value ? alpha(palette.primary.main, 0.08) : "transparent",
                color: section === s.value ? palette.primary.main : palette.text.secondary,
                transition: "all 0.18s ease",
                "&:hover": { backgroundColor: section === s.value ? alpha(palette.primary.main, 0.08) : palette.grey[100] },
              }}
            >
              {s.icon}
              <div>
                <Typography sx={{ fontSize: "0.84rem", fontWeight: section === s.value ? 600 : 500, color: section === s.value ? palette.primary.main : "text.primary" }}>
                  {s.label}
                </Typography>
                <Typography sx={{ fontSize: "0.7rem", color: "text.secondary", mt: 0.1 }}>
                  {s.description}
                </Typography>
              </div>
            </Box>
          ))}
        </Box>
      </Paper>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Paper elevation={0} sx={{ borderRadius: "16px", border: `1px solid ${palette.grey[200]}`, overflow: "hidden" }}>
          <Box sx={{ p: { xs: 2.5, sm: 3 }, borderBottom: `1px solid ${palette.grey[200]}`, display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: "12px",
                background: section === "general" ? `linear-gradient(135deg, ${palette.primary.main}, #6C83F6)` : section === "notifications" ? `linear-gradient(135deg, ${palette.warning.main}, #FEC84B)` : "linear-gradient(135deg, #7C3AED, #A78BFA)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {section === "general" && <LocalHospitalRoundedIcon sx={{ color: "#fff", fontSize: 22 }} />}
              {section === "notifications" && <NotificationsRoundedIcon sx={{ color: "#fff", fontSize: 22 }} />}
              {section === "system" && <TuneRoundedIcon sx={{ color: "#fff", fontSize: 22 }} />}
            </Box>
            <div>
              <Typography sx={{ fontSize: "1.1rem", fontWeight: 700, color: "text.primary" }}>
                {SECTIONS.find((s) => s.value === section)?.label}
              </Typography>
              <Typography sx={{ fontSize: "0.8rem", color: "text.secondary", mt: 0.15 }}>
                Auditor accounts can inspect settings but cannot change them.
              </Typography>
            </div>
            <Box sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 1, color: "text.secondary" }}>
              <VisibilityRoundedIcon sx={{ fontSize: 18 }} />
              <Typography sx={{ fontSize: "0.8rem", fontWeight: 600 }}>Read-only</Typography>
            </Box>
          </Box>

          <Box sx={{ p: { xs: 2.5, sm: 3 } }}>
            {section === "general" && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                <Typography sx={{ fontSize: "0.76rem", fontWeight: 700, color: "text.secondary", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Hospital Profile
                </Typography>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2.2 }}>
                  <TextField label="Hospital Name" fullWidth value={form.hospitalName} InputLabelProps={{ shrink: true }} sx={inputSx} disabled />
                  <TextField label="Tagline / Motto" fullWidth value={form.tagline} InputLabelProps={{ shrink: true }} sx={inputSx} disabled />
                </Box>
                <TextField label="Address" fullWidth multiline rows={2} value={form.address} InputLabelProps={{ shrink: true }} sx={inputSx} disabled />
                <TextField label="Admin / Director Name" fullWidth value={form.adminName} InputLabelProps={{ shrink: true }} sx={inputSx} disabled />
                <Divider sx={{ my: 0.5 }} />
                <Typography sx={{ fontSize: "0.76rem", fontWeight: 700, color: "text.secondary", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Contact Information
                </Typography>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2.2 }}>
                  <TextField label="Contact Number" fullWidth value={form.contactNumber} InputLabelProps={{ shrink: true }} sx={inputSx} disabled />
                  <TextField label="Emergency Hotline" fullWidth value={form.emergencyHotline} InputLabelProps={{ shrink: true }} sx={inputSx} disabled />
                  <TextField label="Email Address" fullWidth value={form.email} InputLabelProps={{ shrink: true }} sx={inputSx} disabled />
                  <TextField label="Website" fullWidth value={form.website} InputLabelProps={{ shrink: true }} sx={inputSx} disabled />
                </Box>
                <Divider sx={{ my: 0.5 }} />
                <Typography sx={{ fontSize: "0.76rem", fontWeight: 700, color: "text.secondary", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Operations
                </Typography>
                <TextField label="Operating Hours" fullWidth value={form.operatingHours} InputLabelProps={{ shrink: true }} sx={inputSx} disabled />
              </Box>
            )}

            {section === "notifications" && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                {([
                  { field: "appointmentReminders" as const, label: "Appointment Reminders", description: "Send reminders before scheduled appointments to patients and doctors." },
                  { field: "emailNotifications" as const, label: "Email Notifications", description: "Receive system notifications via email for important events." },
                  { field: "smsNotifications" as const, label: "SMS Notifications", description: "Send text message alerts for appointments and emergencies." },
                  { field: "lowStockAlerts" as const, label: "Low Stock Alerts", description: "Get notified when medicine inventory falls below threshold levels." },
                  { field: "billingAlerts" as const, label: "Billing Alerts", description: "Receive alerts for overdue bills, partial payments, and YAKAP balance updates." },
                ] as const).map((item, idx, arr) => (
                  <React.Fragment key={item.field}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", py: 2, px: 0.5 }}>
                      <div>
                        <Typography sx={{ fontSize: "0.9rem", fontWeight: 600, color: "text.primary" }}>{item.label}</Typography>
                        <Typography sx={{ fontSize: "0.78rem", color: "text.secondary", mt: 0.3, maxWidth: 420 }}>{item.description}</Typography>
                      </div>
                      <Switch checked={!!form[item.field]} color="primary" disabled />
                    </Box>
                    {idx < arr.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </Box>
            )}

            {section === "system" && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                <Typography sx={{ fontSize: "0.76rem", fontWeight: 700, color: "text.secondary", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Localization
                </Typography>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" }, gap: 2.2 }}>
                  <TextField select label="Language" fullWidth value={form.language} InputLabelProps={{ shrink: true }} sx={inputSx} disabled><MenuItem value="English">English</MenuItem><MenuItem value="Filipino">Filipino</MenuItem></TextField>
                  <TextField select label="Date Format" fullWidth value={form.dateFormat} InputLabelProps={{ shrink: true }} sx={inputSx} disabled><MenuItem value="MM/DD/YYYY">MM/DD/YYYY</MenuItem><MenuItem value="DD/MM/YYYY">DD/MM/YYYY</MenuItem><MenuItem value="YYYY-MM-DD">YYYY-MM-DD</MenuItem></TextField>
                  <TextField select label="Currency" fullWidth value={form.currency} InputLabelProps={{ shrink: true }} sx={inputSx} disabled><MenuItem value="PHP">PHP</MenuItem><MenuItem value="USD">USD</MenuItem></TextField>
                </Box>

                <Divider sx={{ my: 0.5 }} />
                <Typography sx={{ fontSize: "0.76rem", fontWeight: 700, color: "text.secondary", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  System Info
                </Typography>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
                  {[
                    { label: "System Version", value: "1.0.0" },
                    { label: "Last Updated", value: "March 16, 2026" },
                    { label: "Environment", value: "Production" },
                    { label: "Database", value: "Connected" },
                  ].map((item) => (
                    <Box key={item.label} sx={{ p: 2, borderRadius: "12px", backgroundColor: "grey.50", border: `1px solid ${palette.divider}` }}>
                      <Typography sx={{ fontSize: "0.68rem", fontWeight: 700, color: "text.secondary", textTransform: "uppercase", letterSpacing: "0.06em", mb: 0.4 }}>
                        {item.label}
                      </Typography>
                      <Typography sx={{ fontSize: "0.88rem", fontWeight: 500, color: "text.primary" }}>
                        {item.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
