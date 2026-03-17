"use client";

import React, { useMemo, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Tab from "@mui/material/Tab";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import ContactPhoneRoundedIcon from "@mui/icons-material/ContactPhoneRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import MedicationRoundedIcon from "@mui/icons-material/MedicationRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import { styled } from "@mui/material/styles";
import {
  StyledBodyCell,
  StyledHeaderCell,
  StyledTableRow,
  TableContainer,
} from "@/components/AppointmentTable/elements";
import {
  Beneficiary,
  BenefitTransaction,
} from "@/components/BeneficiaryTable/interface";
import TransactionDetailModal from "@/components/TransactionDetailModal";
import yakapData from "@/json/yakap.json";

import { palette } from "@/theme/palette";
/* ── Simulated logged-in patient ── */
const CURRENT_PATIENT_ID = "YKP-2025-0001";

/* ── Helpers ── */
const peso = (v: number) => `₱${v.toLocaleString()}`;

const fmtDate = (iso: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/* ── Styled Components ── */
const PageWrapper = styled(Box)(({ theme }) => ({}));

const PageTitle = styled("h2")(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: 700,
  margin: "0 0 4px 0",
  color: "text.primary",
}));

const PageSubtitle = styled("p")(({ theme }) => ({
  fontSize: "0.88rem",
  color: "text.secondary",
  margin: 0,
}));

const StatCardRoot = styled(Card)(({ theme }) => ({
  padding: "17.6px",
  borderRadius: 8,
  border: `1px solid ${palette.grey[200]}`,
  boxShadow: "none",
  height: "100%",
}));

const StatIconBox = styled(Box)(({ theme }) => ({
  width: 36,
  height: 36,
  borderRadius: 10,
  backgroundColor: "#EEF4FF",
  color: "primary.main",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  fontSize: "0.74rem",
  color: palette.info.dark,
  fontWeight: 600,
  marginBottom: 2,
}));

const StatValue = styled(Typography)(({ theme }) => ({
  fontSize: "1.45rem",
  fontWeight: 700,
  color: "text.primary",
  lineHeight: 1.1,
}));

const ProgressCard = styled(Card)(({ theme }) => ({
  padding: 20,
  borderRadius: 8,
  border: `1px solid ${palette.grey[200]}`,
  boxShadow: "none",
  marginBottom: 24,
}));

const ProgressHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 8,
}));

const ProgressLabel = styled(Typography)(({ theme }) => ({
  fontSize: "0.88rem",
  fontWeight: 600,
  color: "text.primary",
}));

const ProgressMeta = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 6,
}));

const ProgressFooter = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  marginTop: 6,
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  marginBottom: 20,
  minHeight: 36,
  "& .MuiTab-root": {
    textTransform: "none",
    fontWeight: 600,
    fontSize: "0.82rem",
    minHeight: 36,
    paddingLeft: 16,
    paddingRight: 16,
  },
  "& .MuiTabs-indicator": { height: 2.5, borderRadius: 2 },
}));

const TableCard = styled(Card)(({ theme }) => ({
  borderRadius: 8,
  border: `1px solid ${palette.grey[200]}`,
  boxShadow: "none",
  overflow: "hidden",
}));

const TxIconBox = styled(Box)(({ theme }) => ({
  width: 28,
  height: 28,
  borderRadius: 8,
  backgroundColor: "#F0FDF4",
  color: "#16A34A",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
}));

/* ── Profile Styled Components ── */
const ProfileCard = styled(Card)(({ theme }) => ({
  borderRadius: 12,
  border: `1px solid ${palette.grey[200]}`,
  boxShadow: "none",
  overflow: "hidden",
}));

const ProfileBanner = styled(Box)(({ theme }) => ({
  height: 80,
  background: `linear-gradient(135deg, ${palette.primary.main} 0%, #3A56D4 100%)`,
  position: "relative",
}));

const ProfileAvatarWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: -36,
  paddingBottom: 16,
}));

