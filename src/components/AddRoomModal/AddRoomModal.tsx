"use client";

import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { AddRoomModalProps } from "./interface";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormField,
  FormLabel,
  FormInput,
  FormSelect,
  FormRow,
  ButtonRow,
  PrimaryButton,
  SecondaryButton,
} from "./elements";

const FLOORS = [1, 2, 3];
const WINGS = ["East Wing", "West Wing", "North Wing", "South Wing"];
const ZONES = [
  "Outpatient",
  "Specialty",
  "Diagnostics",
  "Emergency",
  "Surgical",
  "Post-Op",
  "Rehabilitation",
  "Infection Control",
];

const AddRoomModal: React.FC<AddRoomModalProps> = ({
  open,
  onClose,
  roomTypes,
}) => {
  const [form, setForm] = useState({
    roomNumber: "",
    roomName: "",
    roomType: "",
    floor: "",
    wing: "",
    zone: "",
    capacity: "",
    ratePerDay: "",
  });

  if (!open) return null;

  const handleChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = () => {
    // In a real app, this would save to an API
    onClose();
    setForm({
      roomNumber: "",
      roomName: "",
      roomType: "",
      floor: "",
      wing: "",
      zone: "",
      capacity: "",
      ratePerDay: "",
    });
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "text.primary" }}>
            Add New Room
          </div>
          <IconButton onClick={onClose} size="small">
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </ModalHeader>

        <ModalBody>
          <FormRow>
            <FormField>
              <FormLabel>Room Number</FormLabel>
              <FormInput
                placeholder="e.g. 305"
                value={form.roomNumber}
                onChange={handleChange("roomNumber")}
              />
            </FormField>
            <FormField>
              <FormLabel>Room Name</FormLabel>
              <FormInput
                placeholder="e.g. Recovery Room 3"
                value={form.roomName}
                onChange={handleChange("roomName")}
              />
            </FormField>
          </FormRow>

          <FormField>
            <FormLabel>Room Type</FormLabel>
            <FormSelect
              value={form.roomType}
              onChange={handleChange("roomType")}
            >
              <option value="">Select room type</option>
              {roomTypes
                .filter((rt) => rt.active)
                .map((rt) => (
                  <option key={rt.key} value={rt.key}>
                    {rt.label}
                  </option>
                ))}
            </FormSelect>
          </FormField>

          <FormRow>
            <FormField>
              <FormLabel>Floor</FormLabel>
              <FormSelect
                value={form.floor}
                onChange={handleChange("floor")}
              >
                <option value="">Select floor</option>
                {FLOORS.map((f) => (
                  <option key={f} value={f}>
                    Floor {f}
                  </option>
                ))}
              </FormSelect>
            </FormField>
            <FormField>
              <FormLabel>Wing</FormLabel>
              <FormSelect
                value={form.wing}
                onChange={handleChange("wing")}
              >
                <option value="">Select wing</option>
                {WINGS.map((w) => (
                  <option key={w} value={w}>
                    {w}
                  </option>
                ))}
              </FormSelect>
            </FormField>
          </FormRow>

          <FormRow>
            <FormField>
              <FormLabel>Zone</FormLabel>
              <FormSelect
                value={form.zone}
                onChange={handleChange("zone")}
              >
                <option value="">Select zone</option>
                {ZONES.map((z) => (
                  <option key={z} value={z}>
                    {z}
                  </option>
                ))}
              </FormSelect>
            </FormField>
            <FormField>
              <FormLabel>Capacity</FormLabel>
              <FormInput
                type="number"
                placeholder="e.g. 2"
                min="1"
                value={form.capacity}
                onChange={handleChange("capacity")}
              />
            </FormField>
          </FormRow>

          <FormField>
            <FormLabel>Rate per Day (₱)</FormLabel>
            <FormInput
              type="number"
              placeholder="e.g. 1500"
              min="0"
              value={form.ratePerDay}
              onChange={handleChange("ratePerDay")}
            />
          </FormField>

          <ButtonRow>
            <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
            <PrimaryButton onClick={handleSubmit}>Add Room</PrimaryButton>
          </ButtonRow>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AddRoomModal;
