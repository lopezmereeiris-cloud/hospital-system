"use client";

import React from "react";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { HeaderProps } from "./interface";
import {
  StyledAppBar,
  StyledToolbar,
  HeaderLeft,
  HeaderCenter,
  HeaderRight,
  SearchBar,
  SearchShortcut,
  UserInfo,
  UserName,
  UserRole,
  PageTitle,
} from "./elements";
import { NotificationsNoneRoundedIcon, MenuRoundedIcon } from "./icons";

const Header: React.FC<HeaderProps> = ({ onMenuToggle, title, sidebarWidth }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <StyledAppBar position="fixed" elevation={0} sidebarWidth={sidebarWidth}>
      <StyledToolbar>
        <HeaderLeft>
          {!isDesktop && (
            <IconButton onClick={onMenuToggle} size="small">
              <MenuRoundedIcon />
            </IconButton>
          )}
          <PageTitle>{title}</PageTitle>
        </HeaderLeft>

        <HeaderCenter>
          <SearchBar>
            <SearchRoundedIcon sx={{ fontSize: 17, opacity: 0.4 }} />
            Search anything...
            <SearchShortcut>⌘K</SearchShortcut>
          </SearchBar>
        </HeaderCenter>

        <HeaderRight>
          <IconButton
            size="small"
            sx={{
              width: 40,
              height: 40,
              "&:hover": { bgcolor: "grey.100" },
            }}
          >
            <NotificationsNoneRoundedIcon sx={{ fontSize: 22 }} />
          </IconButton>

          <UserInfo>
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: "primary.main",
                fontSize: "0.82rem",
                fontWeight: 700,
              }}
            >
              HA
            </Avatar>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <UserName>Hendrick</UserName>
              <UserRole>Admin</UserRole>
            </div>
          </UserInfo>
        </HeaderRight>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header;