const ProfileName = styled(Typography)(({ theme }) => ({
  fontSize: "1.12rem",
  fontWeight: 700,
  color: "text.primary",
  marginTop: 10,
}));

const ProfileIdText = styled(Typography)(({ theme }) => ({
  fontSize: "0.78rem",
  color: "text.secondary",
  marginTop: 2,
}));

const InfoSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 3, 2.5, 3),
}));

const InfoSectionHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
  marginBottom: 12,
}));

const InfoSectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "0.78rem",
  fontWeight: 700,
  color: "text.secondary",
  textTransform: "uppercase" as const,
  letterSpacing: "0.06em",
}));

const InfoGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: theme.spacing(1.25),
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

const InfoItem = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 2,
  padding: theme.spacing(1.25, 1.5),
  borderRadius: 10,
  backgroundColor: "grey.50",
  border: `1px solid ${palette.divider}`,
}));

const InfoItemLabel = styled("span")(({ theme }) => ({
  fontSize: "0.68rem",
  fontWeight: 700,
  color: "grey.400",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
}));

const InfoItemValue = styled("span")(({ theme }) => ({
  fontSize: "0.84rem",
  color: "text.primary",
  fontWeight: 500,
}));

const SectionDivider = styled("div")(({ theme }) => ({
  borderTop: `1px solid ${palette.divider}`,
  margin: theme.spacing(0, 3),
  marginBottom: theme.spacing(2),
}));

/* ── Reusable stat card ── */
const StatCard = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}) => (
  <StatCardRoot>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
      <StatIconBox>{icon}</StatIconBox>
      <Box>
        <StatLabel>{label}</StatLabel>
        <StatValue>{value}</StatValue>
      </Box>
    </Box>
  </StatCardRoot>
);

