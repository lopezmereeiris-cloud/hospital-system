"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { RegistrationFormData, YakapRegistrationFormProps } from "./interface";
import {
  FormContainer,
  FormHeader,
  FormTitle,
  FormSubtitle,
  FormBody,
  StepperContainer,
  StepDot,
  StepCircle,
  StepLabel,
  StepConnector,
  StepMeta,
  StepMetaTitle,
  StepMetaHint,
  StepMetaBadge,
  StepContentCard,
  FieldRow,
  FieldLabel,
  FieldInput,
  FieldSelect,
  FileUploadArea,
  ButtonRow,
  PrimaryButton,
  SecondaryButton,
  ReviewSection,
  ReviewTitle,
  ReviewGrid,
  ReviewItem,
  ReviewLabel,
  ReviewValue,
} from "./elements";

const STEPS = [
  "Personal Info",
  "Contact & Address",
  "Identification",
  "Emergency Contact",
  "Review & Submit",
];

const STEP_HINTS = [
  "Provide the beneficiary's legal profile and demographic details.",
  "Add contact details and complete residential address information.",
  "Capture PhilHealth and valid government-issued ID information.",
  "Provide emergency contact details for verification and coordination.",
  "Review all entries before final registration submission.",
];

const INITIAL_DATA: RegistrationFormData = {
  firstName: "",
  middleName: "",
  lastName: "",
  suffix: "",
  dateOfBirth: "",
  gender: "",
  civilStatus: "",
  contactNumber: "",
  email: "",
  street: "",
  barangay: "",
  city: "",
  province: "",
  zipCode: "",
  philhealthNumber: "",
  validIdType: "",
  validIdNumber: "",
  validIdImage: null,
  emergencyContacts: [
    { name: "", relationship: "", contactNumber: "" },
    { name: "", relationship: "", contactNumber: "" },
  ],
};

