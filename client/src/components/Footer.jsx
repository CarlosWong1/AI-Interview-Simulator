import { AudioLines } from "lucide-react";
import { useState } from "react";
import AboutModal from "./modal/AboutModal";

export default function Footer() {
  const [showAboutModal, setShowAboutModal] = useState(false);

  const handleAboutModal = () => {
    setShowAboutModal(true);
  }
  
  return (
    <footer className="border-t border-line bg-surface px-4 py-8 sm:px-8 lg:px-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="flex-center size-8 shrink-0 rounded-lg bg-accent">
              <AudioLines size={21} color="#ffffff" strokeWidth={2.25} />
            </span>
            <span className="whitespace-nowrap text-[23px] leading-normal text-ink">
              PrepFlow
            </span>
          </div>
          <div className="flex gap-6">
            <a
              onClick={handleAboutModal}
              className="text-[13px] leading-normal text-muted transition-colors hover:text-ink cursor-pointer"
            >
              About
            </a>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-hover pt-4">
          <p className="text-xs leading-normal text-faint">
            © 2026 PrepFlow. All rights reserved.
          </p>
          <p className="text-xs leading-normal text-faint">
            A little practice today. A little more confidence tomorrow.
          </p>
        </div>
      </div>

      {showAboutModal && (
        <AboutModal
          onClose={() => setShowAboutModal(false)}
        ></AboutModal>
      )}
    </footer>
  );
}