/* ── Running balance calculator ── */
const computeRunningBalances = (transactions: BenefitTransaction[], annualBenefit: number) => {
  const chronological = [...transactions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const map = new Map<string, number>();
  let balance = annualBenefit;
  chronological.forEach((tx, i) => {
    balance -= tx.amount;
    map.set(`${tx.date}|${tx.description}|${tx.amount}|${i}`, balance);
  });
  return { chronological, map };
};

/* ── Page ── */
export default function YakapBalancePage() {
  const allBeneficiaries = yakapData as Beneficiary[];
  const beneficiary = allBeneficiaries.find((b) => b.id === CURRENT_PATIENT_ID);

  const [tabIndex, setTabIndex] = useState(0);
  const [selectedTx, setSelectedTx] = useState<BenefitTransaction | null>(null);
  const [selectedTxBalance, setSelectedTxBalance] = useState(0);
  const [detailOpen, setDetailOpen] = useState(false);

  /* sorted transactions (newest first) */
  const sortedTransactions = useMemo(() => {
    if (!beneficiary) return [];
    return [...beneficiary.transactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [beneficiary]);

  /* pre-compute running balances */
  const { chronological, map: balanceMap } = useMemo(() => {
    if (!beneficiary) return { chronological: [], map: new Map<string, number>() };
    return computeRunningBalances(beneficiary.transactions, beneficiary.annualBenefit);
  }, [beneficiary]);

  const getRunningBalance = (tx: BenefitTransaction) => {
    const chronIdx = chronological.findIndex(
      (t) => t.date === tx.date && t.description === tx.description && t.amount === tx.amount
    );
    const key = `${tx.date}|${tx.description}|${tx.amount}|${chronIdx}`;
    return balanceMap.get(key) ?? 0;
  };

  if (!beneficiary) {
    return (
      <PageWrapper>
        <div style={{ marginBottom: 28 }}>
          <PageTitle>YAKAP Balance</PageTitle>
          <PageSubtitle>
            No YAKAP account found. Please contact the hospital to register as a beneficiary.
          </PageSubtitle>
        </div>
      </PageWrapper>
    );
  }

  const usedPct = Math.round((beneficiary.benefitUsed / beneficiary.annualBenefit) * 100);
  const fullName = [beneficiary.firstName, beneficiary.middleName, beneficiary.lastName, beneficiary.suffix]
    .filter(Boolean)
    .join(" ");
  const initials = `${beneficiary.firstName[0]}${beneficiary.lastName[0]}`;

  const handleTxClick = (tx: BenefitTransaction) => {
    setSelectedTx(tx);
    setSelectedTxBalance(getRunningBalance(tx));
    setDetailOpen(true);
  };

  return (
    <PageWrapper>
      {/* ── Header ── */}
      <div style={{ marginBottom: 28 }}>
        <PageTitle>YAKAP Balance</PageTitle>
        <PageSubtitle>
          View your PhilHealth YAKAP medicine benefit balance and usage history.
        </PageSubtitle>
      </div>

      {/* ── Stat Cards ── */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 6, sm: 3 }}>
          <StatCard
            label="Annual Benefit"
            value={peso(beneficiary.annualBenefit)}
            icon={<SavingsRoundedIcon sx={{ fontSize: 20 }} />}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <StatCard
            label="Amount Used"
            value={peso(beneficiary.benefitUsed)}
            icon={<ReceiptLongRoundedIcon sx={{ fontSize: 20 }} />}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <StatCard
            label="Remaining Balance"
            value={peso(beneficiary.benefitBalance)}
            icon={<AccountBalanceWalletRoundedIcon sx={{ fontSize: 20 }} />}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <StatCard
            label="Transactions"
            value={beneficiary.transactions.length}
            icon={<MedicationRoundedIcon sx={{ fontSize: 20 }} />}
          />
        </Grid>
      </Grid>

      {/* ── Benefit Progress ── */}
      <ProgressCard>
        <ProgressHeader>
          <ProgressLabel>Benefit Usage</ProgressLabel>
          <Chip
            label={beneficiary.status}
            size="small"
            sx={{
              fontWeight: 600,
              fontSize: "0.72rem",
              bgcolor: beneficiary.status === "Active" ? "#ECFDF3" : "#FEF3F2",
              color: beneficiary.status === "Active" ? "#067647" : palette.error.dark,
            }}
          />
        </ProgressHeader>
        <ProgressMeta>
          <Typography sx={{ fontSize: "0.78rem", color: "text.secondary" }}>
            {peso(beneficiary.benefitUsed)} of {peso(beneficiary.annualBenefit)} used
          </Typography>
          <Typography sx={{ fontSize: "0.78rem", color: "text.secondary", fontWeight: 600 }}>
            {usedPct}%
          </Typography>
        </ProgressMeta>
        <LinearProgress
          variant="determinate"
          value={usedPct}
          sx={{
            height: 10,
            borderRadius: 5,
            bgcolor: "grey.100",
            "& .MuiLinearProgress-bar": {
              borderRadius: 5,
              background:
                usedPct >= 90
                  ? `linear-gradient(90deg, ${palette.error.main} 0%, #D92D20 100%)`
                  : usedPct >= 70
                    ? `linear-gradient(90deg, ${palette.warning.main} 0%, #DC6803 100%)`
                    : `linear-gradient(90deg, ${palette.success.main} 0%, #039855 100%)`,
            },
          }}
        />
        <ProgressFooter>
          <Typography sx={{ fontSize: "0.72rem", color: "grey.400" }}>
            Benefit Year {beneficiary.benefitYear}
          </Typography>
          <Typography
            sx={{
              fontSize: "0.72rem",
              fontWeight: 600,
              color: beneficiary.benefitBalance <= 3000 ? "#D92D20" : "#039855",
            }}
          >
            {peso(beneficiary.benefitBalance)} remaining
          </Typography>
        </ProgressFooter>
      </ProgressCard>

      {/* ── Tabs ── */}
      <StyledTabs value={tabIndex} onChange={(_, v) => setTabIndex(v)}>
        <Tab label="Transaction History" />
        <Tab label="Account Details" />
      </StyledTabs>

      {/* ── Tab 0: Transaction History ── */}
      {tabIndex === 0 && (
        <TableCard>
          <TableContainer>
            <Table>
              <TableHead>
                <StyledTableRow>
                  <StyledHeaderCell>Date</StyledHeaderCell>
                  <StyledHeaderCell>Description</StyledHeaderCell>
                  <StyledHeaderCell align="right">Amount</StyledHeaderCell>
                  <StyledHeaderCell align="right">Running Balance</StyledHeaderCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {sortedTransactions.length === 0 ? (
                  <StyledTableRow>
                    <StyledBodyCell colSpan={4} sx={{ textAlign: "center", py: 4 }}>
                      <Typography sx={{ color: "grey.400", fontSize: "0.85rem" }}>
                        No transactions yet
                      </Typography>
                    </StyledBodyCell>
                  </StyledTableRow>
                ) : (
                  sortedTransactions.map((tx: BenefitTransaction, idx: number) => {
                    const running = getRunningBalance(tx);

                    return (
                      <StyledTableRow
                        key={`${tx.date}-${idx}`}
                        onClick={() => handleTxClick(tx)}
                      >
                        <StyledBodyCell>
                          <Typography sx={{ fontSize: "0.82rem", fontWeight: 500, color: "grey.700" }}>
                            {fmtDate(tx.date)}
                          </Typography>
                        </StyledBodyCell>
                        <StyledBodyCell>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <TxIconBox>
                              <LocalHospitalRoundedIcon sx={{ fontSize: 15 }} />
                            </TxIconBox>
                            <Typography sx={{ fontSize: "0.82rem", color: "text.primary", fontWeight: 500 }}>
                              {tx.description}
                            </Typography>
                          </Box>
                        </StyledBodyCell>
                        <StyledBodyCell align="right">
                          <Typography sx={{ fontSize: "0.82rem", fontWeight: 600, color: "#D92D20" }}>
                            -{peso(tx.amount)}
                          </Typography>
                        </StyledBodyCell>
                        <StyledBodyCell align="right">
                          <Typography sx={{ fontSize: "0.82rem", fontWeight: 600, color: "text.primary" }}>
                            {peso(running)}
                          </Typography>
                        </StyledBodyCell>
                      </StyledTableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </TableCard>
      )}

      {/* ── Tab 1: Account Details (Profile) ── */}
      {tabIndex === 1 && (
        <Grid container spacing={2.5}>
          {/* Profile Card */}
          <Grid size={{ xs: 12, md: 5 }}>
            <ProfileCard>
              <ProfileBanner />
              <ProfileAvatarWrapper>
                <Avatar
                  sx={{
                    width: 72,
                    height: 72,
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    bgcolor: "primary.main",
                    border: "4px solid #FFFFFF",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  {initials}
                </Avatar>
                <ProfileName>{fullName}</ProfileName>
                <ProfileIdText>{beneficiary.id}</ProfileIdText>
                <Chip
                  label={beneficiary.status}
                  size="small"
                  sx={{
                    mt: 1,
                    fontWeight: 600,
                    fontSize: "0.72rem",
                    bgcolor: beneficiary.status === "Active" ? "#ECFDF3" : "#FEF3F2",
                    color: beneficiary.status === "Active" ? "#067647" : palette.error.dark,
                  }}
                />
              </ProfileAvatarWrapper>

              <SectionDivider />

              <InfoSection>
                <InfoSectionHeader>
                  <BadgeRoundedIcon sx={{ fontSize: 16, color: "primary.main" }} />
                  <InfoSectionTitle>YAKAP Account</InfoSectionTitle>
                </InfoSectionHeader>
                <InfoGrid>
                  <InfoItem>
                    <InfoItemLabel>PhilHealth #</InfoItemLabel>
                    <InfoItemValue>{beneficiary.philhealthNumber}</InfoItemValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoItemLabel>Valid ID Type</InfoItemLabel>
                    <InfoItemValue>{beneficiary.validIdType}</InfoItemValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoItemLabel>Registered</InfoItemLabel>
                    <InfoItemValue>{fmtDate(beneficiary.registrationDate)}</InfoItemValue>
                  </InfoItem>
                  {/* <InfoItem>
                    <InfoItemLabel>Benefit Year</InfoItemLabel>
                    <InfoItemValue>{beneficiary.benefitYear}</InfoItemValue>
                  </InfoItem> */}
                </InfoGrid>
              </InfoSection>
            </ProfileCard>
          </Grid>

          {/* Details Cards */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              {/* Personal Information */}
              <ProfileCard sx={{ p: 2.5 }}>
                <InfoSectionHeader>
                  <PersonRoundedIcon sx={{ fontSize: 16, color: "primary.main" }} />
                  <InfoSectionTitle>Personal Information</InfoSectionTitle>
                </InfoSectionHeader>
                <InfoGrid>
                  <InfoItem>
                    <InfoItemLabel>Date of Birth</InfoItemLabel>
                    <InfoItemValue>{fmtDate(beneficiary.dateOfBirth)}</InfoItemValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoItemLabel>Gender</InfoItemLabel>
                    <InfoItemValue>{beneficiary.gender}</InfoItemValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoItemLabel>Civil Status</InfoItemLabel>
                    <InfoItemValue>{beneficiary.civilStatus}</InfoItemValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoItemLabel>Contact</InfoItemLabel>
                    <InfoItemValue>{beneficiary.contactNumber}</InfoItemValue>
                  </InfoItem>
                  {beneficiary.email && (
                    <InfoItem style={{ gridColumn: "1 / -1" }}>
                      <InfoItemLabel>Email</InfoItemLabel>
                      <InfoItemValue>{beneficiary.email}</InfoItemValue>
                    </InfoItem>
                  )}
                  <InfoItem style={{ gridColumn: "1 / -1" }}>
                    <InfoItemLabel>Address</InfoItemLabel>
                    <InfoItemValue>
                      {beneficiary.address.street}, {beneficiary.address.barangay},{" "}
                      {beneficiary.address.city}, {beneficiary.address.province}{" "}
                      {beneficiary.address.zipCode}
                    </InfoItemValue>
                  </InfoItem>
                </InfoGrid>
              </ProfileCard>

              {/* Emergency Contact */}
              <ProfileCard sx={{ p: 2.5 }}>
                <InfoSectionHeader>
                  <ContactPhoneRoundedIcon sx={{ fontSize: 16, color: "primary.main" }} />
                  <InfoSectionTitle>Emergency Contact</InfoSectionTitle>
                </InfoSectionHeader>
                <InfoGrid>
                  <InfoItem>
                    <InfoItemLabel>Name</InfoItemLabel>
                    <InfoItemValue>{beneficiary.emergencyContact.name}</InfoItemValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoItemLabel>Relationship</InfoItemLabel>
                    <InfoItemValue>{beneficiary.emergencyContact.relationship}</InfoItemValue>
                  </InfoItem>
                  <InfoItem style={{ gridColumn: "1 / -1" }}>
                    <InfoItemLabel>Contact Number</InfoItemLabel>
                    <InfoItemValue>{beneficiary.emergencyContact.contactNumber}</InfoItemValue>
                  </InfoItem>
                </InfoGrid>
              </ProfileCard>
            </Box>
          </Grid>
        </Grid>
      )}

      {/* ── Transaction Detail Modal ── */}
      <TransactionDetailModal
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        transaction={selectedTx}
        runningBalance={selectedTxBalance}
        annualBenefit={beneficiary.annualBenefit}
        beneficiaryName={fullName}
        yakapId={beneficiary.id}
        philhealthNumber={beneficiary.philhealthNumber}
      />
    </PageWrapper>
  );
}
