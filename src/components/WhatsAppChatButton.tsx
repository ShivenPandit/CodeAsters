"use client";

import { useEffect, useState } from "react";

type WhatsAppChatButtonProps = {
  phoneNumber: string;
  message?: string;
  ariaLabel?: string;
  className?: string;
};

const normalizePhoneNumber = (value: string) => value.replace(/\D/g, "");

export default function WhatsAppChatButton({
  phoneNumber,
  message = "Hi I want to start a project",
  ariaLabel = "Chat with us on WhatsApp",
  className,
}: WhatsAppChatButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const normalizedPhone = normalizePhoneNumber(phoneNumber);

  useEffect(() => {
    // Delay appearance so it doesn't compete with initial page load
    const timer = window.setTimeout(() => setIsVisible(true), 2500);
    return () => window.clearTimeout(timer);
  }, []);

  if (!normalizedPhone) {
    return null;
  }

  const trimmedMessage = message.trim();
  const href = trimmedMessage
    ? `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(trimmedMessage)}`
    : `https://wa.me/${normalizedPhone}`;

  const rootClassName = [
    "group fixed bottom-5 right-5 z-[9500] inline-flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAFB]",
    "transition-all duration-500 ease-out",
    isVisible
      ? "translate-y-0 opacity-100"
      : "translate-y-4 opacity-0 pointer-events-none",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      title={ariaLabel}
      data-cursor="WhatsApp"
      className={rootClassName}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full border border-white/20 opacity-30 motion-reduce:hidden motion-safe:animate-[ping_2.8s_cubic-bezier(0,0,0.2,1)_infinite]"
      />
      <span className="relative inline-flex h-full w-full items-center justify-center rounded-full bg-[#0A0A0A] text-white shadow-[0_10px_28px_rgba(0,0,0,0.38)] transition-all duration-300 ease-out group-hover:scale-105 group-hover:bg-[#1A1A1A] group-active:scale-95">
        <svg
          viewBox="0 0 16 16"
          aria-hidden
          className="h-5 w-5 sm:h-[22px] sm:w-[22px] fill-current"
        >
          <path d="M13.601 2.326A7.854 7.854 0 0 0 8.0.0C3.582.0.0 3.582.0 8c0 1.415.37 2.74 1.018 3.89L0 16l4.22-1.102A7.946 7.946 0 0 0 8 16c4.418.0 8-3.582 8-8a7.854 7.854 0 0 0-2.399-5.674zM8 14.5c-1.282.0-2.533-.343-3.62-.99l-.26-.154-2.504.654.668-2.44-.17-.264A6.48 6.48.0 0 1 1.5 8C1.5 4.416 4.416 1.5 8 1.5S14.5 4.416 14.5 8 11.584 14.5 8 14.5z" />
          <path d="M11.41 9.516c-.178-.089-1.046-.516-1.208-.575-.161-.06-.278-.089-.396.089-.118.177-.456.575-.56.694-.104.118-.208.133-.386.044-.177-.089-.749-.276-1.427-.88-.527-.47-.884-1.052-.988-1.23-.104-.178-.011-.274.078-.363.08-.08.178-.208.267-.312.089-.104.118-.178.178-.297.06-.118.03-.222-.015-.312-.044-.089-.396-.957-.543-1.312-.143-.344-.288-.297-.396-.302l-.338-.006a.647.647.0 0 0-.47.222c-.161.178-.617.604-.617 1.474.0.87.632 1.71.72 1.829.089.118 1.243 1.898 3.013 2.66.421.182.75.29 1.006.371.423.134.808.115 1.112.07.339-.05 1.046-.427 1.194-.84.148-.414.148-.769.103-.84-.044-.071-.163-.115-.34-.204z" />
        </svg>
      </span>
    </a>
  );
}
