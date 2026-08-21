"use client";

import {
  ThreadListItems,
  ThreadListRoot,
  ThreadListSearch,
} from "@/components/assistant-ui/thread-list";
import { TooltipIconButton } from "@/components/assistant-ui/tooltip-icon-button";
import { SavikaBeeLogo } from "@/components/icons/savikabee-logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ThreadListPrimitive, useAuiState } from "@assistant-ui/react";
import {
  BookMarkedIcon,
  ImageIcon,
  MenuIcon,
  PanelLeftIcon,
  PlusIcon,
  SearchIcon,
} from "lucide-react";
import {
  useState,
  useRef,
  type FC,
  type MouseEvent,
  type ReactNode,
} from "react";

type CloneThreadShellProps = {
  children: ReactNode;
  railClassName?: string | undefined;
  collapsed?: boolean | undefined;
  onCollapsedChange?: ((value: boolean) => void) | undefined;
  mobileSidebarOpen?: boolean | undefined;
  onMobileSidebarOpenChange?: ((value: boolean) => void) | undefined;
  headerContent?: ReactNode | undefined;
  sheetTitle?: ReactNode | undefined;
  showSearch?: boolean | undefined;
  wrapNewThreadTooltip?: boolean | undefined;
};

type ActiveNavTab = "chat" | "search" | "images" | "library";

