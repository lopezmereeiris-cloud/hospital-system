"use client";

import React from "react";
import { RegistrationFormData } from "../interface";
import { ReviewSection, ReviewTitle, ReviewGrid, ReviewItem, ReviewLabel, ReviewValue } from "../elements";

interface ReviewStepProps {
  form: RegistrationFormData;
  idFileName: string;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ form, idFileName }) => (
  <>
    <ReviewSection>
      <ReviewTitle>Personal Information</ReviewTitle>
      <ReviewGrid>
        <ReviewItem>
          <ReviewLabel>Full Name</ReviewLabel>
          <ReviewValue>
            {[form.firstName, form.middleName, form.lastName, form.suffix].filter(Boolean).join(" ")}
          </ReviewValue>
        </ReviewItem>
        <ReviewItem>
          <ReviewLabel>Date of Birth</ReviewLabel>
          <ReviewValue>{form.dateOfBirth}</ReviewValue>
        </ReviewItem>
        <ReviewItem>
          <ReviewLabel>Gender</ReviewLabel>
          <ReviewValue>{form.gender}</ReviewValue>
        </ReviewItem>
        <ReviewItem>
          <ReviewLabel>Civil Status</ReviewLabel>
          <ReviewValue>{form.civilStatus}</ReviewValue>
        </ReviewItem>
      </ReviewGrid>
    </ReviewSection>

    <ReviewSection>
      <ReviewTitle>Contact & Address</ReviewTitle>
      <ReviewGrid>
        <ReviewItem>
          <ReviewLabel>Contact Number</ReviewLabel>
          <ReviewValue>{form.contactNumber}</ReviewValue>
        </ReviewItem>
        <ReviewItem>
          <ReviewLabel>Email</ReviewLabel>
          <ReviewValue>{form.email || "-"}</ReviewValue>
        </ReviewItem>
        <ReviewItem style={{ gridColumn: "1 / -1" }}>
          <ReviewLabel>Address</ReviewLabel>
          <ReviewValue>
            {[form.street, form.barangay, form.city, form.province, form.zipCode].filter(Boolean).join(", ")}
          </ReviewValue>
        </ReviewItem>
      </ReviewGrid>
    </ReviewSection>

    <ReviewSection>
      <ReviewTitle>Identification</ReviewTitle>
      <ReviewGrid>
        <ReviewItem>
          <ReviewLabel>PhilHealth Number</ReviewLabel>
          <ReviewValue>{form.philhealthNumber}</ReviewValue>
        </ReviewItem>
        <ReviewItem>
          <ReviewLabel>Valid ID</ReviewLabel>
          <ReviewValue>
            {form.validIdType} - {form.validIdNumber}
          </ReviewValue>
        </ReviewItem>
        <ReviewItem>
          <ReviewLabel>ID Photo</ReviewLabel>
          <ReviewValue>{idFileName || "Not uploaded"}</ReviewValue>
        </ReviewItem>
      </ReviewGrid>
    </ReviewSection>

    <ReviewSection>
      <ReviewTitle>Emergency Contact</ReviewTitle>
      <ReviewGrid>
        {form.emergencyContacts.map((contact, index) => (
          <ReviewItem key={`review-emergency-${index}`} style={{ gridColumn: "1 / -1" }}>
            <ReviewLabel>Contact {index + 1}</ReviewLabel>
            <ReviewValue>
              {contact.name || "-"} | {contact.relationship || "-"} | {contact.contactNumber || "-"}
            </ReviewValue>
          </ReviewItem>
        ))}
      </ReviewGrid>
    </ReviewSection>
  </>
);

export default ReviewStep;
