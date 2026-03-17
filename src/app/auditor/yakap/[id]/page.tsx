"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import LinearProgress from "@mui/material/LinearProgress";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import ContactPhoneRoundedIcon from "@mui/icons-material/ContactPhoneRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import yakapData from "@/json/yakap.json";
import { Beneficiary } from "@/components/BeneficiaryTable/interface";
import { palette } from "@/theme/palette";

const PH = {
  green: "#0D8A3F",
  greenLight: "#14A44D",
};

const VALID_ID_PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='960' height='600'>
      <rect width='100%' height='100%' fill='#f8fafc'/>
      <rect x='60' y='60' width='840' height='480' rx='20' fill='#ffffff' stroke='#cbd5e1' stroke-width='2'/>
      <text x='480' y='260' text-anchor='middle' font-family='Arial, sans-serif' font-size='34' fill='#475569' font-weight='700'>VALID ID PREVIEW</text>
      <text x='480' y='308' text-anchor='middle' font-family='Arial, sans-serif' font-size='20' fill='#64748b'>Placeholder image</text>
    </svg>`
  );

const formatCurrency = (amount: number) => `PHP ${amount.toLocaleString()}`;

const formatDisplayDate = (value: string) => {
  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) return value;
  return new Date(parsed).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const parseParam = (value: string) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

function InfoField({ label, value, fullWidth = false }: { label: string; value: string; fullWidth?: boolean }) {
  return (
    <Box sx={{ p: 1.5, borderRadius: "10px", border: `1px solid ${palette.grey[200]}`, bgcolor: "grey.50", gridColumn: fullWidth ? "1 / -1" : "auto" }}>
      <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "grey", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</div>
      <div style={{ fontSize: "0.9rem", color: "grey.800", fontWeight: 500, marginTop: 4 }}>{value || "-"}</div>
    </Box>
  );
}

export default function AuditorYakapBeneficiaryDetailPage() {
  const params = useParams<{ id: string }>();
  const beneficiaryId = parseParam(typeof params.id === "string" ? params.id : "");
  const beneficiary = (yakapData as Beneficiary[]).find((item) => item.id === beneficiaryId);

  if (!beneficiary) {
    return (
      <Box sx={{ maxWidth: 1180, mx: "auto" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 3, flexWrap: "wrap" }}>
          <Link href="/auditor/yakap" style={{ textDecoration: "none", fontSize: "0.82rem", fontWeight: 500, color: PH.green }}>
            YAKAP
          </Link>
          <NavigateNextRoundedIcon sx={{ fontSize: 16, color: "#9CA3AF" }} />
          <Chip label="Beneficiary Not Found" size="small" sx={{ bgcolor: "rgba(240, 68, 56, 0.08)", color: "error.main", fontWeight: 600, fontSize: "0.75rem" }} />
        </Box>
        <Paper sx={{ p: { xs: 2.5, md: 4 }, borderRadius: "16px", border: `1px solid ${palette.divider}`, boxShadow: "none" }}>
          <h2 style={{ margin: 0, fontSize: "1.1rem", color: "text.primary" }}>Beneficiary record not found</h2>
          <p style={{ marginTop: 8, marginBottom: 0, color: "text.secondary", fontSize: "0.9rem" }}>
            No beneficiary matched ID: {beneficiaryId || "(missing id)"}
          </p>
        </Paper>
      </Box>
    );
  }

  const fullName = [beneficiary.firstName, beneficiary.middleName, beneficiary.lastName, beneficiary.suffix].filter(Boolean).join(" ");
  const fullAddress = [beneficiary.address.street, beneficiary.address.barangay, beneficiary.address.city, beneficiary.address.province, beneficiary.address.zipCode].filter(Boolean).join(", ");
  const usedPct = beneficiary.annualBenefit > 0 ? Math.round((beneficiary.benefitUsed / beneficiary.annualBenefit) * 100) : 0;
  const barColor = beneficiary.benefitBalance === 0 ? palette.error.main : beneficiary.benefitBalance <= 3000 ? palette.warning.main : PH.green;
  const sortedTransactions = [...beneficiary.transactions].sort((left, right) => Date.parse(right.date) - Date.parse(left.date));
  const totalClaimed = sortedTransactions.reduce((total, transaction) => total + transaction.amount, 0);

  return (
    <Box sx={{ maxWidth: 1180, mx: "auto", pb: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 2.2, flexWrap: "wrap" }}>
        <Link href="/auditor/yakap" style={{ textDecoration: "none", fontSize: "0.82rem", fontWeight: 500, color: PH.green }}>
          YAKAP
        </Link>
        <NavigateNextRoundedIcon sx={{ fontSize: 16, color: "#9CA3AF" }} />
        <Chip label="Beneficiary Profile" size="small" sx={{ bgcolor: "rgba(13, 138, 63, 0.08)", color: PH.green, fontWeight: 600, fontSize: "0.75rem" }} />
        <NavigateNextRoundedIcon sx={{ fontSize: 16, color: "#9CA3AF" }} />
        <Chip label={beneficiary.id} size="small" sx={{ bgcolor: palette.background.default, color: "grey.700", fontWeight: 600, fontSize: "0.75rem", border: `1px solid ${palette.grey[200]}` }} />
      </Box>

      <Paper sx={{ p: { xs: 2.2, md: 3 }, mb: 2.2, borderRadius: "16px", border: `1px solid ${palette.grey[200]}`, boxShadow: "0 4px 16px rgba(16, 24, 40, 0.04)" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 2, flexWrap: "wrap" }}>
          <Box>
            <div style={{ fontSize: "1.35rem", fontWeight: 700, color: "grey.900" }}>{fullName}</div>
            <div style={{ fontSize: "0.86rem", color: "grey.500", marginTop: 6 }}>PhilHealth No: {beneficiary.philhealthNumber}</div>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1.2, flexWrap: "wrap" }}>
              <Chip label={beneficiary.id} size="small" variant="outlined" sx={{ fontWeight: 600 }} />
              <Chip label={beneficiary.status} color={beneficiary.status === "Active" ? "success" : "error"} size="small" />
              <Chip label={`Registered ${formatDisplayDate(beneficiary.registrationDate)}`} size="small" sx={{ bgcolor: "grey.100", color: "grey.700", fontWeight: 600 }} />
            </Box>
          </Box>

          <Box sx={{ minWidth: 260 }}>
            <div style={{ fontSize: "0.75rem", color: "grey.500", fontWeight: 600 }}>Benefit Utilization</div>
            <div style={{ fontSize: "1.15rem", color: "grey.900", fontWeight: 700, marginTop: 2 }}>{usedPct}% used</div>
            <LinearProgress variant="determinate" value={usedPct} sx={{ mt: 1, height: 8, borderRadius: 4, bgcolor: "rgba(0,0,0,0.06)", "& .MuiLinearProgress-bar": { borderRadius: 4, bgcolor: barColor } }} />
            <div style={{ marginTop: 8, fontSize: "0.82rem", color: "grey.600", fontWeight: 600 }}>
              {formatCurrency(beneficiary.benefitUsed)} / {formatCurrency(beneficiary.annualBenefit)}
            </div>
          </Box>
        </Box>
      </Paper>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1.45fr 0.95fr" }, gap: 2 }}>
        <Box sx={{ display: "grid", gap: 2 }}>
          <Paper sx={{ p: 2.2, borderRadius: "14px", border: `1px solid ${palette.grey[200]}`, boxShadow: "none" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
              <PersonRoundedIcon sx={{ color: PH.green, fontSize: 18 }} />
              <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "grey.900" }}>Personal Information</div>
            </Box>
            <Box sx={{ display: "grid", gap: 1.2, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
              <InfoField label="First Name" value={beneficiary.firstName} />
              <InfoField label="Middle Name" value={beneficiary.middleName || "-"} />
              <InfoField label="Last Name" value={beneficiary.lastName} />
              <InfoField label="Suffix" value={beneficiary.suffix || "-"} />
              <InfoField label="Date of Birth" value={formatDisplayDate(beneficiary.dateOfBirth)} />
              <InfoField label="Gender" value={beneficiary.gender} />
              <InfoField label="Civil Status" value={beneficiary.civilStatus} />
              <InfoField label="Email" value={beneficiary.email} />
              <InfoField label="Contact Number" value={beneficiary.contactNumber} />
              <InfoField label="Valid ID Type" value={beneficiary.validIdType} />
              <InfoField label="Valid ID Number" value={beneficiary.validIdNumber} />
              <InfoField label="Address" value={fullAddress} fullWidth />
            </Box>
          </Paper>

          <Paper sx={{ p: 2.2, borderRadius: "14px", border: `1px solid ${palette.grey[200]}`, boxShadow: "none" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
              <ContactPhoneRoundedIcon sx={{ color: PH.green, fontSize: 18 }} />
              <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "grey.900" }}>Emergency Contact</div>
            </Box>
            <Box sx={{ display: "grid", gap: 1.2, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
              <InfoField label="Name" value={beneficiary.emergencyContact.name} />
              <InfoField label="Relationship" value={beneficiary.emergencyContact.relationship} />
              <InfoField label="Contact Number" value={beneficiary.emergencyContact.contactNumber} />
              {/* <InfoField label="Benefit Year" value={String(beneficiary.benefitYear)} /> */}
            </Box>
          </Paper>

          <Paper sx={{ p: 2.2, borderRadius: "14px", border: `1px solid ${palette.grey[200]}`, boxShadow: "none" }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1.2, mb: 1.4, flexWrap: "wrap" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <ReceiptLongRoundedIcon sx={{ color: PH.green, fontSize: 18 }} />
                <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "grey.900" }}>Benefit Usage History</div>
              </Box>
            </Box>

            <Box sx={{ border: `1px solid ${palette.grey[200]}`, borderRadius: "12px", overflow: "hidden" }}>
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "170px 1fr 160px" }, gap: 1, px: 1.5, py: 1.2, bgcolor: palette.background.default, borderBottom: `1px solid ${palette.grey[200]}` }}>
                <div style={{ fontSize: "0.72rem", color: "grey.500", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Date</div>
                <div style={{ fontSize: "0.72rem", color: "grey.500", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Description</div>
                <div style={{ fontSize: "0.72rem", color: "grey.500", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "right" }}>Amount</div>
              </Box>

              {sortedTransactions.map((transaction, index) => (
                <Box key={`${transaction.date}-${transaction.description}-${index}`} sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "170px 1fr 160px" }, gap: 1, px: 1.5, py: 1.4, borderBottom: index === sortedTransactions.length - 1 ? "none" : `1px solid ${palette.grey[100]}`, "&:hover": { bgcolor: "grey.50" } }}>
                  <div style={{ fontSize: "0.85rem", color: "grey.700", fontWeight: 600 }}>{formatDisplayDate(transaction.date)}</div>
                  <div style={{ fontSize: "0.88rem", color: "grey.800", fontWeight: 500 }}>{transaction.description}</div>
                  <div style={{ fontSize: "0.88rem", color: "grey.800", fontWeight: 700, textAlign: "right" }}>{formatCurrency(transaction.amount)}</div>
                </Box>
              ))}
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" }, gap: 1.2, mt: 1.4 }}>
              <InfoField label="Total Claimed" value={formatCurrency(totalClaimed)} />
              <InfoField label="Annual Benefit" value={formatCurrency(beneficiary.annualBenefit)} />
              <InfoField label="Remaining Balance" value={formatCurrency(beneficiary.benefitBalance)} />
            </Box>
          </Paper>
        </Box>

        <Box sx={{ display: "grid", gap: 2, alignContent: "start" }}>
          <Paper sx={{ p: 2.2, borderRadius: "14px", border: `1px solid ${palette.grey[200]}`, boxShadow: "none", background: `linear-gradient(135deg, rgba(13, 138, 63, 0.06) 0%, rgba(20, 164, 77, 0.03) 100%)` }}>
            <div style={{ fontSize: "0.8rem", color: "grey.500", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>Benefit Overview</div>
            <div style={{ marginTop: 8, fontSize: "1.35rem", fontWeight: 700, color: PH.green }}>{formatCurrency(beneficiary.benefitBalance)}</div>
            <div style={{ fontSize: "0.82rem", color: "grey.600", marginTop: 4 }}>Remaining for {beneficiary.benefitYear}</div>
            <LinearProgress variant="determinate" value={usedPct} sx={{ mt: 1.3, height: 8, borderRadius: 4, bgcolor: "rgba(0,0,0,0.08)", "& .MuiLinearProgress-bar": { borderRadius: 4, bgcolor: PH.greenLight } }} />
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, mt: 1.4 }}>
              <InfoField label="Used" value={formatCurrency(beneficiary.benefitUsed)} />
              <InfoField label="Utilization" value={`${usedPct}%`} />
            </Box>
          </Paper>

          <Paper sx={{ p: 2.2, borderRadius: "14px", border: `1px solid ${palette.grey[200]}`, boxShadow: "none" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.2 }}>
              <BadgeRoundedIcon sx={{ color: PH.green, fontSize: 18 }} />
              <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "grey.900" }}>Valid ID Preview</div>
            </Box>
            <Box component="img" src={beneficiary.validIdImageUrl || VALID_ID_PLACEHOLDER} alt={`Valid ID of ${fullName}`} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = VALID_ID_PLACEHOLDER; }} sx={{ width: "100%", maxHeight: 250, objectFit: "cover", borderRadius: "12px", border: `1px solid ${palette.grey[300]}`, bgcolor: palette.background.default }} />
            <div style={{ marginTop: 10, fontSize: "0.78rem", color: "grey.500" }}>Showing placeholder when uploaded image is unavailable.</div>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
