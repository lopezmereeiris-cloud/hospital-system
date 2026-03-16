"use client";

import React, { useState, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import {
  ProfileContainer,
  SectionCard,
  SectionTitle,
  AvatarUploadWrapper,
  AvatarUploadButton,
  AvatarOverlay,
  AvatarHint,
  AvatarHintLabel,
  AvatarHintSub,
  FieldRow,
  FieldGroup,
  FieldLabel,
  TextInput,
  ActionsRow,
} from "./elements";

const ProfilePage: React.FC = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const [form, setForm] = useState({
    firstName: "Hendrick",
    lastName: "Alvarez",
    phone: "",
    email: "hendrick@hospital.gov.ph",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    address: "",
    emergencyContact: "",
  });

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <ProfileContainer>
      <form onSubmit={handleSave}>
        {/* ——— Basic Information ——— */}
        <SectionCard>
          <SectionTitle>Basic Information</SectionTitle>

          <AvatarUploadWrapper>
            <AvatarUploadButton>
              <Avatar
                src={avatarUrl ?? undefined}
                sx={{
                  width: 72,
                  height: 72,
                  bgcolor: "primary.main",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                }}
              >
                {!avatarUrl && "HA"}
              </Avatar>
              <AvatarOverlay className="overlay">
                <CameraAltRoundedIcon sx={{ fontSize: 22 }} />
              </AvatarOverlay>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleAvatarChange}
              />
            </AvatarUploadButton>
            <AvatarHint>
              <AvatarHintLabel>Profile Photo</AvatarHintLabel>
              <AvatarHintSub>JPG, PNG. Max 2 MB</AvatarHintSub>
            </AvatarHint>
          </AvatarUploadWrapper>

          <FieldRow>
            <FieldGroup>
              <FieldLabel>First Name</FieldLabel>
              <TextInput
                type="text"
                placeholder="First name"
                value={form.firstName}
                onChange={handleChange("firstName")}
              />
            </FieldGroup>
            <FieldGroup>
              <FieldLabel>Last Name</FieldLabel>
              <TextInput
                type="text"
                placeholder="Last name"
                value={form.lastName}
                onChange={handleChange("lastName")}
              />
            </FieldGroup>
          </FieldRow>

          <FieldRow>
            <FieldGroup>
              <FieldLabel>Phone Number</FieldLabel>
              <TextInput
                type="tel"
                placeholder="+63 9XX XXX XXXX"
                value={form.phone}
                onChange={handleChange("phone")}
              />
            </FieldGroup>
            <FieldGroup>
              <FieldLabel>Email Address</FieldLabel>
              <TextInput
                type="email"
                placeholder="you@hospital.gov.ph"
                value={form.email}
                onChange={handleChange("email")}
              />
            </FieldGroup>
          </FieldRow>
        </SectionCard>

        {/* ——— Security ——— */}
        <SectionCard>
          <SectionTitle>Security</SectionTitle>
          <FieldRow>
            <FieldGroup>
              <FieldLabel>Current Password</FieldLabel>
              <TextInput
                type="password"
                placeholder="••••••••"
                value={form.currentPassword}
                onChange={handleChange("currentPassword")}
              />
            </FieldGroup>
            <FieldGroup>
              <FieldLabel>New Password</FieldLabel>
              <TextInput
                type="password"
                placeholder="••••••••"
                value={form.newPassword}
                onChange={handleChange("newPassword")}
              />
            </FieldGroup>
          </FieldRow>
          <FieldRow>
            <FieldGroup>
              <FieldLabel>Confirm Password</FieldLabel>
              <TextInput
                type="password"
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={handleChange("confirmPassword")}
              />
            </FieldGroup>
            <FieldGroup />
          </FieldRow>
        </SectionCard>

        {/* ——— Optional ——— */}
        <SectionCard>
          <SectionTitle>Optional</SectionTitle>
          <FieldRow>
            <FieldGroup>
              <FieldLabel>Address</FieldLabel>
              <TextInput
                type="text"
                placeholder="Home address"
                value={form.address}
                onChange={handleChange("address")}
              />
            </FieldGroup>
            <FieldGroup>
              <FieldLabel>Emergency Contact Number</FieldLabel>
              <TextInput
                type="tel"
                placeholder="+63 9XX XXX XXXX"
                value={form.emergencyContact}
                onChange={handleChange("emergencyContact")}
              />
            </FieldGroup>
          </FieldRow>
        </SectionCard>

        {/* ——— Actions ——— */}
        <ActionsRow>
          <Button
            variant="outlined"
            sx={{
              borderRadius: 2.5,
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.82rem",
              px: 3,
              borderColor: "grey.300",
              color: "text.primary",
              "&:hover": { borderColor: "grey.400", bgcolor: "grey.50" },
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              borderRadius: 2.5,
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.82rem",
              px: 3,
              boxShadow: "none",
              "&:hover": { boxShadow: "none" },
            }}
          >
            Save Changes
          </Button>
        </ActionsRow>
      </form>
    </ProfileContainer>
  );
};

export default ProfilePage;