export const CloneThreadShell: FC<CloneThreadShellProps> = ({
  children,
  railClassName,
  collapsed,
  onCollapsedChange,
  mobileSidebarOpen,
  onMobileSidebarOpenChange,
  headerContent,
  sheetTitle,
}) => {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const [internalMobileOpen, setInternalMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveNavTab>("chat");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const hasThreads = useAuiState((s) => s.threads.threadIds.length > 0);

  const collapsedControlled = collapsed !== undefined;
  const mobileControlled = mobileSidebarOpen !== undefined;

  const sidebarCollapsed = collapsed ?? internalCollapsed;
  const mobileOpen = mobileSidebarOpen ?? internalMobileOpen;

  const setSidebarCollapsed = (value: boolean) => {
    if (!collapsedControlled) setInternalCollapsed(value);
    onCollapsedChange?.(value);
  };
  const setMobileOpen = (open: boolean) => {
    if (!mobileControlled) setInternalMobileOpen(open);
    onMobileSidebarOpenChange?.(open);
  };

  const handleSearchClick = () => {
    if (sidebarCollapsed) {
      setSidebarCollapsed(false);
    }
    setSearchOpen(true);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
  };

  const closeMobileSidebarAfterNavigation = (
    event: MouseEvent<HTMLDivElement>,
  ) => {
    if (!(event.target instanceof Element)) return;
    if (
      event.target.closest(
        '[data-slot="aui_thread-list-item-trigger"], [data-slot="aui_thread-list-new"]',
      )
    ) {
      setMobileOpen(false);
    }
  };

  const navItemClass =
    "flex items-center gap-3 w-full rounded-full px-3 py-2 text-sm font-medium text-[#444746] transition-colors hover:bg-[#444746]/8 hover:text-[#1f1f1f] dark:text-[#c4c7c5] dark:hover:bg-[#c4c7c5]/10 dark:hover:text-[#e3e3e3]";
  const navItemCollapsedClass =
    "flex size-9 items-center justify-center rounded-full text-[#444746] transition-colors hover:bg-[#444746]/8 hover:text-[#1f1f1f] dark:text-[#c4c7c5] dark:hover:bg-[#c4c7c5]/10 dark:hover:text-[#e3e3e3]";

  return (
    <div className="relative flex h-full w-full overflow-hidden">
      <aside
        className={cn(
          "hidden h-full shrink-0 flex-col overflow-hidden border-r border-[#e8eaed] bg-[#fdfcfc] transition-[width] duration-200 md:flex dark:border-[#3c4043] dark:bg-[#0c0c0c]",
          railClassName,
          sidebarCollapsed ? "w-14" : "w-64",
        )}
      >
        {/* Header with SavikaBee S logo and Toggle button */}
        <div className="flex h-14 shrink-0 items-center justify-between overflow-hidden px-3">
          {sidebarCollapsed ? (
            <div className="flex w-full flex-col items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={() => setSidebarCollapsed(false)}
                      className="flex size-9 items-center justify-center rounded-lg transition-transform hover:scale-105"
                      aria-label="SavikaBee"
                    >
                      <SavikaBeeLogo size={24} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right">SavikaBee</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {!collapsedControlled && (
                <TooltipIconButton
                  variant="ghost"
                  size="icon"
                  tooltip="Expand sidebar"
                  side="right"
                  onClick={() => setSidebarCollapsed(false)}
                  className="size-8 text-[#444746] hover:bg-[#444746]/8 dark:text-[#c4c7c5] dark:hover:bg-[#c4c7c5]/10"
                >
                  <PanelLeftIcon className="size-4" />
                </TooltipIconButton>
              )}
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2.5 overflow-hidden">
                <SavikaBeeLogo size={24} />
                <span className="font-semibold text-base tracking-tight text-[#1f1f1f] dark:text-[#e3e3e3]">
                  SavikaBee
                </span>
              </div>

              {!collapsedControlled && (
                <TooltipIconButton
                  variant="ghost"
                  size="icon"
                  tooltip="Collapse sidebar"
                  side="right"
                  onClick={() => setSidebarCollapsed(true)}
                  className="size-8 text-[#444746] hover:bg-[#444746]/8 dark:text-[#c4c7c5] dark:hover:bg-[#c4c7c5]/10"
                >
                  <PanelLeftIcon className="size-4" />
                </TooltipIconButton>
              )}
            </>
          )}
        </div>

        {/* Navigation Actions */}
        <div
          className={cn(
            "flex flex-col gap-1 px-2.5 pt-2 pb-2",
            sidebarCollapsed && "items-center px-1",
          )}
        >
          {/* 1. New chat */}
          <ThreadListPrimitive.New asChild>
            {sidebarCollapsed ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={() => setActiveTab("chat")}
                      className={cn(
                        navItemCollapsedClass,
                        "bg-[#d3e3fd]/40 text-[#041e49] hover:bg-[#d3e3fd]/70 dark:bg-[#1f3760]/50 dark:text-[#d3e3fd] dark:hover:bg-[#1f3760]",
                      )}
                      aria-label="New chat"
                    >
                      <PlusIcon className="size-4.5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right">New chat</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <button
                type="button"
                onClick={() => setActiveTab("chat")}
                className={cn(
                  navItemClass,
                  "bg-[#e8f0fe] text-[#1a73e8] hover:bg-[#d2e3fc] dark:bg-[#1e2a3a] dark:text-[#8ab4f8] dark:hover:bg-[#28374d]",
                )}
              >
                <PlusIcon className="size-4.5 shrink-0" />
                <span>New chat</span>
              </button>
            )}
          </ThreadListPrimitive.New>

          {/* 2. Search chats */}
          {sidebarCollapsed ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={handleSearchClick}
                    className={navItemCollapsedClass}
                    aria-label="Search chats"
                  >
                    <SearchIcon className="size-4.5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">Search chats</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              className={cn(
                navItemClass,
                searchOpen &&
                  "bg-[#444746]/8 text-[#1f1f1f] dark:bg-[#c4c7c5]/10 dark:text-white",
              )}
            >
              <SearchIcon className="size-4.5 shrink-0" />
              <span>Search chats</span>
            </button>
          )}

          {/* 3. Images */}
          {sidebarCollapsed ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => setActiveTab("images")}
                    className={cn(
                      navItemCollapsedClass,
                      activeTab === "images" &&
                        "bg-[#444746]/10 text-[#1f1f1f] dark:bg-[#c4c7c5]/15 dark:text-white",
                    )}
                    aria-label="Images"
                  >
                    <ImageIcon className="size-4.5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">Images</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <button
              type="button"
              onClick={() => setActiveTab("images")}
              className={cn(
                navItemClass,
                activeTab === "images" &&
                  "bg-[#444746]/10 text-[#1f1f1f] dark:bg-[#c4c7c5]/15 dark:text-white",
              )}
            >
              <ImageIcon className="size-4.5 shrink-0" />
              <span>Images</span>
            </button>
          )}

          {/* 4. Library */}
          {sidebarCollapsed ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => setActiveTab("library")}
                    className={cn(
                      navItemCollapsedClass,
                      activeTab === "library" &&
                        "bg-[#444746]/10 text-[#1f1f1f] dark:bg-[#c4c7c5]/15 dark:text-white",
                    )}
                    aria-label="Library"
                  >
                    <BookMarkedIcon className="size-4.5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">Library</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <button
              type="button"
              onClick={() => setActiveTab("library")}
              className={cn(
                navItemClass,
                activeTab === "library" &&
                  "bg-[#444746]/10 text-[#1f1f1f] dark:bg-[#c4c7c5]/15 dark:text-white",
              )}
            >
              <BookMarkedIcon className="size-4.5 shrink-0" />
              <span>Library</span>
            </button>
          )}
        </div>

        {/* Divider */}
        {!sidebarCollapsed && (
          <div className="mx-4 my-2 border-t border-[#e8eaed] dark:border-[#282a2c]" />
        )}

        {/* Chat History Section */}
        <ThreadListRoot
          className={cn(
            "relative flex-1 overflow-y-auto px-2.5 pb-3 transition-[padding,width] duration-200",
            sidebarCollapsed ? "w-14 overflow-hidden px-1 pt-1" : "w-64",
          )}
        >
          {!sidebarCollapsed && (
            <div className="flex items-center justify-between px-3 pt-1 pb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#747775] dark:text-[#8e918f]">
                Recent
              </span>
            </div>
          )}

          {!sidebarCollapsed && (searchOpen || (hasThreads && search)) && (
            <div className="px-1 py-1">
              <ThreadListSearch
                ref={searchInputRef}
                value={search}
                onValueChange={setSearch}
              />
            </div>
          )}

          <ThreadListItems
            searchQuery={search}
            aria-hidden={sidebarCollapsed}
            className={cn(
              "transition-[opacity,transform] duration-150",
              sidebarCollapsed
                ? "pointer-events-none opacity-0"
                : "translate-x-0 opacity-100",
            )}
          />
        </ThreadListRoot>
      </aside>

      {/* Mobile Drawer Sheet */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        {!mobileControlled && (
          <div className="absolute top-3 left-3 z-20 md:hidden">
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-9 rounded-full bg-white/80 backdrop-blur-md shadow-sm border border-[#e8eaed] dark:bg-[#1e1f20]/80 dark:border-[#3c4043]"
              >
                <MenuIcon className="size-4.5 text-[#444746] dark:text-[#c4c7c5]" />
                <span className="sr-only">Open chat history</span>
              </Button>
            </SheetTrigger>
          </div>
        )}
        <SheetContent
          side="left"
          className="flex w-72 flex-col bg-[#fdfcfc] p-0 dark:bg-[#0c0c0c]"
        >
          <SheetTitle className="flex h-14 shrink-0 items-center gap-2.5 px-4 text-base font-semibold">
            <SavikaBeeLogo size={24} />
            <span>SavikaBee</span>
          </SheetTitle>

          <div
            className="flex flex-col gap-1 px-3 pt-1 pb-2"
            onClick={closeMobileSidebarAfterNavigation}
          >
            <ThreadListPrimitive.New asChild>
              <button
                type="button"
                className={cn(
                  navItemClass,
                  "bg-[#e8f0fe] text-[#1a73e8] hover:bg-[#d2e3fc] dark:bg-[#1e2a3a] dark:text-[#8ab4f8] dark:hover:bg-[#28374d]",
                )}
              >
                <PlusIcon className="size-4.5 shrink-0" />
                <span>New chat</span>
              </button>
            </ThreadListPrimitive.New>

            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className={navItemClass}
            >
              <SearchIcon className="size-4.5 shrink-0" />
              <span>Search chats</span>
            </button>

            <button type="button" className={navItemClass}>
              <ImageIcon className="size-4.5 shrink-0" />
              <span>Images</span>
            </button>

            <button type="button" className={navItemClass}>
              <BookMarkedIcon className="size-4.5 shrink-0" />
              <span>Library</span>
            </button>
          </div>

          <div className="mx-4 my-1 border-t border-[#e8eaed] dark:border-[#282a2c]" />

          <div
            className="relative flex-1 overflow-y-auto px-3 pb-3"
            onClick={closeMobileSidebarAfterNavigation}
          >
            <div className="px-2 pt-1 pb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#747775] dark:text-[#8e918f]">
                Recent
              </span>
            </div>
            <ThreadListSearch value={search} onValueChange={setSearch} />
            <ThreadListItems searchQuery={search} />
          </div>
        </SheetContent>
      </Sheet>

      <div className="min-w-0 flex-1 overflow-hidden">{children}</div>
    </div>
  );
};
