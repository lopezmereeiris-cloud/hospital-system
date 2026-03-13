"use client";

import React from "react";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import {
  Overlay,
  ModalPanel,
  ModalHeader,
  ReceiptBadge,
  SectionTitle,
  DetailGrid,
  DetailItem,
  DetailLabel,
  DetailValue,
  SectionDivider,
  BalanceRow,
  BalanceLabel,
  BalanceValue,
} from "./elements";
import { TransactionDetailModalProps } from "./interface";

const peso = (v: number) => `₱${v.toLocaleString()}`;

const fmtDate = (iso: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-PH", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function TransactionDetailModal({
  open,
  onClose,
  transaction,
  runningBalance,
  annualBenefit,
  beneficiaryName,
  yakapId,
  philhealthNumber,
}: TransactionDetailModalProps) {
  if (!open || !transaction) return null;

  const balancePct = Math.round((runningBalance / annualBenefit) * 100);

  return (
    <Overlay onClick={onClose}>
      <ModalPanel onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <ModalHeader>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <ReceiptBadge>
              <LocalHospitalRoundedIcon sx={{ fontSize: 24 }} />
            </ReceiptBadge>
            <div>
              <Typography
                sx={{ fontSize: "1.1rem", fontWeight: 700, color: "#1A1D1F", lineHeight: 1.2 }}
              >
                Transaction Details
              </Typography>
              <Typography sx={{ fontSize: "0.78rem", color: "#6F767E", mt: 0.25 }}>
                {fmtDate(transaction.date)}
              </Typography>
            </div>
          </div>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              color: "#98A2B3",
              "&:hover": { color: "#1A1D1F", bgcolor: "#F2F4F7" },
            }}
          >
            <CloseRoundedIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </ModalHeader>

        {/* Transaction Info */}
        <SectionTitle>Claim Information</SectionTitle>
        <DetailGrid>
          <DetailItem>
            <DetailLabel>Description</DetailLabel>
            <DetailValue>{transaction.description}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Amount Claimed</DetailLabel>
            <DetailValue style={{ color: "#D92D20", fontWeight: 600 }}>
              -{peso(transaction.amount)}
            </DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Transaction Date</DetailLabel>
            <DetailValue>{fmtDate(transaction.date)}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Type</DetailLabel>
            <DetailValue>Medicine Benefit</DetailValue>
          </DetailItem>
        </DetailGrid>

        <SectionDivider />

        {/* Beneficiary Info */}
        <SectionTitle>Beneficiary</SectionTitle>
        <DetailGrid>
          <DetailItem>
            <DetailLabel>Name</DetailLabel>
            <DetailValue>{beneficiaryName}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>YAKAP ID</DetailLabel>
            <DetailValue>{yakapId}</DetailValue>
          </DetailItem>
          <DetailItem style={{ gridColumn: "1 / -1" }}>
            <DetailLabel>PhilHealth Number</DetailLabel>
            <DetailValue>{philhealthNumber}</DetailValue>
          </DetailItem>
        </DetailGrid>

        <SectionDivider />

        {/* Balance After */}
        <SectionTitle>Balance After Transaction</SectionTitle>
        <BalanceRow>
          <BalanceLabel>Remaining Balance</BalanceLabel>
          <BalanceValue style={{ color: runningBalance <= 3000 ? "#D92D20" : "#039855" }}>
            {peso(runningBalance)}
          </BalanceValue>
        </BalanceRow>
        <div style={{ marginTop: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <Typography sx={{ fontSize: "0.72rem", color: "#98A2B3" }}>
              {peso(annualBenefit - runningBalance)} used of {peso(annualBenefit)}
            </Typography>
            <Typography sx={{ fontSize: "0.72rem", color: "#98A2B3", fontWeight: 600 }}>
              {balancePct}% left
            </Typography>
          </div>
          <LinearProgress
            variant="determinate"
            value={100 - balancePct}
            sx={{
              height: 6,
              borderRadius: 3,
              bgcolor: "#F2F4F7",
              "& .MuiLinearProgress-bar": {
                borderRadius: 3,
                background:
                  balancePct <= 10
                    ? "linear-gradient(90deg, #F04438 0%, #D92D20 100%)"
                    : balancePct <= 30
                      ? "linear-gradient(90deg, #F79009 0%, #DC6803 100%)"
                      : "linear-gradient(90deg, #12B76A 0%, #039855 100%)",
              },
            }}
          />
        </div>
      </ModalPanel>
    </Overlay>
  );
}
