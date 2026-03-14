"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import ContactPhoneRoundedIcon from "@mui/icons-material/ContactPhoneRounded";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
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
      <defs>
        <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stop-color='#f8fafc'/>
          <stop offset='100%' stop-color='#eef2f6'/>
        </linearGradient>
      </defs>
      <rect width='100%' height='100%' fill='url(#g)'/>
      <rect x='60' y='60' width='840' height='480' rx='20' fill='#ffffff' stroke={palette.grey[300]} stroke-width='2'/>
      <text x='480' y='260' text-anchor='middle' font-family='Inter, Arial, sans-serif' font-size='34' fill={palette.grey[700]} font-weight='700'>
        VALID ID PREVIEW
      </text>
      <text x='480' y='308' text-anchor='middle' font-family='Inter, Arial, sans-serif' font-size='20' fill={palette.grey[500]}>
        Placeholder image
      </text>
      <text x='480' y='352' text-anchor='middle' font-family='Inter, Arial, sans-serif' font-size='18' fill={palette.grey[400]}>
        Upload integration pending
      </text>
    </svg>`,
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

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const buildReceiptHtml = (beneficiary: Beneficiary, fullName: string, fullAddress: string) => {
  const sortedTransactions = [...beneficiary.transactions].sort((left, right) => {
    const leftDate = Date.parse(left.date);
    const rightDate = Date.parse(right.date);
    if (Number.isNaN(leftDate) || Number.isNaN(rightDate)) return 0;
    return leftDate - rightDate;
  });
  const totalClaimed = sortedTransactions.reduce((total, transaction) => total + transaction.amount, 0);
  const receiptDate =
    sortedTransactions.length > 0
      ? sortedTransactions[sortedTransactions.length - 1].date
      : beneficiary.registrationDate;

  const lines = sortedTransactions
    .map(
      (transaction, index) => `
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px dashed ${palette.grey[300]}; vertical-align: top;">
          <div style="font-weight: 700; text-transform: uppercase;">${escapeHtml(transaction.description)}</div>
          <div style="font-size: 12px; color: ${palette.grey[500]}; margin-top: 4px;">
            Date: ${escapeHtml(transaction.date)} | Ref: ${index + 1}
          </div>
        </td>
        <td style="padding: 8px 0; border-bottom: 1px dashed ${palette.grey[300]}; text-align: right; font-weight: 700;">
          ${escapeHtml(formatCurrency(transaction.amount))}
        </td>
      </tr>`,
    )
    .join("");

  return `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>YAKAP Prescription Receipt - ${escapeHtml(beneficiary.id)}</title>
    <style>
      body {
        font-family: "Courier New", Courier, monospace;
        background: #f5f5f5;
        margin: 0;
        padding: 24px;
        color: ${palette.grey[900]};
      }
      .receipt {
        max-width: 760px;
        margin: 0 auto;
        background: #fff;
        border: 1px solid ${palette.grey[300]};
        border-radius: 6px;
        padding: 20px 24px;
      }
      .center { text-align: center; }
      .title {
        font-size: 28px;
        font-weight: 700;
        letter-spacing: 0.06em;
      }
      .sub {
        font-size: 13px;
        color: ${palette.grey[500]};
        margin-top: 4px;
      }
      .dash {
        border-top: 1px dashed ${palette.grey[300]};
        margin: 14px 0;
      }
      table { width: 100%; border-collapse: collapse; }
      .meta td { padding: 2px 0; }
      .summary {
        margin-top: 14px;
        border: 1px solid ${palette.grey[400]};
        padding: 8px 10px;
      }
      .summary-row {
        display: flex;
        justify-content: space-between;
        margin: 4px 0;
      }
      @media print {
        body { background: #fff; padding: 0; }
        .receipt { border: none; border-radius: 0; box-shadow: none; max-width: none; }
      }
    </style>
  </head>
  <body>
    <div class="receipt">
      <div class="center">
        <div class="title">YAKAP PHARMACY UNIT</div>
        <div class="sub">HOSPITAL DISPENSING CENTER</div>
        <div class="sub">Store #${escapeHtml(String(beneficiary.benefitYear))}</div>
      </div>

      <div class="dash"></div>

      <table style="margin-bottom: 8px;">
        <tr>
          <td style="font-weight: 700;">OFFICIAL PRESCRIPTION RECEIPT</td>
          <td style="text-align: right; font-weight: 700;">${escapeHtml(receiptDate)}</td>
        </tr>
      </table>

      <table class="meta">
        <tr><td><strong>Rx:</strong> ${escapeHtml(beneficiary.id)}</td></tr>
        <tr><td><strong>Name:</strong> ${escapeHtml(fullName)}</td></tr>
        <tr><td><strong>Address:</strong> ${escapeHtml(fullAddress)}</td></tr>
        <tr><td><strong>Contact:</strong> ${escapeHtml(beneficiary.contactNumber)}</td></tr>
      </table>

      <div class="dash"></div>

      <table>
        <tr>
          <th style="text-align: left; font-size: 12px; color: ${palette.grey[500]}; padding-bottom: 6px;">DESCRIPTION / DATE</th>
          <th style="text-align: right; font-size: 12px; color: ${palette.grey[500]}; padding-bottom: 6px;">AMOUNT</th>
        </tr>
        ${lines}
      </table>

      <div class="summary">
        <div class="summary-row"><span>Total Claimed</span><strong>${escapeHtml(formatCurrency(totalClaimed))}</strong></div>
        <div class="summary-row"><span>Annual Benefit</span><strong>${escapeHtml(
          formatCurrency(beneficiary.annualBenefit),
        )}</strong></div>
        <div class="summary-row"><span>Remaining Balance</span><strong>${escapeHtml(
          formatCurrency(beneficiary.benefitBalance),
        )}</strong></div>
      </div>
    </div>
  </body>
</html>`;
};

function InfoField({ label, value, fullWidth = false }: { label: string; value: string; fullWidth?: boolean }) {
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
      <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "grey.500", textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {label}
      </div>
      <div style={{ fontSize: "0.9rem", color: "grey.800", fontWeight: 500, marginTop: 4 }}>{value || "-"}</div>
    </Box>
  );
}

export default function YakapBeneficiaryDetailPage() {
  const params = useParams<{ id: string }>();
  const rawId = typeof params.id === "string" ? params.id : "";
  const beneficiaryId = parseParam(rawId);
  const beneficiaries = yakapData as Beneficiary[];
  const beneficiary = beneficiaries.find((item) => item.id === beneficiaryId);

  if (!beneficiary) {
    return (
      <Box sx={{ maxWidth: 1180, mx: "auto" }}>
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
            href="/admin/yakap"
            style={{
              textDecoration: "none",
              fontSize: "0.82rem",
              fontWeight: 500,
              color: PH.green,
            }}
          >
            YAKAP
          </Link>
          <NavigateNextRoundedIcon sx={{ fontSize: 16, color: "#9CA3AF" }} />
          <Chip
            label="Beneficiary Not Found"
            size="small"
            sx={{
              bgcolor: "rgba(240, 68, 56, 0.08)",
              color: "error.main",
              fontWeight: 600,
              fontSize: "0.75rem",
            }}
          />
        </Box>
        <Paper
          sx={{
            p: { xs: 2.5, md: 4 },
            borderRadius: "16px",
            border: `1px solid ${palette.divider}`,
            boxShadow: "none",
          }}
        >
          <h2 style={{ margin: 0, fontSize: "1.1rem", color: "text.primary" }}>
            Beneficiary record not found
          </h2>
          <p style={{ marginTop: 8, marginBottom: 0, color: "text.secondary", fontSize: "0.9rem" }}>
            No beneficiary matched ID: {beneficiaryId || "(missing id)"}
          </p>
        </Paper>
      </Box>
    );
  }

  const b = beneficiary;
  const fullName = [b.firstName, b.middleName, b.lastName, b.suffix].filter(Boolean).join(" ");
  const fullAddress = [b.address.street, b.address.barangay, b.address.city, b.address.province, b.address.zipCode]
    .filter(Boolean)
    .join(", ");
  const usedPct = b.annualBenefit > 0 ? Math.round((b.benefitUsed / b.annualBenefit) * 100) : 0;
  const barColor =
    b.benefitBalance === 0
      ? palette.error.main
      : b.benefitBalance <= 3000
      ? palette.warning.main
      : PH.green;
  const sortedTransactions = [...b.transactions].sort((left, right) => {
    const leftDate = Date.parse(left.date);
    const rightDate = Date.parse(right.date);
    if (Number.isNaN(leftDate) || Number.isNaN(rightDate)) return 0;
    return rightDate - leftDate;
  });
  const totalClaimed = sortedTransactions.reduce((total, transaction) => total + transaction.amount, 0);

  const handleExportReceiptPdf = () => {
    const printWindow = window.open("", "_blank", "width=1000,height=900");
    if (!printWindow) {
      window.alert("Popup blocked. Please allow popups for this site, then try exporting again.");
      return;
    }

    const triggerPrint = () => {
      try {
        printWindow.focus();
        printWindow.print();
      } catch {
        window.alert("Unable to open print dialog. Please try again.");
      }
    };

    printWindow.document.open();
    printWindow.document.write(buildReceiptHtml(b, fullName, fullAddress));
    printWindow.document.close();

    if (printWindow.document.readyState === "complete") {
      setTimeout(triggerPrint, 250);
      return;
    }

    printWindow.onload = () => {
      setTimeout(triggerPrint, 250);
    };
  };

  return (
    <Box sx={{ maxWidth: 1180, mx: "auto", pb: 3 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          mb: 2.2,
          flexWrap: "wrap",
        }}
      >
        <Link
          href="/admin/yakap"
          style={{
            textDecoration: "none",
            fontSize: "0.82rem",
            fontWeight: 500,
            color: PH.green,
          }}
        >
          YAKAP
        </Link>
        <NavigateNextRoundedIcon sx={{ fontSize: 16, color: "#9CA3AF" }} />
        <Chip
          label="Beneficiary Profile"
          size="small"
          sx={{
            bgcolor: "rgba(13, 138, 63, 0.08)",
            color: PH.green,
            fontWeight: 600,
            fontSize: "0.75rem",
          }}
        />
        <NavigateNextRoundedIcon sx={{ fontSize: 16, color: "#9CA3AF" }} />
        <Chip
          label={b.id}
          size="small"
          sx={{
            bgcolor: palette.background.default,
            color: "grey.700",
            fontWeight: 600,
            fontSize: "0.75rem",
            border: `1px solid ${palette.grey[200]}`,
          }}
        />
      </Box>

      <Paper
        sx={{
          p: { xs: 2.2, md: 3 },
          mb: 2.2,
          borderRadius: "16px",
          border: `1px solid ${palette.grey[200]}`,
          boxShadow: "0 4px 16px rgba(16, 24, 40, 0.04)",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 2, flexWrap: "wrap" }}>
          <Box>
            <div style={{ fontSize: "1.35rem", fontWeight: 700, color: "grey.900" }}>{fullName}</div>
            <div style={{ fontSize: "0.86rem", color: "grey.500", marginTop: 6 }}>
              PhilHealth No: {b.philhealthNumber}
            </div>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1.2, flexWrap: "wrap" }}>
              <Chip label={b.id} size="small" variant="outlined" sx={{ fontWeight: 600 }} />
              <Chip label={b.status} color={b.status === "Active" ? "success" : "error"} size="small" />
              <Chip
                label={`Registered ${formatDisplayDate(b.registrationDate)}`}
                size="small"
                sx={{ bgcolor: "grey.100", color: "grey.700", fontWeight: 600 }}
              />
            </Box>
          </Box>

          <Box sx={{ minWidth: 260 }}>
            <div style={{ fontSize: "0.75rem", color: "grey.500", fontWeight: 600 }}>Benefit Utilization</div>
            <div style={{ fontSize: "1.15rem", color: "grey.900", fontWeight: 700, marginTop: 2 }}>
              {usedPct}% used
            </div>
            <LinearProgress
              variant="determinate"
              value={usedPct}
              sx={{
                mt: 1,
                height: 8,
                borderRadius: 4,
                bgcolor: "rgba(0,0,0,0.06)",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 4,
                  bgcolor: barColor,
                },
              }}
            />
            <div style={{ marginTop: 8, fontSize: "0.82rem", color: "grey.600", fontWeight: 600 }}>
              {formatCurrency(b.benefitUsed)} / {formatCurrency(b.annualBenefit)}
            </div>
          </Box>
        </Box>
      </Paper>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1.45fr 0.95fr" },
          gap: 2,
        }}
      >
        <Box sx={{ display: "grid", gap: 2 }}>
          <Paper sx={{ p: 2.2, borderRadius: "14px", border: `1px solid ${palette.grey[200]}`, boxShadow: "none" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
              <PersonRoundedIcon sx={{ color: PH.green, fontSize: 18 }} />
              <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "grey.900" }}>Personal Information</div>
            </Box>
            <Box sx={{ display: "grid", gap: 1.2, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
              <InfoField label="First Name" value={b.firstName} />
              <InfoField label="Middle Name" value={b.middleName || "-"} />
              <InfoField label="Last Name" value={b.lastName} />
              <InfoField label="Suffix" value={b.suffix || "-"} />
              <InfoField label="Date of Birth" value={formatDisplayDate(b.dateOfBirth)} />
              <InfoField label="Gender" value={b.gender} />
              <InfoField label="Civil Status" value={b.civilStatus} />
              <InfoField label="Email" value={b.email} />
              <InfoField label="Contact Number" value={b.contactNumber} />
              <InfoField label="Valid ID Type" value={b.validIdType} />
              <InfoField label="Valid ID Number" value={b.validIdNumber} />
              <InfoField label="Address" value={fullAddress} fullWidth />
            </Box>
          </Paper>

          <Paper sx={{ p: 2.2, borderRadius: "14px", border: `1px solid ${palette.grey[200]}`, boxShadow: "none" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
              <ContactPhoneRoundedIcon sx={{ color: PH.green, fontSize: 18 }} />
              <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "grey.900" }}>Emergency Contact</div>
            </Box>
            <Box sx={{ display: "grid", gap: 1.2, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
              <InfoField label="Name" value={b.emergencyContact.name} />
              <InfoField label="Relationship" value={b.emergencyContact.relationship} />
              <InfoField label="Contact Number" value={b.emergencyContact.contactNumber} />
              <InfoField label="Benefit Year" value={String(b.benefitYear)} />
            </Box>
          </Paper>

          <Paper sx={{ p: 2.2, borderRadius: "14px", border: `1px solid ${palette.grey[200]}`, boxShadow: "none" }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1.2, mb: 1.4, flexWrap: "wrap" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <ReceiptLongRoundedIcon sx={{ color: PH.green, fontSize: 18 }} />
                <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "grey.900" }}>Benefit Usage History</div>
              </Box>
              <Button
                variant="outlined"
                size="small"
                startIcon={<PictureAsPdfRoundedIcon />}
                onClick={handleExportReceiptPdf}
                sx={{
                  borderColor: "grey.300",
                  color: "grey.700",
                  fontWeight: 600,
                  textTransform: "none",
                }}
              >
                Export PDF Receipt
              </Button>
            </Box>

            {sortedTransactions.length === 0 ? (
              <Box
                sx={{
                  textAlign: "center",
                  py: 3,
                  color: "#9CA3AF",
                  fontSize: "0.88rem",
                  border: `1px solid ${palette.grey[200]}`,
                  borderRadius: "12px",
                  bgcolor: "grey.50",
                }}
              >
                No benefit usage recorded yet.
              </Box>
            ) : (
              <>
                <Box sx={{ border: `1px solid ${palette.grey[200]}`, borderRadius: "12px", overflow: "hidden" }}>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", md: "170px 1fr 160px" },
                      gap: 1,
                      px: 1.5,
                      py: 1.2,
                      bgcolor: palette.background.default,
                      borderBottom: `1px solid ${palette.grey[200]}`,
                    }}
                  >
                    <div style={{ fontSize: "0.72rem", color: "grey.500", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Date
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "grey.500", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Description
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "grey.500", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "right" }}>
                      Amount
                    </div>
                  </Box>

                  {sortedTransactions.map((transaction, index) => (
                    <Box
                      key={`${transaction.date}-${transaction.description}-${index}`}
                      sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "170px 1fr 160px" },
                        gap: 1,
                        px: 1.5,
                        py: 1.4,
                        borderBottom: index === sortedTransactions.length - 1 ? "none" : `1px solid ${palette.grey[100]}`,
                        "&:hover": { bgcolor: "grey.50" },
                      }}
                    >
                      <div style={{ fontSize: "0.85rem", color: "grey.700", fontWeight: 600 }}>
                        {formatDisplayDate(transaction.date)}
                      </div>
                      <div style={{ fontSize: "0.88rem", color: "grey.800", fontWeight: 500 }}>
                        {transaction.description}
                      </div>
                      <div style={{ fontSize: "0.88rem", color: "grey.800", fontWeight: 700, textAlign: "right" }}>
                        {formatCurrency(transaction.amount)}
                      </div>
                    </Box>
                  ))}
                </Box>

                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" }, gap: 1.2, mt: 1.4 }}>
                  <InfoField label="Total Claimed" value={formatCurrency(totalClaimed)} />
                  <InfoField label="Annual Benefit" value={formatCurrency(b.annualBenefit)} />
                  <InfoField label="Remaining Balance" value={formatCurrency(b.benefitBalance)} />
                </Box>
              </>
            )}
          </Paper>
        </Box>

        <Box sx={{ display: "grid", gap: 2, alignContent: "start" }}>
          <Paper
            sx={{
              p: 2.2,
              borderRadius: "14px",
              border: `1px solid ${palette.grey[200]}`,
              boxShadow: "none",
              background: `linear-gradient(135deg, rgba(13, 138, 63, 0.06) 0%, rgba(20, 164, 77, 0.03) 100%)`,
            }}
          >
            <div style={{ fontSize: "0.8rem", color: "grey.500", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Benefit Overview
            </div>
            <div style={{ marginTop: 8, fontSize: "1.35rem", fontWeight: 700, color: PH.green }}>
              {formatCurrency(b.benefitBalance)}
            </div>
            <div style={{ fontSize: "0.82rem", color: "grey.600", marginTop: 4 }}>
              Remaining for {b.benefitYear}
            </div>
            <LinearProgress
              variant="determinate"
              value={usedPct}
              sx={{
                mt: 1.3,
                height: 8,
                borderRadius: 4,
                bgcolor: "rgba(0,0,0,0.08)",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 4,
                  bgcolor: PH.greenLight,
                },
              }}
            />
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, mt: 1.4 }}>
              <InfoField label="Used" value={formatCurrency(b.benefitUsed)} />
              <InfoField label="Utilization" value={`${usedPct}%`} />
            </Box>
          </Paper>

          <Paper sx={{ p: 2.2, borderRadius: "14px", border: `1px solid ${palette.grey[200]}`, boxShadow: "none" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.2 }}>
              <BadgeRoundedIcon sx={{ color: PH.green, fontSize: 18 }} />
              <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "grey.900" }}>Valid ID Preview</div>
            </Box>
            <Box
              component="img"
              src={b.validIdImageUrl || VALID_ID_PLACEHOLDER}
              alt={`Valid ID of ${fullName}`}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = VALID_ID_PLACEHOLDER;
              }}
              sx={{
                width: "100%",
                maxHeight: 250,
                objectFit: "cover",
                borderRadius: "12px",
                border: `1px solid ${palette.grey[300]}`,
                bgcolor: palette.background.default,
              }}
            />
            <div style={{ marginTop: 10, fontSize: "0.78rem", color: "grey.500" }}>
              Showing placeholder when uploaded image is unavailable.
            </div>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
