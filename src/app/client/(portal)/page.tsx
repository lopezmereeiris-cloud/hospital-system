"use client";

import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import DashboardCard from "@/components/DashboardCard";
import VolunteerActivismRoundedIcon from "@mui/icons-material/VolunteerActivismRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import HourglassBottomRoundedIcon from "@mui/icons-material/HourglassBottomRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import appointmentsData from "@/json/appointments.json";
import billingRecords from "@/json/billings.json";
import yakapData from "@/json/yakap.json";
import { palette } from "@/theme/palette";
import {
  ActivityAmount,
  ActivityItem,
  ActivityMeta,
  ActivityTitle,
  BenefitProgress,
  BenefitUsageText,
  BillingStatusChip,
  ColumnStack,
  DetailLabel,
  DetailRowRoot,
  DetailValue,
  EmptyStateText,
  HeroCard,
  HeroSubtitle,
  HeroTag,
  HeroTitle,
  PageRoot,
  SectionCardRoot,
  SectionSubtitle,
  SectionTitle,
  StepIconBox,
  StepItem,
  StepText,
  StepTitle,
  TipBox,
  TipIcon,
  TipText,
  TopCardsGrid,
} from "./elements";

interface AppointmentRecord {
  id: number;
  patientName: string;
  assignedDoctor: string;
  date: string;
  time: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled" | string;
}

interface BillingRecord {
  billId: string;
  patientName: string;
  serviceDate: string;
  netAmount: number;
  balance: number;
  status: "Paid" | "Partial" | "Unpaid" | string;
}

interface YakapTransaction {
  date: string;
  description: string;
  amount: number;
}

interface YakapBeneficiary {
  id: string;
  firstName: string;
  lastName: string;
  annualBenefit: number;
  benefitUsed: number;
  benefitBalance: number;
  benefitYear: number;
  transactions: YakapTransaction[];
}

interface SectionCardProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const CURRENT_PATIENT_NAME = "Maria Santos";
const CURRENT_PATIENT_YAKAP_ID = "YKP-2025-0001";

const moneyFormatter = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("en-PH", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

const parseTimeToMinutes = (rawTime: string) => {
  const time = rawTime.trim();
  const twelveHourMatch = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (twelveHourMatch) {
    let hours = Number(twelveHourMatch[1]);
    const minutes = Number(twelveHourMatch[2]);
    const meridiem = twelveHourMatch[3].toUpperCase();
    if (meridiem === "PM" && hours !== 12) hours += 12;
    if (meridiem === "AM" && hours === 12) hours = 0;
    return hours * 60 + minutes;
  }

  const twentyFourHourMatch = time.match(/^(\d{1,2}):(\d{2})$/);
  if (twentyFourHourMatch) {
    return Number(twentyFourHourMatch[1]) * 60 + Number(twentyFourHourMatch[2]);
  }

  return 0;
};

const formatDate = (dateValue: string) => {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }
  return dateFormatter.format(date);
};

const isOpenAppointment = (status: string) =>
  status === "Pending" || status === "Confirmed";

const isOnOrAfterToday = (dateValue: string) => {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return false;
  date.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return date.getTime() >= today.getTime();
};

const getBillStatusLabel = (status: BillingRecord["status"]) => {
  if (status === "Paid") return "Paid in full";
  if (status === "Partial") return "Partially paid";
  return "Unpaid";
};

const getBillStatusColor = (
  status: BillingRecord["status"]
): "success" | "warning" | "error" => {
  if (status === "Paid") return "success";
  if (status === "Partial") return "warning";
  return "error";
};

function SectionCard({ title, subtitle, children }: SectionCardProps) {
  return (
    <SectionCardRoot>
      <SectionTitle>{title}</SectionTitle>
      <SectionSubtitle>{subtitle}</SectionSubtitle>
      {children}
    </SectionCardRoot>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <DetailRowRoot>
      <DetailLabel>{label}</DetailLabel>
      <DetailValue>{value}</DetailValue>
    </DetailRowRoot>
  );
}

