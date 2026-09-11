"use client";

/**
 * Floating WhatsApp live-chat button.
 *
 * Visible on every page (bottom-right corner). Opens WhatsApp web in a
 * new tab — no SDK required.
 */
export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/27832854686"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_0_24px_rgba(37,211,102,0.45)] transition-transform hover:scale-105"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon />
    </a>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 32 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M16.01 3.2C8.94 3.2 3.2 8.9 3.2 15.9c0 2.42.69 4.78 1.99 6.81L3.08 30.5l7.99-2.06a12.98 12.98 0 0 0 6.2 1.57h.01c7.07 0 12.82-5.7 12.82-12.7 0-3.4-1.33-6.59-3.75-8.99A12.8 12.8 0 0 0 16.01 3.2Zm.01 2.14a10.65 10.65 0 0 1 7.53 3.1 10.44 10.44 0 0 1 3.12 7.45c0 5.82-4.8 10.56-10.7 10.56h-.01a10.8 10.8 0 0 1-5.45-1.48l-.39-.23-4.74 1.22 1.27-4.58-.26-.42a10.45 10.45 0 0 1-1.63-5.6c0-5.52 4.8-10.02 10.7-10.02h.56Z" />
      <path d="M12.72 10.27c-.24-.52-.5-.53-.73-.54h-.62c-.21 0-.56.08-.86.39-.29.31-1.13 1.1-1.13 2.68 0 1.58 1.16 3.1 1.32 3.31.16.21 2.24 3.56 5.53 4.85 2.73 1.08 3.29.86 3.88.8.59-.05 1.91-.77 2.18-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.36-.32-.16-1.91-.94-2.2-1.04-.29-.11-.51-.16-.72.16-.21.31-.83 1.04-1.02 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.49-2.57-1.57-.95-.84-1.59-1.87-1.78-2.18-.19-.31-.02-.48.14-.64.15-.14.32-.37.48-.55.16-.18.21-.31.32-.52.11-.21.05-.39-.03-.55-.08-.16-.71-1.73-.98-2.36Z" />
    </svg>
  );
}