import React from 'react';
import { motion } from 'motion/react';

export const Slide1: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center px-1 sm:px-3 max-w-7xl mx-auto w-full my-auto">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-6 w-full"
      >
        <div className="slide1-badge inline-flex items-center gap-2.5 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-neutral-100 text-neutral-800 text-base sm:text-lg font-medium tracking-wide">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
          Bước chuyển dịch căn bản
        </div>

        <h1 className="slide1-title text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-semibold tracking-tight text-neutral-900 leading-[1.08] max-w-7xl mx-auto">
          Mọi công việc đều bắt đầu
          <br />
          từ những cuộc hội thoại
        </h1>

        {/* Minimalist ambient soundwave hint */}
        <div className="pt-8 sm:pt-10 flex items-center justify-center gap-2 opacity-50">
          {[20, 36, 18, 48, 64, 32, 54, 72, 40, 24, 50, 30, 16].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 14 }}
              animate={{ height: [14, h * 1.2, 16] }}
              transition={{
                repeat: Infinity,
                duration: 1.8,
                delay: i * 0.1,
                ease: 'easeInOut',
              }}
              className="w-1.5 bg-neutral-800 rounded-full"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};
