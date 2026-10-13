import { AudioLines } from "lucide-react";
import { useState } from "react";
import AboutModal from "./modal/AboutModal";

export default function Footer() {
  const [showAboutModal, setShowAboutModal] = useState(false);

  const handleAboutModal = () => {
    setShowAboutModal(true);
  }
  
  return (
    <footer className="border-t border-[#e4e5df] bg-white px-4 py-8 sm:px-8 lg:px-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="flex-center size-8 shrink-0 rounded-lg bg-[#f4ce38]">
              <AudioLines size={21} color="#ffffff" strokeWidth={2.25} />
            </span>
            <span className="whitespace-nowrap text-[23px] leading-normal text-[#20221f]">
              PrepFlow
            </span>
          </div>
          <div className="flex gap-6">
            <a
              onClick={handleAboutModal}
              className="text-[13px] leading-normal text-[#686b64] transition-colors hover:text-[#20221f] cursor-pointer"
            >
              About
            </a>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#f3f4ef] pt-4">
          <p className="text-xs leading-normal text-[#92958c]">
            © 2026 PrepFlow. All rights reserved.
          </p>
          <p className="text-xs leading-normal text-[#92958c]">
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
