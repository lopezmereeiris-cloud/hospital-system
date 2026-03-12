"use client";

import React, { useState } from "react";
import { RoomTypeManagerProps } from "./interface";
import {
  TypeManagerContainer,
  TypeManagerToolbar,
  TypeGrid,
  TypeCard,
  TypeCardHeader,
  TypeCardTitle,
  TypeCardMeta,
  AmenityList,
  AmenityChip,
  ActiveBadge,
  CreateTypeForm,
  FormRow,
  FormField,
  FormLabel,
  FormInput,
  SmallButton,
} from "./elements";

const RoomTypeManager: React.FC<RoomTypeManagerProps> = ({ roomTypes }) => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    key: "",
    label: "",
    defaultCapacity: "",
    amenities: "",
    color: "#4361EE",
  });

  const handleChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  return (
    <TypeManagerContainer elevation={0}>
      <TypeManagerToolbar>
        <div style={{ fontSize: "1rem", fontWeight: 700, color: "#1A1D1F" }}>
          Room Types
        </div>
        <SmallButton onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close" : "+ Create Type"}
        </SmallButton>
      </TypeManagerToolbar>

      {showForm && (
        <CreateTypeForm>
          <div
            style={{
              fontSize: "0.82rem",
              fontWeight: 600,
              color: "#1A1D1F",
              marginBottom: 4,
            }}
          >
            New Room Type
          </div>
          <FormRow>
            <FormField>
              <FormLabel>Type Key</FormLabel>
              <FormInput
                placeholder="e.g. icu"
                value={form.key}
                onChange={handleChange("key")}
              />
            </FormField>
            <FormField>
              <FormLabel>Display Label</FormLabel>
              <FormInput
                placeholder="e.g. Intensive Care Unit"
                value={form.label}
                onChange={handleChange("label")}
              />
            </FormField>
            <FormField>
              <FormLabel>Default Capacity</FormLabel>
              <FormInput
                type="number"
                placeholder="e.g. 1"
                min="1"
                value={form.defaultCapacity}
                onChange={handleChange("defaultCapacity")}
              />
            </FormField>
          </FormRow>
          <FormField>
            <FormLabel>Amenities (comma separated)</FormLabel>
            <FormInput
              placeholder="e.g. Ventilator, Heart Monitor, IV Pump"
              value={form.amenities}
              onChange={handleChange("amenities")}
            />
          </FormField>
          <FormField>
            <FormLabel>Color</FormLabel>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <input
                type="color"
                value={form.color}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, color: e.target.value }))
                }
                style={{
                  width: 36,
                  height: 36,
                  border: "1px solid #EAECF0",
                  borderRadius: 8,
                  cursor: "pointer",
                  padding: 2,
                }}
              />
              <span style={{ fontSize: "0.75rem", color: "#6F767E" }}>
                {form.color}
              </span>
            </div>
          </FormField>
          <SmallButton
            onClick={() => {
              setShowForm(false);
              setForm({
                key: "",
                label: "",
                defaultCapacity: "",
                amenities: "",
                color: "#4361EE",
              });
            }}
          >
            Create Type
          </SmallButton>
        </CreateTypeForm>
      )}

      <TypeGrid>
        {roomTypes.map((rt) => (
          <TypeCard key={rt.key} typeColor={rt.color}>
            <TypeCardHeader>
              <TypeCardTitle>{rt.label}</TypeCardTitle>
              <ActiveBadge isActive={rt.active}>
                {rt.active ? "Active" : "Inactive"}
              </ActiveBadge>
            </TypeCardHeader>
            <TypeCardMeta>
              Key: <strong>{rt.key}</strong> · Default Capacity:{" "}
              <strong>{rt.defaultCapacity}</strong>
            </TypeCardMeta>
            <AmenityList>
              {rt.amenities.map((am) => (
                <AmenityChip key={am} chipColor={rt.color}>
                  {am}
                </AmenityChip>
              ))}
            </AmenityList>
          </TypeCard>
        ))}
      </TypeGrid>
    </TypeManagerContainer>
  );
};

export default RoomTypeManager;
