"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import MedicalServicesRoundedIcon from "@mui/icons-material/MedicalServicesRounded";
import ContactPhoneRoundedIcon from "@mui/icons-material/ContactPhoneRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import patientsData from "@/json/patients.json";
import { Patient } from "@/components/PatientList/interface";
import { palette } from "@/theme/palette";

const PURPLE = "#4361EE";

const parseParam = (value: string) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

const formatDisplayDate = (value: string) => {
  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) return value;
  return new Date(parsed).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// ── Shared input style ──────────────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px 10px",
  borderRadius: 8,
  border: `1.5px solid ${PURPLE}`,
  fontSize: "0.87rem",
  fontFamily: "inherit",
  color: "#1D2939",
  backgroundColor: "#fff",
  outline: "none",
  boxSizing: "border-box",
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: "none",
  WebkitAppearance: "none",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M6 8L1 3h10z' fill='%2398A2B3'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 10px center",
  backgroundSize: "10px",
  paddingRight: 28,
  cursor: "pointer",
};

// ── InfoField: read mode ────────────────────────────────────────────────────
function InfoField({
  label,
  value,
  fullWidth = false,
}: {
  label: string;
  value: string;
  fullWidth?: boolean;
}) {
  return (
    <Box
      sx={{
        p: 1.5,
        borderRadius: "10px",
        border: `1px solid ${palette.grey[200]}`,
        bgcolor: "grey.50",
        gridColumn: fullWidth ? "1 / -1" : "auto",
      }}
    >
      <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#667085", textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {label}
      </div>
      <div style={{ fontSize: "0.9rem", color: "#1D2939", fontWeight: 500, marginTop: 4 }}>
        {value || "-"}
      </div>
    </Box>
  );
}

