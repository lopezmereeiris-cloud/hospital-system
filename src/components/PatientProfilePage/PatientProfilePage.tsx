"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import { useUser } from "@/context/UserContext";
import { PatientProfileForm } from "./interface";
import {
  ActionsRow,
  AvatarOverlay,
  AvatarUploadButton,
  FieldGroup,
  FieldGrid,
  FieldHelpText,
  FieldInput,
  FieldLabel,
  FieldSelect,
  HeroBadge,
  HeroContent,
  HeroIdentity,
  HeroName,
  HeroSubText,
  HeroText,
  PageRoot,
  ProfileHeroCard,
  SectionBody,
  SectionCard,
  SectionHeader,
  SectionSubtitle,
  SectionTitle,
} from "./elements";

const buildInitialProfileForm = (fullName: string): PatientProfileForm => {
  const nameParts = fullName.trim().split(/\s+/).filter(Boolean);
  const firstName = nameParts[0] ?? "";
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";
  const middleName =
    nameParts.length > 2 ? nameParts.slice(1, nameParts.length - 1).join(" ") : "";

  return {
    firstName,
    middleName,
    lastName,
    phone: "+63 917 123 4567",
    email: "patient@hospital.gov.ph",
    birthDate: "1993-04-17",
    sex: "Female",
    addressLine: "27 Sampaguita Street",
    barangay: "Barangay 123",
    city: "Quezon City",
    province: "Metro Manila",
    emergencyContactName: "Daniel Santos",
    emergencyContactNumber: "+63 917 765 4321",
    emergencyContactRelation: "Sibling",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
};

export default function PatientProfilePage() {
  const { user } = useUser();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const initialForm = useMemo(() => buildInitialProfileForm(user.name), [user.name]);
  const [form, setForm] = useState<PatientProfileForm>(initialForm);
  const [saved, setSaved] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user.avatar ?? null);

  useEffect(() => {
    return () => {
      if (avatarPreview && avatarPreview.startsWith("blob:")) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  const initials = useMemo(() => {
    return user.name
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [user.name]);

  const handleFieldChange = (field: keyof PatientProfileForm) => {
    return (
      event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview((previousUrl) => {
      if (previousUrl && previousUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previousUrl);
      }
      return previewUrl;
    });
  };

  const handleReset = () => {
    setForm(initialForm);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setAvatarPreview(user.avatar ?? null);
  };

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    setSaved(true);
  };

  return (
    <PageRoot>
      <ProfileHeroCard>
        <HeroContent>
          <HeroIdentity>
            <AvatarUploadButton>
              <Avatar
                src={avatarPreview ?? undefined}
                sx={{
                  width: 70,
                  height: 70,
                  bgcolor: "primary.main",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                }}
              >
                {!avatarPreview && initials}
              </Avatar>
              <AvatarOverlay className="avatar-overlay">
                <CameraAltRoundedIcon sx={{ fontSize: 20 }} />
              </AvatarOverlay>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleAvatarChange}
              />
            </AvatarUploadButton>
            <HeroText>
              <HeroName>{user.name}</HeroName>
              <HeroSubText>Manage your personal profile and contact details.</HeroSubText>
            </HeroText>
          </HeroIdentity>
          <HeroBadge>Patient Account</HeroBadge>
        </HeroContent>
      </ProfileHeroCard>

      <form onSubmit={handleSave}>
        <SectionCard>
          <SectionHeader>
            <SectionTitle>Personal Information</SectionTitle>
            <SectionSubtitle>Keep your core account details accurate.</SectionSubtitle>
          </SectionHeader>
          <SectionBody>
            <FieldGrid>
              <FieldGroup>
                <FieldLabel>First Name</FieldLabel>
                <FieldInput
                  type="text"
                  value={form.firstName}
                  onChange={handleFieldChange("firstName")}
                  placeholder="First name"
                />
              </FieldGroup>
              <FieldGroup>
                <FieldLabel>Middle Name</FieldLabel>
                <FieldInput
                  type="text"
                  value={form.middleName}
                  onChange={handleFieldChange("middleName")}
                  placeholder="Middle name"
                />
              </FieldGroup>
              <FieldGroup>
                <FieldLabel>Last Name</FieldLabel>
                <FieldInput
                  type="text"
                  value={form.lastName}
                  onChange={handleFieldChange("lastName")}
                  placeholder="Last name"
                />
              </FieldGroup>
              <FieldGroup>
                <FieldLabel>Birth Date</FieldLabel>
                <FieldInput
                  type="date"
                  value={form.birthDate}
                  onChange={handleFieldChange("birthDate")}
                />
              </FieldGroup>
              <FieldGroup>
                <FieldLabel>Sex</FieldLabel>
                <FieldSelect value={form.sex} onChange={handleFieldChange("sex")}>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </FieldSelect>
              </FieldGroup>
              <FieldGroup>
                <FieldLabel>Phone Number</FieldLabel>
                <FieldInput
                  type="tel"
                  value={form.phone}
                  onChange={handleFieldChange("phone")}
                  placeholder="+63 9XX XXX XXXX"
                />
              </FieldGroup>
              <FieldGroup>
                <FieldLabel>Email Address</FieldLabel>
                <FieldInput
                  type="email"
                  value={form.email}
                  onChange={handleFieldChange("email")}
                  placeholder="you@email.com"
                />
              </FieldGroup>
            </FieldGrid>
          </SectionBody>
        </SectionCard>

        <SectionCard>
          <SectionHeader>
            <SectionTitle>Address and Emergency Contact</SectionTitle>
            <SectionSubtitle>Information used by the clinic during urgent cases.</SectionSubtitle>
          </SectionHeader>
          <SectionBody>
            <FieldGrid>
              <FieldGroup>
                <FieldLabel>Address Line</FieldLabel>
                <FieldInput
                  type="text"
                  value={form.addressLine}
                  onChange={handleFieldChange("addressLine")}
                  placeholder="House number and street"
                />
              </FieldGroup>
              <FieldGroup>
                <FieldLabel>Barangay</FieldLabel>
                <FieldInput
                  type="text"
                  value={form.barangay}
                  onChange={handleFieldChange("barangay")}
                  placeholder="Barangay name"
                />
              </FieldGroup>
              <FieldGroup>
                <FieldLabel>City / Municipality</FieldLabel>
                <FieldInput
                  type="text"
                  value={form.city}
                  onChange={handleFieldChange("city")}
                  placeholder="City or municipality"
                />
              </FieldGroup>
              <FieldGroup>
                <FieldLabel>Province</FieldLabel>
                <FieldInput
                  type="text"
                  value={form.province}
                  onChange={handleFieldChange("province")}
                  placeholder="Province"
                />
              </FieldGroup>
              <FieldGroup>
                <FieldLabel>Emergency Contact Name</FieldLabel>
                <FieldInput
                  type="text"
                  value={form.emergencyContactName}
                  onChange={handleFieldChange("emergencyContactName")}
                  placeholder="Full name"
                />
              </FieldGroup>
              <FieldGroup>
                <FieldLabel>Emergency Contact Number</FieldLabel>
                <FieldInput
                  type="tel"
                  value={form.emergencyContactNumber}
                  onChange={handleFieldChange("emergencyContactNumber")}
                  placeholder="+63 9XX XXX XXXX"
                />
              </FieldGroup>
              <FieldGroup>
                <FieldLabel>Relationship</FieldLabel>
                <FieldInput
                  type="text"
                  value={form.emergencyContactRelation}
                  onChange={handleFieldChange("emergencyContactRelation")}
                  placeholder="e.g. Sibling, Parent"
                />
              </FieldGroup>
            </FieldGrid>
          </SectionBody>
        </SectionCard>

        <SectionCard>
          <SectionHeader>
            <SectionTitle>Security</SectionTitle>
            <SectionSubtitle>Update your password to secure your account.</SectionSubtitle>
          </SectionHeader>
          <SectionBody>
            <FieldGrid>
              <FieldGroup>
                <FieldLabel>Current Password</FieldLabel>
                <FieldInput
                  type="password"
                  value={form.currentPassword}
                  onChange={handleFieldChange("currentPassword")}
                  placeholder="Current password"
                />
              </FieldGroup>
              <FieldGroup>
                <FieldLabel>New Password</FieldLabel>
                <FieldInput
                  type="password"
                  value={form.newPassword}
                  onChange={handleFieldChange("newPassword")}
                  placeholder="New password"
                />
              </FieldGroup>
              <FieldGroup>
                <FieldLabel>Confirm New Password</FieldLabel>
                <FieldInput
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleFieldChange("confirmPassword")}
                  placeholder="Confirm new password"
                />
              </FieldGroup>
            </FieldGrid>
            <FieldHelpText sx={{ mt: 1.2, display: "inline-flex", gap: 0.8, alignItems: "center" }}>
              <ShieldOutlinedIcon sx={{ fontSize: 15 }} />
              Use at least 8 characters with letters and numbers.
            </FieldHelpText>

            <ActionsRow>
              <Button
                type="button"
                variant="outlined"
                onClick={handleReset}
                sx={{
                  textTransform: "none",
                  borderRadius: "10px",
                  fontWeight: 600,
                  px: 2.8,
                  borderColor: "grey.300",
                  color: "text.primary",
                  "&:hover": {
                    borderColor: "grey.400",
                    bgcolor: "grey.50",
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  textTransform: "none",
                  borderRadius: "10px",
                  fontWeight: 600,
                  px: 2.8,
                  boxShadow: "none",
                  "&:hover": { boxShadow: "none" },
                }}
              >
                Save Changes
              </Button>
            </ActionsRow>
          </SectionBody>
        </SectionCard>
      </form>

      <Snackbar
        open={saved}
        autoHideDuration={3000}
        onClose={() => setSaved(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setSaved(false)}
          sx={{ borderRadius: "10px" }}
        >
          Profile changes saved successfully.
        </Alert>
      </Snackbar>
    </PageRoot>
  );
}
