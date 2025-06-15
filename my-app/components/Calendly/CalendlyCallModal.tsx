"use client";

import { useEffect } from "react";

const CalendlyCallModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[9999999] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative w-full max-w-4xl h-[700px] mx-4 bg-white rounded-xl shadow-2xl overflow-hidden">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 text-black font-bold border border-black border-2 z-[99999999]"
            >
              ×
            </button>
            <div
              className="calendly-inline-widget w-full h-full"
              data-url="https://calendly.com/simonmrt"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CalendlyCallModal;