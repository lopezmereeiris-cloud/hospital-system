"use client";

import React, { useState } from "react";
import { RoomTypeManagerProps } from "./interface";
import { palette } from "@/theme/palette";
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
    color: "primary.main",
  });

  const handleChange =
    (field: string) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((previous) => ({ ...previous, [field]: event.target.value }));
    };

  return (
    <TypeManagerContainer elevation={0}>
      <TypeManagerToolbar>
        <div style={{ fontSize: "1rem", fontWeight: 700, color: "text.primary" }}>
          Room Type Directory
        </div>
        <SmallButton onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close Form" : "+ Create Type"}
        </SmallButton>
      </TypeManagerToolbar>

      {showForm && (
        <CreateTypeForm>
          <div
            style={{
              fontSize: "0.95rem",
              fontWeight: 700,
              color: "text.primary",
              marginBottom: 6,
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
                onChange={(event) =>
                  setForm((previous) => ({ ...previous, color: event.target.value }))
                }
                style={{
                  width: 36,
                  height: 36,
                  border: `1px solid ${palette.grey[200]}`,
                  borderRadius: 8,
                  cursor: "pointer",
                  padding: 2,
                }}
              />
              <span style={{ fontSize: "0.75rem", color: "text.secondary" }}>{form.color}</span>
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
                color: "primary.main",
              });
            }}
          >
            Create Type
          </SmallButton>
        </CreateTypeForm>
      )}

      <TypeGrid>
        {roomTypes.map((roomType) => (
          <TypeCard key={roomType.key} typeColor={roomType.color}>
            <TypeCardHeader>
              <TypeCardTitle>{roomType.label}</TypeCardTitle>
              <ActiveBadge isActive={roomType.active}>
                {roomType.active ? "Active" : "Inactive"}
              </ActiveBadge>
            </TypeCardHeader>
            <TypeCardMeta>
              Key: <strong>{roomType.key}</strong> | Default Capacity:{" "}
              <strong>{roomType.defaultCapacity}</strong>
            </TypeCardMeta>
            <AmenityList>
              {roomType.amenities.map((amenity) => (
                <AmenityChip key={amenity} chipColor={roomType.color}>
                  {amenity}
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
