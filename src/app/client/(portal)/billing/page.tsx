"use client";

import React, { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import DashboardCard from "@/components/DashboardCard";

import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import PatientBillingStatement from "@/components/PatientBilling/PatientBillingStatement";
import { BillingRecord } from "@/components/PatientBilling/interface";
import billingRecords from "@/json/billings.json";

import { palette } from "@/theme/palette";
const records = billingRecords as BillingRecord[];

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

const headerCellStyle = {
  fontSize: "0.72rem",
  fontWeight: 700,
  color: "grey.400",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
};

const bodyCellStyle = {
  fontSize: "0.88rem",
  color: "text.primary",
  display: "flex",
  alignItems: "center",
};

function getStatusColor(
  status: string
): "success" | "warning" | "error" | "default" {
  if (status === "Paid") return "success";
  if (status === "Partial") return "warning";
  if (status === "Unpaid") return "error";
  return "default";
}

export default function BillingPage() {
  const sortedBills = useMemo(() => {
    return [...records].sort(
      (a, b) =>
        new Date(b.serviceDate).getTime() - new Date(a.serviceDate).getTime()
    );
  }, []);

  const defaultBill = useMemo(() => {
    return (
      sortedBills.find(
        (bill) => bill.status === "Partial" || bill.status === "Unpaid"
      ) || sortedBills[0]
    );
  }, [sortedBills]);

  const [selectedBillId, setSelectedBillId] = useState(
    defaultBill?.billId ?? ""
  );

  const selectedBill =
    sortedBills.find((bill) => bill.billId === selectedBillId) ?? sortedBills[0];

  const outstandingBalance = sortedBills.reduce(
    (sum, bill) => sum + bill.balance,
    0
  );

  const latestBill = sortedBills[0];
  const totalBills = sortedBills.length;

const paidBills = sortedBills.filter(
  (bill) => bill.status === "Paid"
).length;

const pendingBills = sortedBills.filter(
  (bill) => bill.status === "Partial" || bill.status === "Unpaid"
).length;

const latestBillAmount = latestBill?.netAmount ?? 0;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      
     {/* ── Billing Summary Cards ── */}
<Grid container spacing={2} sx={{ mb: 3 }}>

  <Grid size={{ xs: 6, sm: 4, lg: 2.4 }}>
    <DashboardCard
      title="Outstanding Balance"
      value={moneyFormatter.format(outstandingBalance)}
      icon={<AccountBalanceWalletRoundedIcon />}
      color={palette.error.main}
    />
  </Grid>

  <Grid size={{ xs: 6, sm: 4, lg: 2.4 }}>
    <DashboardCard
      title="Total Bills"
      value={totalBills}
      icon={<ReceiptLongRoundedIcon />}
      color={palette.primary.main}
    />
  </Grid>

  <Grid size={{ xs: 6, sm: 4, lg: 2.4 }}>
    <DashboardCard
      title="Latest Bill"
      value={moneyFormatter.format(latestBillAmount)}
      subtitle={latestBill.billId}
      icon={<PaymentsRoundedIcon />}
      color={palette.info.main}
    />
  </Grid>

  <Grid size={{ xs: 6, sm: 4, lg: 2.4 }}>
    <DashboardCard
      title="Paid Bills"
      value={paidBills}
      icon={<ScheduleRoundedIcon />}
      color={palette.success.main}
    />
  </Grid>

  <Grid size={{ xs: 12, sm: 4, lg: 2.4 }}>
    <DashboardCard
      title="Pending Bills"
      value={pendingBills}
      subtitle="Needs payment"
      icon={<WarningAmberRoundedIcon />}
      color={palette.warning.main}
    />
  </Grid>

</Grid>

      <Card
        sx={{
          borderRadius: 3,
          boxShadow: "none",
          border: "1px solid #E8ECF2",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            px: 2.5,
            py: 2,
            borderBottom: "1px solid #EEF2F6",
            background: palette.grey[50],
          }}
        >
          <Typography
            sx={{ fontSize: "1rem", fontWeight: 700, color: "text.primary" }}
          >
            Billing History
          </Typography>
          <Typography
            sx={{ fontSize: "0.82rem", color: "text.secondary", mt: 0.25 }}
          >
            Select a bill to view its full statement of account.
          </Typography>
        </Box>

        <Box sx={{ overflowX: "auto" }}>
          <Box sx={{ minWidth: 900 }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1.3fr 2fr 1fr 1fr 1fr 1fr",
                px: 2.5,
                py: 1.5,
                background: palette.grey[50],
                borderBottom: "1px solid #EEF2F6",
              }}
            >
              <Typography sx={headerCellStyle}>Bill #</Typography>
              <Typography sx={headerCellStyle}>Service</Typography>
              <Typography sx={headerCellStyle}>Date</Typography>
              <Typography sx={headerCellStyle}>Total</Typography>
              <Typography sx={headerCellStyle}>Balance</Typography>
              <Typography sx={headerCellStyle}>Status</Typography>
            </Box>

            {sortedBills.map((bill) => (
              <Box
                key={bill.billId}
                onClick={() => setSelectedBillId(bill.billId)}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1.3fr 2fr 1fr 1fr 1fr 1fr",
                  px: 2.5,
                  py: 1.8,
                  borderBottom: "1px solid #EEF2F6",
                  cursor: "pointer",
                  backgroundColor:
                    selectedBillId === bill.billId
                      ? "rgba(67, 97, 238, 0.04)"
                      : palette.background.paper,
                  "&:hover": {
                    backgroundColor:
                      selectedBillId === bill.billId
                        ? "rgba(67, 97, 238, 0.06)"
                        : "#FAFBFF",
                  },
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: "text.primary",
                      fontSize: "0.88rem",
                    }}
                  >
                    {bill.billId}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      color: "text.primary",
                      fontSize: "0.88rem",
                    }}
                  >
                    {bill.serviceLabel}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "0.78rem", color: "grey.400", mt: 0.35 }}
                  >
                    {bill.serviceType}
                  </Typography>
                </Box>

                <Typography sx={bodyCellStyle}>
                  {formatDate(bill.serviceDate)}
                </Typography>

                <Typography sx={bodyCellStyle}>
                  {moneyFormatter.format(bill.netAmount)}
                </Typography>

                <Typography sx={{ ...bodyCellStyle, fontWeight: 700 }}>
                  {moneyFormatter.format(bill.balance)}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Chip
                    label={bill.status}
                    color={getStatusColor(bill.status)}
                    size="small"
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Card>

      {selectedBill && <PatientBillingStatement billing={selectedBill} />}
    </Box>
  );
}