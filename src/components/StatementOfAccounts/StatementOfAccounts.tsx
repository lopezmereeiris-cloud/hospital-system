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
import DashboardCard from "@/components/DashboardCard";
import ListFiltersBar from "@/components/ListFiltersBar";
import PremiumFilter from "@/components/PremiumFilter";
import type {
  BillingRecord,
  BillingStatus,
  StatementOfAccountsProps,
} from "./interface";
import { palette } from "@/theme/palette";
import {
  buildInpatientRecord,
  buildOutpatientRecord,
  buildPharmacyRecords,
  formatDate,
  moneyFormatter,
} from "./billingService";
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
            color={palette.primary.main}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <DashboardCard
            title="Outstanding"
            value={moneyFormatter.format(summary.totalReceivables)}
            icon={<AccountBalanceWalletRoundedIcon />}
            color={palette.error.main}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <DashboardCard
            title="Collected"
            value={moneyFormatter.format(summary.totalCollected)}
            icon={<PaidRoundedIcon />}
            color={palette.success.main}
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
                        {record.serviceType === "Checkup + Pharmacy" ? (
                          <>
                            <CoverageBadge>Checkup</CoverageBadge>{" "}
                            <CoverageBadge>Pharmacy</CoverageBadge>
                          </>
                        ) : (
                          <CoverageBadge>{record.serviceType}</CoverageBadge>
                        )}
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
                    {selectedRecord.serviceType === "Checkup + Pharmacy" ? (
                      <>
                        <CoverageBadge>Checkup</CoverageBadge>
                        <CoverageBadge>Pharmacy</CoverageBadge>
                      </>
                    ) : (
                      <CoverageBadge>{selectedRecord.serviceType}</CoverageBadge>
                    )}
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
