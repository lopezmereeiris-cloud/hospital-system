"use client";

import React from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { palette } from "@/theme/palette";
import { FieldRow, FieldLabel, FieldInput, FieldSelect } from "../elements";

interface EmergencyContact {
  name: string;
  relationship: string;
  contactNumber: string;
}

interface EmergencyContactsStepProps {
  contacts: EmergencyContact[];
  onUpdate: (index: number, field: "name" | "relationship" | "contactNumber", value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

const EmergencyContactsStep: React.FC<EmergencyContactsStepProps> = ({
  contacts,
  onUpdate,
  onAdd,
  onRemove,
}) => (
  <>
    <div
      style={{
        marginBottom: 16,
        border: `1px solid ${palette.grey[300]}`,
        borderRadius: 10,
        backgroundColor: "grey.50",
        padding: "12px 14px",
        fontSize: "0.8rem",
        color: "grey.600",
        lineHeight: 1.45,
      }}
    >
      Add at least two emergency contacts. You can add more contacts using the plus button.
    </div>

    {contacts.map((contact, index) => (
      <div
        key={`emergency-contact-${index}`}
        style={{
          border: `1px solid ${palette.grey[200]}`,
          borderRadius: 12,
          padding: "12px 12px 2px",
          marginBottom: 14,
          backgroundColor: "background.paper",
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
              color: "grey.700",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Emergency Contact {index + 1} {index < 2 ? "(Required)" : "(Optional)"}
          </div>
          {index >= 2 && (
            <button
              type="button"
              onClick={() => onRemove(index)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                border: "1px solid #FECACA",
                background: "#FEF2F2",
                color: palette.error.dark,
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
              onChange={(e) => onUpdate(index, "name", e.target.value)}
            />
          </div>
          <div>
            <FieldLabel>Relationship *</FieldLabel>
            <FieldSelect
              value={contact.relationship}
              onChange={(e) => onUpdate(index, "relationship", e.target.value)}
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
              onChange={(e) => onUpdate(index, "contactNumber", e.target.value)}
            />
          </div>
        </FieldRow>
      </div>
    ))}

    <button
      type="button"
      onClick={onAdd}
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

export default EmergencyContactsStep;
