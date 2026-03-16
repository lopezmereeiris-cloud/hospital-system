"use client";

import React from "react";
import Image from "next/image";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import { palette } from "@/theme/palette";
import { FieldRow, FieldLabel, FieldInput, FieldSelect, FileUploadArea } from "../elements";
import { StringField } from "../interface";

interface IdentificationStepProps {
  form: {
    philhealthNumber: string;
    validIdType: string;
    validIdNumber: string;
  };
  idFileName: string;
  idPreviewUrl: string;
  onUpdate: (field: StringField, value: string) => void;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const IdentificationStep: React.FC<IdentificationStepProps> = ({
  form,
  idFileName,
  idPreviewUrl,
  onUpdate,
  onFileChange,
}) => (
  <>
    <FieldRow>
      <div>
        <FieldLabel>PhilHealth Number *</FieldLabel>
        <FieldInput
          placeholder="e.g. 01-234567890-1"
          value={form.philhealthNumber}
          onChange={(e) => onUpdate("philhealthNumber", e.target.value)}
        />
      </div>
    </FieldRow>

    <FieldRow>
      <div>
        <FieldLabel>Valid ID Type</FieldLabel>
        <FieldSelect value={form.validIdType} onChange={(e) => onUpdate("validIdType", e.target.value)}>
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
        <FieldLabel>Valid ID Number</FieldLabel>
        <FieldInput
          placeholder="Enter ID number"
          value={form.validIdNumber}
          onChange={(e) => onUpdate("validIdNumber", e.target.value)}
        />
      </div>
    </FieldRow>

    <div style={{ marginBottom: 20 }}>
      <div
        style={{
          marginBottom: 12,
          border: `1px solid ${palette.grey[300]}`,
          borderRadius: 10,
          backgroundColor: "grey.50",
          padding: "12px 14px",
        }}
      >
        <div
          style={{
            fontSize: "0.78rem",
            fontWeight: 700,
            color: "grey.700",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: 6,
          }}
        >
          Valid ID Photo Requirements
        </div>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: "0.8rem", color: "grey.600", lineHeight: 1.45 }}>
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
        <div style={{ fontSize: "0.86rem", fontWeight: 700, color: "grey.700" }}>
          {idFileName || "Click to upload photo of valid ID"}
        </div>
        <div style={{ fontSize: "0.75rem", color: "grey.400", marginTop: 4 }}>
          JPG, PNG up to 5MB
        </div>
        {idFileName && (
          <div
            style={{
              display: "inline-flex",
              marginTop: 10,
              border: `1px solid ${palette.grey[300]}`,
              borderRadius: 999,
              padding: "5px 10px",
              fontSize: "0.72rem",
              color: "grey.700",
              backgroundColor: "background.paper",
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
          onChange={onFileChange}
        />
      </FileUploadArea>
      <div style={{ marginTop: 12 }}>
        <FieldLabel>ID Photo Preview</FieldLabel>
        <div
          style={{
            border: `1px solid ${palette.grey[300]}`,
            borderRadius: 12,
            overflow: "hidden",
            backgroundColor: palette.background.default,
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
            <div style={{ fontSize: "0.82rem", color: "grey.400", padding: "16px 20px", textAlign: "center" }}>
              No image selected yet.
            </div>
          )}
        </div>
      </div>
    </div>
  </>
);

export default IdentificationStep;
