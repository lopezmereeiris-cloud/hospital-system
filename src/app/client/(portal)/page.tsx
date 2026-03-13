"use client";

import React from "react";
import Grid from "@mui/material/Grid";
import DashboardCard from "@/components/DashboardCard";
import VolunteerActivismRoundedIcon from "@mui/icons-material/VolunteerActivismRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";

export default function ClientDashboardPage() {
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            margin: "0 0 4px 0",
            color: "#1A1D1F",
          }}
        >
          Welcome back, Patient
        </h2>
        <p
          style={{
            fontSize: "0.88rem",
            color: "#6F767E",
            margin: 0,
          }}
        >
          Here&apos;s an overview of your account.
        </p>
      </div>

      <Grid container spacing={2.5} sx={{ mb: 3.5 }}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <DashboardCard
            title="YAKAP Balance"
            value="—"
            subtitle="Annual medicine benefit"
            icon={<VolunteerActivismRoundedIcon />}
            color="#0D8A3F"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <DashboardCard
            title="Upcoming Appointments"
            value="—"
            subtitle="Scheduled visits"
            icon={<CalendarMonthRoundedIcon />}
            color="#7C3AED"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <DashboardCard
            title="Total Balance"
            value="—"
            subtitle="Outstanding amount"
            icon={<AccountBalanceWalletRoundedIcon />}
            color="#F79009"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <DashboardCard
            title="Recent Billing"
            value="—"
            subtitle="Last statement"
            icon={<ReceiptLongRoundedIcon />}
            color="#4361EE"
          />
        </Grid>
      </Grid>
    </div>
  );
}
