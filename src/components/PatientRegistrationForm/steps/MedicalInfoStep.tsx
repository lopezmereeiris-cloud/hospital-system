"use client";

import React from "react";
import { FieldRow, FieldLabel, FieldInput, FieldSelect } from "../elements"; // ✅ removed FieldTextarea
import { StringField } from "../interface";

const COMMON_ALLERGIES = [
  "Penicillin", "Sulfa drugs", "Aspirin", "Ibuprofen", "Paracetamol",
  "Shellfish", "Fish", "Peanuts", "Tree nuts", "Eggs",
  "Milk / Dairy", "Wheat / Gluten", "Soy", "Pollen", "Dust mites",
  "Animal dander", "Latex", "Insect stings", "Mold", "Iodine / Contrast dye",
];

const COMMON_CONDITIONS = [
  "Hypertension", "Diabetes Type 1", "Diabetes Type 2", "Asthma",
  "Heart Disease", "Stroke", "Kidney Disease", "Liver Disease",
  "Thyroid Disorder", "COPD", "Anemia", "Arthritis",
  "Epilepsy / Seizures", "Depression", "Anxiety", "Cancer (specify in Other)",
  "Tuberculosis (TB)", "HIV / AIDS", "Hepatitis B", "Hepatitis C",
];

const COMMON_MEDICATIONS = [
  // Cardiovascular
  "Amlodipine", "Losartan", "Metoprolol", "Atorvastatin", "Aspirin",
  // Diabetes
  "Metformin", "Glibenclamide", "Insulin (Regular)", "Insulin (Long-acting)",
  // Respiratory
  "Salbutamol (inhaler)", "Budesonide (inhaler)", "Montelukast",
  // Pain / Anti-inflammatory
  "Paracetamol", "Ibuprofen", "Mefenamic Acid", "Tramadol", "Celecoxib",
  // Antibiotics
  "Amoxicillin", "Azithromycin", "Cotrimoxazole", "Ciprofloxacin",
  // GI
  "Omeprazole", "Metoclopramide", "Loperamide",
  // Vitamins / Supplements
  "Vitamin C", "Vitamin D", "Ferrous Sulfate", "Folic Acid", "Calcium",
  // Psych / Neuro
  "Phenobarbital", "Carbamazepine", "Sertraline",
  // Thyroid
  "Levothyroxine",
];

interface MedicalInfoStepProps {
  form: {
    bloodType: string;
    height: string;
    weight: string;
    allergies: string;
    existingConditions: string;
    currentMedications: string;
    smokingStatus: string;
    alcoholUse: string;
  };
  onUpdate: (field: StringField, value: string) => void;
}

const toArray = (value: string) =>
  value ? value.split(",").map((v) => v.trim()).filter(Boolean) : [];

const toggleItem = (current: string, item: string): string => {
  const arr = toArray(current);
  const exists = arr.includes(item);
  const updated = exists ? arr.filter((v) => v !== item) : [...arr, item];
  return updated.join(", ");
};

const getOtherText = (current: string, knownList: string[]): string => {
  const arr = toArray(current);
  return arr.filter((v) => !knownList.includes(v)).join(", ");
};

const ChecklistGroup: React.FC<{
  items: string[];
  selected: string;
  onChange: (value: string) => void;
  otherPlaceholder: string;
}> = ({ items, selected, onChange, otherPlaceholder }) => {
  const selectedArr = toArray(selected);
  const otherText = getOtherText(selected, items);

  // ✅ Local state to track whether "Other" checkbox is checked
  const [otherChecked, setOtherChecked] = React.useState(!!otherText);

  const handleToggle = (item: string) => {
    onChange(toggleItem(selected, item));
  };

  const handleOtherToggle = () => {
    if (otherChecked) {
      // Uncheck — remove any other text from the value
      const knownOnly = selectedArr.filter((v) => items.includes(v)).join(", ");
      onChange(knownOnly);
      setOtherChecked(false);
    } else {
      // Check — show the input, don't change value yet
      setOtherChecked(true);
    }
  };

  const handleOtherText = (text: string) => {
    const knownOnly = selectedArr.filter((v) => items.includes(v));
    const combined = text ? [...knownOnly, text].join(", ") : knownOnly.join(", ");
    onChange(combined);
  };

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
          gap: "8px 16px",
          marginBottom: 10,
        }}
      >
        {items.map((item) => (
          <label
            key={item}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: "0.84rem",
              color: "#344054",
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            <input
              type="checkbox"
              checked={selectedArr.includes(item)}
              onChange={() => handleToggle(item)}
              style={{
                width: 16,
                height: 16,
                accentColor: "#0D8A3F",
                cursor: "pointer",
                flexShrink: 0,
              }}
            />
            {item}
          </label>
        ))}

        {/* Other checkbox */}
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: "0.84rem",
            color: "#344054",
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          <input
            type="checkbox"
            checked={otherChecked}
            onChange={handleOtherToggle}
            style={{
              width: 16,
              height: 16,
              accentColor: "#0D8A3F",
              cursor: "pointer",
              flexShrink: 0,
            }}
          />
          Other
        </label>
      </div>

      {/* ✅ Text input appears when Other is checked */}
      {otherChecked && (
        <FieldInput
          placeholder={otherPlaceholder}
          value={otherText}
          onChange={(e) => handleOtherText(e.target.value)}
          style={{ marginTop: 6 }}
          autoFocus
        />
      )}
    </div>
  );
};

