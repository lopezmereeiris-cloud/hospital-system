"use client";

import React, { useMemo, useState } from "react";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import VolunteerActivismRoundedIcon from "@mui/icons-material/VolunteerActivismRounded";
import type { Appointment } from "@/components/AppointmentTable/interface";
import DashboardCard from "@/components/DashboardCard";
import type { Medicine } from "@/components/InventoryTable/interface";
import ListFiltersBar from "@/components/ListFiltersBar";
import PremiumFilter from "@/components/PremiumFilter";
import type { PatientType, Room, RoomSchedule } from "@/components/RoomTable/interface";
import type {
  BillingRecord,
  BillingStatus,
  StatementOfAccountsProps,
  YakapMember,
} from "./interface";
import {
  ActionRow,
  BadgeRow,
  BillIdButton,
  BreakdownCard,
  BreakdownHeader,
  BreakdownRow,
  CoverageBadge,
  DetailBody,
  DetailHeader,
  EmptyState,
  FilterCard,
  MainGrid,
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
  PrimaryActionButton,
  SecondaryActionButton,
  SoaContainer,
  StatusBadge,
  StyledBodyCell,
  StyledHeaderCell,
  StyledRow,
  SubtleText,
  TableWrap,
  TabsCard,
  ValueStrong,
} from "./elements";

type BillingTab = "all-bills" | "generate-soa" | "payment-records";
type StatusFilter = "all" | BillingStatus;
type ProgramFilter = "all" | "yakap" | "non-yakap";
type ServiceFilter = "all" | "room-stay" | "checkup" | "pharmacy";

const moneyFormatter = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  maximumFractionDigits: 0,
});

