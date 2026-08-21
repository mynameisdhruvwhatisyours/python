"use client";

import type { FC } from "react";
import { cn } from "@/lib/utils";

export const SavikaBeeLogo: FC<{
  className?: string;
  size?: number;
}> = ({ className, size = 22 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-label="SavikaBee logo"
    >
      <defs>
        <linearGradient
          id="savikabee-glow"
          x1="3"
          y1="3"
          x2="25"
          y2="25"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#1a73e8" />
          <stop offset="50%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient
          id="savikabee-accent"
          x1="6"
          y1="6"
          x2="22"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>

      {/* Subtle modern rounded background tile with glass tint */}
      <rect
        x="1.5"
        y="1.5"
        width="25"
        height="25"
        rx="7"
        className="fill-[#1a73e8]/10 dark:fill-[#3b82f6]/15 stroke-[#1a73e8]/20 dark:stroke-[#3b82f6]/25"
        strokeWidth="1"
      />

      {/* Fluid, geometric S mark */}
      <path
        d="M18.2 9.4C17.1 8.2 15.3 7.5 13.5 7.5C10.4 7.5 8.2 9.4 8.2 12C8.2 16.2 19.8 14.1 19.8 18.2C19.8 20.8 17.4 22.5 14.2 22.5C12 22.5 9.9 21.6 8.6 20.2"
        stroke="url(#savikabee-glow)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Soft accent dots anchoring the curves */}
      <circle cx="18.2" cy="9.4" r="1.3" fill="#60a5fa" />
      <circle cx="8.6" cy="20.2" r="1.3" fill="#1d4ed8" />
    </svg>
  );
};
