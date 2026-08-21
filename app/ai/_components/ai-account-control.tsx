"use client";

import { useState, type FC } from "react";
import Image from "next/image";
import { useUser, useClerk } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  LogOutIcon,
  SettingsIcon,
  SparklesIcon,
  UserIcon,
  ExternalLinkIcon,
} from "lucide-react";
import { SavikaBeeLogo } from "@/components/icons/savikabee-logo";
import { SignIn, SignUp } from "@clerk/nextjs";
import { isClerkConfigured } from "@/lib/env";
import { cn } from "@/lib/utils";

const UnconfiguredAccountControl: FC<{ className?: string }> = ({ className }) => {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <>
      <div className={cn("flex items-center gap-2", className)}>
        <button
          type="button"
          onClick={() => setAuthModalOpen(true)}
          className="flex items-center gap-1.5 rounded-full bg-[#1a73e8] px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#1557b0] hover:shadow active:scale-95 dark:bg-[#8ab4f8] dark:text-[#1a73e8] dark:hover:bg-[#a8c7fa]"
        >
          <SparklesIcon className="size-3.5" />
          <span>Sign in</span>
        </button>
      </div>

      <Dialog open={authModalOpen} onOpenChange={setAuthModalOpen}>
        <DialogContent className="max-w-md border-0 bg-transparent p-0 shadow-none">
          <div className="overflow-hidden rounded-2xl border border-[#e8eaed] bg-white p-6 shadow-2xl dark:border-[#3c4043] dark:bg-[#1e1f20]">
            <DialogHeader className="mb-4 flex flex-col items-center text-center">
              <div className="mb-2 flex size-12 items-center justify-center rounded-2xl bg-[#e8f0fe] dark:bg-[#1a293f]">
                <SavikaBeeLogo size={28} />
              </div>
              <DialogTitle className="text-xl font-semibold text-[#1f1f1f] dark:text-white">
                Sign in to SavikaBee AI
              </DialogTitle>
              <p className="text-xs text-[#747775] dark:text-[#8e918f]">
                Powered by Savo 4.2
              </p>
            </DialogHeader>

            <div className="py-6 text-center text-sm text-[#747775] dark:text-[#8e918f]">
              <p className="font-medium text-[#1f1f1f] dark:text-[#e3e3e3]">
                SavikaBee AI Authentication
              </p>
              <p className="mt-1 text-xs">
                To activate live authentication, provide <code className="rounded bg-black/5 px-1.5 py-0.5 dark:bg-white/10">NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code> and <code className="rounded bg-black/5 px-1.5 py-0.5 dark:bg-white/10">CLERK_SECRET_KEY</code> in your environment.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const ClerkAccountControl: FC<{ className?: string }> = ({ className }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { openUserProfile, signOut, openSignIn } = useClerk();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"sign-in" | "sign-up">("sign-in");

  // Fallback initial if loaded but no image
  const initials =
    user?.firstName && user?.lastName
      ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
      : user?.firstName
        ? user.firstName[0].toUpperCase()
        : user?.primaryEmailAddress?.emailAddress
          ? user.primaryEmailAddress.emailAddress[0].toUpperCase()
          : "U";

  const displayName =
    user?.fullName ||
    user?.firstName ||
    user?.primaryEmailAddress?.emailAddress?.split("@")[0] ||
    "SavikaBee User";

  const email = user?.primaryEmailAddress?.emailAddress || "";

  if (!isLoaded) {
    return (
      <div
        className={cn(
          "size-9 animate-pulse rounded-full bg-black/5 dark:bg-white/10",
          className,
        )}
      />
    );
  }

  // LOGGED-OUT STATE
  if (!isSignedIn) {
    return (
      <>
        <div className={cn("flex items-center gap-2", className)}>
          <button
            type="button"
            onClick={() => {
              if (openSignIn) {
                openSignIn();
              } else {
                setAuthModalOpen(true);
              }
            }}
            className="flex items-center gap-1.5 rounded-full bg-[#1a73e8] px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#1557b0] hover:shadow active:scale-95 dark:bg-[#8ab4f8] dark:text-[#1a73e8] dark:hover:bg-[#a8c7fa]"
          >
            <SparklesIcon className="size-3.5" />
            <span>Sign in</span>
          </button>
        </div>

        {/* Local Auth Modal Fallback */}
        <Dialog open={authModalOpen} onOpenChange={setAuthModalOpen}>
          <DialogContent className="max-w-md border-0 bg-transparent p-0 shadow-none">
            <div className="overflow-hidden rounded-2xl border border-[#e8eaed] bg-white p-6 shadow-2xl dark:border-[#3c4043] dark:bg-[#1e1f20]">
              <DialogHeader className="mb-4 flex flex-col items-center text-center">
                <div className="mb-2 flex size-12 items-center justify-center rounded-2xl bg-[#e8f0fe] dark:bg-[#1a293f]">
                  <SavikaBeeLogo size={28} />
                </div>
                <DialogTitle className="text-xl font-semibold text-[#1f1f1f] dark:text-white">
                  {authMode === "sign-in" ? "Sign in to SavikaBee AI" : "Create SavikaBee AI Account"}
                </DialogTitle>
                <p className="text-xs text-[#747775] dark:text-[#8e918f]">
                  Powered by Savo 4.2
                </p>
              </DialogHeader>

              {authMode === "sign-in" ? (
                <SignIn
                  routing="hash"
                  signUpUrl="#sign-up"
                  afterSignInUrl="/ai"
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      card: "shadow-none p-0 bg-transparent",
                    },
                  }}
                />
              ) : (
                <SignUp
                  routing="hash"
                  signInUrl="#sign-in"
                  afterSignUpUrl="/ai"
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      card: "shadow-none p-0 bg-transparent",
                    },
                  }}
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  // LOGGED-IN GOOGLE/GEMINI STYLE ACCOUNT POPOVER
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "group relative flex size-9 items-center justify-center rounded-full ring-2 ring-transparent transition-all hover:ring-[#1a73e8]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8]",
            className,
          )}
          aria-label={`SavikaBee AI Account: ${displayName}`}
        >
          {user?.imageUrl ? (
            <Image
              src={user.imageUrl}
              alt={displayName}
              width={36}
              height={36}
              className="size-9 rounded-full object-cover shadow-sm transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-[#1a73e8] to-[#7c3aed] text-xs font-semibold text-white shadow-sm">
              {initials}
            </div>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-80 rounded-2xl border border-[#e8eaed] bg-white p-3 shadow-xl dark:border-[#3c4043] dark:bg-[#1e1f20]"
      >
        {/* Profile Card Header */}
        <div className="flex flex-col items-center px-3 py-4 text-center">
          <div className="relative mb-3">
            {user?.imageUrl ? (
              <Image
                src={user.imageUrl}
                alt={displayName}
                width={64}
                height={64}
                className="size-16 rounded-full object-cover ring-4 ring-[#e8f0fe] shadow-sm dark:ring-[#1a293f]"
              />
            ) : (
              <div className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-[#1a73e8] to-[#7c3aed] text-xl font-semibold text-white ring-4 ring-[#e8f0fe] shadow-sm dark:ring-[#1a293f]">
                {initials}
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full bg-white shadow-sm dark:bg-[#1e1f20]">
              <SavikaBeeLogo size={14} />
            </div>
          </div>

          <p className="text-sm font-semibold text-[#1f1f1f] dark:text-white">
            {displayName}
          </p>
          {email && (
            <p className="max-w-[240px] truncate text-xs text-[#747775] dark:text-[#8e918f]">
              {email}
            </p>
          )}

          {/* Manage AI Account Button */}
          <button
            type="button"
            onClick={() => openUserProfile()}
            className="mt-3.5 flex items-center gap-1.5 rounded-full border border-[#dadce0] px-4 py-1.5 text-xs font-medium text-[#1f1f1f] transition-colors hover:bg-[#f1f3f4] dark:border-[#3c4043] dark:text-[#e3e3e3] dark:hover:bg-[#282a2c]"
          >
            <UserIcon className="size-3.5 text-[#5f6368] dark:text-[#9aa0a6]" />
            <span>Manage AI Account</span>
            <ExternalLinkIcon className="size-3 text-[#5f6368] dark:text-[#9aa0a6]" />
          </button>
        </div>

        <DropdownMenuSeparator className="my-1 bg-[#e8eaed] dark:bg-[#282a2c]" />

        {/* Actions List */}
        <div className="py-1">
          <DropdownMenuItem
            onClick={() => openUserProfile()}
            className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-[#444746] transition-colors hover:bg-[#f1f3f4] hover:text-[#1f1f1f] dark:text-[#c4c7c5] dark:hover:bg-[#282a2c] dark:hover:text-white"
          >
            <SettingsIcon className="size-4" />
            <span>AI Account Settings</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => signOut({ redirectUrl: "/ai" })}
            className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
          >
            <LogOutIcon className="size-4" />
            <span>Sign out of SavikaBee AI</span>
          </DropdownMenuItem>
        </div>

        {/* Footer Brand Info */}
        <div className="mt-1 border-t border-[#e8eaed] px-3 pt-2 text-center text-[10px] text-[#747775] dark:border-[#282a2c] dark:text-[#8e918f]">
          <span>SavikaBee AI &bull; Savo 4.2</span>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const AiAccountControl: FC<{ className?: string }> = (props) => {
  if (!isClerkConfigured) {
    return <UnconfiguredAccountControl {...props} />;
  }
  return <ClerkAccountControl {...props} />;
};

