"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: string;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-xl transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:pointer-events-none";

  const variantStyles = {
    primary:
      "bg-primary text-on-primary hover:bg-primary-fixed shadow-md shadow-primary/10 focus:ring-primary/40",
    secondary:
      "bg-surface-container-high text-on-surface hover:bg-surface-variant focus:ring-outline/40 border border-outline-variant/40",
    outline:
      "border border-primary/40 text-primary hover:bg-primary/10 focus:ring-primary/40",
    ghost:
      "text-on-surface-variant hover:text-on-surface hover:bg-surface-container focus:ring-outline/20",
    danger:
      "bg-error/20 text-error hover:bg-error/30 border border-error/40 focus:ring-error/40",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {icon && <span className="material-symbols-outlined text-lg">{icon}</span>}
      {children}
    </button>
  );
}
