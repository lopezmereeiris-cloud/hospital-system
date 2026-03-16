"use client";

import React from "react";
import { FieldRow, FieldLabel, FieldInput, FieldSelect } from "../elements";
import { RegistrationFormData, StringField } from "../interface";
import addressData from "@/json/philippineAddress.json";

type CityData = { zipCode: string; barangays: string[] };
type ProvinceData = Record<string, CityData>;
type AddressData = Record<string, ProvinceData>;

const typedAddressData = addressData as AddressData;

interface ContactAddressStepProps {
  form: Pick<
    RegistrationFormData,
    "contactNumber" | "email" | "street" | "barangay" | "city" | "province" | "zipCode"
  >;
  onUpdate: (field: StringField, value: string) => void;
}

const ContactAddressStep: React.FC<ContactAddressStepProps> = ({ form, onUpdate }) => {
  const provinces = Object.keys(typedAddressData);

  const cities = form.province
    ? Object.keys(typedAddressData[form.province] || {})
    : [];

  const barangays =
    form.province && form.city
      ? typedAddressData[form.province]?.[form.city]?.barangays || []
      : [];

  const handleProvinceChange = (value: string) => {
    onUpdate("province", value);
    onUpdate("city", "");
    onUpdate("barangay", "");
    onUpdate("zipCode", "");
  };

  const handleCityChange = (value: string) => {
    onUpdate("city", value);
    onUpdate("barangay", "");

    // Auto-fill zip code from JSON
    const zip = form.province
      ? typedAddressData[form.province]?.[value]?.zipCode || ""
      : "";
    onUpdate("zipCode", zip);
  };

  return (
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
          <FieldLabel>Email Address</FieldLabel>
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
          <FieldLabel>Province *</FieldLabel>
          <FieldSelect
            value={form.province}
            onChange={(e) => handleProvinceChange(e.target.value)}
          >
            <option value="">Select province...</option>
            {provinces.map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </FieldSelect>
        </div>

        <div>
          <FieldLabel>City / Municipality *</FieldLabel>
          <FieldSelect
            value={form.city}
            onChange={(e) => handleCityChange(e.target.value)}
            disabled={!form.province}
          >
            <option value="">
              {form.province ? "Select city..." : "Select a province first"}
            </option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </FieldSelect>
        </div>
      </FieldRow>

      <FieldRow>
        <div>
          <FieldLabel>Barangay *</FieldLabel>
          <FieldSelect
            value={form.barangay}
            onChange={(e) => onUpdate("barangay", e.target.value)}
            disabled={!form.city}
          >
            <option value="">
              {form.city ? "Select barangay..." : "Select a city first"}
            </option>
            {barangays.map((barangay) => (
              <option key={barangay} value={barangay}>
                {barangay}
              </option>
            ))}
          </FieldSelect>
        </div>

        <div>
          <FieldLabel>Zip Code *</FieldLabel>
          <FieldInput
            placeholder="Auto-filled on city selection"
            value={form.zipCode}
            onChange={(e) => onUpdate("zipCode", e.target.value)}
            readOnly={!!form.zipCode}
            style={{ backgroundColor: form.zipCode ? "#F4FAF6" : undefined }}
          />
        </div>
      </FieldRow>
    </>
  );
};

export default ContactAddressStep;
