"use client";

import React from "react";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { styled, alpha } from "@mui/material/styles";

import { palette } from "@/theme/palette";
export interface ListFilterOption {
  value: string;
  label: string;
}

export interface ListFilterControl {
  key: string;
  label: string;
  value: string;
  options: ListFilterOption[];
  onChange: (value: string) => void;
}

export interface ListFiltersBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filters: ListFilterControl[];
}

const FiltersContainer = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "minmax(220px, 1.6fr) repeat(3, minmax(140px, 1fr))",
  gap: theme.spacing(1.2),
  width: "100%",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr 1fr",
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

const sharedFieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "background.paper",
    fontSize: "0.82rem",
    "& fieldset": {
      borderColor: "grey.200",
    },
    "&:hover fieldset": {
      borderColor: "grey.300",
    },
    "&.Mui-focused fieldset": {
      borderColor: "primary.main",
      boxShadow: `0 0 0 3px ${alpha(palette.primary.main, 0.08)}`,
    },
  },
  "& .MuiInputLabel-root": {
    fontSize: "0.78rem",
    fontWeight: 600,
    color: "grey.500",
  },
};

const ListFiltersBar: React.FC<ListFiltersBarProps> = ({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search",
  filters,
}) => {
  return (
    <FiltersContainer>
      <TextField
        size="small"
        placeholder={searchPlaceholder}
        value={searchValue}
        onChange={(event) => onSearchChange(event.target.value)}
        sx={sharedFieldSx}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon sx={{ fontSize: 18, color: "grey.400" }} />
            </InputAdornment>
          ),
        }}
      />

      {filters.map((filter) => (
        <TextField
          key={filter.key}
          select
          label={filter.label}
          value={filter.value}
          onChange={(event) => filter.onChange(event.target.value)}
          size="small"
          sx={sharedFieldSx}
        >
          {filter.options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      ))}
    </FiltersContainer>
  );
};

export default ListFiltersBar;
