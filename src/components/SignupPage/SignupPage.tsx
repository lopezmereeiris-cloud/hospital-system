"use client";

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
  FieldRow,
  FieldGroup,
  FieldGroupFull,
  FieldLabel,
  TextInput,
  PasswordInput,
  EyeButton,
  TermsRow,
  TermsCheckbox,
  TermsLabel,
  TermsLink,
  SubmitButton,
  FooterText,
  FooterLink,
  SuccessWrapper,
  SuccessIcon,
  SuccessTitle,
  SuccessMessage,
  BackButton,
  HeroSection,
  HeroTextBlock,
  HeroHeading,
  HeroDescription,
  StepsContainer,
  StepItem,
  StepNumber,
  StepContent,
  StepTitle,
  StepSub,
  StepCheckIcon,
} from "./elements";

const HospitalIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 6v4m0 0v4m0-4h4m-4 0H8" />
  </svg>
);

const EyeIcon = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const CheckIcon = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const STEPS = [
  { label: "Create your account", sub: "Fill in your basic details" },
  { label: "Verify your identity", sub: "Email & mobile confirmation" },
  { label: "Access your portal", sub: "View records & appointments" },
];

const SignupPage: React.FC = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!fullName || !mobile || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!terms) {
      setError("Please accept the terms and conditions.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1200);
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
          <FormTitle>Create Account</FormTitle>
          <FormSubtitle>Register as a new patient — it only takes a minute</FormSubtitle>

          {success ? (
            <SuccessWrapper>
              <SuccessIcon>✓</SuccessIcon>
              <SuccessTitle>Account Created!</SuccessTitle>
              <SuccessMessage>
                Check your email inbox to verify and activate your account.
              </SuccessMessage>
              <BackButton type="button" onClick={() => router.push("/client/login")}>
                Back to Sign In
              </BackButton>
            </SuccessWrapper>
          ) : (
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              {error && <ErrorBanner>{error}</ErrorBanner>}

              <FieldRow>
                <FieldGroup>
                  <FieldLabel>Full Name</FieldLabel>
                  <TextInput
                    type="text"
                    placeholder="Juan D. Santos"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </FieldGroup>
                <FieldGroup>
                  <FieldLabel>Mobile Number</FieldLabel>
                  <TextInput
                    type="tel"
                    placeholder="+63 912 345 6789"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </FieldGroup>
              </FieldRow>

              <FieldGroupFull>
                <FieldLabel>Email Address</FieldLabel>
                <TextInput
                  type="email"
                  placeholder="you@hospital.gov.ph"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FieldGroupFull>

              <FieldRow>
                <FieldGroup>
                  <FieldLabel>Password</FieldLabel>
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
                <FieldGroup>
                  <FieldLabel>Confirm Password</FieldLabel>
                  <PasswordInput
                    type={showConfirm ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <EyeButton
                    type="button"
                    tabIndex={-1}
                    $active={showConfirm}
                    onClick={() => setShowConfirm((v) => !v)}
                  >
                    <EyeIcon />
                  </EyeButton>
                </FieldGroup>
              </FieldRow>

              <TermsRow>
                <TermsCheckbox
                  type="checkbox"
                  id="tc"
                  checked={terms}
                  onChange={(e) => setTerms(e.target.checked)}
                />
                <TermsLabel htmlFor="tc">
                  I agree to the{" "}
                  <TermsLink href="#">Terms &amp; Conditions</TermsLink>{" "}
                  and{" "}
                  <TermsLink href="#">Privacy Policy</TermsLink>{" "}
                  of MedAdmin Hospital
                </TermsLabel>
              </TermsRow>

              <SubmitButton type="submit" disabled={loading}>
                {loading ? "Creating account…" : "Create Account"}
              </SubmitButton>
              <FooterText>
                Already have an account?{" "}
                <FooterLink href="/client/login">Log in</FooterLink>
              </FooterText>
            </form>
          )}
        </FormSection>

        {/* RIGHT: HERO */}
        <HeroSection>
          <HeroTextBlock>
            <HeroHeading>
              Begin Your<br />
              <span style={{ fontStyle: "normal" }}>Care</span><br />
              Journey.
            </HeroHeading>
            <HeroDescription>
              Join thousands of patients managing their health with ease through our secure portal.
            </HeroDescription>
          </HeroTextBlock>
          <StepsContainer>
            {STEPS.map((step, i) => (
              <StepItem key={step.label}>
                <StepNumber $done={i === 0}>{i + 1}</StepNumber>
                <StepContent>
                  <StepTitle>{step.label}</StepTitle>
                  <StepSub>{step.sub}</StepSub>
                </StepContent>
                <StepCheckIcon $done={i === 0}>
                  <CheckIcon />
                </StepCheckIcon>
              </StepItem>
            ))}
          </StepsContainer>
        </HeroSection>
      </CardWrapper>
    </PageWrapper>
  );
};

export default SignupPage;
