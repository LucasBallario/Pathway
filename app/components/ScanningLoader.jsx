import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, CheckCircle2, Search, Globe, Users, Database, FileText } from 'lucide-react';
import { softSpring, smoothEase } from '@/lib/motion-presets';

export default function ScanningLoader() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { label: "Initializing search engine...", icon: <Search className="w-5 h-5" /> },
    { label: "Querying Google public index...", icon: <Globe className="w-5 h-5" /> },
    { label: "Analyzing social media footprints...", icon: <Users className="w-5 h-5" /> },
    { label: "Checking for data breaches...", icon: <Database className="w-5 h-5" /> },
    { label: "Retrieving public records...", icon: <FileText className="w-5 h-5" /> },
    { label: "Finalizing report...", icon: <Loader2 className="w-5 h-5 animate-spin" /> },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#101010]/85 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: smoothEase }}
    >

      <motion.div
        className="w-full max-w-md overflow-hidden rounded-lg border border-dark-carbon bg-deep-space"
        initial={{ opacity: 0, scale: 0.92, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={softSpring}
      >

        <div className="border-b border-dark-carbon p-6 text-center">
          <motion.div
            className="mb-4 inline-flex items-center justify-center rounded-full border border-dark-carbon bg-midnight-void p-3"
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Loader2 className="h-8 w-8 animate-spin text-amber-glow" />
          </motion.div>
          <h2 className="text-xl font-bold leading-tight text-polar-white">Scanning in progress</h2>
          <p className="mt-1 text-sm font-normal text-ash-gray">Please wait while we gather the information.</p>
        </div>

        <div className="space-y-5 p-6">
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <motion.div
                key={index}
                layout
                className={`flex items-center gap-4 ${
                  isActive || isCompleted ? 'opacity-100' : 'opacity-40'
                }`}
                animate={{
                  x: isActive ? 6 : 0,
                  opacity: isActive || isCompleted ? 1 : 0.4,
                }}
                transition={{ duration: 0.38, ease: smoothEase }}
              >
                <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border ${
                  isCompleted
                    ? 'border-amber-glow bg-amber-glow/15 text-amber-glow'
                    : isActive
                      ? 'border-amber-glow bg-amber-glow/10 text-amber-glow'
                      : 'border-dark-carbon text-ash-gray'
                }`}>
                  <AnimatePresence mode="wait">
                    {isCompleted ? (
                      <motion.span
                        key="done"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.6, opacity: 0 }}
                        transition={softSpring}
                        className="flex"
                      >
                        <CheckCircle2 className="h-5 w-5" />
                      </motion.span>
                    ) : isActive ? (
                      <motion.span
                        key="active"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: [0.55, 1, 0.55] }}
                        exit={{ opacity: 0 }}
                        transition={{
                          opacity: { duration: 1.2, repeat: Infinity, ease: "easeInOut" },
                          scale: softSpring,
                        }}
                        className="h-2.5 w-2.5 rounded-full bg-amber-glow"
                      />
                    ) : (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-2 w-2 rounded-full bg-ash-gray"
                      />
                    )}
                  </AnimatePresence>
                </div>

                <span className={`text-sm font-normal ${
                  isActive ? 'text-polar-white' : 'text-ash-gray'
                }`}>
                  {step.label}
                </span>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="border-t border-dark-carbon bg-midnight-void/50 p-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <p className="text-[13px] font-normal leading-[1.43] text-ash-gray">
            This process may take up to 30 seconds. Do not close this window.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
