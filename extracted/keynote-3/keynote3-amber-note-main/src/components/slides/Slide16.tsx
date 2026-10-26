import React from 'react';
import { motion } from 'motion/react';

export const Slide16: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center my-auto py-8">
      {/* Category Eyebrow & Title */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 sm:mb-12"
      >
        <span className="text-sm uppercase tracking-[0.3em] text-neutral-400 font-semibold block mb-3 whitespace-nowrap">
          HIỆN THỰC MỚI
        </span>
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-neutral-900 whitespace-nowrap leading-tight">
          GIỜ ĐÂY, ĐIỀU ĐÓ ĐÃ CÓ THỂ
        </h2>
      </motion.div>

      {/* The Statements on Single Line */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="w-full max-w-6xl mx-auto space-y-4 sm:space-y-6"
      >
        <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold tracking-tight text-neutral-800 whitespace-nowrap">
          DOANH NGHIỆP CỦA BẠN THẬT SỰ GHI NHỚ MỌI THỨ.
        </p>
        <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold tracking-tight text-neutral-400 line-through decoration-rose-500 decoration-2 sm:decoration-4 whitespace-nowrap">
          NGOẠI TRỪ NHỮNG GÌ CON NGƯỜI NÓI.
        </p>
      </motion.div>
    </div>
  );
};
