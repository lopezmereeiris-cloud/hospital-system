export type PatientSettingsSection = "notifications" | "appointments" | "privacy";

export interface PatientSettingsForm {
  emailReminders: boolean;
  smsReminders: boolean;
  billingAlerts: boolean;
  medicineRefillAlerts: boolean;
  appointmentStatusUpdates: boolean;
  preferredLeadTime: "24 hours" | "48 hours" | "72 hours";
  defaultVisitMode: "In-person" | "Teleconsult";
  autoAddToCalendar: boolean;
  shareMedicalHistoryWithDoctors: boolean;
  allowDataForServiceImprovement: boolean;
  twoFactorAuthentication: boolean;
  language: "English" | "Filipino";
}
