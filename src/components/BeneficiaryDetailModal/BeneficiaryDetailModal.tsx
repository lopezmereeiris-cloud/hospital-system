"use client";

import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import ContactPhoneRoundedIcon from "@mui/icons-material/ContactPhoneRounded";
import { BeneficiaryDetailModalProps } from "./interface";
import { palette } from "@/theme/palette";
import {
  ModalHeader,
  HeaderInfo,
  BeneficiaryName,
  DetailGrid,
  DetailItem,
  DetailLabel,
  DetailValue,
  SectionDivider,
  SectionTitle,
  BalanceBar,
  BalanceAmount,
  BalanceLabel,
  TransactionRow,
  TransactionDate,
  TransactionDesc,
  TransactionAmount,
  EmptyTransactions,
} from "./elements";

const PH = {
  green: "#0D8A3F",
};

const BeneficiaryDetailModal: React.FC<BeneficiaryDetailModalProps> = ({
  open,
  onClose,
  beneficiary,
}) => {
  if (!beneficiary) return null;

  const b = beneficiary;
  const fullName = [b.firstName, b.middleName, b.lastName, b.suffix]
    .filter(Boolean)
    .join(" ");
  const usedPct = Math.round((b.benefitUsed / b.annualBenefit) * 100);
  const barColor =
    b.benefitBalance === 0
      ? palette.error.main
      : b.benefitBalance <= 3000
      ? palette.warning.main
      : PH.green;

  const fullAddress = [
    b.address.street,
    b.address.barangay,
    b.address.city,
    b.address.province,
    b.address.zipCode,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent sx={{ p: 4 }}>
        {/* Header */}
        <ModalHeader>
          <HeaderInfo>
            <BeneficiaryName>{fullName}</BeneficiaryName>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <Chip
                label={b.id}
                size="small"
                variant="outlined"
                sx={{ fontWeight: 600, fontSize: "0.72rem" }}
              />
              <Chip
                label={b.status}
                color={b.status === "Active" ? "success" : "error"}
                size="small"
              />
            </div>
          </HeaderInfo>
          <IconButton onClick={onClose} size="small">
            <CloseRoundedIcon />
          </IconButton>
        </ModalHeader>

        {/* Balance Overview */}
        <BalanceBar>
          <div style={{ flex: 1 }}>
            <BalanceLabel>Remaining Balance ({b.benefitYear})</BalanceLabel>
            <BalanceAmount>₱{b.benefitBalance.toLocaleString()}</BalanceAmount>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginTop: 8,
              }}
            >
              <LinearProgress
                variant="determinate"
                value={usedPct}
                sx={{
                  flex: 1,
                  height: 8,
                  borderRadius: 4,
                  bgcolor: "rgba(0,0,0,0.06)",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 4,
                    bgcolor: barColor,
                  },
                }}
              />
              <span
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "text.secondary",
                }}
              >
                ₱{b.benefitUsed.toLocaleString()} / ₱
                {b.annualBenefit.toLocaleString()} used
              </span>
            </div>
          </div>
        </BalanceBar>

        {/* Personal Details */}
        <SectionTitle>
          <PersonRoundedIcon sx={{ fontSize: 18 }} />
          Personal Information
        </SectionTitle>
        <DetailGrid>
          <DetailItem>
            <DetailLabel>Date of Birth</DetailLabel>
            <DetailValue>{b.dateOfBirth}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Gender</DetailLabel>
            <DetailValue>{b.gender}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Civil Status</DetailLabel>
            <DetailValue>{b.civilStatus}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Contact</DetailLabel>
            <DetailValue>{b.contactNumber}</DetailValue>
          </DetailItem>
          <DetailItem style={{ gridColumn: "1 / -1" }}>
            <DetailLabel>Address</DetailLabel>
            <DetailValue>{fullAddress}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Valid ID</DetailLabel>
            <DetailValue>
              {b.validIdType} — {b.validIdNumber}
            </DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Registered</DetailLabel>
            <DetailValue>{b.registrationDate}</DetailValue>
          </DetailItem>
        </DetailGrid>

        {/* Emergency Contact */}
        <SectionDivider />
        <SectionTitle>
          <ContactPhoneRoundedIcon sx={{ fontSize: 18 }} />
          Emergency Contact
        </SectionTitle>
        <DetailGrid>
          <DetailItem>
            <DetailLabel>Name</DetailLabel>
            <DetailValue>{b.emergencyContact.name}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Relationship</DetailLabel>
            <DetailValue>{b.emergencyContact.relationship}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Contact Number</DetailLabel>
            <DetailValue>{b.emergencyContact.contactNumber}</DetailValue>
          </DetailItem>
        </DetailGrid>

        {/* Benefit Usage History */}
        <SectionDivider />
        <SectionTitle>
          <ReceiptLongRoundedIcon sx={{ fontSize: 18 }} />
          Benefit Usage History
        </SectionTitle>

        {b.transactions.length === 0 ? (
          <EmptyTransactions>
            No benefit usage recorded yet.
          </EmptyTransactions>
        ) : (
          <div>
            {b.transactions.map((t, i) => (
              <TransactionRow key={i}>
                <TransactionDate>{t.date}</TransactionDate>
                <TransactionDesc>{t.description}</TransactionDesc>
                <TransactionAmount>−₱{t.amount.toLocaleString()}</TransactionAmount>
              </TransactionRow>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BeneficiaryDetailModal;
