import React from "react";

export default function SectionHeading({
  eyebrow,
  title,
  text,
  center = true,
}) {
  return (
    <div
      className={`mb-10 max-w-3xl ${center ? "mx-auto text-center" : ""}`}
      data-aos="fade-up"
    >
      <span className="text-[11px] font-black uppercase tracking-[0.2em] text-orange-500">
        {eyebrow}
      </span>
      <h2 className="mt-2 text-3xl font-black leading-tight tracking-tight text-[#102a2d] sm:text-4xl">
        {title}
      </h2>
      {text && (
        <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
          {text}
        </p>
      )}
    </div>
  );
}
