"use client";

import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Snackbar from "@mui/material/Snackbar";
import Switch from "@mui/material/Switch";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { PatientSettingsForm, PatientSettingsSection } from "./interface";
import {
  ContentBody,
  ContentCard,
  ContentHeader,
  ContentSubtitle,
  ContentTitle,
  FieldLabel,
  HeaderIcon,
  NavigationCard,
  NavigationDescription,
  NavigationHeader,
  NavigationItem,
  NavigationLabel,
  NavigationTextWrap,
  NavigationTitle,
  SelectGrid,
  SettingDescription,
  SettingLabel,
  SettingsGroupTitle,
  SettingRow,
  SettingsLayout,
  SettingTextWrap,
} from "./elements";

const DEFAULT_SETTINGS: PatientSettingsForm = {
  emailReminders: true,
  smsReminders: false,
  billingAlerts: true,
  medicineRefillAlerts: true,
  appointmentStatusUpdates: true,
  preferredLeadTime: "24 hours",
  defaultVisitMode: "In-person",
  autoAddToCalendar: false,
  shareMedicalHistoryWithDoctors: true,
  allowDataForServiceImprovement: false,
  twoFactorAuthentication: false,
  language: "English",
};

const SECTION_META: Record<
  PatientSettingsSection,
  {
    label: string;
    description: string;
    icon: React.ReactNode;
    summary: string;
  }
> = {
  notifications: {
    label: "Notifications",
    description: "Alerts and reminders",
    icon: <NotificationsRoundedIcon sx={{ fontSize: 19 }} />,
    summary: "Choose how you want to receive reminders and account alerts.",
  },
  appointments: {
    label: "Appointments",
    description: "Booking preferences",
    icon: <EventAvailableRoundedIcon sx={{ fontSize: 19 }} />,
    summary: "Control your booking defaults and appointment behavior.",
  },
  privacy: {
    label: "Privacy & Security",
    description: "Data and account protection",
    icon: <SecurityRoundedIcon sx={{ fontSize: 19 }} />,
    summary: "Manage sharing permissions and account protection options.",
  },
};

interface ToggleSettingRowProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}

function ToggleSettingRow({
  label,
  description,
  checked,
  onChange,
}: ToggleSettingRowProps) {
  return (
    <SettingRow>
      <SettingTextWrap>
        <SettingLabel>{label}</SettingLabel>
        <SettingDescription>{description}</SettingDescription>
      </SettingTextWrap>
      <Switch checked={checked} onChange={onChange} color="primary" />
    </SettingRow>
  );
}

