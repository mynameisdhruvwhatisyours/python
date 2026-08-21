"use client";

import {
  ActionBarPrimitive,
  AttachmentPrimitive,
  AuiIf,
  ComposerPrimitive,
  MessagePrimitive,
  ThreadPrimitive,
  useAui,
  useAuiState,
} from "@assistant-ui/react";
import {
  ArrowUpIcon,
  CheckIcon,
  ChevronDownIcon,
  CopyIcon,
  EllipsisVertical,
  ImageIcon,
  Lightbulb,
  Mic,
  Paperclip,
  PencilIcon,
  PencilRuler,
  PlusIcon,
  RefreshCwIcon,
  Sparkles,
  Telescope,
  ThumbsDown,
  ThumbsUp,
  XIcon,
} from "lucide-react";
import { type FC, useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { MarkdownText } from "@/components/assistant-ui/markdown-text";
import { SavikaBeeLogo } from "@/components/icons/savikabee-logo";
import { CloneThreadShell } from "./clone-thread-shell";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AiAccountControl } from "./ai-account-control";
import { cn } from "@/lib/utils";

export const Gemini: FC = () => {
  return (
    <CloneThreadShell>
      <ThreadPrimitive.Root className="relative flex h-full flex-col overflow-hidden bg-[#fdfcfc] text-[#1f1f1f] dark:bg-[#0c0c0c] dark:text-[#e3e3e3]">
        {/* Top Header Bar with Google/Gemini-Style AI Account Control */}
        <div className="absolute top-3 right-4 z-30 flex items-center gap-2.5">
          <AiAccountControl />
        </div>

        <AuiIf condition={(s) => s.thread.messages.length === 0}>
          <div className="relative flex grow flex-col">
            <div className="flex grow flex-col items-center justify-center px-4 py-8">
              <div className="flex w-full max-w-2xl flex-col items-center">
                <h1 className="fade-in slide-in-from-bottom-3 motion-safe:animate-in fill-mode-both relative z-10 mb-6 text-center text-4xl font-normal text-[#1f1f1f] delay-500 duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] dark:text-white">
                  How can I help you today?
                </h1>

                <div className="relative w-full">
                  {/* Calibrated atmospheric glow matching reference footprint (~800px x 420px) */}
                  {/* Layer 3 — Wide outer atmospheric aura */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 left-1/2 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-[210px] bg-[radial-gradient(ellipse_at_center,_#93c5fd_0%,_#bfdbfe_45%,_transparent_75%)] opacity-65 blur-[105px] motion-safe:animate-ambient-breathe motion-reduce:animate-none dark:bg-[radial-gradient(ellipse_at_center,_#1d4ed8_0%,_#1e3a8a_50%,_transparent_75%)] dark:opacity-60"
                  />
                  {/* Layer 2 — Medium atmospheric cloud */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 left-1/2 h-[320px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-[160px] bg-[radial-gradient(ellipse_at_center,_#68a8ff_0%,_#9bc8ff_45%,_transparent_75%)] opacity-75 blur-[80px] motion-safe:animate-ambient-breathe motion-reduce:animate-none dark:bg-[radial-gradient(ellipse_at_center,_#2563eb_0%,_#1e40af_50%,_transparent_75%)] dark:opacity-70"
                  />
                  {/* Layer 1 — Core luminous glow */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 left-1/2 h-[200px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-[100px] bg-[radial-gradient(ellipse_at_center,_#4094ff_0%,_#70b0ff_50%,_transparent_70%)] opacity-55 blur-[55px] motion-safe:animate-ambient-breathe motion-reduce:animate-none dark:bg-[radial-gradient(ellipse_at_center,_#3b82f6_0%,_#1d4ed8_50%,_transparent_70%)] dark:opacity-65"
                  />
                  <div className="relative z-10">
                    <Composer />
                  </div>
                </div>

                {/* 4 Premium Suggestion Cards */}
                <WelcomeSuggestions />
              </div>
            </div>
          </div>
        </AuiIf>

        <AuiIf condition={(s) => s.thread.messages.length > 0}>
          <ThreadPrimitive.Viewport className="flex grow flex-col overflow-y-scroll pt-10">
            <ThreadPrimitive.Messages components={{ Message: ChatMessage }} />
            <ThreadPrimitive.ViewportFooter className="sticky bottom-0 mt-auto flex w-full flex-col items-center gap-1.5 bg-[#fdfcfc]/90 backdrop-blur-md px-4 pb-3 dark:bg-[#0c0c0c]/90">
              <Composer />
              <p className="text-center text-xs text-[#747775] dark:text-[#8e918f]">
                Savo 4.2 can make mistakes, so double-check it.
              </p>
            </ThreadPrimitive.ViewportFooter>
          </ThreadPrimitive.Viewport>
        </AuiIf>
      </ThreadPrimitive.Root>
    </CloneThreadShell>
  );
};

const SUGGESTIONS = [
  {
    icon: "✨",
    title: "Brainstorm an idea",
    description: "Creative product marketing & SaaS launch concepts",
    prompt:
      "Brainstorm 5 creative and actionable product marketing ideas for launching a modern AI SaaS tool.",
  },
  {
    icon: "💻",
    title: "Write some code",
    description: "Production TypeScript utility with generic inference",
    prompt:
      "Write a clean, production-ready TypeScript debounce function with generic type arguments, cancellation support, and usage examples.",
  },
  {
    icon: "📚",
    title: "Explain a concept",
    description: "Quantum entanglement in intuitive plain language",
    prompt:
      "Explain quantum entanglement in clear, intuitive terms with engaging real-world analogies.",
  },
  {
    icon: "🔎",
    title: "Research a topic",
    description: "Multimodal AI & autonomous agent architectures",
    prompt:
      "Provide a comprehensive research overview of key architectural patterns in multimodal AI and autonomous agentic workflows.",
  },
];

const WelcomeSuggestions: FC = () => {
  const aui = useAui();

  const handleSelect = (prompt: string) => {
    aui.thread.append({
      role: "user",
      content: [{ type: "text", text: prompt }],
    });
  };

  return (
    <div className="fade-in slide-in-from-bottom-2 motion-safe:animate-in grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-2xl mt-5 px-1 delay-700 duration-500">
      {SUGGESTIONS.map((item, idx) => (
        <button
          key={idx}
          type="button"
          onClick={() => handleSelect(item.prompt)}
          className="group flex flex-col text-start p-3.5 rounded-2xl border border-[#e8eaed] bg-white/70 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-[#1a73e8]/30 dark:border-[#282a2c] dark:bg-[#1e1f20]/70 dark:hover:border-[#3b82f6]/40 dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
        >
          <div className="flex items-center gap-2 font-medium text-sm text-[#1f1f1f] dark:text-[#e3e3e3]">
            <span className="text-base">{item.icon}</span>
            <span>{item.title}</span>
          </div>
          <span className="text-xs text-[#747775] dark:text-[#8e918f] mt-1 line-clamp-1 group-hover:text-[#1a73e8] dark:group-hover:text-[#8ab4f8] transition-colors">
            {item.description}
          </span>
        </button>
      ))}
    </div>
  );
};

const ghostBtnClass =
  "flex shrink-0 items-center justify-center rounded-full text-[#444746] transition-colors hover:bg-[#444746]/8 hover:text-[#1f1f1f] dark:text-[#c4c7c5] dark:hover:bg-[#c4c7c5]/10 dark:hover:text-[#e3e3e3]";

const Composer: FC = () => {
  return (
    <ComposerPrimitive.Root className="mx-auto flex w-full max-w-2xl flex-col rounded-[32px] bg-white p-3 shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-200 focus-within:shadow-[0_4px_20px_rgba(26,115,232,0.12)] border border-transparent focus-within:border-[#1a73e8]/20 dark:bg-[#1e1f20] dark:shadow-none dark:border-[#282a2c] dark:focus-within:border-[#3b82f6]/30">
      <AuiIf condition={(s) => s.composer.attachments.length > 0}>
        <div className="flex flex-row gap-2.5 overflow-x-auto px-1 pt-1 pb-2.5">
          <ComposerPrimitive.Attachments
            components={{ Attachment: GeminiAttachment }}
          />
        </div>
      </AuiIf>

      <div className="flex items-end gap-1">
        <GeminiPlusMenu />
        <ComposerPrimitive.Input
          rows={1}
          placeholder="Ask Savo"
          className="max-h-40 flex-1 resize-none bg-transparent px-2 py-1.5 text-[17px] leading-6 text-[#1f1f1f] outline-none placeholder:text-[#747775] dark:text-[#e3e3e3] dark:placeholder:text-[#8e918f]"
        />
        <SavoModelPicker />
        <button
          type="button"
          aria-label="Voice mode"
          className={`${ghostBtnClass} size-9`}
        >
          <Mic width={20} height={20} />
        </button>
        <GeminiSendButton />
      </div>
    </ComposerPrimitive.Root>
  );
};

const GEMINI_TOOLS = [
  { id: "research", label: "Deep Research", Icon: Telescope },
  { id: "canvas", label: "Canvas", Icon: PencilRuler },
  { id: "image", label: "Create image", Icon: ImageIcon },
  { id: "learn", label: "Guided Learning", Icon: Lightbulb },
];

const GeminiPlusMenu: FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Add files and tools"
          className={`${ghostBtnClass} size-9`}
        >
          <PlusIcon width={20} height={20} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="bottom" className="min-w-56 rounded-2xl p-1.5 border border-[#e8eaed] dark:border-[#3c4043] shadow-lg">
        <DropdownMenuItem asChild>
          <ComposerPrimitive.AddAttachment className="flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm font-medium">
            <span className="flex size-4 items-center justify-center text-[#1a73e8] dark:text-[#8ab4f8]">
              <Paperclip className="size-4" />
            </span>
            Add photos &amp; files
          </ComposerPrimitive.AddAttachment>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-1 bg-[#e8eaed] dark:bg-[#282a2c]" />
        {GEMINI_TOOLS.map(({ id, label, Icon }) => (
          <DropdownMenuItem key={id} className="flex cursor-pointer items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm">
            <Icon className="size-4 text-[#747775] dark:text-[#8e918f]" />
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const SAVO_MODELS = [
  {
    id: "savo-4.2",
    name: "Savo 4.2",
    description: "Advanced AI for reasoning, coding & everyday tasks",
  },
];

const SavoModelPicker: FC = () => {
  const [model, setModel] = useState(SAVO_MODELS[0]!.id);
  const current = SAVO_MODELS.find((m) => m.id === model) ?? SAVO_MODELS[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex h-9 shrink-0 items-center gap-0.5 rounded-full pr-1.5 pl-3 text-sm whitespace-nowrap text-[#444746] transition-colors hover:bg-[#444746]/8 hover:text-[#1f1f1f] dark:text-[#c4c7c5] dark:hover:bg-[#c4c7c5]/10 dark:hover:text-[#e3e3e3]"
          aria-label="Select model"
        >
          <span className="font-medium">{current?.name}</span>
          <ChevronDownIcon width={16} height={16} className="opacity-70" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="bottom" className="min-w-68 rounded-2xl border border-[#e8eaed] dark:border-[#3c4043] p-1.5 shadow-lg">
        {SAVO_MODELS.map((m) => (
          <DropdownMenuItem
            key={m.id}
            onClick={() => setModel(m.id)}
            className="items-start gap-3 rounded-xl px-3 py-2.5"
          >
            <span className="mt-0.5 flex size-4 items-center justify-center text-[#1a73e8] dark:text-[#8ab4f8]">
              {m.id === model ? <CheckIcon className="size-4" /> : null}
            </span>
            <span className="flex flex-col">
              <span className="text-[#1f1f1f] dark:text-[#f1f3f4] text-sm font-semibold">{m.name}</span>
              <span className="text-[#747775] dark:text-[#8e918f] text-xs mt-0.5">
                {m.description}
              </span>
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const sendBtnClass =
  "flex size-9 shrink-0 items-center justify-center rounded-full bg-[#1a73e8] text-white transition-all hover:bg-[#1557b0] shadow-sm";

const GeminiSendButton: FC = () => {
  return (
    <>
      <AuiIf condition={(s) => !s.thread.isRunning && !s.composer.isEmpty}>
        <ComposerPrimitive.Send
          aria-label="Send message"
          className={`${sendBtnClass} disabled:bg-[#e8eaed] disabled:text-[#1f1f1f]/30 dark:disabled:bg-[#282a2c] dark:disabled:text-white/20`}
        >
          <ArrowUpIcon width={19} height={19} />
        </ComposerPrimitive.Send>
      </AuiIf>
      <AuiIf condition={(s) => s.thread.isRunning}>
        <ComposerPrimitive.Cancel
          aria-label="Stop generating"
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#1a73e8] text-white transition-all hover:bg-[#1557b0]"
        >
          <span className="size-3 rounded-[3px] bg-current" />
        </ComposerPrimitive.Cancel>
      </AuiIf>
    </>
  );
};

const actionBtnClass =
  "flex size-7.5 items-center justify-center rounded-full text-[#747775] transition-colors hover:bg-[#444746]/8 hover:text-[#1f1f1f] dark:text-[#8e918f] dark:hover:bg-[#c4c7c5]/10 dark:hover:text-[#e3e3e3]";

const ChatMessage: FC = () => {
  const [liked, setLiked] = useState<boolean | null>(null);

  return (
    <MessagePrimitive.Root className="group/message mx-auto mb-7 flex w-full max-w-3xl flex-col px-4">
      {/* User Turn */}
      <AuiIf condition={(s) => s.message.role === "user"}>
        <div className="flex items-center justify-end gap-1.5">
          <ActionBarPrimitive.Root className="flex items-center gap-0.5 opacity-0 transition-opacity group-focus-within/message:opacity-100 group-hover/message:opacity-100">
            <ActionBarPrimitive.Copy className={actionBtnClass}>
              <CopyIcon width={15} height={15} />
            </ActionBarPrimitive.Copy>
            <ActionBarPrimitive.Edit className={actionBtnClass}>
              <PencilIcon width={15} height={15} />
            </ActionBarPrimitive.Edit>
          </ActionBarPrimitive.Root>
          <div className="max-w-[78%] rounded-3xl bg-[#f1f3f4] px-5 py-3 break-words text-[#1f1f1f] text-[15px] leading-relaxed dark:bg-[#282a2c] dark:text-[#e3e3e3]">
            <MessagePrimitive.Parts components={{ Text: MarkdownText }} />
          </div>
        </div>
      </AuiIf>

      {/* Assistant Turn */}
      <AuiIf condition={(s) => s.message.role === "assistant"}>
        <div className="flex flex-col">
          {/* Subtle Thinking Indicator when running and content empty */}
          <AuiIf condition={(s) => s.message.status?.type === "running" && (!s.message.content || s.message.content.length === 0)}>
            <div className="flex items-center gap-2.5 py-2 px-1">
              <SavikaBeeLogo size={18} className="animate-pulse" />
              <span className="text-xs font-medium text-[#747775] dark:text-[#8e918f] animate-pulse">
                Savo is thinking...
              </span>
            </div>
          </AuiIf>

          <div className="break-words text-[#1f1f1f] dark:text-[#e3e3e3]">
            <MessagePrimitive.Parts components={{ Text: MarkdownText }} />
          </div>

          <ActionBarPrimitive.Root className="mt-2 -ml-1 flex items-center gap-0.5 opacity-0 transition-opacity group-focus-within/message:opacity-100 group-hover/message:opacity-100">
            <button
              type="button"
              onClick={() => setLiked(liked === true ? null : true)}
              aria-label="Good response"
              className={cn(
                actionBtnClass,
                liked === true && "text-[#1a73e8] bg-[#1a73e8]/10 dark:text-[#8ab4f8] dark:bg-[#3b82f6]/15",
              )}
            >
              <ThumbsUp width={15} height={15} />
            </button>

            <button
              type="button"
              onClick={() => setLiked(liked === false ? null : false)}
              aria-label="Bad response"
              className={cn(
                actionBtnClass,
                liked === false && "text-red-500 bg-red-500/10",
              )}
            >
              <ThumbsDown width={15} height={15} />
            </button>

            <ActionBarPrimitive.Copy className={actionBtnClass}>
              <AuiIf condition={(s) => s.message.isCopied}>
                <CheckIcon width={15} height={15} className="text-emerald-500" />
              </AuiIf>
              <AuiIf condition={(s) => !s.message.isCopied}>
                <CopyIcon width={15} height={15} />
              </AuiIf>
            </ActionBarPrimitive.Copy>

            <ActionBarPrimitive.Reload className={actionBtnClass}>
              <RefreshCwIcon width={15} height={15} />
            </ActionBarPrimitive.Reload>

            <button type="button" aria-label="More options" className={actionBtnClass}>
              <EllipsisVertical width={15} height={15} />
            </button>
          </ActionBarPrimitive.Root>
        </div>
      </AuiIf>
    </MessagePrimitive.Root>
  );
};

const useFileSrc = (file: File | undefined) => {
  const [src, setSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!file) {
      setSrc(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setSrc(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  return src;
};

const useAttachmentSrc = () => {
  const { file, src } = useAuiState(
    useShallow(({ attachment }): { file?: File; src?: string } => {
      if (attachment.type !== "image") return {};
      if (attachment.file) return { file: attachment.file };
      const src = attachment.content?.filter((c) => c.type === "image")[0]
        ?.image;
      if (!src) return {};
      return { src };
    }),
  );

  return useFileSrc(file) ?? src;
};

const GeminiAttachment: FC = () => {
  const isImage = useAuiState(({ attachment }) => attachment.type === "image");
  const src = useAttachmentSrc();

  return (
    <AttachmentPrimitive.Root className="group/thumbnail relative">
      <div className="size-[72px] overflow-hidden rounded-xl border border-[#dadce0] bg-[#f1f3f4] dark:border-[#3c4043] dark:bg-[#282a2c]">
        {isImage && src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="size-full object-cover" alt="Attachment" src={src} />
        ) : (
          <div className="flex size-full items-center justify-center text-[#747775] dark:text-[#8e918f]">
            <AttachmentPrimitive.unstable_Thumb className="text-xs font-medium" />
          </div>
        )}
      </div>
      <AttachmentPrimitive.Remove
        className="absolute -top-1.5 -right-1.5 flex size-5.5 items-center justify-center rounded-full border border-[#dadce0] bg-white text-[#747775] opacity-0 transition-all group-focus-within/thumbnail:opacity-100 group-hover/thumbnail:opacity-100 hover:bg-[#f1f3f4] hover:text-[#1f1f1f] dark:border-[#3c4043] dark:bg-[#1e1f20] dark:text-[#8e918f] dark:hover:bg-[#2b2c2f] dark:hover:text-[#e3e3e3]"
        aria-label="Remove attachment"
      >
        <XIcon width={13} height={13} />
      </AttachmentPrimitive.Remove>
    </AttachmentPrimitive.Root>
  );
};
