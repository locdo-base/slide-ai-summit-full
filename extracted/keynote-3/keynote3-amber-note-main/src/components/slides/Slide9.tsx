import React from 'react';
import { motion } from 'motion/react';
import { Play, Sparkles } from 'lucide-react';

interface Slide9Props {
  onNextSlide?: () => void;
}

export const Slide9: React.FC<Slide9Props> = ({ onNextSlide }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center px-1 sm:px-3 max-w-7xl mx-auto w-full my-auto select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-8"
      >
        <h2 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-neutral-900 leading-tight">
          TỪ HỘI THOẠI ĐẾN HÀNH ĐỘNG
        </h2>

        <p className="text-xl sm:text-3xl text-neutral-500 font-light max-w-3xl mx-auto">
          Cùng trải nghiệm quá trình chuyển hóa hội thoại trực tiếp thành tri thức và hành động doanh nghiệp.
        </p>

        <div className="pt-6 relative flex items-center justify-center">
          {/* Pulsing Sonar Radiance Rings */}
          <div className="absolute w-64 h-20 rounded-full bg-amber-500/20 blur-xl animate-pulse pointer-events-none" />
          <motion.div
            animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
            className="absolute inset-x-auto w-72 h-18 rounded-full border-2 border-amber-500/40 pointer-events-none"
          />

          {/* Interactive Button */}
          <motion.button
            onClick={onNextSlide}
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="group relative inline-flex items-center gap-3 px-9 py-4.5 rounded-full bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-950 text-white font-bold text-base sm:text-xl shadow-[0_12px_32px_-6px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_40px_-4px_rgba(245,158,11,0.35)] border border-neutral-700/60 overflow-hidden cursor-pointer transition-shadow"
          >
            {/* Shimmer / Light Sweep Overlay */}
            <motion.div
              animate={{ x: ['-120%', '220%'] }}
              transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut', repeatDelay: 1 }}
              className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
            />

            {/* Glowing Icon Circle */}
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-amber-500 text-neutral-950 shadow-md group-hover:scale-110 group-hover:bg-amber-400 transition-all">
              <Play className="w-4 h-4 fill-neutral-950 ml-0.5" />
            </div>

            <span className="tracking-wide font-extrabold relative z-10">Trình diễn thực tế</span>

            <Sparkles className="w-4 h-4 text-amber-400 opacity-80 group-hover:rotate-12 group-hover:opacity-100 transition-all" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