function EditField({
  label,
  field,
  value,
  onChange,
  fullWidth = false,
  type = "text",
  options,
}: {
  label: string;
  field: string;
  value: string;
  onChange: (field: string, value: string) => void;
  fullWidth?: boolean;
  type?: string;
  options?: string[];
}) {
  return (
    <Box
      sx={{
        p: 1.5,
        borderRadius: "10px",
        border: `1.5px solid ${PURPLE}`,
        bgcolor: "rgba(67, 97, 238, 0.02)",
        gridColumn: fullWidth ? "1 / -1" : "auto",
      }}
    >
      <div style={{ fontSize: "0.7rem", fontWeight: 700, color: PURPLE, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>
        {label}
      </div>
      {options ? (
        <select
          style={selectStyle}
          value={value}
          onChange={(e) => onChange(field, e.target.value)}
        >
          <option value="">Select...</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          style={inputStyle}
          value={value}
          onChange={(e) => onChange(field, e.target.value)}
        />
      )}
    </Box>
  );
}

function EditableSection({
  title,
  icon,
  children,
  editChildren,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  editChildren: (editing: boolean) => React.ReactNode;
}) {
  const [editing, setEditing] = useState(false);

  return (
    <Paper sx={{ p: 2.2, borderRadius: "14px", border: `1px solid ${palette.grey[200]}`, boxShadow: "none" }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {icon}
          <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#1D2939" }}>{title}</div>
        </Box>
        {!editing ? (
          <Button
            onClick={() => setEditing(true)}
            sx={{
              fontSize: "0.75rem",
              fontWeight: 600,
              textTransform: "none",
              color: PURPLE,
              border: `1px solid rgba(67, 97, 238, 0.3)`,
              borderRadius: "8px",
              px: 1.5,
              py: 0.5,
              "&:hover": { bgcolor: "rgba(67, 97, 238, 0.06)" },
            }}
          >
            Edit
          </Button>
        ) : (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
             
              onClick={() => setEditing(false)}
              sx={{
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "none",
                color: "#667085",
                border: `1px solid ${palette.grey[300]}`,
                borderRadius: "8px",
                px: 1.5,
                py: 0.5,
                "&:hover": { bgcolor: "grey.100" },
              }}
            >
              Cancel
            </Button>
            <Button
           
              onClick={() => setEditing(false)}
              sx={{
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "none",
                color: "#fff",
                bgcolor: PURPLE,
                borderRadius: "8px",
                px: 1.5,
                py: 0.5,
                "&:hover": { bgcolor: "#3451d1" },
              }}
            >
              Save
            </Button>
          </Box>
        )}
      </Box>
      {editChildren(editing)}
    </Paper>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────
export default function PatientDetailPage() {
  const params = useParams<{ id: string }>();
  const rawId = typeof params.id === "string" ? params.id : "";
  const patientId = parseParam(rawId);
  const patients = patientsData as Patient[];
  const found = patients.find((item) => item.patient_id === patientId);

  const [data, setData] = useState<Patient | null>(found ?? null);

  const update = (field: string, value: string) => {
    setData((prev) => prev ? { ...prev, [field]: value } : prev);
  };

  const updateAddress = (field: string, value: string) => {
    setData((prev) =>
      prev ? { ...prev, address: { ...(prev.address ?? {}), [field]: value } as Patient["address"] } : prev
    );
  };

  const updateEmergencyContact = (index: number, field: string, value: string) => {
    setData((prev) => {
      if (!prev) return prev;
      const contacts = [...(prev.emergency_contacts ?? [])];
      contacts[index] = { ...contacts[index], [field]: value };
      return { ...prev, emergency_contacts: contacts };
    });
  };

  if (!data) {
    return (
      <Box sx={{ maxWidth: 1180, mx: "auto" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 3 }}>
          <Link href="/admin/registration" style={{ textDecoration: "none", fontSize: "0.82rem", fontWeight: 500, color: PURPLE }}>
            Patients
          </Link>
          <NavigateNextRoundedIcon sx={{ fontSize: 16, color: "#9CA3AF" }} />
          <Chip label="Patient Not Found" size="small" sx={{ bgcolor: "rgba(240,68,56,0.08)", color: "error.main", fontWeight: 600, fontSize: "0.75rem" }} />
        </Box>
        <Paper sx={{ p: { xs: 2.5, md: 4 }, borderRadius: "16px", border: `1px solid ${palette.divider}`, boxShadow: "none" }}>
          <h2 style={{ margin: 0, fontSize: "1.1rem" }}>Patient record not found</h2>
          <p style={{ marginTop: 8, marginBottom: 0, fontSize: "0.9rem" }}>No patient matched ID: {patientId || "(missing id)"}</p>
        </Paper>
      </Box>
    );
  }

  const p = data;

  return (
    <Box sx={{ maxWidth: 1180, mx: "auto", pb: 3 }}>

      {/* Breadcrumb */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 2.2, flexWrap: "wrap" }}>
        <Link href="/admin/registration" style={{ textDecoration: "none", fontSize: "0.82rem", fontWeight: 500, color: PURPLE }}>
          Patients
        </Link>
        <NavigateNextRoundedIcon sx={{ fontSize: 16, color: "#9CA3AF" }} />
        <Chip label="Patient Profile" size="small" sx={{ bgcolor: "rgba(67,97,238,0.08)", color: PURPLE, fontWeight: 600, fontSize: "0.75rem" }} />
        <NavigateNextRoundedIcon sx={{ fontSize: 16, color: "#9CA3AF" }} />
        <Chip label={p.patient_id} size="small" sx={{ bgcolor: palette.background.default, color: "grey.700", fontWeight: 600, fontSize: "0.75rem", border: `1px solid ${palette.grey[200]}` }} />
      </Box>

      {/* Header Card */}
      <Paper sx={{ p: { xs: 2.2, md: 3 }, mb: 2.2, borderRadius: "16px", border: `1px solid ${palette.grey[200]}`, boxShadow: "0 4px 16px rgba(16,24,40,0.04)" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 2, flexWrap: "wrap" }}>
          <Box>
            <div style={{ fontSize: "1.35rem", fontWeight: 700, color: "#1D2939" }}>{p.name}</div>
            <div style={{ fontSize: "0.86rem", color: "#667085", marginTop: 6 }}>
              Patient ID: {p.patient_id} &nbsp;·&nbsp; PhilHealth No: {p.philhealth_number || "-"}
            </div>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1.2, flexWrap: "wrap" }}>
              <Chip label={p.status} color={p.status === "Active" ? "success" : p.status === "Admitted" ? "warning" : "error"} size="small" />
              <Chip label={`Last Visit: ${formatDisplayDate(p.last_visit)}`} size="small" sx={{ bgcolor: "grey.100", color: "grey.700", fontWeight: 600 }} />
              {p.patient_type && (
                <Chip label={p.patient_type} size="small" sx={{ bgcolor: "rgba(67,97,238,0.08)", color: PURPLE, fontWeight: 600 }} />
              )}
            </Box>
          </Box>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1.2, minWidth: 280 }}>
            {[
              { label: "Age", value: String(p.age) },
              { label: "Gender", value: p.gender },
              { label: "Blood", value: p.blood_type || "—" },
            ].map(({ label, value }) => (
              <Box key={label} sx={{ p: 1.5, borderRadius: "10px", border: `1px solid ${palette.grey[200]}`, bgcolor: "rgba(67,97,238,0.04)", textAlign: "center" }}>
                <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "#667085", textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</div>
                <div style={{ fontSize: "1.1rem", fontWeight: 700, color: PURPLE, marginTop: 2 }}>{value}</div>
              </Box>
            ))}
          </Box>
        </Box>
      </Paper>

      {/* Main Grid */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1.45fr 0.95fr" }, gap: 2 }}>

        {/* Left Column */}
        <Box sx={{ display: "grid", gap: 2, alignContent: "start" }}>

          {/* Personal Information */}
          <EditableSection
            title="Personal Information"
            icon={<PersonRoundedIcon sx={{ color: PURPLE, fontSize: 18 }} />}
            editChildren={(editing) => (
              <Box sx={{ display: "grid", gap: 1.2, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
                {editing ? (
                  <>
                    <EditField label="Full Name" field="name" value={p.name} onChange={update} />
                    <EditField label="Date of Birth" field="date_of_birth" value={p.date_of_birth || ""} onChange={update} type="date" />
                    <EditField label="Age" field="age" value={String(p.age)} onChange={update} type="number" />
                    <EditField label="Gender" field="gender" value={p.gender} onChange={update} options={["Male", "Female"]} />
                    <EditField label="Civil Status" field="civil_status" value={p.civil_status || ""} onChange={update} options={["Single", "Married", "Widowed", "Separated", "Annulled"]} />
                    <EditField label="Nationality" field="nationality" value={p.nationality || ""} onChange={update} />
                    <EditField label="Religion" field="religion" value={p.religion || ""} onChange={update} options={["Roman Catholic", "Islam", "Born Again Christian", "Iglesia ni Cristo", "Seventh-day Adventist", "Buddhism", "Other", "None"]} />
                    <EditField label="Occupation" field="occupation" value={p.occupation || ""} onChange={update} />
                    <EditField label="Status" field="status" value={p.status} onChange={update} options={["Active", "Admitted", "Discharged"]} />
                    <EditField label="Last Visit" field="last_visit" value={p.last_visit} onChange={update} type="date" />
                  </>
                ) : (
                  <>
                    <InfoField label="Full Name" value={p.name} />
                    <InfoField label="Date of Birth" value={formatDisplayDate(p.date_of_birth || "")} />
                    <InfoField label="Age" value={String(p.age)} />
                    <InfoField label="Gender" value={p.gender} />
                    <InfoField label="Civil Status" value={p.civil_status || "-"} />
                    <InfoField label="Nationality" value={p.nationality || "-"} />
                    <InfoField label="Religion" value={p.religion || "-"} />
                    <InfoField label="Occupation" value={p.occupation || "-"} />
                    <InfoField label="Status" value={p.status} />
                    <InfoField label="Last Visit" value={formatDisplayDate(p.last_visit)} />
                  </>
                )}
              </Box>
            )}
          >
            {null}
          </EditableSection>

          {/* Medical Information */}
          <EditableSection
            title="Medical Information"
            icon={<MedicalServicesRoundedIcon sx={{ color: PURPLE, fontSize: 18 }} />}
            editChildren={(editing) => (
              <Box sx={{ display: "grid", gap: 1.2, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
                {editing ? (
                  <>
                    <EditField label="Blood Type" field="blood_type" value={p.blood_type || ""} onChange={update} options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"]} />
                    <EditField label="Patient Type" field="patient_type" value={p.patient_type || ""} onChange={update} options={["Out-patient", "In-patient", "Day Care", "Emergency"]} />
                    <EditField label="Height (cm)" field="height" value={p.height || ""} onChange={update} type="number" />
                    <EditField label="Weight (kg)" field="weight" value={p.weight || ""} onChange={update} type="number" />
                    <EditField label="Smoking Status" field="smoking_status" value={p.smoking_status || ""} onChange={update} options={["Non-smoker", "Former smoker", "Current smoker"]} />
                    <EditField label="Alcohol Use" field="alcohol_use" value={p.alcohol_use || ""} onChange={update} options={["None", "Occasional", "Moderate", "Heavy"]} />
                    <EditField label="Known Allergies" field="allergies" value={p.allergies || ""} onChange={update} fullWidth />
                    <EditField label="Existing Conditions" field="existing_conditions" value={p.existing_conditions || ""} onChange={update} fullWidth />
                    <EditField label="Current Medications" field="current_medications" value={p.current_medications || ""} onChange={update} fullWidth />
                  </>
                ) : (
                  <>
                    <InfoField label="Blood Type" value={p.blood_type || "-"} />
                    <InfoField label="Patient Type" value={p.patient_type || "-"} />
                    <InfoField label="Height" value={p.height ? `${p.height} cm` : "-"} />
                    <InfoField label="Weight" value={p.weight ? `${p.weight} kg` : "-"} />
                    <InfoField label="Smoking Status" value={p.smoking_status || "-"} />
                    <InfoField label="Alcohol Use" value={p.alcohol_use || "-"} />
                    <InfoField label="Known Allergies" value={p.allergies || "None"} fullWidth />
                    <InfoField label="Existing Conditions" value={p.existing_conditions || "None"} fullWidth />
                    <InfoField label="Current Medications" value={p.current_medications || "None"} fullWidth />
                  </>
                )}
              </Box>
            )}
          >
            {null}
          </EditableSection>

        </Box>

        {/* Right Column */}
        <Box sx={{ display: "grid", gap: 2, alignContent: "start" }}>

          {/* Contact & Address */}
          <EditableSection
            title="Contact & Address"
            icon={<HomeRoundedIcon sx={{ color: PURPLE, fontSize: 18 }} />}
            editChildren={(editing) => (
              <Box sx={{ display: "grid", gap: 1.2 }}>
                {editing ? (
                  <>
                    <EditField label="Contact Number" field="contact_number" value={p.contact_number || ""} onChange={update} />
                    <EditField label="Email" field="email" value={p.email || ""} onChange={update} type="email" />
                    <EditField label="Street" field="street" value={p.address?.street || ""} onChange={(f, v) => updateAddress("street", v)} />
                    <EditField label="Barangay" field="barangay" value={p.address?.barangay || ""} onChange={(f, v) => updateAddress("barangay", v)} />
                    <EditField label="City / Municipality" field="city" value={p.address?.city || ""} onChange={(f, v) => updateAddress("city", v)} />
                    <EditField label="Province" field="province" value={p.address?.province || ""} onChange={(f, v) => updateAddress("province", v)} />
                    <EditField label="Zip Code" field="zip_code" value={p.address?.zip_code || ""} onChange={(f, v) => updateAddress("zip_code", v)} />
                  </>
                ) : (
                  <>
                    <InfoField label="Contact Number" value={p.contact_number || "-"} />
                    <InfoField label="Email" value={p.email || "-"} />
                    <InfoField label="Street" value={p.address?.street || "-"} />
                    <InfoField label="Barangay" value={p.address?.barangay || "-"} />
                    <InfoField label="City / Municipality" value={p.address?.city || "-"} />
                    <InfoField label="Province" value={p.address?.province || "-"} />
                    <InfoField label="Zip Code" value={p.address?.zip_code || "-"} />
                  </>
                )}
              </Box>
            )}
          >
            {null}
          </EditableSection>

          {/* Emergency Contact */}
          <EditableSection
            title="Emergency Contact"
            icon={<ContactPhoneRoundedIcon sx={{ color: PURPLE, fontSize: 18 }} />}
            editChildren={(editing) => (
              <Box sx={{ display: "grid", gap: 1.2 }}>
                {p.emergency_contacts && p.emergency_contacts.length > 0 ? (
                  p.emergency_contacts.map((contact, index) => (
                    <Box key={index} sx={{ p: 1.5, borderRadius: "10px", border: `1px solid ${editing ? PURPLE : palette.grey[200]}`, bgcolor: editing ? "rgba(67,97,238,0.02)" : "grey.50" }}>
                      <div style={{ fontSize: "0.7rem", fontWeight: 700, color: editing ? PURPLE : "#98A2B3", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>
                        Contact {index + 1}
                      </div>
                      {editing ? (
                        <Box sx={{ display: "grid", gap: 1 }}>
                          <div>
                            <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#667085", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 4 }}>Name</div>
                            <input style={inputStyle} value={contact.name} onChange={(e) => updateEmergencyContact(index, "name", e.target.value)} />
                          </div>
                          <div>
                            <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#667085", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 4 }}>Relationship</div>
                            <select style={selectStyle} value={contact.relationship} onChange={(e) => updateEmergencyContact(index, "relationship", e.target.value)}>
                              <option value="">Select...</option>
                              {["Spouse", "Parent", "Child", "Sibling", "Relative", "Friend", "Guardian"].map((r) => (
                                <option key={r} value={r}>{r}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#667085", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 4 }}>Contact Number</div>
                            <input style={inputStyle} value={contact.contactNumber} onChange={(e) => updateEmergencyContact(index, "contactNumber", e.target.value)} />
                          </div>
                        </Box>
                      ) : (
                        <>
                          <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#1D2939" }}>{contact.name}</div>
                          <div style={{ fontSize: "0.82rem", color: "#667085", marginTop: 2 }}>
                            {contact.relationship} · {contact.contactNumber}
                          </div>
                        </>
                      )}
                    </Box>
                  ))
                ) : (
                  <div style={{ fontSize: "0.86rem", color: "#98A2B3" }}>No emergency contacts recorded.</div>
                )}
              </Box>
            )}
          >
            {null}
          </EditableSection>

          {/* Identification */}
          <EditableSection
            title="Identification"
            icon={<BadgeRoundedIcon sx={{ color: PURPLE, fontSize: 18 }} />}
            editChildren={(editing) => (
              <Box sx={{ display: "grid", gap: 1.2 }}>
                {editing ? (
                  <>
                    <EditField label="PhilHealth Number" field="philhealth_number" value={p.philhealth_number || ""} onChange={update} />
                    <EditField label="SSS Number" field="sss_number" value={p.sss_number || ""} onChange={update} />
                    <EditField label="TIN Number" field="tin_number" value={p.tin_number || ""} onChange={update} />
                    <EditField label="Valid ID Type" field="valid_id_type" value={p.valid_id_type || ""} onChange={update}
                      options={["PhilHealth ID", "UMID", "Driver's License", "Passport", "Voter's ID", "SSS ID", "TIN ID", "Postal ID", "National ID", "Senior Citizen ID", "PWD ID"]}
                    />
                    <EditField label="Valid ID Number" field="valid_id_number" value={p.valid_id_number || ""} onChange={update} />
                  </>
                ) : (
                  <>
                    <InfoField label="PhilHealth Number" value={p.philhealth_number || "-"} />
                    <InfoField label="SSS Number" value={p.sss_number || "-"} />
                    <InfoField label="TIN Number" value={p.tin_number || "-"} />
                    <InfoField label="Valid ID Type" value={p.valid_id_type || "-"} />
                    <InfoField label="Valid ID Number" value={p.valid_id_number || "-"} />
                  </>
                )}
              </Box>
            )}
          >
            {null}
          </EditableSection>

        </Box>
      </Box>
    </Box>
  );
}
