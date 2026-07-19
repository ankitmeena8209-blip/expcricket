"use client";

import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "error" | "outline";
  size?: "sm" | "md";
}

export default function Badge({
  children,
  variant = "primary",
  size = "sm",
}: BadgeProps) {
  const variantStyles = {
    primary: "bg-primary-container/30 text-primary border-primary/30",
    secondary: "bg-secondary-container/30 text-secondary border-secondary/30",
    tertiary: "bg-tertiary-container/30 text-tertiary border-tertiary/30",
    error: "bg-error-container/30 text-error border-error/30",
    outline: "bg-surface-container-high text-on-surface-variant border-outline-variant/40",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-1 text-xs",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 font-mono-data font-semibold rounded-md border ${variantStyles[variant]} ${sizeStyles[size]}`}
    >
      {children}
    </span>
  );
}