function parseDate(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatDate(value: string): string {
  return parseDate(value).toLocaleDateString("en-PH", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getInclusiveDays(start: string, end: string): number {
  const startTime = parseDate(start).getTime();
  const endTime = parseDate(end).getTime();
  return Math.max(1, Math.floor((endTime - startTime) / 86400000) + 1);
}

function normalizeName(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function seededNumber(value: string): number {
  return value.split("").reduce((sum, part, index) => sum + part.charCodeAt(0) * (index + 1), 0);
}

function getYakapMatch(
  patientName: string,
  yakapMembers: YakapMember[]
): { member: YakapMember | null; label: string | null } {
  const normalizedPatient = normalizeName(patientName);
  if (!normalizedPatient) {
    return { member: null, label: null };
  }

  const patientTokens = normalizedPatient.split(" ").filter(Boolean);
  const firstToken = patientTokens[0];

  for (const member of yakapMembers) {
    const fullName = normalizeName(
      [member.firstName, member.middleName, member.lastName, member.suffix].filter(Boolean).join(" ")
    );
    const firstAndLast = normalizeName([member.firstName, member.lastName].join(" "));
    if (normalizedPatient === fullName || normalizedPatient === firstAndLast) {
      return { member, label: "YAKAP Verified" };
    }
  }

  if (firstToken) {
    const firstNameMatches = yakapMembers.filter(
      (member) => normalizeName(member.firstName) === firstToken
    );
    if (firstNameMatches.length === 1) {
      return { member: firstNameMatches[0], label: "YAKAP Name Match" };
    }
  }

  return { member: null, label: null };
}

function inferOutpatientCoverage(age: number, notes: string): {
  patientType: PatientType | "Regular";
  discountPercent: number;
} {
  const normalizedNotes = notes.toLowerCase();

  if (/indigent|charity/.test(normalizedNotes)) {
    return { patientType: "Indigent", discountPercent: 100 };
  }
  if (/pwd|wheelchair|disability/.test(normalizedNotes)) {
    return { patientType: "PWD", discountPercent: 20 };
  }
  if (age >= 60) {
    return { patientType: "Senior Citizen", discountPercent: 20 };
  }
  if (/philhealth/.test(normalizedNotes)) {
    return { patientType: "PhilHealth", discountPercent: 15 };
  }

  return { patientType: "Regular", discountPercent: 0 };
}

function buildInpatientLineItems(
  roomRate: number,
  stayDays: number,
  seed: number
): Array<{ id: string; description: string; amount: number }> {
  const roomAndBoard = roomRate * stayDays;
  const professionalFee = Math.round(roomAndBoard * (0.24 + (seed % 11) / 100));
  const medicinesAndSupplies = Math.round(roomAndBoard * (0.16 + (seed % 8) / 100));
  const laboratory = Math.round(roomAndBoard * (0.13 + (seed % 7) / 100));
  const nursingCare = Math.round(roomAndBoard * (0.1 + (seed % 5) / 100));

  return [
    {
      id: "room-board",
      description: `Room & Board (${stayDays} ${stayDays > 1 ? "days" : "day"})`,
      amount: roomAndBoard,
    },
    {
      id: "professional-fee",
      description: "Professional Fee",
      amount: professionalFee,
    },
    {
      id: "medicines",
      description: "Medicines & Supplies",
      amount: medicinesAndSupplies,
    },
    {
      id: "laboratory",
      description: "Laboratory",
      amount: laboratory,
    },
    {
      id: "nursing",
      description: "Nursing Care",
      amount: nursingCare,
    },
  ];
}

function buildOutpatientLineItems(
  appointment: Appointment,
  medicines: Medicine[]
): {
  lineItems: Array<{ id: string; description: string; amount: number }>;
  serviceType: BillingRecord["serviceType"];
  roomRate: number;
} {
  const seed = seededNumber(`${appointment.id}-${appointment.patientName}`);
  const notes = appointment.specialNotes.toLowerCase();
  const lineItems: Array<{ id: string; description: string; amount: number }> = [];

  const consultationFee = 700 + (seed % 6) * 120;
  lineItems.push({
    id: `checkup-${appointment.id}`,
    description: `Outpatient Consultation - ${appointment.assignedDoctor}`,
    amount: consultationFee,
  });

  if (/ecg/.test(notes)) {
    lineItems.push({
      id: `ecg-${appointment.id}`,
      description: "Electrocardiogram (ECG)",
      amount: 950,
    });
  }
  if (/lab|fasting|results/.test(notes)) {
    lineItems.push({
      id: `lab-${appointment.id}`,
      description: "Laboratory Panel",
      amount: 1200,
    });
  }
  if (/dialysis/.test(notes)) {
    lineItems.push({
      id: `dialysis-${appointment.id}`,
      description: "Dialysis Session",
      amount: 3200,
    });
  }
  if (/imaging/.test(notes)) {
    lineItems.push({
      id: `imaging-${appointment.id}`,
      description: "Diagnostic Imaging",
      amount: 1800,
    });
  }
  if (/vaccination/.test(notes)) {
    lineItems.push({
      id: `vaccine-${appointment.id}`,
      description: "Vaccination Service",
      amount: 650,
    });
  }

  const activeMedicines = medicines.filter(
    (medicine) => medicine.status.toLowerCase() === "active" && medicine.unitCost > 0
  );
  const withMedicineNote = /prescription|med|allerg|asthma|diabetes|hypertension|referral/.test(notes);
  const medicineCount = withMedicineNote ? 2 + (seed % 2) : seed % 2;
  let addedMedicineItems = 0;

  for (let index = 0; index < medicineCount && activeMedicines.length > 0; index += 1) {
    const medicine = activeMedicines[(seed + index * 5) % activeMedicines.length];
    const quantity = 6 + ((seed + index * 3) % 12);
    const amount = Math.round(medicine.unitCost * quantity);
    lineItems.push({
      id: `med-${appointment.id}-${medicine.id}`,
      description: `Medicine: ${medicine.genericName} ${medicine.strength} x${quantity}`,
      amount,
    });
    addedMedicineItems += 1;
  }

  return {
    lineItems,
    serviceType: addedMedicineItems > 0 ? "Checkup + Pharmacy" : "Checkup",
    roomRate: consultationFee,
  };
}

function computeProgramDeductions(
  grossAmount: number,
  discountPercent: number,
  patientName: string,
  yakapMembers: YakapMember[]
): {
  coverageDiscount: number;
  yakapDeduction: number;
  yakapMemberId: string | null;
  yakapMatchLabel: string | null;
  netAmount: number;
} {
  const coverageDiscount = Math.round(grossAmount * (discountPercent / 100));
  const yakap = getYakapMatch(patientName, yakapMembers);
  const yakapDeduction =
    yakap.member && coverageDiscount < grossAmount
      ? Math.min(yakap.member.benefitBalance, grossAmount - coverageDiscount)
      : 0;
  const netAmount = Math.max(0, grossAmount - coverageDiscount - yakapDeduction);

  return {
    coverageDiscount,
    yakapDeduction,
    yakapMemberId: yakap.member?.id || null,
    yakapMatchLabel: yakap.label,
    netAmount,
  };
}

function finalizeStatus(netAmount: number, paidAmount: number): {
  paidAmount: number;
  balance: number;
  status: BillingStatus;
} {
  const safePaidAmount = Math.min(Math.max(paidAmount, 0), netAmount);
  const balance = Math.max(0, netAmount - safePaidAmount);
  const status: BillingStatus =
    balance === 0 ? "Paid" : safePaidAmount === 0 ? "Pending" : "Partial";

  return { paidAmount: safePaidAmount, balance, status };
}

function buildInpatientRecord(
  schedule: RoomSchedule,
  room: Room | undefined,
  yakapMembers: YakapMember[],
  todayKey: number
): BillingRecord {
  const roomRate = room?.ratePerDay ?? Math.max(0, schedule.billingRate);
  const stayDays = getInclusiveDays(schedule.startDate, schedule.endDate);
  const seed = seededNumber(schedule.scheduleId);
  const lineItems = buildInpatientLineItems(roomRate, stayDays, seed);
  const grossAmount = lineItems.reduce((sum, item) => sum + item.amount, 0);
  const patientName = schedule.patientName || "Unassigned Patient";

  const program = computeProgramDeductions(
    grossAmount,
    schedule.discountPercent,
    patientName,
    yakapMembers
  );
  const dischargeDate = parseDate(schedule.endDate).getTime();

  let paidAmount = 0;
  if (program.netAmount > 0) {
    if (dischargeDate < todayKey) {
      const settledRule = seed % 3;
      if (settledRule === 0) {
        paidAmount = program.netAmount;
      } else if (settledRule === 1) {
        paidAmount = Math.round(program.netAmount * 0.55);
      }
    } else if (seed % 4 === 0) {
      paidAmount = Math.round(program.netAmount * 0.2);
    }
  }

  const billing = finalizeStatus(program.netAmount, paidAmount);
  const billNumberSeed = Number(schedule.scheduleId.replace(/\D/g, "")) || seed;

  return {
    billId: `BL-2026-${String(900 + billNumberSeed).padStart(4, "0")}`,
    patientName,
    roomLabel: room ? `${room.roomName} (#${room.roomNumber})` : schedule.roomId,
    serviceLabel: "Inpatient Room Stay",
    serviceType: "Room Stay",
    serviceDate: schedule.startDate,
    encounterType: "Inpatient",
    admissionDate: schedule.startDate,
    dischargeDate: schedule.endDate,
    stayDays,
    patientType: schedule.patientType || "Regular",
    discountPercent: schedule.discountPercent,
    roomRate,
    grossAmount,
    coverageDiscount: program.coverageDiscount,
    yakapDeduction: program.yakapDeduction,
    yakapMemberId: program.yakapMemberId,
    yakapMatchLabel: program.yakapMatchLabel,
    netAmount: program.netAmount,
    paidAmount: billing.paidAmount,
    balance: billing.balance,
    status: billing.status,
    lineItems,
    notes: schedule.notes || "No additional clinical notes.",
  };
}

function buildOutpatientRecord(
  appointment: Appointment,
  medicines: Medicine[],
  yakapMembers: YakapMember[],
  todayKey: number
): BillingRecord | null {
  if (appointment.status === "Cancelled") {
    return null;
  }

  const seed = seededNumber(`${appointment.id}-${appointment.patientName}-${appointment.date}`);
  const coverage = inferOutpatientCoverage(appointment.age, appointment.specialNotes);
  const service = buildOutpatientLineItems(appointment, medicines);
  const grossAmount = service.lineItems.reduce((sum, item) => sum + item.amount, 0);

  const program = computeProgramDeductions(
    grossAmount,
    coverage.discountPercent,
    appointment.patientName,
    yakapMembers
  );

  let paidAmount = 0;
  const serviceDate = parseDate(appointment.date).getTime();

  if (program.netAmount > 0) {
    if (appointment.status === "Completed") {
      paidAmount = seed % 2 === 0 ? program.netAmount : Math.round(program.netAmount * 0.65);
    } else if (appointment.status === "Confirmed" && serviceDate <= todayKey) {
      paidAmount = Math.round(program.netAmount * 0.3);
    }
  }

  const billing = finalizeStatus(program.netAmount, paidAmount);

  return {
    billId: `BL-2026-${String(2000 + appointment.id).padStart(4, "0")}`,
    patientName: appointment.patientName,
    roomLabel: `OPD - ${appointment.assignedDoctor}`,
    serviceLabel: service.serviceType === "Checkup + Pharmacy" ? "Checkup with Medicine Purchase" : "Checkup Consultation",
    serviceType: service.serviceType,
    serviceDate: appointment.date,
    encounterType: "Outpatient",
    admissionDate: appointment.date,
    dischargeDate: appointment.date,
    stayDays: 1,
    patientType: coverage.patientType,
    discountPercent: coverage.discountPercent,
    roomRate: service.roomRate,
    grossAmount,
    coverageDiscount: program.coverageDiscount,
    yakapDeduction: program.yakapDeduction,
    yakapMemberId: program.yakapMemberId,
    yakapMatchLabel: program.yakapMatchLabel,
    netAmount: program.netAmount,
    paidAmount: billing.paidAmount,
    balance: billing.balance,
    status: billing.status,
    lineItems: service.lineItems,
    notes: appointment.specialNotes || "Outpatient service billing.",
  };
}

function buildPharmacyRecords(yakapMembers: YakapMember[]): BillingRecord[] {
  const rows: BillingRecord[] = [];

  yakapMembers.forEach((member) => {
    const transactions = member.transactions || [];
    transactions.forEach((transaction, index) => {
      const patientName = [member.firstName, member.middleName, member.lastName, member.suffix]
        .filter(Boolean)
        .join(" ");
      const amount = Math.max(0, Math.round(transaction.amount));
      const yakapDeduction = amount;

      rows.push({
        billId: `BL-2026-${String(3000 + rows.length + 1).padStart(4, "0")}`,
        patientName,
        roomLabel: "Hospital Pharmacy",
        serviceLabel: transaction.description,
        serviceType: "Pharmacy",
        serviceDate: transaction.date,
        encounterType: "Outpatient",
        admissionDate: transaction.date,
        dischargeDate: transaction.date,
        stayDays: 1,
        patientType: "PhilHealth",
        discountPercent: 0,
        roomRate: amount,
        grossAmount: amount,
        coverageDiscount: 0,
        yakapDeduction,
        yakapMemberId: member.id,
        yakapMatchLabel: "YAKAP Transaction",
        netAmount: 0,
        paidAmount: 0,
        balance: 0,
        status: "Paid",
        lineItems: [
          {
            id: `pharmacy-${member.id}-${index + 1}`,
            description: transaction.description,
            amount,
          },
        ],
        notes: `Recorded YAKAP medicine transaction for ${member.id}.`,
      });
    });
  });

  return rows;
}

const StatementOfAccounts: React.FC<StatementOfAccountsProps> = ({
  rooms,
  schedules,
  yakapMembers,
  appointments,
  medicines,
}) => {
  const [activeTab, setActiveTab] = useState<BillingTab>("all-bills");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [programFilter, setProgramFilter] = useState<ProgramFilter>("all");
  const [serviceFilter, setServiceFilter] = useState<ServiceFilter>("all");
  const [selectedBillId, setSelectedBillId] = useState<string | null>(null);

  const records = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayKey = today.getTime();

    const inpatientRecords = schedules
      .filter((schedule) => schedule.type === "occupied")
      .map((schedule) => {
        const room = rooms.find((item) => item.roomId === schedule.roomId);
        return buildInpatientRecord(schedule, room, yakapMembers, todayKey);
      });

    const outpatientRecords = appointments
      .map((appointment) => buildOutpatientRecord(appointment, medicines, yakapMembers, todayKey))
      .filter((record): record is BillingRecord => Boolean(record));

    const pharmacyRecords = buildPharmacyRecords(yakapMembers);

    return [...inpatientRecords, ...outpatientRecords, ...pharmacyRecords].sort((first, second) => {
      const dateCompare = second.serviceDate.localeCompare(first.serviceDate);
      if (dateCompare !== 0) {
        return dateCompare;
      }
      return second.billId.localeCompare(first.billId);
    });
  }, [appointments, medicines, rooms, schedules, yakapMembers]);

  const summary = useMemo(() => {
    const totalReceivables = records.reduce((sum, record) => sum + record.balance, 0);
    const totalCollected = records.reduce(
      (sum, record) => sum + record.paidAmount + record.yakapDeduction,
      0
    );
    const yakapSupported = records.filter((record) => record.yakapDeduction > 0).length;

    return {
      totalAccounts: records.length,
      totalReceivables,
      totalCollected,
      yakapSupported,
    };
  }, [records]);

  const filteredRecords = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return records.filter((record) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        record.billId.toLowerCase().includes(normalizedSearch) ||
        record.patientName.toLowerCase().includes(normalizedSearch) ||
        record.roomLabel.toLowerCase().includes(normalizedSearch) ||
        record.serviceLabel.toLowerCase().includes(normalizedSearch);

      const matchesStatus = statusFilter === "all" || record.status === statusFilter;
      const hasYakap = record.yakapDeduction > 0;
      const matchesProgram =
        programFilter === "all" ||
        (programFilter === "yakap" && hasYakap) ||
        (programFilter === "non-yakap" && !hasYakap);

      const matchesService =
        serviceFilter === "all" ||
        (serviceFilter === "room-stay" && record.serviceType === "Room Stay") ||
        (serviceFilter === "checkup" &&
          (record.serviceType === "Checkup" || record.serviceType === "Checkup + Pharmacy")) ||
        (serviceFilter === "pharmacy" &&
          (record.serviceType === "Pharmacy" || record.serviceType === "Checkup + Pharmacy"));

      return matchesSearch && matchesStatus && matchesProgram && matchesService;
    });
  }, [programFilter, records, search, serviceFilter, statusFilter]);

  const selectedRecord = useMemo(() => {
    const direct = filteredRecords.find((record) => record.billId === selectedBillId);
    return direct || filteredRecords[0] || null;
  }, [filteredRecords, selectedBillId]);

  const tabOptions: { value: BillingTab; label: string; count?: number }[] = [
    { value: "all-bills", label: "All Bills", count: records.length },
    { value: "generate-soa", label: "Generate Bill" },
    { value: "payment-records", label: "Payment Records" },
  ];

  return (
    <SoaContainer>
      <Grid container spacing={2.5} sx={{ mb: 0.5 }}>
        <Grid size={{ xs: 6, sm: 3 }}>
          <DashboardCard
            title="Total Bills"
            value={summary.totalAccounts}
            icon={<ReceiptLongRoundedIcon />}
            color="#4361EE"
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <DashboardCard
            title="Outstanding"
            value={moneyFormatter.format(summary.totalReceivables)}
            icon={<AccountBalanceWalletRoundedIcon />}
            color="#F04438"
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <DashboardCard
            title="Collected"
            value={moneyFormatter.format(summary.totalCollected)}
            icon={<PaidRoundedIcon />}
            color="#12B76A"
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <DashboardCard
            title="YAKAP Assisted"
            value={summary.yakapSupported}
            icon={<VolunteerActivismRoundedIcon />}
            color="#226E8E"
          />
        </Grid>
      </Grid>

      <TabsCard>
        <PremiumFilter options={tabOptions} active={activeTab} onChange={setActiveTab} />
      </TabsCard>

      <FilterCard>
        <ListFiltersBar
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search bill number, patient, room, or service..."
          filters={[
            {
              key: "status",
              label: "Status",
              value: statusFilter,
              onChange: (value) => setStatusFilter(value as StatusFilter),
              options: [
                { value: "all", label: "All Statuses" },
                { value: "Pending", label: "Pending" },
                { value: "Partial", label: "Partial" },
                { value: "Paid", label: "Paid" },
              ],
            },
            {
              key: "program",
              label: "Program",
              value: programFilter,
              onChange: (value) => setProgramFilter(value as ProgramFilter),
              options: [
                { value: "all", label: "All Programs" },
                { value: "yakap", label: "With YAKAP" },
                { value: "non-yakap", label: "No YAKAP" },
              ],
            },
            {
              key: "service",
              label: "Service",
              value: serviceFilter,
              onChange: (value) => setServiceFilter(value as ServiceFilter),
              options: [
                { value: "all", label: "All Services" },
                { value: "room-stay", label: "Room Stay" },
                { value: "checkup", label: "Checkup" },
                { value: "pharmacy", label: "Pharmacy" },
              ],
            },
          ]}
        />
      </FilterCard>

      <MainGrid>
        <PanelCard>
          <PanelHeader>
            <PanelTitleWrap>
              <PanelTitle>
                {activeTab === "payment-records" ? "Payment Ledger" : "Billing Records"}
              </PanelTitle>
              <PanelSubtitle>
                {activeTab === "payment-records"
                  ? "Track settled, partial, and pending account payments."
                  : "Billing list for room stays, checkups, diagnostics, and medicine purchases."}
              </PanelSubtitle>
            </PanelTitleWrap>
          </PanelHeader>

          <TableWrap>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <StyledHeaderCell>Bill #</StyledHeaderCell>
                    <StyledHeaderCell>Patient</StyledHeaderCell>
                    <StyledHeaderCell>Service</StyledHeaderCell>
                    {activeTab !== "payment-records" && <StyledHeaderCell>Total</StyledHeaderCell>}
                    <StyledHeaderCell>
                      {activeTab === "payment-records" ? "Paid Amount" : "Discounts"}
                    </StyledHeaderCell>
                    <StyledHeaderCell>Balance</StyledHeaderCell>
                    <StyledHeaderCell>Status</StyledHeaderCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {filteredRecords.length === 0 && (
                    <TableRow>
                      <StyledBodyCell colSpan={7}>
                        <EmptyState>No statement of account records match the current filters.</EmptyState>
                      </StyledBodyCell>
                    </TableRow>
                  )}

                  {filteredRecords.map((record) => (
                    <StyledRow
                      key={record.billId}
                      sx={{
                        backgroundColor:
                          selectedRecord?.billId === record.billId
                            ? "rgba(67, 97, 238, 0.04)"
                            : "transparent",
                      }}
                    >
                      <StyledBodyCell>
                        <BillIdButton onClick={() => setSelectedBillId(record.billId)}>
                          {record.billId}
                        </BillIdButton>
                        <SubtleText>{formatDate(record.serviceDate)}</SubtleText>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <ValueStrong>{record.patientName}</ValueStrong>
                        <SubtleText>{record.roomLabel}</SubtleText>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <CoverageBadge>{record.serviceType}</CoverageBadge>
                        <BadgeRow>
                          <CoverageBadge>{record.patientType}</CoverageBadge>
                        </BadgeRow>
                      </StyledBodyCell>
                      {activeTab !== "payment-records" && (
                        <StyledBodyCell>
                          <ValueStrong>{moneyFormatter.format(record.grossAmount)}</ValueStrong>
                        </StyledBodyCell>
                      )}
                      <StyledBodyCell>
                        <ValueStrong>
                          {moneyFormatter.format(
                            activeTab === "payment-records"
                              ? record.paidAmount
                              : record.coverageDiscount + record.yakapDeduction
                          )}
                        </ValueStrong>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <ValueStrong>{moneyFormatter.format(record.balance)}</ValueStrong>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <StatusBadge status={record.status}>{record.status}</StatusBadge>
                      </StyledBodyCell>
                    </StyledRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TableWrap>
        </PanelCard>

        <PanelCard>
          <PanelHeader>
            <PanelTitleWrap>
              <PanelTitle>Billing Details</PanelTitle>
              <PanelSubtitle>
                {activeTab === "generate-soa"
                  ? "Billing view with all charge components and deductions."
                  : "Billing details and account balance for the selected record."}
              </PanelSubtitle>
            </PanelTitleWrap>
          </PanelHeader>

          {!selectedRecord && (
            <EmptyState>
              No billing record selected. Select a bill from the list to view account details.
            </EmptyState>
          )}

          {selectedRecord && (
            <DetailBody>
              <DetailHeader>
                <div>
                  <PatientName>{selectedRecord.patientName}</PatientName>
                  <PatientMeta>
                    {selectedRecord.serviceLabel} - {selectedRecord.roomLabel}
                  </PatientMeta>
                  <BadgeRow>
                    <CoverageBadge>{selectedRecord.encounterType}</CoverageBadge>
                    <CoverageBadge>{selectedRecord.serviceType}</CoverageBadge>
                    {selectedRecord.yakapDeduction > 0 && (
                      <CoverageBadge active>{selectedRecord.yakapMatchLabel || "YAKAP"}</CoverageBadge>
                    )}
                    <StatusBadge status={selectedRecord.status}>{selectedRecord.status}</StatusBadge>
                  </BadgeRow>
                </div>
              </DetailHeader>

              <MetaGrid>
                <MetaCard>
                  <MetaLabel>Bill Number</MetaLabel>
                  <MetaValue>{selectedRecord.billId}</MetaValue>
                </MetaCard>
                <MetaCard>
                  <MetaLabel>Service Date</MetaLabel>
                  <MetaValue>{formatDate(selectedRecord.serviceDate)}</MetaValue>
                </MetaCard>
                <MetaCard>
                  <MetaLabel>Stay / Visit</MetaLabel>
                  <MetaValue>
                    {selectedRecord.encounterType === "Inpatient"
                      ? `${selectedRecord.stayDays} day(s)`
                      : "1 visit"}
                  </MetaValue>
                </MetaCard>
              </MetaGrid>

              <BreakdownCard>
                <BreakdownHeader>Price Breakdown</BreakdownHeader>
                {selectedRecord.lineItems.map((item) => (
                  <BreakdownRow key={item.id}>
                    <span>{item.description}</span>
                    <span>{moneyFormatter.format(item.amount)}</span>
                  </BreakdownRow>
                ))}
                <BreakdownRow>
                  <span>Gross Total</span>
                  <span>{moneyFormatter.format(selectedRecord.grossAmount)}</span>
                </BreakdownRow>
                <BreakdownRow positive>
                  <span>Coverage Discount ({selectedRecord.discountPercent}%)</span>
                  <span>- {moneyFormatter.format(selectedRecord.coverageDiscount)}</span>
                </BreakdownRow>
                <BreakdownRow positive>
                  <span>YAKAP Deduction</span>
                  <span>- {moneyFormatter.format(selectedRecord.yakapDeduction)}</span>
                </BreakdownRow>
                <BreakdownRow positive>
                  <span>Payments Received</span>
                  <span>- {moneyFormatter.format(selectedRecord.paidAmount)}</span>
                </BreakdownRow>
                <BreakdownRow total danger={selectedRecord.balance > 0} positive={selectedRecord.balance === 0}>
                  <span>Balance Due</span>
                  <span>{moneyFormatter.format(selectedRecord.balance)}</span>
                </BreakdownRow>
              </BreakdownCard>

              <NotesCard>
                <NotesLabel>Clinical Notes</NotesLabel>
                <NotesValue>{selectedRecord.notes}</NotesValue>
              </NotesCard>

              <ActionRow>
                <PrimaryActionButton variant="contained">Record Payment</PrimaryActionButton>
                <SecondaryActionButton variant="outlined">Print Bill</SecondaryActionButton>
              </ActionRow>
            </DetailBody>
          )}
        </PanelCard>
      </MainGrid>
    </SoaContainer>
  );
};

export default StatementOfAccounts;
