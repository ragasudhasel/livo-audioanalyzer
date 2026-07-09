"use client";
import { useState, useEffect } from "react";

const steps = [
  "Uploading",
  "Transcribing",
  "Extracting Metrics",
  "Calculating Score",
  "Generating AI Feedback"
];

export default function ProgressTracker() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1500); // Advance every 1.5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-8 animate-in fade-in duration-500">
      <div className="relative flex items-center justify-center w-24 h-24">
        <div className="absolute w-full h-full border-4 border-slate-800 rounded-full"></div>
        <div className="absolute w-full h-full border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
        <svg className="w-8 h-8 text-blue-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
      </div>
      <div className="text-center space-y-4">
        <h3 className="text-xl font-semibold text-white">Analyzing Audio...</h3>
        <div className="flex flex-col items-start text-sm space-y-2">
          {steps.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            const isPending = idx > currentStepIndex;

            return (
              <div 
                key={step} 
                className={`flex items-center gap-2 transition-all duration-300 ${
                  isCompleted ? "text-emerald-400" : isCurrent ? "text-blue-400 font-medium scale-105" : "text-slate-600"
                }`}
              >
                {isCompleted ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                ) : isCurrent ? (
                  <span className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin inline-block"></span>
                ) : (
                  <span className="w-4 h-4 inline-block"></span>
                )}
                {step}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
