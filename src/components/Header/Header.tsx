"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
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
import { useUser } from "@/context/UserContext";
import { NotificationsNoneRoundedIcon, MenuRoundedIcon } from "./icons";

const Header: React.FC<HeaderProps> = ({ onMenuToggle, title, sidebarWidth }) => {
  const theme = useTheme();
  const router = useRouter();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const { user } = useUser();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleMenuClose();
    if (user.role === "admin") {
      router.push("/admin/profile");
      return;
    }
    router.push("/client/profile");
  };

  const handleSettings = () => {
    handleMenuClose();
    if (user.role === "admin") {
      router.push("/admin/settings");
      return;
    }
    router.push("/client/settings");
  };

  const handleLogoutClick = () => {
    handleMenuClose();
    setLogoutOpen(true);
  };

  const handleLogoutConfirm = () => {
    setLogoutOpen(false);
    router.push("/client/login");
  };

  return (
    <>
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

            <UserInfo onClick={handleMenuOpen}>
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: "primary.main",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                }}
                src={user.avatar ?? undefined}
              >
                {!user.avatar && user.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </Avatar>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <UserName>{user.name}</UserName>
                <UserRole>{user.role === "admin" ? "Admin" : "Patient"}</UserRole>
              </div>
            </UserInfo>

            <Menu
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleMenuClose}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              slotProps={{
                paper: {
                  sx: {
                    mt: 1,
                    minWidth: 200,
                    borderRadius: 1.5,
                    border: `1px solid ${theme.palette.divider}`,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                  },
                },
              }}
            >
              <MenuItem onClick={handleProfile} sx={{ py: 1.2, gap: 1.5 }}>
                <ListItemIcon sx={{ minWidth: "auto" }}>
                  <PersonOutlineRoundedIcon sx={{ fontSize: 20 }} />
                </ListItemIcon>
                <ListItemText
                  primary="Profile"
                  primaryTypographyProps={{ fontSize: "0.84rem", fontWeight: 500 }}
                />
              </MenuItem>
              <MenuItem onClick={handleSettings} sx={{ py: 1.2, gap: 1.5 }}>
                <ListItemIcon sx={{ minWidth: "auto" }}>
                  <SettingsOutlinedIcon sx={{ fontSize: 20 }} />
                </ListItemIcon>
                <ListItemText
                  primary="Settings"
                  primaryTypographyProps={{ fontSize: "0.84rem", fontWeight: 500 }}
                />
              </MenuItem>
              <Divider sx={{ my: 0.5 }} />
              <MenuItem onClick={handleLogoutClick} sx={{ py: 1.2, gap: 1.5, color: "error.main" }}>
                <ListItemIcon sx={{ minWidth: "auto", color: "inherit" }}>
                  <LogoutRoundedIcon sx={{ fontSize: 20 }} />
                </ListItemIcon>
                <ListItemText
                  primary="Logout"
                  primaryTypographyProps={{ fontSize: "0.84rem", fontWeight: 500 }}
                />
              </MenuItem>
            </Menu>
          </HeaderRight>
        </StyledToolbar>
      </StyledAppBar>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: "1.1rem", pb: 0.5 }}>
          Confirm Logout
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: "0.875rem" }}>
            Are you sure you want to log out? You will need to sign in again to
            access your account.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <Button
            onClick={() => setLogoutOpen(false)}
            variant="outlined"
            sx={{
              borderRadius: 2.5,
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.82rem",
              borderColor: theme.palette.grey[300],
              color: theme.palette.text.primary,
              "&:hover": { borderColor: theme.palette.grey[400], bgcolor: theme.palette.grey[50] },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleLogoutConfirm}
            variant="contained"
            color="error"
            sx={{
              borderRadius: 2.5,
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.82rem",
              boxShadow: "none",
              "&:hover": { boxShadow: "none" },
            }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Header;
