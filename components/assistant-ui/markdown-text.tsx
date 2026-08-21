"use client";

import {
  type CodeHeaderProps,
  MarkdownTextPrimitive,
  unstable_memoizeMarkdownComponents as memoizeMarkdownComponents,
  useIsMarkdownCodeBlock,
} from "@assistant-ui/react-markdown";
import remarkGfm from "remark-gfm";
import { type FC, memo, useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";

import { TooltipIconButton } from "@/components/assistant-ui/tooltip-icon-button";
import { cn } from "@/lib/utils";

const MarkdownTextImpl = () => {
  return (
    <MarkdownTextPrimitive
      remarkPlugins={[remarkGfm]}
      className="aui-md leading-relaxed"
      components={defaultComponents}
    />
  );
};

export const MarkdownText = memo(MarkdownTextImpl);

const CodeHeader: FC<CodeHeaderProps> = ({ language, code }) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  const onCopy = () => {
    if (!code || isCopied) return;
    copyToClipboard(code);
  };

  return (
    <div className="aui-code-header-root border-b border-[#3c4043]/30 bg-[#1e1f20] dark:bg-[#18191a] text-[#c4c7c5] mt-4 flex items-center justify-between rounded-t-xl px-4 py-2 text-xs font-mono select-none">
      <span className="font-semibold text-xs tracking-wider uppercase text-[#8ab4f8]">
        {language || "code"}
      </span>
      <TooltipIconButton tooltip={isCopied ? "Copied!" : "Copy code"} onClick={onCopy} className="text-[#c4c7c5] hover:text-white hover:bg-white/10">
        {!isCopied && (
          <CopyIcon className="size-3.5 animate-in zoom-in-75 fade-in duration-150" />
        )}
        {isCopied && (
          <CheckIcon className="size-3.5 text-emerald-400 animate-in zoom-in-50 fade-in duration-200 ease-out" />
        )}
      </TooltipIconButton>
    </div>
  );
};

const useCopyToClipboard = ({
  copiedDuration = 2500,
}: {
  copiedDuration?: number;
} = {}) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyToClipboard = (value: string) => {
    if (!value || typeof navigator === "undefined" || !navigator.clipboard) {
      return;
    }

    navigator.clipboard.writeText(value).then(
      () => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), copiedDuration);
      },
      () => {},
    );
  };

  return { isCopied, copyToClipboard };
};

const defaultComponents = memoizeMarkdownComponents({
  h1: ({ className, ...props }) => (
    <h1
      className={cn(
        "aui-md-h1 mt-6 mb-3 scroll-m-20 text-2xl font-bold tracking-tight text-[#1f1f1f] dark:text-[#f1f3f4] first:mt-0 last:mb-0",
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2
      className={cn(
        "aui-md-h2 mt-5 mb-2.5 scroll-m-20 text-xl font-semibold tracking-tight text-[#1f1f1f] dark:text-[#f1f3f4] first:mt-0 last:mb-0",
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn(
        "aui-md-h3 mt-4 mb-2 scroll-m-20 text-lg font-semibold text-[#1f1f1f] dark:text-[#e3e3e3] first:mt-0 last:mb-0",
        className,
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }) => (
    <h4
      className={cn(
        "aui-md-h4 mt-3.5 mb-1.5 scroll-m-20 text-base font-medium text-[#1f1f1f] dark:text-[#e3e3e3] first:mt-0 last:mb-0",
        className,
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }) => (
    <h5
      className={cn(
        "aui-md-h5 mt-3 mb-1 text-sm font-semibold text-[#1f1f1f] dark:text-[#e3e3e3] first:mt-0 last:mb-0",
        className,
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }) => (
    <h6
      className={cn(
        "aui-md-h6 mt-3 mb-1 text-sm font-medium text-[#444746] dark:text-[#c4c7c5] first:mt-0 last:mb-0",
        className,
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p
      className={cn(
        "aui-md-p my-3 text-[15px] leading-relaxed text-[#1f1f1f] dark:text-[#e3e3e3] first:mt-0 last:mb-0",
        className,
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }) => (
    <a
      className={cn(
        "aui-md-a text-[#1a73e8] dark:text-[#8ab4f8] font-medium underline underline-offset-2 hover:opacity-80 transition-opacity",
        className,
      )}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "aui-md-blockquote border-[#1a73e8]/40 dark:border-[#3b82f6]/40 text-[#444746] dark:text-[#c4c7c5] my-3.5 border-s-4 ps-4 italic bg-[#1a73e8]/5 dark:bg-[#3b82f6]/5 py-1.5 rounded-e-lg",
        className,
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul
      className={cn(
        "aui-md-ul marker:text-[#1a73e8] dark:marker:text-[#8ab4f8] my-3 ms-5 list-disc space-y-1.5",
        className,
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn(
        "aui-md-ol marker:text-[#1a73e8] dark:marker:text-[#8ab4f8] marker:font-semibold my-3 ms-5 list-decimal space-y-1.5",
        className,
      )}
      {...props}
    />
  ),
  hr: ({ className, ...props }) => (
    <hr
      className={cn("aui-md-hr border-[#e8eaed] dark:border-[#282a2c] my-5", className)}
      {...props}
    />
  ),
  table: ({ className, ...props }) => (
    <div className="my-4 overflow-x-auto rounded-xl border border-[#e8eaed] dark:border-[#3c4043] shadow-sm">
      <table
        className={cn(
          "aui-md-table w-full border-separate border-spacing-0 text-sm text-left",
          className,
        )}
        {...props}
      />
    </div>
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        "aui-md-th bg-[#f1f3f4] dark:bg-[#1e1f20] text-[#1f1f1f] dark:text-[#e3e3e3] px-4 py-2.5 font-semibold border-b border-[#e8eaed] dark:border-[#3c4043] text-start",
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn(
        "aui-md-td border-b border-[#e8eaed] dark:border-[#282a2c] px-4 py-2 text-start text-[#444746] dark:text-[#c4c7c5] last:border-b-0",
        className,
      )}
      {...props}
    />
  ),
  tr: ({ className, ...props }) => (
    <tr
      className={cn(
        "aui-md-tr transition-colors hover:bg-[#f8f9fa] dark:hover:bg-[#1e1f20]/50",
        className,
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li className={cn("aui-md-li leading-relaxed text-[15px]", className)} {...props} />
  ),
  strong: ({ className, ...props }) => (
    <strong
      className={cn("aui-md-strong font-semibold text-[#1f1f1f] dark:text-white", className)}
      {...props}
    />
  ),
  sup: ({ className, ...props }) => (
    <sup
      className={cn("aui-md-sup [&>a]:text-xs [&>a]:no-underline text-[#1a73e8] dark:text-[#8ab4f8]", className)}
      {...props}
    />
  ),
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        "aui-md-pre bg-[#1e1f20] dark:bg-[#18191a] text-[#e3e3e3] overflow-x-auto rounded-t-none rounded-b-xl p-4 text-[13.5px] font-mono leading-relaxed shadow-inner border border-t-0 border-[#3c4043]/30",
        className,
      )}
      {...props}
    />
  ),
  code: function Code({ className, ...props }) {
    const isCodeBlock = useIsMarkdownCodeBlock();
    return (
      <code
        className={cn(
          !isCodeBlock &&
            "aui-md-inline-code bg-[#f1f3f4] dark:bg-[#282a2c] text-[#1a73e8] dark:text-[#8ab4f8] rounded-md px-1.5 py-0.5 font-mono text-[0.88em] font-medium",
          className,
        )}
        {...props}
      />
    );
  },
  CodeHeader,
});
