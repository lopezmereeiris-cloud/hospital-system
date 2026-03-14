"use client";

import React from "react";
import { styled, alpha } from "@mui/material/styles";

import { palette } from "@/theme/palette";
/* ─── Premium Segmented Filter Control ─── */

interface PremiumFilterProps<T extends string> {
  options: { value: T; label: string; count?: number }[];
  active: T;
  onChange: (value: T) => void;
}

const FilterContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 4,
  padding: 4,
  backgroundColor: palette.grey[100],
  borderRadius: 10,
  flexWrap: "wrap",
}));

const FilterButton = styled("button", {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active?: boolean }>(({ theme, active }) => ({
  display: "flex",
  alignItems: "center",
  gap: 6,
  padding: "7px 14px",
  borderRadius: 8,
  border: "none",
  cursor: "pointer",
  fontSize: "0.8rem",
  fontWeight: active ? 600 : 500,
  fontFamily: "inherit",
  color: active ? palette.background.paper : palette.text.secondary,
  backgroundColor: active ? palette.primary.main : "transparent",
  transition: "all 0.2s ease",
  whiteSpace: "nowrap",
  "&:hover": {
    backgroundColor: active ? "#3A56D4" : alpha(palette.primary.main, 0.08),
    color: active ? palette.background.paper : palette.text.primary,
  },
}));

const FilterCount = styled("span", {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active?: boolean }>(({ active }) => ({
  fontSize: "0.68rem",
  fontWeight: 700,
  padding: "1px 6px",
  borderRadius: 6,
  backgroundColor: active ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.06)",
  color: active ? palette.background.paper : "inherit",
  lineHeight: 1.5,
}));

function PremiumFilter<T extends string>({
  options,
  active,
  onChange,
}: PremiumFilterProps<T>) {
  return (
    <FilterContainer>
      {options.map((opt) => (
        <FilterButton
          key={opt.value}
          active={active === opt.value}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
          {opt.count !== undefined && (
            <FilterCount active={active === opt.value}>{opt.count}</FilterCount>
          )}
        </FilterButton>
      ))}
    </FilterContainer>
  );
}

export default PremiumFilter;
