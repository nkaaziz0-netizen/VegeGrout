"use client";

import { openQuoteModal } from "@/lib/events";

export default function QuoteButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href="#"
      className={className}
      onClick={(e) => {
        e.preventDefault();
        openQuoteModal();
      }}
    >
      {children}
    </a>
  );
}
