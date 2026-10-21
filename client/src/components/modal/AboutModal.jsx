import { X } from "lucide-react";

export default function AboutModal({onClose}) {
  return (
    <div
      className="fixed inset-0 z-50 flex-center bg-black/50 p-5"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-surface shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.1)] rounded-lg p-5 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <X className="ml-auto cursor-pointer" onClick={onClose}></X>
        <h1>This is just a website build for leaning, I am even still learning on how to code. I made the website from scratch at first, then once I made the MVP, I learned about MCP so I tried it. This is the result of using figma MCP for this website. It is very cool of how AI can do this. I am still learning to code better, please give me feedbacks and something that i can take into consideration on how to improve as a developer. Thank you.</h1>
        <p>Sincerly, VerSynC</p>
      </div>
    </div>
  );
}