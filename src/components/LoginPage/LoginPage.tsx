"use client";
import { palette } from "@/theme/palette";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  PageWrapper,
  CardWrapper,
  FormSection,
  BrandName,
  LogoBox,
  FormTitle,
  FormSubtitle,
  ErrorBanner,
  FieldGroup,
  FieldLabel,
  FieldLabelRow,
  ForgotLink,
  TextInput,
  PasswordInput,
  EyeButton,
  SubmitButton,
  FooterText,
  FooterLink,
  HeroSection,
  HeroTextBlock,
  HeroHeading,
  CardArea,
  MiniNav,
  NavDot,
  PatientCardBox,
  CardLogoBox,
  ConsultLabel,
  ConsultValue,
  CardDivider,
  CardInfoRow,
  PatientName,
  PatientID,
  ActiveBadge,
} from "./elements";

const HospitalIcon = ({ size = 24, color = palette.background.paper }: { size?: number; color?: string }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 6v4m0 0v4m0-4h4m-4 0H8" />
  </svg>
);

const EyeIcon = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      router.push("/client");
    }, 800);
  }

  return (
    <PageWrapper>
      <CardWrapper>
        {/* LEFT: FORM */}
        <FormSection>
          <BrandName>Lorem Ipsum</BrandName>
          <LogoBox>
            <HospitalIcon />
          </LogoBox>
          <FormTitle>Welcome Back</FormTitle>
          <FormSubtitle>Sign in to your hospital account</FormSubtitle>
          {error && <ErrorBanner>{error}</ErrorBanner>}
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <FieldGroup>
              <FieldLabel>Email</FieldLabel>
              <TextInput
                type="email"
                placeholder="you@hospital.gov.ph"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FieldGroup>
            <FieldGroup>
              <FieldLabelRow>
                <FieldLabel>Password</FieldLabel>
                <ForgotLink href="#">Forgot?</ForgotLink>
              </FieldLabelRow>
              <PasswordInput
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <EyeButton
                type="button"
                tabIndex={-1}
                $active={showPassword}
                onClick={() => setShowPassword((v) => !v)}
              >
                <EyeIcon />
              </EyeButton>
            </FieldGroup>
            <SubmitButton type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </SubmitButton>
            <FooterText>
              Don&apos;t have an account?{" "}
              <FooterLink href="/client/signup">Register</FooterLink>
            </FooterText>
          </form>
        </FormSection>

        {/* RIGHT: HERO */}
        <HeroSection>
          <HeroTextBlock>
            <HeroHeading>
              Your Health,<br />
              <span style={{ fontStyle: "normal", fontSize: 42 }}>Always Within</span><br />
              Reach.
            </HeroHeading>
          </HeroTextBlock>
          <CardArea>
            <MiniNav>
              <NavDot />
              <NavDot $opacity={0.5} />
              <NavDot $opacity={0.3} />
            </MiniNav>
            <PatientCardBox>
              <CardLogoBox>
                <HospitalIcon size={13} />
              </CardLogoBox>
              <ConsultLabel>Active Consultations</ConsultLabel>
              <ConsultValue>3 Pending</ConsultValue>
              <CardDivider />
              <CardInfoRow>
                <div>
                  <PatientName>Juan D. Santos</PatientName>
                  <PatientID>Patient ID: #00-4921</PatientID>
                </div>
                <ActiveBadge>Active</ActiveBadge>
              </CardInfoRow>
            </PatientCardBox>
          </CardArea>
        </HeroSection>
      </CardWrapper>
    </PageWrapper>
  );
};

export default LoginPage;