export default function PatientSettingsPage() {
  const [section, setSection] = useState<PatientSettingsSection>("notifications");
  const [settings, setSettings] = useState<PatientSettingsForm>(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);

  const handleToggle = (field: keyof PatientSettingsForm) => {
    return () => {
      setSettings((prev) => ({ ...prev, [field]: !prev[field] }));
    };
  };

  const handleChange = <K extends keyof PatientSettingsForm>(
    field: K,
    value: PatientSettingsForm[K]
  ) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setSaved(true);
  };

  const currentSection = SECTION_META[section];

  return (
    <SettingsLayout>
      <NavigationCard>
        <NavigationHeader>
          <NavigationTitle>Patient Settings</NavigationTitle>
        </NavigationHeader>
        <Box sx={{ p: 1 }}>
          {(Object.keys(SECTION_META) as PatientSettingsSection[]).map((key) => {
            const item = SECTION_META[key];
            return (
              <NavigationItem
                key={key}
                active={section === key}
                onClick={() => setSection(key)}
              >
                {item.icon}
                <NavigationTextWrap>
                  <NavigationLabel>{item.label}</NavigationLabel>
                  <NavigationDescription>{item.description}</NavigationDescription>
                </NavigationTextWrap>
              </NavigationItem>
            );
          })}
        </Box>
      </NavigationCard>

      <ContentCard>
        <ContentHeader>
          <HeaderIcon>{currentSection.icon}</HeaderIcon>
          <div>
            <ContentTitle>{currentSection.label}</ContentTitle>
            <ContentSubtitle>{currentSection.summary}</ContentSubtitle>
          </div>
        </ContentHeader>

        <ContentBody>
          {section === "notifications" && (
            <>
              <SettingsGroupTitle>Reminder Channels</SettingsGroupTitle>
              <ToggleSettingRow
                label="Email Reminders"
                description="Receive appointment and schedule reminders through email."
                checked={settings.emailReminders}
                onChange={handleToggle("emailReminders")}
              />
              <Divider />
              <ToggleSettingRow
                label="SMS Reminders"
                description="Receive text reminders for upcoming appointments."
                checked={settings.smsReminders}
                onChange={handleToggle("smsReminders")}
              />
              <Divider />
              <ToggleSettingRow
                label="Billing Alerts"
                description="Get notified when a new bill or payment reminder is available."
                checked={settings.billingAlerts}
                onChange={handleToggle("billingAlerts")}
              />
              <Divider />
              <ToggleSettingRow
                label="Medicine Refill Alerts"
                description="Receive refill and medication renewal reminders."
                checked={settings.medicineRefillAlerts}
                onChange={handleToggle("medicineRefillAlerts")}
              />
            </>
          )}

          {section === "appointments" && (
            <>
              <SettingsGroupTitle>Appointment Behavior</SettingsGroupTitle>
              <ToggleSettingRow
                label="Appointment Status Updates"
                description="Get notifications for status changes like pending, confirmed, or cancelled."
                checked={settings.appointmentStatusUpdates}
                onChange={handleToggle("appointmentStatusUpdates")}
              />
              <Divider />
              <ToggleSettingRow
                label="Auto Add to Calendar"
                description="Automatically add confirmed appointments to your calendar app."
                checked={settings.autoAddToCalendar}
                onChange={handleToggle("autoAddToCalendar")}
              />
              <Divider sx={{ my: 1.2 }} />

              <SelectGrid>
                <Box>
                  <FieldLabel>Reminder Lead Time</FieldLabel>
                  <Select
                    fullWidth
                    size="small"
                    value={settings.preferredLeadTime}
                    onChange={(event) =>
                      handleChange(
                        "preferredLeadTime",
                        event.target.value as PatientSettingsForm["preferredLeadTime"]
                      )
                    }
                    sx={{ borderRadius: "10px" }}
                  >
                    <MenuItem value="24 hours">24 hours</MenuItem>
                    <MenuItem value="48 hours">48 hours</MenuItem>
                    <MenuItem value="72 hours">72 hours</MenuItem>
                  </Select>
                </Box>
                <Box>
                  <FieldLabel>Default Visit Mode</FieldLabel>
                  <Select
                    fullWidth
                    size="small"
                    value={settings.defaultVisitMode}
                    onChange={(event) =>
                      handleChange(
                        "defaultVisitMode",
                        event.target.value as PatientSettingsForm["defaultVisitMode"]
                      )
                    }
                    sx={{ borderRadius: "10px" }}
                  >
                    <MenuItem value="In-person">In-person</MenuItem>
                    <MenuItem value="Teleconsult">Teleconsult</MenuItem>
                  </Select>
                </Box>
              </SelectGrid>
            </>
          )}

          {section === "privacy" && (
            <>
              <SettingsGroupTitle>Privacy Controls</SettingsGroupTitle>
              <ToggleSettingRow
                label="Share Medical History with Assigned Doctors"
                description="Allow doctors in your active appointments to access your history."
                checked={settings.shareMedicalHistoryWithDoctors}
                onChange={handleToggle("shareMedicalHistoryWithDoctors")}
              />
              <Divider />
              <ToggleSettingRow
                label="Allow Data for Service Improvement"
                description="Share anonymized usage data to improve app performance."
                checked={settings.allowDataForServiceImprovement}
                onChange={handleToggle("allowDataForServiceImprovement")}
              />
              <Divider />
              <ToggleSettingRow
                label="Two-Factor Authentication"
                description="Require extra verification when logging in."
                checked={settings.twoFactorAuthentication}
                onChange={handleToggle("twoFactorAuthentication")}
              />
              <Divider sx={{ my: 1.2 }} />

              <Box sx={{ maxWidth: 280 }}>
                <FieldLabel>Language</FieldLabel>
                <Select
                  fullWidth
                  size="small"
                  value={settings.language}
                  onChange={(event) =>
                    handleChange(
                      "language",
                      event.target.value as PatientSettingsForm["language"]
                    )
                  }
                  sx={{ borderRadius: "10px" }}
                >
                  <MenuItem value="English">English</MenuItem>
                  <MenuItem value="Filipino">Filipino</MenuItem>
                </Select>
              </Box>
            </>
          )}

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2.2 }}>
            <Button
              variant="contained"
              startIcon={<SaveRoundedIcon />}
              onClick={handleSave}
              sx={{
                textTransform: "none",
                borderRadius: "10px",
                fontWeight: 600,
                px: 2.8,
                boxShadow: "none",
                "&:hover": { boxShadow: "none" },
              }}
            >
              Save Preferences
            </Button>
          </Box>
        </ContentBody>
      </ContentCard>

      <Snackbar
        open={saved}
        autoHideDuration={3000}
        onClose={() => setSaved(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setSaved(false)}
          sx={{ borderRadius: "10px" }}
        >
          Patient settings saved successfully.
        </Alert>
      </Snackbar>
    </SettingsLayout>
  );
}
