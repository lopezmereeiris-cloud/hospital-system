"use client";

import React from "react";
import { FieldRow, FieldLabel, FieldInput } from "../elements";
import { RegistrationFormData, StringField } from "../interface";

interface ContactAddressStepProps {
  form: Pick<RegistrationFormData, "contactNumber" | "email" | "street" | "barangay" | "city" | "province" | "zipCode">;
  onUpdate: (field: StringField, value: string) => void;
}

const ContactAddressStep: React.FC<ContactAddressStepProps> = ({ form, onUpdate }) => (
  <>
    <FieldRow>
      <div>
        <FieldLabel>Contact Number *</FieldLabel>
        <FieldInput
          placeholder="e.g. 09171234567"
          value={form.contactNumber}
          onChange={(e) => onUpdate("contactNumber", e.target.value)}
        />
      </div>
      <div>
        <FieldLabel>Email Address *</FieldLabel>
        <FieldInput
          type="email"
          placeholder="e.g. maria@email.com"
          value={form.email}
          onChange={(e) => onUpdate("email", e.target.value)}
        />
      </div>
    </FieldRow>

    <FieldRow>
      <div style={{ gridColumn: "1 / -1" }}>
        <FieldLabel>Street Address *</FieldLabel>
        <FieldInput
          placeholder="e.g. 123 Rizal Street"
          value={form.street}
          onChange={(e) => onUpdate("street", e.target.value)}
        />
      </div>
    </FieldRow>

    <FieldRow>
      <div>
        <FieldLabel>Barangay *</FieldLabel>
        <FieldInput
          placeholder="e.g. Brgy. San Antonio"
          value={form.barangay}
          onChange={(e) => onUpdate("barangay", e.target.value)}
        />
      </div>
      <div>
        <FieldLabel>City / Municipality *</FieldLabel>
        <FieldInput
          placeholder="e.g. Quezon City"
          value={form.city}
          onChange={(e) => onUpdate("city", e.target.value)}
        />
      </div>
    </FieldRow>

    <FieldRow>
      <div>
        <FieldLabel>Province *</FieldLabel>
        <FieldInput
          placeholder="e.g. Metro Manila"
          value={form.province}
          onChange={(e) => onUpdate("province", e.target.value)}
        />
      </div>
      <div>
        <FieldLabel>Zip Code *</FieldLabel>
        <FieldInput
          placeholder="e.g. 1100"
          value={form.zipCode}
          onChange={(e) => onUpdate("zipCode", e.target.value)}
        />
      </div>
    </FieldRow>
  </>
);

export default ContactAddressStep;
