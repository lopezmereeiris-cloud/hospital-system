"use client";

import React from "react";
import Box from "@mui/material/Box";

export default function YakapBalancePage() {
  return (
    <Box>
      <div style={{ marginBottom: 28 }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            margin: "0 0 4px 0",
            color: "#1A1D1F",
          }}
        >
          YAKAP Balance
        </h2>
        <p
          style={{
            fontSize: "0.88rem",
            color: "#6F767E",
            margin: 0,
          }}
        >
          View your PhilHealth YAKAP medicine benefit balance and usage history.
        </p>
      </div>
    </Box>
  );
}
