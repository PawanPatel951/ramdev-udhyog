import React from "react";
import { MessageCircle } from "lucide-react";
import { site } from "../data/site";

export default function FloatingWhatsApp() {
  return (
    <a
      href={`https://wa.me/${site.phoneRaw}?text=${encodeURIComponent(
        "Hello, I want to enquire about your products."
      )}`}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-5 right-5 z-[900] grid h-14 w-14 place-items-center rounded-full bg-[#18a957] text-white shadow-[0_12px_30px_rgba(0,0,0,0.22)] transition duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-[#128c4a] sm:bottom-6 sm:right-6"
    >
      <MessageCircle size={25} />
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-emerald-400/30" />
    </a>
  );
}
