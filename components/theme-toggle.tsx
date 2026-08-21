"use client";

import { useEffect, useState, type FC } from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export type Theme = "light" | "dark";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("savikabee-theme") as Theme | null;
    if (stored === "dark" || stored === "light") {
      setTheme(stored);
      document.documentElement.classList.toggle("dark", stored === "dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("savikabee-theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  return { theme, toggleTheme, mounted };
}

export const ThemeToggle: FC<{
  collapsed?: boolean;
  className?: string;
}> = ({ collapsed = false, className }) => {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <div
        className={cn(
          collapsed ? "size-9 rounded-full" : "h-9 w-full rounded-full",
          className,
        )}
      />
    );
  }

  const isDark = theme === "dark";
  const label = isDark ? "Light mode" : "Dark mode";
  const tooltipText = isDark ? "Switch to light mode" : "Switch to dark mode";

  if (collapsed) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={toggleTheme}
              className={cn(
                "flex size-9 items-center justify-center rounded-full text-[#444746] transition-colors hover:bg-[#444746]/8 hover:text-[#1f1f1f] focus-visible:ring-2 focus-visible:ring-[#1a73e8] dark:text-[#c4c7c5] dark:hover:bg-[#c4c7c5]/10 dark:hover:text-[#e3e3e3]",
                className,
              )}
              aria-label={tooltipText}
            >
              {isDark ? (
                <SunIcon className="size-4 text-amber-400 animate-in zoom-in-75 duration-200" />
              ) : (
                <MoonIcon className="size-4 text-[#444746] animate-in zoom-in-75 duration-200" />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent side="right">{tooltipText}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={toggleTheme}
            className={cn(
              "flex items-center gap-3 w-full rounded-full px-3 py-2 text-sm font-medium text-[#444746] transition-colors hover:bg-[#444746]/8 hover:text-[#1f1f1f] focus-visible:ring-2 focus-visible:ring-[#1a73e8] dark:text-[#c4c7c5] dark:hover:bg-[#c4c7c5]/10 dark:hover:text-[#e3e3e3]",
              className,
            )}
            aria-label={tooltipText}
          >
            {isDark ? (
              <SunIcon className="size-4.5 shrink-0 text-amber-400 animate-in zoom-in-75 duration-200" />
            ) : (
              <MoonIcon className="size-4.5 shrink-0 text-[#444746] dark:text-[#c4c7c5] animate-in zoom-in-75 duration-200" />
            )}
            <span>{label}</span>
          </button>
        </TooltipTrigger>
        <TooltipContent side="right">{tooltipText}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
