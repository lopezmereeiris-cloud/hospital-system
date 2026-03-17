"use client";

import React, { useEffect, useState } from "react";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { RegistrationFormData, StringField, PatientRegistrationFormProps } from "./interface";
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
  ButtonRow,
  PrimaryButton,
  SecondaryButton,
} from "./elements";
import PersonalInfoStep from "./steps/PersonalInfoStep";
import MedicalInfoStep from "./steps/MedicalInfoStep"; // ✅ was missing
import ContactAddressStep from "./steps/ContactAddressStep";
import IdentificationStep from "./steps/IdentificationStep";
import EmergencyContactsStep from "./steps/EmergencyContactsStep";
import ReviewStep from "./steps/ReviewStep";

const STEPS = [
  "Personal Info",
  "Medical Info",
  "Contact & Address",
  "Identification",
  "Emergency Contact",
  "Review & Submit",
];

const STEP_HINTS = [
  "Provide the patient's legal name, demographics, and background details.",
  "Enter blood type, vitals, allergies, and existing medical conditions.",
  "Add contact details and complete residential address information.",
  "Capture PhilHealth, SSS, TIN, and valid government-issued ID information.",
  "Provide emergency contact details for verification and coordination.",
  "Review all entries carefully before final registration submission.",
];

const INITIAL_DATA: RegistrationFormData = {
  firstName: "",
  middleName: "",
  lastName: "",
  suffix: "",
  dateOfBirth: "",
  gender: "",
  civilStatus: "",
  nationality: "",
  religion: "",
  occupation: "",
  bloodType: "",
  height: "",
  weight: "",
  allergies: "",
  existingConditions: "",
  currentMedications: "",
  smokingStatus: "",
  alcoholUse: "",
  contactNumber: "",
  email: "",
  street: "",
  barangay: "",
  city: "",
  province: "",
  zipCode: "",
  philhealthNumber: "",
  sssNumber: "",
  tinNumber: "",
  validIdType: "",
  validIdNumber: "",
  validIdImage: null,
  emergencyContacts: [
    { name: "", relationship: "", contactNumber: "" },
  ],
};

const PatientRegistrationForm: React.FC<PatientRegistrationFormProps> = ({ onSubmit }) => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<RegistrationFormData>(INITIAL_DATA);
  const [idFileName, setIdFileName] = useState("");
  const [idPreviewUrl, setIdPreviewUrl] = useState("");

  const currentStepNumber = step + 1;
  const progress = Math.round((currentStepNumber / STEPS.length) * 100);

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
      case 0: // Personal Info
        return !!(form.firstName && form.lastName && form.dateOfBirth && form.gender && form.civilStatus && form.nationality);
      case 1: // Medical Info
        return !!(form.bloodType); 
      case 2: // Contact & Address
        return !!(form.contactNumber && form.street && form.barangay && form.city && form.province && form.zipCode);
      case 3: // Identification
        return true;
      case 4: // Emergency Contact
        return (
          form.emergencyContacts.length >= 1 &&
          form.emergencyContacts.every(
            (contact) => !!(contact.name && contact.relationship && contact.contactNumber),
          )
        );
      default:
        return true;
    }
  };


  
  // const canProceed = (): boolean => {
  //   switch (step) {
  //     case 0: // Personal Info
  //       return true;
  //     case 1: // Medical Info
  //       return true; 
  //     case 2: // Contact & Address
  //       return true;
  //     case 3: // Identification
  //       return true;
  //     case 4: // Emergency Contact
  //       return true;
  //     default:
  //       return true;
  //   }
  // };

  const next = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
  };

  const back = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = () => {
    onSubmit(form);
  };

  const renderCurrentStep = () => {
    switch (step) {
      case 0:
        return <PersonalInfoStep form={form} onUpdate={update} />;
      case 1:
        return <MedicalInfoStep form={form} onUpdate={update} />; 
      case 2:
        return <ContactAddressStep form={form} onUpdate={update} />;
     case 3:
  return (
    <>
      <div
        style={{
          marginBottom: 16,
          border: "1px solid #A4BCFD",
          borderRadius: 10,
          backgroundColor: "#EEF4FF",
          padding: "10px 14px",
          fontSize: "0.8rem",
          color: "#175CD3",
          lineHeight: 1.5,
        }}
      >
        This step is <strong>optional</strong>. You may skip it and continue if the patient does not have an ID available at the time of registration.
      </div>
      <IdentificationStep
        form={form}
        idFileName={idFileName}
        idPreviewUrl={idPreviewUrl}
        onUpdate={update}
        onFileChange={handleFileChange}
      />
    </>
  );
      case 4:
        return (
          <EmergencyContactsStep
            contacts={form.emergencyContacts}
            onUpdate={updateEmergencyContact}
            onAdd={addEmergencyContact}
            onRemove={removeEmergencyContact}
          />
        );
      case 5:
        return <ReviewStep form={form} idFileName={idFileName} />;
      default:
        return null;
    }
  };

  return (
    <FormContainer>
      <FormHeader>
        <FormTitle>Patient Registration</FormTitle>
        <FormSubtitle>
          Complete all required fields to register a new patient and create their medical profile.
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

        <StepContentCard>{renderCurrentStep()}</StepContentCard>

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

export default PatientRegistrationForm;