export default function ClientDashboardPage() {
  const appointments = appointmentsData as AppointmentRecord[];
  const bills = billingRecords as BillingRecord[];
  const beneficiaries = yakapData as YakapBeneficiary[];

  const myAppointments = React.useMemo(
    () => appointments.filter((item) => item.patientName === CURRENT_PATIENT_NAME),
    [appointments]
  );

  const sortedAppointments = React.useMemo(
    () =>
      [...myAppointments].sort((a, b) => {
        if (a.date !== b.date) {
          return a.date.localeCompare(b.date);
        }
        return parseTimeToMinutes(a.time) - parseTimeToMinutes(b.time);
      }),
    [myAppointments]
  );

  const nextAppointment = React.useMemo(() => {
    const openAppointments = sortedAppointments.filter((item) =>
      isOpenAppointment(item.status)
    );

    return (
      openAppointments.find((item) => isOnOrAfterToday(item.date)) ??
      openAppointments[0] ??
      null
    );
  }, [sortedAppointments]);

  const pendingAppointmentsCount = React.useMemo(
    () => myAppointments.filter((item) => item.status === "Pending").length,
    [myAppointments]
  );

  const myBills = React.useMemo(
    () => bills.filter((item) => item.patientName === CURRENT_PATIENT_NAME),
    [bills]
  );

  const sortedBills = React.useMemo(
    () =>
      [...myBills].sort(
        (a, b) =>
          new Date(b.serviceDate).getTime() - new Date(a.serviceDate).getTime()
      ),
    [myBills]
  );

  const latestBill = sortedBills[0] ?? null;

  const outstandingBalance = React.useMemo(
    () => sortedBills.reduce((total, bill) => total + bill.balance, 0),
    [sortedBills]
  );

  const yakapProfile = React.useMemo(
    () => beneficiaries.find((item) => item.id === CURRENT_PATIENT_YAKAP_ID) ?? null,
    [beneficiaries]
  );

  const yakapPercentUsed = React.useMemo(() => {
    if (!yakapProfile || yakapProfile.annualBenefit <= 0) return 0;
    return Math.min(
      100,
      Math.round((yakapProfile.benefitUsed / yakapProfile.annualBenefit) * 100)
    );
  }, [yakapProfile]);

  const latestYakapTransaction = React.useMemo(() => {
    if (!yakapProfile || yakapProfile.transactions.length === 0) return null;
    return [...yakapProfile.transactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )[0];
  }, [yakapProfile]);

  const nextSteps = React.useMemo(() => {
    const steps: Array<{ title: string; detail: string; done: boolean }> = [];

    if (nextAppointment) {
      steps.push({
        title: "Prepare for your next checkup",
        detail: `${formatDate(nextAppointment.date)} at ${nextAppointment.time} with ${nextAppointment.assignedDoctor}.`,
        done: false,
      });
    } else {
      steps.push({
        title: "No upcoming checkup yet",
        detail: "You may request a new appointment anytime from the Appointments page.",
        done: true,
      });
    }

    if (pendingAppointmentsCount > 0) {
      steps.push({
        title: "Wait for appointment confirmation",
        detail: `You have ${pendingAppointmentsCount} request${
          pendingAppointmentsCount > 1 ? "s" : ""
        } waiting for hospital approval.`,
        done: false,
      });
    }

    if (outstandingBalance > 0) {
      steps.push({
        title: "Settle your remaining bill",
        detail: `You still need to pay ${moneyFormatter.format(outstandingBalance)}.`,
        done: false,
      });
    } else {
      steps.push({
        title: "Billing is up to date",
        detail: "You currently have no unpaid hospital bill.",
        done: true,
      });
    }

    if (yakapProfile && yakapProfile.benefitBalance <= 3000) {
      steps.push({
        title: "YAKAP balance is getting low",
        detail: `Only ${moneyFormatter.format(yakapProfile.benefitBalance)} is left in your medicine support benefit.`,
        done: false,
      });
    }

    return steps;
  }, [nextAppointment, outstandingBalance, pendingAppointmentsCount, yakapProfile]);

  const displayName = yakapProfile
    ? `${yakapProfile.firstName} ${yakapProfile.lastName}`
    : CURRENT_PATIENT_NAME;

  return (
    <PageRoot>
      <HeroCard>
        <HeroTag>Patient Dashboard</HeroTag>
        <HeroTitle>Hi {displayName}, here is your health summary</HeroTitle>
        <HeroSubtitle>
          See your upcoming checkup, unpaid bills, and YAKAP medicine support in
          simple and easy language.
        </HeroSubtitle>
      </HeroCard>

      <TopCardsGrid container spacing={2.5}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <DashboardCard
            title="Next Checkup"
            value={nextAppointment ? formatDate(nextAppointment.date) : "No schedule"}
            subtitle={
              nextAppointment
                ? `${nextAppointment.time} | ${nextAppointment.assignedDoctor}`
                : "Go to Appointments to request one"
            }
            icon={<CalendarMonthRoundedIcon />}
            color={palette.primary.main}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <DashboardCard
            title="Amount To Pay"
            value={moneyFormatter.format(outstandingBalance)}
            subtitle={
              outstandingBalance > 0
                ? "Please settle before your next visit"
                : "No unpaid balance at the moment"
            }
            icon={<AccountBalanceWalletRoundedIcon />}
            color={palette.warning.main}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <DashboardCard
            title="YAKAP Left"
            value={
              yakapProfile
                ? moneyFormatter.format(yakapProfile.benefitBalance)
                : "Not enrolled"
            }
            subtitle="Medicine support benefit balance"
            icon={<VolunteerActivismRoundedIcon />}
            color="#0D8A3F"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <DashboardCard
            title="Waiting Approval"
            value={pendingAppointmentsCount}
            subtitle="Appointment requests under review"
            icon={<HourglassBottomRoundedIcon />}
            color="#7A5AF8"
          />
        </Grid>
      </TopCardsGrid>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <ColumnStack spacing={2.5}>
            <SectionCard
              title="What you need to do next"
              subtitle="Quick reminders so you know your next action right away."
            >
              <Stack spacing={1.2}>
                {nextSteps.map((step) => (
                  <StepItem key={step.title} done={step.done}>
                    <StepIconBox done={step.done}>
                      {step.done ? <TaskAltRoundedIcon /> : <HourglassBottomRoundedIcon />}
                    </StepIconBox>
                    <Box>
                      <StepTitle>{step.title}</StepTitle>
                      <StepText>{step.detail}</StepText>
                    </Box>
                  </StepItem>
                ))}
              </Stack>
            </SectionCard>

            <SectionCard
              title="Your next appointment"
              subtitle="Appointment details written in everyday language."
            >
              {nextAppointment ? (
                <Stack spacing={1.2}>
                  <DetailRow label="Doctor" value={nextAppointment.assignedDoctor} />
                  <Divider />
                  <DetailRow
                    label="Date and time"
                    value={`${formatDate(nextAppointment.date)} at ${nextAppointment.time}`}
                  />
                  <Divider />
                  <DetailRow
                    label="Status"
                    value={
                      nextAppointment.status === "Pending"
                        ? "Waiting for hospital confirmation"
                        : "Confirmed"
                    }
                  />
                  <Divider />
                  <DetailRow
                    label="Simple reminder"
                    value="Arrive 15 minutes early and bring a valid ID."
                  />
                </Stack>
              ) : (
                <EmptyStateText>
                  You have no upcoming appointment yet. Open the Appointments
                  page to request a new checkup.
                </EmptyStateText>
              )}
            </SectionCard>

            <SectionCard
              title="Recent activity"
              subtitle="Your latest hospital records and medicine support usage."
            >
              <Stack spacing={1.1}>
                {sortedAppointments.length === 0 && (
                  <EmptyStateText>No appointment activity found yet.</EmptyStateText>
                )}

                {sortedAppointments.slice(0, 2).map((item) => (
                  <ActivityItem key={`appt-${item.id}`}>
                    <ActivityTitle>
                      Appointment with {item.assignedDoctor}
                    </ActivityTitle>
                    <ActivityMeta>
                      {formatDate(item.date)} at {item.time}
                    </ActivityMeta>
                  </ActivityItem>
                ))}

                {latestYakapTransaction && (
                  <ActivityItem>
                    <ActivityTitle>Last YAKAP medicine support used</ActivityTitle>
                    <ActivityMeta>
                      {formatDate(latestYakapTransaction.date)} - {" "}
                      {latestYakapTransaction.description}
                    </ActivityMeta>
                    <ActivityAmount>
                      Amount used: {moneyFormatter.format(latestYakapTransaction.amount)}
                    </ActivityAmount>
                  </ActivityItem>
                )}
              </Stack>
            </SectionCard>
          </ColumnStack>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <ColumnStack spacing={2.5}>
            <SectionCard
              title="Billing made simple"
              subtitle="Your current bill status without technical terms."
            >
              <Stack spacing={1.2}>
                <DetailRow
                  label="Total unpaid amount"
                  value={moneyFormatter.format(outstandingBalance)}
                />
                <Divider />
                <DetailRow
                  label="Latest bill"
                  value={latestBill ? latestBill.billId : "No bill found"}
                />
                <Divider />
                <DetailRow
                  label="Latest bill amount"
                  value={latestBill ? moneyFormatter.format(latestBill.netAmount) : "N/A"}
                />
              </Stack>

              {latestBill && (
                <Box mt={1.8}>
                  <BillingStatusChip
                    size="small"
                    icon={<ReceiptLongRoundedIcon />}
                    label={getBillStatusLabel(latestBill.status)}
                    color={getBillStatusColor(latestBill.status)}
                  />
                </Box>
              )}
            </SectionCard>

            <SectionCard
              title="YAKAP medicine support"
              subtitle="This shows how much of your yearly medicine support has been used."
            >
              {yakapProfile ? (
                <Stack spacing={1.15}>
                  <DetailRow
                    label="Yearly support"
                    value={moneyFormatter.format(yakapProfile.annualBenefit)}
                  />
                  <Divider />
                  <DetailRow
                    label="Already used"
                    value={moneyFormatter.format(yakapProfile.benefitUsed)}
                  />
                  <Divider />
                  <DetailRow
                    label="Still available"
                    value={moneyFormatter.format(yakapProfile.benefitBalance)}
                  />

                  <Box mt={0.7}>
                    <BenefitUsageText>
                      {yakapPercentUsed}% of your {yakapProfile.benefitYear} support
                      has been used.
                    </BenefitUsageText>
                    <BenefitProgress
                      variant="determinate"
                      value={yakapPercentUsed}
                      highUsage={yakapPercentUsed >= 80}
                    />
                  </Box>

                  <TipBox>
                    <TipIcon />
                    <TipText>
                      Tip: Use your YAKAP support for eligible medicine purchases
                      before the benefit year ends.
                    </TipText>
                  </TipBox>
                </Stack>
              ) : (
                <EmptyStateText>
                  No YAKAP profile found. Please ask the help desk for enrollment
                  status.
                </EmptyStateText>
              )}
            </SectionCard>
          </ColumnStack>
        </Grid>
      </Grid>
    </PageRoot>
  );
}