"use client";

import React from "react";
import { FieldRow, FieldLabel, FieldInput, FieldSelect } from "../elements";
import { RegistrationFormData, StringField } from "../interface";

interface PersonalInfoStepProps {
  form: Pick<RegistrationFormData, "firstName" | "middleName" | "lastName" | "suffix" | "dateOfBirth" | "gender" | "civilStatus">;
  onUpdate: (field: StringField, value: string) => void;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ form, onUpdate }) => (
  <>
    <FieldRow>
      <div>
        <FieldLabel>First Name *</FieldLabel>
        <FieldInput
          placeholder="e.g. Maria"
          value={form.firstName}
          onChange={(e) => onUpdate("firstName", e.target.value)}
        />
      </div>
      <div>
        <FieldLabel>Middle Name</FieldLabel>
        <FieldInput
          placeholder="e.g. Santos"
          value={form.middleName}
          onChange={(e) => onUpdate("middleName", e.target.value)}
        />
      </div>
      <div>
        <FieldLabel>Last Name *</FieldLabel>
        <FieldInput
          placeholder="e.g. Dela Cruz"
          value={form.lastName}
          onChange={(e) => onUpdate("lastName", e.target.value)}
        />
      </div>
    </FieldRow>

    <FieldRow>
      <div>
        <FieldLabel>Suffix</FieldLabel>
        <FieldSelect value={form.suffix} onChange={(e) => onUpdate("suffix", e.target.value)}>
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
          onChange={(e) => onUpdate("dateOfBirth", e.target.value)}
        />
      </div>
      <div>
        <FieldLabel>Gender *</FieldLabel>
        <FieldSelect value={form.gender} onChange={(e) => onUpdate("gender", e.target.value)}>
          <option value="">Select...</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </FieldSelect>
      </div>
    </FieldRow>

    <FieldRow>
      <div>
        <FieldLabel>Civil Status *</FieldLabel>
        <FieldSelect value={form.civilStatus} onChange={(e) => onUpdate("civilStatus", e.target.value)}>
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

export default PersonalInfoStep;
