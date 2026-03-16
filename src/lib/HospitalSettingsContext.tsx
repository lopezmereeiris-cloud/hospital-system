"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface HospitalSettings {
  hospitalName: string;
  address: string;
  contactNumber: string;
  email: string;
  website: string;
  adminName: string;
  operatingHours: string;
  tagline: string;
  emergencyHotline: string;
  language: string;
  dateFormat: string;
  currency: string;
  appointmentReminders: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  lowStockAlerts: boolean;
  billingAlerts: boolean;
}

const DEFAULT_SETTINGS: HospitalSettings = {
  hospitalName: "Lorem Ipsum",
  address: "",
  contactNumber: "",
  email: "",
  website: "",
  adminName: "",
  operatingHours: "24/7",
  tagline: "",
  emergencyHotline: "",
  language: "English",
  dateFormat: "MM/DD/YYYY",
  currency: "PHP",
  appointmentReminders: true,
  emailNotifications: true,
  smsNotifications: false,
  lowStockAlerts: true,
  billingAlerts: true,
};

const STORAGE_KEY = "hospital-settings";

interface HospitalSettingsContextValue {
  settings: HospitalSettings;
  updateSettings: (next: HospitalSettings) => void;
}

const HospitalSettingsContext = createContext<HospitalSettingsContextValue>({
  settings: DEFAULT_SETTINGS,
  updateSettings: () => {},
});

export function useHospitalSettings() {
  return useContext(HospitalSettingsContext);
}

export function HospitalSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<HospitalSettings>(DEFAULT_SETTINGS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(stored) });
      }
    } catch {
      // ignore parse errors
    }
    setLoaded(true);
  }, []);

  const updateSettings = useCallback((next: HospitalSettings) => {
    setSettings(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore storage errors
    }
  }, []);

  if (!loaded) return null;

  return (
    <HospitalSettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </HospitalSettingsContext.Provider>
  );
}
