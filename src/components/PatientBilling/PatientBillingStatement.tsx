"use client";

import React from "react";
import {
  BadgeRow,
  BreakdownCard,
  BreakdownHeader,
  BreakdownRow,
  Container,
  CoverageBadge,
  DetailBody,
  DetailHeader,
  MetaCard,
  MetaGrid,
  MetaLabel,
  MetaValue,
  NotesCard,
  NotesLabel,
  NotesValue,
  PanelCard,
  PanelHeader,
  PanelSubtitle,
  PanelTitle,
  PanelTitleWrap,
  PatientMeta,
  PatientName,
  StatusBadge,
} from "./elements";
import { BillingRecord } from "./interface";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import PrintRoundedIcon from "@mui/icons-material/PrintRounded";

interface Props {
  billing: BillingRecord;
}

const moneyFormatter = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  minimumFractionDigits: 0,
});

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export default function PatientBillingStatement({ billing }: Props) {

    const handlePrint = () => {
  window.print();
};
  return (
    <Container>
      <PanelCard>
     <PanelHeader>
  <PanelTitleWrap>
    <PanelTitle>Billing Details</PanelTitle>
    <PanelSubtitle>
      Billing details and account balance for the selected record.
    </PanelSubtitle>
  </PanelTitleWrap>

  
</PanelHeader>

        <DetailBody>
          <DetailHeader>
            <div>
              <PatientName>{billing.patientName}</PatientName>
              <PatientMeta>
                {billing.serviceLabel}
              </PatientMeta>

              <BadgeRow>
                <CoverageBadge label={billing.encounterType} />
                <CoverageBadge label={billing.serviceType} />
                <StatusBadge status={billing.status}>{billing.status}</StatusBadge>
              </BadgeRow>
            </div>
          </DetailHeader>

          <MetaGrid>
            <MetaCard>
              <MetaLabel>Bill Number</MetaLabel>
              <MetaValue>{billing.billId}</MetaValue>
            </MetaCard>

            <MetaCard>
              <MetaLabel>Service Date</MetaLabel>
              <MetaValue>{formatDate(billing.serviceDate)}</MetaValue>
            </MetaCard>

            <MetaCard>
              <MetaLabel>Stay / Visit</MetaLabel>
              <MetaValue>
                {billing.encounterType === "Inpatient"
                  ? `${billing.stayDays || 1} day(s)`
                  : "1 visit"}
              </MetaValue>
            </MetaCard>
          </MetaGrid>

          <BreakdownCard>
            <BreakdownHeader>Price Breakdown</BreakdownHeader>

            {billing.lineItems.map((item, index) => (
              <BreakdownRow key={index}>
                <span>{item.label}</span>
                <span>{moneyFormatter.format(item.amount)}</span>
              </BreakdownRow>
            ))}

            <BreakdownRow>
              <span>Gross Total</span>
              <span>{moneyFormatter.format(billing.grossAmount)}</span>
            </BreakdownRow>

            <BreakdownRow positive>
              <span>Coverage Discount</span>
              <span>- {moneyFormatter.format(billing.coverageDiscount)}</span>
            </BreakdownRow>

            <BreakdownRow positive>
              <span>YAKAP Deduction</span>
              <span>- {moneyFormatter.format(billing.yakapDeduction)}</span>
            </BreakdownRow>

            <BreakdownRow positive>
              <span>Payments Received</span>
              <span>- {moneyFormatter.format(billing.paidAmount)}</span>
            </BreakdownRow>

            <BreakdownRow
              total
              danger={billing.balance > 0}
              positive={billing.balance === 0}
            >
              <span>Balance Due</span>
              <span>{moneyFormatter.format(billing.balance)}</span>
            </BreakdownRow>
          </BreakdownCard>

          {billing.notes && (
            <NotesCard>
              <NotesLabel>Clinical Notes</NotesLabel>
              <NotesValue>{billing.notes}</NotesValue>
            </NotesCard>
          )}
        </DetailBody>

   <Box
  sx={{
    display: "flex",
    justifyContent: "flex-end",
    gap: 1.25,
    flexWrap: "wrap",
    mt: 2.5,
    px: 2.5,
    pb: 2.5,
  }}
>
  <Button
    variant="outlined"
    startIcon={<DownloadRoundedIcon />}
    sx={{
      textTransform: "none",
      borderRadius: "10px",
      fontWeight: 600,
      px: 2,
    }}
  >
    Download Statement
  </Button>

  <Button
    variant="contained"
    startIcon={<PrintRoundedIcon />}
    sx={{
      backgroundColor: "#4361EE",
      textTransform: "none",
      borderRadius: "10px",
      fontWeight: 600,
      px: 2,
      boxShadow: "none",
      "&:hover": {
        backgroundColor: "#3A56D4",
        boxShadow: "none",
      },
    }}
  >
    Print Statement
  </Button>
</Box>
      </PanelCard>
    </Container>
  );
}