import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, Search, Globe, Users, Database, FileText } from 'lucide-react';

export default function ScanningLoader() {
  const [currentStep, setCurrentStep] = useState(0);

  // Professional, user-friendly steps in English
  const steps = [
    { label: "Initializing search engine...", icon: <Search className="w-5 h-5" /> },
    { label: "Querying Google public index...", icon: <Globe className="w-5 h-5" /> },
    { label: "Analyzing social media footprints...", icon: <Users className="w-5 h-5" /> },
    { label: "Checking for data breaches...", icon: <Database className="w-5 h-5" /> },
    { label: "Retrieving public records...", icon: <FileText className="w-5 h-5" /> },
    { label: "Finalizing report...", icon: <Loader2 className="w-5 h-5 animate-spin" /> },
  ];

  useEffect(() => {
    // Updates the step every 4 seconds to match the ~25s total scan time
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    // Background overlay with blur
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      
      {/* Main Card */}
      <div className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-gray-800/50 p-6 text-center border-b border-gray-700">
          <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-full mb-4">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
          <h2 className="text-xl font-semibold text-white">Scanning in progress</h2>
          <p className="text-sm text-gray-400 mt-1">Please wait while we gather the information.</p>
        </div>

        {/* Steps List */}
        <div className="p-6 space-y-5">
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <div 
                key={index} 
                className={`flex items-center gap-4 transition-all duration-300 ${
                  isActive || isCompleted ? 'opacity-100' : 'opacity-40'
                }`}
              >
                {/* Status Icon */}
                <div className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full border ${
                  isCompleted 
                    ? 'bg-green-500/10 border-green-500/50 text-green-500' 
                    : isActive 
                      ? 'bg-blue-500/10 border-blue-500/50 text-blue-500' 
                      : 'border-gray-700 text-gray-600'
                }`}>
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : isActive ? (
                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse" />
                  ) : (
                    <div className="w-2 h-2 bg-gray-600 rounded-full" />
                  )}
                </div>

                {/* Text */}
                <span className={`text-sm font-medium ${
                  isActive ? 'text-white' : 'text-gray-400'
                }`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Footer Notice */}
        <div className="p-4 bg-gray-800/30 text-center border-t border-gray-700">
          <p className="text-xs text-gray-500">
            This process may take up to 30 seconds. Do not close this window.
          </p>
        </div>
      </div>
    </div>
  );
}