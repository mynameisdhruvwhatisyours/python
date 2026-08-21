"use client";

import type { FC } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const SavikaBeeLogo: FC<{
  className?: string;
  size?: number;
}> = ({ className, size = 24 }) => {
  return (
    <Image
      src="/images/savikabee-logo.png"
      alt="SavikaBee"
      width={size}
      height={size}
      className={cn("shrink-0 object-contain", className)}
      priority
    />
  );
};
