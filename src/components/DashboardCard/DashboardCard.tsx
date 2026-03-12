"use client";

import React from "react";
import { DashboardCardProps } from "./interface";
import {
  StyledCard,
  CardIconWrapper,
  CardTitle,
  CardValue,
  CardSubtitle,
} from "./elements";

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  color,
}) => {
  return (
    <StyledCard>
      <CardIconWrapper bgColor={color}>{icon}</CardIconWrapper>
      <CardTitle>{title}</CardTitle>
      <CardValue>{value}</CardValue>
      {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
    </StyledCard>
  );
};

export default DashboardCard;