const YakapRegistrationForm: React.FC<YakapRegistrationFormProps> = ({ onSubmit }) => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<RegistrationFormData>(INITIAL_DATA);
  const [idFileName, setIdFileName] = useState("");
  const [idPreviewUrl, setIdPreviewUrl] = useState("");

  const currentStepNumber = step + 1;
  const progress = Math.round((currentStepNumber / STEPS.length) * 100);

  type StringField = Exclude<keyof RegistrationFormData, "validIdImage" | "emergencyContacts">;

  const update = (field: StringField, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, validIdImage: file }));
    setIdFileName(file?.name || "");
    setIdPreviewUrl((previous) => {
      if (previous) URL.revokeObjectURL(previous);
      return file ? URL.createObjectURL(file) : "";
    });
  };

  useEffect(() => {
    return () => {
      if (idPreviewUrl) URL.revokeObjectURL(idPreviewUrl);
    };
  }, [idPreviewUrl]);

  const updateEmergencyContact = (
    index: number,
    field: "name" | "relationship" | "contactNumber",
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      emergencyContacts: prev.emergencyContacts.map((contact, contactIndex) =>
        contactIndex === index ? { ...contact, [field]: value } : contact,
      ),
    }));
  };

  const addEmergencyContact = () => {
    setForm((prev) => ({
      ...prev,
      emergencyContacts: [
        ...prev.emergencyContacts,
        { name: "", relationship: "", contactNumber: "" },
      ],
    }));
  };

  const removeEmergencyContact = (index: number) => {
    setForm((prev) => ({
      ...prev,
      emergencyContacts: prev.emergencyContacts.filter((_, contactIndex) => contactIndex !== index),
    }));
  };

  const canProceed = (): boolean => {
    switch (step) {
      case 0:
        return !!(form.firstName && form.lastName && form.dateOfBirth && form.gender && form.civilStatus);
      case 1:
        return !!(form.contactNumber && form.street && form.barangay && form.city && form.province && form.zipCode);
      case 2:
        return !!(form.philhealthNumber && form.validIdType && form.validIdNumber);
      case 3:
        return (
          form.emergencyContacts.length >= 2 &&
          form.emergencyContacts.every(
            (contact) => !!(contact.name && contact.relationship && contact.contactNumber),
          )
        );
      default:
        return true;
    }
  };

  const next = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
  };

  const back = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = () => {
    onSubmit(form);
  };

  const renderStep0 = () => (
    <>
      <FieldRow>
        <div>
          <FieldLabel>First Name *</FieldLabel>
          <FieldInput
            placeholder="e.g. Maria"
            value={form.firstName}
            onChange={(event) => update("firstName", event.target.value)}
          />
        </div>
        <div>
          <FieldLabel>Middle Name</FieldLabel>
          <FieldInput
            placeholder="e.g. Santos"
            value={form.middleName}
            onChange={(event) => update("middleName", event.target.value)}
          />
        </div>
        <div>
          <FieldLabel>Last Name *</FieldLabel>
          <FieldInput
            placeholder="e.g. Dela Cruz"
            value={form.lastName}
            onChange={(event) => update("lastName", event.target.value)}
          />
        </div>
      </FieldRow>

      <FieldRow>
        <div>
          <FieldLabel>Suffix</FieldLabel>
          <FieldSelect value={form.suffix} onChange={(event) => update("suffix", event.target.value)}>
            <option value="">None</option>
            <option value="Jr.">Jr.</option>
            <option value="Sr.">Sr.</option>
            <option value="II">II</option>
            <option value="III">III</option>
            <option value="IV">IV</option>
          </FieldSelect>
        </div>
        <div>
          <FieldLabel>Date of Birth *</FieldLabel>
          <FieldInput
            type="date"
            value={form.dateOfBirth}
            onChange={(event) => update("dateOfBirth", event.target.value)}
          />
        </div>
        <div>
          <FieldLabel>Gender *</FieldLabel>
          <FieldSelect value={form.gender} onChange={(event) => update("gender", event.target.value)}>
            <option value="">Select...</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </FieldSelect>
        </div>
      </FieldRow>

      <FieldRow>
        <div>
          <FieldLabel>Civil Status *</FieldLabel>
          <FieldSelect value={form.civilStatus} onChange={(event) => update("civilStatus", event.target.value)}>
            <option value="">Select...</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Widowed">Widowed</option>
            <option value="Separated">Separated</option>
          </FieldSelect>
        </div>
      </FieldRow>
    </>
  );

  const renderStep1 = () => (
    <>
      <FieldRow>
        <div>
          <FieldLabel>Contact Number *</FieldLabel>
          <FieldInput
            placeholder="e.g. 09171234567"
            value={form.contactNumber}
            onChange={(event) => update("contactNumber", event.target.value)}
          />
        </div>
        <div>
          <FieldLabel>Email Address</FieldLabel>
          <FieldInput
            type="email"
            placeholder="e.g. maria@email.com"
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
          />
        </div>
      </FieldRow>

      <FieldRow>
        <div style={{ gridColumn: "1 / -1" }}>
          <FieldLabel>Street Address *</FieldLabel>
          <FieldInput
            placeholder="e.g. 123 Rizal Street"
            value={form.street}
            onChange={(event) => update("street", event.target.value)}
          />
        </div>
      </FieldRow>

      <FieldRow>
        <div>
          <FieldLabel>Barangay *</FieldLabel>
          <FieldInput
            placeholder="e.g. Brgy. San Antonio"
            value={form.barangay}
            onChange={(event) => update("barangay", event.target.value)}
          />
        </div>
        <div>
          <FieldLabel>City / Municipality *</FieldLabel>
          <FieldInput
            placeholder="e.g. Quezon City"
            value={form.city}
            onChange={(event) => update("city", event.target.value)}
          />
        </div>
      </FieldRow>

      <FieldRow>
        <div>
          <FieldLabel>Province *</FieldLabel>
          <FieldInput
            placeholder="e.g. Metro Manila"
            value={form.province}
            onChange={(event) => update("province", event.target.value)}
          />
        </div>
        <div>
          <FieldLabel>Zip Code *</FieldLabel>
          <FieldInput
            placeholder="e.g. 1100"
            value={form.zipCode}
            onChange={(event) => update("zipCode", event.target.value)}
          />
        </div>
      </FieldRow>
    </>
  );

  const renderStep2 = () => (
    <>
      <FieldRow>
        <div>
          <FieldLabel>PhilHealth Number *</FieldLabel>
          <FieldInput
            placeholder="e.g. 01-234567890-1"
            value={form.philhealthNumber}
            onChange={(event) => update("philhealthNumber", event.target.value)}
          />
        </div>
      </FieldRow>

      <FieldRow>
        <div>
          <FieldLabel>Valid ID Type *</FieldLabel>
          <FieldSelect value={form.validIdType} onChange={(event) => update("validIdType", event.target.value)}>
            <option value="">Select ID Type...</option>
            <option value="PhilHealth ID">PhilHealth ID</option>
            <option value="UMID">UMID</option>
            <option value="Driver's License">Driver&apos;s License</option>
            <option value="Passport">Passport</option>
            <option value="Voter's ID">Voter&apos;s ID</option>
            <option value="SSS ID">SSS ID</option>
            <option value="TIN ID">TIN ID</option>
            <option value="Postal ID">Postal ID</option>
            <option value="National ID">National ID (PhilSys)</option>
            <option value="Senior Citizen ID">Senior Citizen ID</option>
            <option value="PWD ID">PWD ID</option>
          </FieldSelect>
        </div>
        <div>
          <FieldLabel>Valid ID Number *</FieldLabel>
          <FieldInput
            placeholder="Enter ID number"
            value={form.validIdNumber}
            onChange={(event) => update("validIdNumber", event.target.value)}
          />
        </div>
      </FieldRow>

      <div style={{ marginBottom: 20 }}>
        <div
          style={{
            marginBottom: 12,
            border: "1px solid #D0D5DD",
            borderRadius: 10,
            backgroundColor: "#FCFCFD",
            padding: "12px 14px",
          }}
        >
          <div
            style={{
              fontSize: "0.78rem",
              fontWeight: 700,
              color: "#344054",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: 6,
            }}
          >
            Valid ID Photo Requirements
          </div>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: "0.8rem", color: "#475467", lineHeight: 1.45 }}>
            <li>Use a government-issued ID and make sure all edges are visible.</li>
            <li>Text and ID number must be clear and readable (no blur).</li>
            <li>Avoid glare, reflections, shadows, stickers, or filters.</li>
            <li>Upload front side in JPG or PNG, maximum file size 5MB.</li>
            <li>ID name should match the beneficiary registration name.</li>
          </ul>
        </div>

        <FieldLabel>Upload Valid ID Photo</FieldLabel>
        <FileUploadArea onClick={() => document.getElementById("yakap-id-upload")?.click()}>
          <CloudUploadRoundedIcon sx={{ fontSize: 36, color: "#0D8A3F", opacity: 0.55, mb: 1 }} />
          <div style={{ fontSize: "0.86rem", fontWeight: 700, color: "#344054" }}>
            {idFileName || "Click to upload photo of valid ID"}
          </div>
          <div style={{ fontSize: "0.75rem", color: "#98A2B3", marginTop: 4 }}>
            JPG, PNG up to 5MB
          </div>
          {idFileName && (
            <div
              style={{
                display: "inline-flex",
                marginTop: 10,
                border: "1px solid #D0D5DD",
                borderRadius: 999,
                padding: "5px 10px",
                fontSize: "0.72rem",
                color: "#344054",
                backgroundColor: "#FFFFFF",
                fontWeight: 600,
              }}
            >
              Selected: {idFileName}
            </div>
          )}
          <input
            id="yakap-id-upload"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </FileUploadArea>
        <div style={{ marginTop: 12 }}>
          <FieldLabel>ID Photo Preview</FieldLabel>
          <div
            style={{
              border: "1px solid #D0D5DD",
              borderRadius: 12,
              overflow: "hidden",
              backgroundColor: "#F9FAFB",
              minHeight: 180,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {idPreviewUrl ? (
              <Image
                src={idPreviewUrl}
                alt="Valid ID preview"
                width={1200}
                height={800}
                unoptimized
                style={{ width: "100%", maxHeight: 260, objectFit: "contain", display: "block", height: "auto" }}
              />
            ) : (
              <div style={{ fontSize: "0.82rem", color: "#98A2B3", padding: "16px 20px", textAlign: "center" }}>
                No image selected yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );

  const renderStep3 = () => (
    <>
      <div
        style={{
          marginBottom: 16,
          border: "1px solid #D0D5DD",
          borderRadius: 10,
          backgroundColor: "#FCFCFD",
          padding: "12px 14px",
          fontSize: "0.8rem",
          color: "#475467",
          lineHeight: 1.45,
        }}
      >
        Add at least two emergency contacts. You can add more contacts using the plus button.
      </div>

      {form.emergencyContacts.map((contact, index) => (
        <div
          key={`emergency-contact-${index}`}
          style={{
            border: "1px solid #EAECF0",
            borderRadius: 12,
            padding: "12px 12px 2px",
            marginBottom: 14,
            backgroundColor: "#FFFFFF",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                fontSize: "0.78rem",
                fontWeight: 700,
                color: "#344054",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Emergency Contact {index + 1} {index < 2 ? "(Required)" : "(Optional)"}
            </div>
            {index >= 2 && (
              <button
                type="button"
                onClick={() => removeEmergencyContact(index)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  border: "1px solid #FECACA",
                  background: "#FEF2F2",
                  color: "#B42318",
                  borderRadius: 8,
                  padding: "6px 10px",
                  fontSize: "0.74rem",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                <DeleteOutlineRoundedIcon sx={{ fontSize: 16 }} />
                Remove
              </button>
            )}
          </div>

          <FieldRow>
            <div>
              <FieldLabel>Contact Person Name *</FieldLabel>
              <FieldInput
                placeholder="e.g. Juan Dela Cruz"
                value={contact.name}
                onChange={(event) => updateEmergencyContact(index, "name", event.target.value)}
              />
            </div>
            <div>
              <FieldLabel>Relationship *</FieldLabel>
              <FieldSelect
                value={contact.relationship}
                onChange={(event) => updateEmergencyContact(index, "relationship", event.target.value)}
              >
                <option value="">Select...</option>
                <option value="Spouse">Spouse</option>
                <option value="Parent">Parent</option>
                <option value="Child">Child</option>
                <option value="Sibling">Sibling</option>
                <option value="Relative">Relative</option>
                <option value="Friend">Friend</option>
                <option value="Guardian">Guardian</option>
              </FieldSelect>
            </div>
            <div>
              <FieldLabel>Contact Number *</FieldLabel>
              <FieldInput
                placeholder="e.g. 09181234567"
                value={contact.contactNumber}
                onChange={(event) => updateEmergencyContact(index, "contactNumber", event.target.value)}
              />
            </div>
          </FieldRow>
        </div>
      ))}

      <button
        type="button"
        onClick={addEmergencyContact}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          border: "1px solid #A4BCFD",
          color: "#175CD3",
          backgroundColor: "#EEF4FF",
          borderRadius: 10,
          padding: "8px 12px",
          fontSize: "0.8rem",
          fontWeight: 700,
          cursor: "pointer",
          marginBottom: 8,
        }}
      >
        <AddRoundedIcon sx={{ fontSize: 18 }} />
        Add Emergency Contact
      </button>
    </>
  );

  const renderReview = () => (
    <>
      <ReviewSection>
        <ReviewTitle>Personal Information</ReviewTitle>
        <ReviewGrid>
          <ReviewItem>
            <ReviewLabel>Full Name</ReviewLabel>
            <ReviewValue>{[form.firstName, form.middleName, form.lastName, form.suffix].filter(Boolean).join(" ")}</ReviewValue>
          </ReviewItem>
          <ReviewItem>
            <ReviewLabel>Date of Birth</ReviewLabel>
            <ReviewValue>{form.dateOfBirth}</ReviewValue>
          </ReviewItem>
          <ReviewItem>
            <ReviewLabel>Gender</ReviewLabel>
            <ReviewValue>{form.gender}</ReviewValue>
          </ReviewItem>
          <ReviewItem>
            <ReviewLabel>Civil Status</ReviewLabel>
            <ReviewValue>{form.civilStatus}</ReviewValue>
          </ReviewItem>
        </ReviewGrid>
      </ReviewSection>

      <ReviewSection>
        <ReviewTitle>Contact & Address</ReviewTitle>
        <ReviewGrid>
          <ReviewItem>
            <ReviewLabel>Contact Number</ReviewLabel>
            <ReviewValue>{form.contactNumber}</ReviewValue>
          </ReviewItem>
          <ReviewItem>
            <ReviewLabel>Email</ReviewLabel>
            <ReviewValue>{form.email || "-"}</ReviewValue>
          </ReviewItem>
          <ReviewItem style={{ gridColumn: "1 / -1" }}>
            <ReviewLabel>Address</ReviewLabel>
            <ReviewValue>{[form.street, form.barangay, form.city, form.province, form.zipCode].filter(Boolean).join(", ")}</ReviewValue>
          </ReviewItem>
        </ReviewGrid>
      </ReviewSection>

      <ReviewSection>
        <ReviewTitle>Identification</ReviewTitle>
        <ReviewGrid>
          <ReviewItem>
            <ReviewLabel>PhilHealth Number</ReviewLabel>
            <ReviewValue>{form.philhealthNumber}</ReviewValue>
          </ReviewItem>
          <ReviewItem>
            <ReviewLabel>Valid ID</ReviewLabel>
            <ReviewValue>{form.validIdType} - {form.validIdNumber}</ReviewValue>
          </ReviewItem>
          <ReviewItem>
            <ReviewLabel>ID Photo</ReviewLabel>
            <ReviewValue>{idFileName || "Not uploaded"}</ReviewValue>
          </ReviewItem>
        </ReviewGrid>
      </ReviewSection>

      <ReviewSection>
        <ReviewTitle>Emergency Contact</ReviewTitle>
        <ReviewGrid>
          {form.emergencyContacts.map((contact, index) => (
            <ReviewItem key={`review-emergency-${index}`} style={{ gridColumn: "1 / -1" }}>
              <ReviewLabel>Contact {index + 1}</ReviewLabel>
              <ReviewValue>
                {contact.name || "-"} | {contact.relationship || "-"} | {contact.contactNumber || "-"}
              </ReviewValue>
            </ReviewItem>
          ))}
        </ReviewGrid>
      </ReviewSection>
    </>
  );

  const stepRenderers = [renderStep0, renderStep1, renderStep2, renderStep3, renderReview];

  return (
    <FormContainer>
      <FormHeader>
        <FormTitle>YAKAP Beneficiary Registration</FormTitle>
        <FormSubtitle>
          Register a new beneficiary for the PHP 20,000 annual medicine benefit.
        </FormSubtitle>
      </FormHeader>

      <StepperContainer>
        {STEPS.map((label, index) => (
          <React.Fragment key={label}>
            {index > 0 && <StepConnector completed={index <= step} />}
            <StepDot>
              <StepCircle active={index === step} completed={index < step}>
                {index < step ? <CheckRoundedIcon sx={{ fontSize: 16 }} /> : index + 1}
              </StepCircle>
              <StepLabel active={index === step} completed={index < step}>
                {label}
              </StepLabel>
            </StepDot>
          </React.Fragment>
        ))}
      </StepperContainer>

      <FormBody>
        <StepMeta>
          <div>
            <StepMetaTitle>
              Step {currentStepNumber}: {STEPS[step]}
            </StepMetaTitle>
            <StepMetaHint>{STEP_HINTS[step]}</StepMetaHint>
          </div>
          <StepMetaBadge>{progress}% Complete</StepMetaBadge>
        </StepMeta>

        <StepContentCard>{stepRenderers[step]()}</StepContentCard>

        <ButtonRow>
          <div>
            {step > 0 && (
              <SecondaryButton type="button" onClick={back}>
                Back
              </SecondaryButton>
            )}
          </div>
          <div>
            {step < STEPS.length - 1 ? (
              <PrimaryButton type="button" onClick={next} disabled={!canProceed()}>
                Continue
              </PrimaryButton>
            ) : (
              <PrimaryButton type="button" onClick={handleSubmit}>
                Submit Registration
              </PrimaryButton>
            )}
          </div>
        </ButtonRow>
      </FormBody>
    </FormContainer>
  );
};

export default YakapRegistrationForm;