const MedicalInfoStep: React.FC<MedicalInfoStepProps> = ({ form, onUpdate }) => (
  <>
    <FieldRow>
      <div>
        <FieldLabel>Blood Type *</FieldLabel>
        <FieldSelect value={form.bloodType} onChange={(e) => onUpdate("bloodType", e.target.value)}>
          <option value="">Select...</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="Unknown">Unknown</option>
        </FieldSelect>
      </div>
      <div>
        <FieldLabel>Height (cm)</FieldLabel>
        <FieldInput
          type="number"
          placeholder="e.g. 162"
          min="50"
          max="250"
          value={form.height}
          onChange={(e) => onUpdate("height", e.target.value)}
        />
      </div>
      <div>
        <FieldLabel>Weight (kg)</FieldLabel>
        <FieldInput
          type="number"
          placeholder="e.g. 58"
          min="1"
          max="300"
          value={form.weight}
          onChange={(e) => onUpdate("weight", e.target.value)}
        />
      </div>
    </FieldRow>

    <FieldRow>
      <div>
        <FieldLabel>Smoking Status</FieldLabel>
        <FieldSelect value={form.smokingStatus} onChange={(e) => onUpdate("smokingStatus", e.target.value)}>
          <option value="">Select...</option>
          <option value="Non-smoker">Non-smoker</option>
          <option value="Former smoker">Former smoker</option>
          <option value="Current smoker">Current smoker</option>
        </FieldSelect>
      </div>
      <div>
        <FieldLabel>Alcohol Use</FieldLabel>
        <FieldSelect value={form.alcoholUse} onChange={(e) => onUpdate("alcoholUse", e.target.value)}>
          <option value="">Select...</option>
          <option value="None">None</option>
          <option value="Occasional">Occasional</option>
          <option value="Moderate">Moderate</option>
          <option value="Heavy">Heavy</option>
        </FieldSelect>
      </div>
    </FieldRow>

    {/* Known Allergies */}
    <div style={{ marginBottom: 18 }}>
      <FieldLabel>Known Allergies</FieldLabel>
      <ChecklistGroup
        items={COMMON_ALLERGIES}
        selected={form.allergies}
        onChange={(value) => onUpdate("allergies", value)}
        otherPlaceholder="Specify other allergies..."
      />
    </div>

    {/* Existing Conditions */}
    <div style={{ marginBottom: 18 }}>
      <FieldLabel>Existing / Pre-existing Conditions</FieldLabel>
      <ChecklistGroup
        items={COMMON_CONDITIONS}
        selected={form.existingConditions}
        onChange={(value) => onUpdate("existingConditions", value)}
        otherPlaceholder="Specify other conditions..."
      />
    </div>

    {/* Current Medications */}
    <div style={{ marginBottom: 18 }}>
      <FieldLabel>Current Medications</FieldLabel>
      <ChecklistGroup
        items={COMMON_MEDICATIONS}
        selected={form.currentMedications}
        onChange={(value) => onUpdate("currentMedications", value)}
        otherPlaceholder="Specify other medications with dosage (e.g. Amlodipine 5mg)..."
      />
    </div>
  </>
);

export default MedicalInfoStep;