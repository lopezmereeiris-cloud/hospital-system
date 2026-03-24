"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Divider from "@mui/material/Divider";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import { alpha } from "@mui/material/styles";
import { palette } from "@/theme/palette";
import { useHospitalSettings, HospitalSettings } from "@/lib/HospitalSettingsContext";
import { useUser } from "@/context/UserContext";
import { appendAuditLog, buildFieldChanges } from "@/lib/auditLogs";

type Section = "general" | "notifications" | "system";

const SECTIONS: { value: Section; label: string; icon: React.ReactNode; description: string }[] = [
  { value: "general", label: "General", icon: <LocalHospitalRoundedIcon sx={{ fontSize: 20 }} />, description: "Hospital profile and contact" },
  { value: "notifications", label: "Notifications", icon: <NotificationsRoundedIcon sx={{ fontSize: 20 }} />, description: "Alerts and reminders" },
  { value: "system", label: "System", icon: <TuneRoundedIcon sx={{ fontSize: 20 }} />, description: "Localization and formatting" },
];

const inputSx = { "& .MuiOutlinedInput-root": { borderRadius: "10px" } };

export default function SettingsPage() {
  const { user } = useUser();
  const { settings, updateSettings } = useHospitalSettings();
  const [form, setForm] = useState<HospitalSettings>(settings);
  const [saved, setSaved] = useState(false);
  const [section, setSection] = useState<Section>("general");

  const handleChange = (field: keyof HospitalSettings) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleToggle = (field: keyof HospitalSettings) => () => {
    setForm((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = () => {
    const changes = buildFieldChanges(
      settings as unknown as Record<string, unknown>,
      form as unknown as Record<string, unknown>
    );
    updateSettings(form);
    if (changes.length > 0) {
      appendAuditLog({
        action: "UPDATE",
        module: "Settings",
        entity: "Hospital Settings",
        entityId: section,
        actor: { name: user.name, role: user.role },
        summary: `Updated ${section} settings.`,
        changes,
      });
    }
    setSaved(true);
  };

  return (
    <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start", flexDirection: { xs: "column", md: "row" } }}>
      {/* Sidebar Navigation */}
      <Paper
        elevation={0}
        sx={{
          width: { xs: "100%", md: 240 },
          flexShrink: 0,
          borderRadius: "16px",
          border: `1px solid ${palette.grey[200]}`,
          overflow: "hidden",
        }}
      >
        <Box sx={{ p: 2.5, borderBottom: `1px solid ${palette.grey[200]}` }}>
          <Typography sx={{ fontSize: "0.72rem", fontWeight: 700, color: "text.secondary", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Settings
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
                "&:hover": {
                  backgroundColor: section === s.value ? alpha(palette.primary.main, 0.08) : palette.grey[100],
                },
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

      {/* Main content */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: "16px",
            border: `1px solid ${palette.grey[200]}`,
            overflow: "hidden",
          }}
        >
          {/* Section Header */}
          <Box
            sx={{
              p: { xs: 2.5, sm: 3 },
              borderBottom: `1px solid ${palette.grey[200]}`,
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: "12px",
                background: section === "general"
                  ? `linear-gradient(135deg, ${palette.primary.main}, #6C83F6)`
                  : section === "notifications"
                    ? `linear-gradient(135deg, ${palette.warning.main}, #FEC84B)`
                    : "linear-gradient(135deg, #7C3AED, #A78BFA)",
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
                {section === "general" && "Manage hospital profile, contact info, and operational details."}
                {section === "notifications" && "Configure notification preferences and alert triggers."}
                {section === "system" && "Set up localization, date formats, and regional preferences."}
              </Typography>
            </div>
          </Box>

          {/* Section Body */}
          <Box sx={{ p: { xs: 2.5, sm: 3 } }}>
            {section === "general" && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                <Typography sx={{ fontSize: "0.76rem", fontWeight: 700, color: "text.secondary", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Hospital Profile
                </Typography>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2.2 }}>
                  <TextField label="Hospital Name" fullWidth value={form.hospitalName} onChange={handleChange("hospitalName")} placeholder="e.g. Manila General Hospital" InputLabelProps={{ shrink: true }} sx={inputSx} />
                  <TextField label="Tagline / Motto" fullWidth value={form.tagline} onChange={handleChange("tagline")} placeholder="e.g. Quality Healthcare for All" InputLabelProps={{ shrink: true }} sx={inputSx} />
                </Box>
                <TextField label="Address" fullWidth multiline rows={2} value={form.address} onChange={handleChange("address")} placeholder="e.g. 123 Taft Avenue, Manila" InputLabelProps={{ shrink: true }} sx={inputSx} />
                <TextField label="Admin / Director Name" fullWidth value={form.adminName} onChange={handleChange("adminName")} placeholder="e.g. Dr. Juan Dela Cruz" InputLabelProps={{ shrink: true }} sx={inputSx} />

                <Divider sx={{ my: 0.5 }} />
                <Typography sx={{ fontSize: "0.76rem", fontWeight: 700, color: "text.secondary", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Contact Information
                </Typography>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2.2 }}>
                  <TextField label="Contact Number" fullWidth value={form.contactNumber} onChange={handleChange("contactNumber")} placeholder="e.g. (02) 8521-8450" InputLabelProps={{ shrink: true }} sx={inputSx} />
                  <TextField label="Emergency Hotline" fullWidth value={form.emergencyHotline} onChange={handleChange("emergencyHotline")} placeholder="e.g. 143 or (02) 911-0000" InputLabelProps={{ shrink: true }} sx={inputSx} />
                  <TextField label="Email Address" fullWidth value={form.email} onChange={handleChange("email")} placeholder="e.g. info@hospital.ph" InputLabelProps={{ shrink: true }} sx={inputSx} />
                  <TextField label="Website" fullWidth value={form.website} onChange={handleChange("website")} placeholder="e.g. www.hospital.ph" InputLabelProps={{ shrink: true }} sx={inputSx} />
                </Box>

                <Divider sx={{ my: 0.5 }} />
                <Typography sx={{ fontSize: "0.76rem", fontWeight: 700, color: "text.secondary", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Operations
                </Typography>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2.2 }}>
                  <TextField label="Operating Hours" fullWidth value={form.operatingHours} onChange={handleChange("operatingHours")} placeholder="e.g. 24/7 or Mon-Sat 8AM-5PM" InputLabelProps={{ shrink: true }} sx={inputSx} />
                </Box>
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
                        <Typography sx={{ fontSize: "0.9rem", fontWeight: 600, color: "text.primary" }}>
                          {item.label}
                        </Typography>
                        <Typography sx={{ fontSize: "0.78rem", color: "text.secondary", mt: 0.3, maxWidth: 420 }}>
                          {item.description}
                        </Typography>
                      </div>
                      <Switch
                        checked={!!form[item.field]}
                        onChange={handleToggle(item.field)}
                        color="primary"
                      />
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
                  <TextField select label="Language" fullWidth value={form.language} onChange={handleChange("language")} InputLabelProps={{ shrink: true }} sx={inputSx}>
                    <MenuItem value="English">English</MenuItem>
                    <MenuItem value="Filipino">Filipino</MenuItem>
                  </TextField>
                  <TextField select label="Date Format" fullWidth value={form.dateFormat} onChange={handleChange("dateFormat")} InputLabelProps={{ shrink: true }} sx={inputSx}>
                    <MenuItem value="MM/DD/YYYY">MM/DD/YYYY</MenuItem>
                    <MenuItem value="DD/MM/YYYY">DD/MM/YYYY</MenuItem>
                    <MenuItem value="YYYY-MM-DD">YYYY-MM-DD</MenuItem>
                  </TextField>
                  <TextField select label="Currency" fullWidth value={form.currency} onChange={handleChange("currency")} InputLabelProps={{ shrink: true }} sx={inputSx}>
                    <MenuItem value="PHP">PHP (₱)</MenuItem>
                    <MenuItem value="USD">USD ($)</MenuItem>
                  </TextField>
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

          {/* Save bar */}
          <Box
            sx={{
              p: { xs: 2.5, sm: 3 },
              pt: 0,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              startIcon={<SaveRoundedIcon />}
              onClick={handleSave}
              sx={{
                textTransform: "none",
                borderRadius: "10px",
                fontWeight: 600,
                px: 3,
                py: 1.1,
                boxShadow: "none",
                "&:hover": { boxShadow: "none" },
              }}
            >
              Save Changes
            </Button>
          </Box>
        </Paper>
      </Box>

      <Snackbar
        open={saved}
        autoHideDuration={3000}
        onClose={() => setSaved(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled" sx={{ borderRadius: "10px" }}>
          Settings saved successfully.
        </Alert>
      </Snackbar>
    </Box>
  );
}
