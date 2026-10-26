import React from 'react';
import { motion } from 'motion/react';
import { AmberDeviceMockup } from '../AmberDeviceMockup';
import { Sparkles } from 'lucide-react';

interface Slide4Props {
  isLed3x1?: boolean;
}

export const Slide4: React.FC<Slide4Props> = ({ isLed3x1 = false }) => {
  // BỐ CỤC CHUYÊN BIỆT CHO MÀN LED 3x1 (SIÊU RỘNG):
  // Text trên -> Cột Trái | Thiết bị -> Cột Giữa | Text dưới -> Cột Phải
  if (isLed3x1) {
    return (
      <div className="slide4-3x1-wrapper flex flex-row items-center justify-between w-full max-w-[1720px] px-4 sm:px-8 lg:px-12 mx-auto my-auto h-full gap-5 sm:gap-7 lg:gap-10 select-none">
        {/* CỘT 1 (BÊN TRÁI): TEXT TRÊN — TIÊU ĐỀ & ĐỊNH VỊ SẢN PHẨM */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 max-w-[440px] flex flex-col justify-center text-left"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-900 text-white text-xs sm:text-sm font-bold tracking-widest uppercase mb-3.5 w-fit shadow-xs">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>THIẾT BỊ AI</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight text-neutral-900 uppercase leading-[1.06]">
            ĐÂY LÀ <br />
            <span className="text-neutral-900">AMBER NOTE</span>
          </h2>

          <p className="text-lg sm:text-xl lg:text-2xl text-neutral-500 font-light mt-3 sm:mt-4 leading-relaxed">
            Biến hội thoại thành tri thức.
          </p>

          <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-neutral-200/80 flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-700">
                Thế hệ phần cứng thông minh
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-normal">
              Đồng hành trong mọi cuộc họp, đàm phán và đào tạo, kết nối sâu rộng cùng hệ điều hành doanh nghiệp Base.vn.
            </p>
          </div>
        </motion.div>

        {/* CỘT 2 (Ở CHÍNH GIỮA): PHẦN THIẾT BỊ — 2 PHIÊN BẢN HỒNG & XÁM */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="flex-[1.25] flex flex-col items-center justify-center my-auto px-2"
        >
          <div className="relative flex items-center justify-center gap-6 sm:gap-8 lg:gap-10">
            {/* Rose Gold / Hong Device */}
            <motion.div
              initial={{ opacity: 0, x: -20, rotate: -3 }}
              animate={{ opacity: 1, x: 0, rotate: -2 }}
              whileHover={{ rotate: 0, scale: 1.05 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col items-center"
            >
              <AmberDeviceMockup color="hong" size="hero" />
              <div className="mt-3 text-center">
                <span className="inline-block px-3.5 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200 text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-2xs">
                  Amber Note Hồng · 32GB
                </span>
              </div>
            </motion.div>

            {/* Silver / Space Gray / Xam Device */}
            <motion.div
              initial={{ opacity: 0, x: 20, rotate: 3 }}
              animate={{ opacity: 1, x: 0, rotate: 2 }}
              whileHover={{ rotate: 0, scale: 1.05 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <AmberDeviceMockup color="xam" size="hero" />
              <div className="mt-3 text-center">
                <span className="inline-block px-3.5 py-1 rounded-full bg-neutral-100 text-neutral-800 border border-neutral-300 text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-2xs">
                  Amber Note Xám · 32GB
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* CỘT 3 (BÊN PHẢI): TEXT DƯỚI — 4 TÍNH NĂNG NỔI BẬT */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 max-w-[440px] flex flex-col justify-center gap-2 sm:gap-2.5 lg:gap-3"
        >
          {/* 1. Ghi âm rõ nét */}
          <div className="flex items-center gap-3 sm:gap-3.5 p-2.5 sm:p-3 rounded-2xl bg-white/95 backdrop-blur-xs border border-neutral-200/80 shadow-xs hover:border-neutral-300 transition-colors">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 text-amber-900">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 stroke-amber-900 stroke-[2] fill-none" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <line x1="9" y1="9" x2="9" y2="11" />
                <line x1="12" y1="7" x2="12" y2="13" />
                <line x1="15" y1="9" x2="15" y2="11" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-bold text-neutral-900 leading-tight">
                Ghi âm rõ nét
              </span>
              <span className="text-xs text-neutral-500 font-medium mt-0.5">
                Khử ồn kép thông minh, thu âm đa hướng 360°
              </span>
            </div>
          </div>

          {/* 2. AI Thấu hiểu */}
          <div className="flex items-center gap-3 sm:gap-3.5 p-2.5 sm:p-3 rounded-2xl bg-white/95 backdrop-blur-xs border border-neutral-200/80 shadow-xs hover:border-neutral-300 transition-colors">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0 text-purple-700">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.75]" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-bold text-neutral-900 leading-tight">
                AI Thấu hiểu
              </span>
              <span className="text-xs text-neutral-500 font-medium mt-0.5">
                Tóm tắt ngữ cảnh, phân tích nội dung chuyên sâu
              </span>
            </div>
          </div>

          {/* 3. Tạo hành động */}
          <div className="flex items-center gap-3 sm:gap-3.5 p-2.5 sm:p-3 rounded-2xl bg-white/95 backdrop-blur-xs border border-neutral-200/80 shadow-xs hover:border-neutral-300 transition-colors">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-800">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 stroke-emerald-700 stroke-[2] fill-none" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="7" rx="1.5" />
                <line x1="7" y1="6.5" x2="17" y2="6.5" />
                <rect x="3" y="14" width="18" height="7" rx="1.5" />
                <line x1="7" y1="17.5" x2="17" y2="17.5" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-bold text-neutral-900 leading-tight">
                Tạo hành động
              </span>
              <span className="text-xs text-neutral-500 font-medium mt-0.5">
                Chuyển đổi quyết định cuộc họp thành việc cần làm
              </span>
            </div>
          </div>

          {/* 4. Tự động giao việc qua Base.vn */}
          <div className="flex items-center gap-3 sm:gap-3.5 p-2.5 sm:p-3 rounded-2xl bg-white/95 backdrop-blur-xs border border-neutral-200/80 shadow-xs hover:border-neutral-300 transition-colors">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow-2xs" viewBox="0 0 48 48" fill="none">
                <path d="M24 3L42 13.5V34.5L24 45L6 34.5V13.5L24 3Z" fill="#1D70B8" />
                <rect x="15" y="18.5" width="3.5" height="11" rx="1.75" fill="white" />
                <rect x="22.25" y="14" width="3.5" height="20" rx="1.75" fill="white" />
                <rect x="29.5" y="18.5" width="3.5" height="11" rx="1.75" fill="white" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-bold text-neutral-900 leading-tight">
                Tự động giao việc qua Base.vn
              </span>
              <span className="text-xs text-neutral-500 font-medium mt-0.5">
                Đồng bộ sang Base Wework & CRM tức thì
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // BỐ CỤC MẶC ĐỊNH (CHUẨN 16:9 & CÁC TỶ LỆ KHÁC):
  // Giữ nguyên bố cục dọc Top -> Middle (Thiết bị) -> Bottom (Tính năng)
  return (
    <div className="slide4-wrapper flex flex-col items-center justify-center max-w-7xl mx-auto px-1 sm:px-3 w-full my-auto">
      {/* Top Tag & Title */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-5"
      >
        <h2 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-neutral-900">
          ĐÂY LÀ AMBER NOTE
        </h2>
        <p className="text-xl sm:text-3xl text-neutral-500 font-light mt-2">
          Biến hội thoại thành tri thức.
        </p>
      </motion.div>

      {/* Main Showcase Stage */}
      <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 sm:gap-14 my-3">
        {/* Rose Gold / Hong Device */}
        <motion.div
          initial={{ opacity: 0, x: -30, rotate: -3 }}
          animate={{ opacity: 1, x: 0, rotate: -2 }}
          whileHover={{ rotate: 0, scale: 1.05 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-col items-center"
        >
          <AmberDeviceMockup color="hong" size="hero" />
          <div className="mt-4 text-center">
            <span className="inline-block px-3.5 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200 text-xs sm:text-sm font-semibold tracking-wider uppercase">
              Amber Note Hồng · 32GB
            </span>
          </div>
        </motion.div>

        {/* Silver / Space Gray / Xam Device */}
        <motion.div
          initial={{ opacity: 0, x: 30, rotate: 3 }}
          animate={{ opacity: 1, x: 0, rotate: 2 }}
          whileHover={{ rotate: 0, scale: 1.05 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <AmberDeviceMockup color="xam" size="hero" />
          <div className="mt-4 text-center">
            <span className="inline-block px-3.5 py-1 rounded-full bg-neutral-100 text-neutral-800 border border-neutral-300 text-xs sm:text-sm font-semibold tracking-wider uppercase">
              Amber Note Xám · 32GB
            </span>
          </div>
        </motion.div>
      </div>

      {/* Feature Highlights Row (Exact to Image) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 lg:gap-16 mt-8 max-w-4xl w-full px-4 text-center"
      >
        {/* 1. Ghi âm rõ nét */}
        <div className="flex flex-col items-center justify-start gap-3">
          <div className="w-12 h-12 flex items-center justify-center text-neutral-800">
            <svg className="w-9 h-9 stroke-neutral-800 stroke-[2] fill-none" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <line x1="9" y1="9" x2="9" y2="11" />
              <line x1="12" y1="7" x2="12" y2="13" />
              <line x1="15" y1="9" x2="15" y2="11" />
            </svg>
          </div>
          <span className="text-base sm:text-lg font-bold text-neutral-900 leading-tight">
            Ghi âm rõ nét
          </span>
        </div>

        {/* 2. AI Thấu hiểu */}
        <div className="flex flex-col items-center justify-start gap-3">
          <div className="w-12 h-12 flex items-center justify-center text-neutral-800">
            <Sparkles className="w-9 h-9 stroke-[1.75]" />
          </div>
          <span className="text-base sm:text-lg font-bold text-neutral-900 leading-tight">
            AI Thấu hiểu
          </span>
        </div>

        {/* 3. Tạo hành động */}
        <div className="flex flex-col items-center justify-start gap-3">
          <div className="w-12 h-12 flex items-center justify-center text-neutral-800">
            <svg className="w-9 h-9 stroke-neutral-800 stroke-[2] fill-none" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="7" rx="1.5" />
              <line x1="7" y1="6.5" x2="17" y2="6.5" />
              <rect x="3" y="14" width="18" height="7" rx="1.5" />
              <line x1="7" y1="17.5" x2="17" y2="17.5" />
            </svg>
          </div>
          <span className="text-base sm:text-lg font-bold text-neutral-900 leading-tight">
            Tạo hành động
          </span>
        </div>

        {/* 4. Tự động giao việc qua Base.vn */}
        <div className="flex flex-col items-center justify-start gap-3">
          <div className="w-12 h-12 flex items-center justify-center">
            <svg className="w-10 h-10 drop-shadow-xs" viewBox="0 0 48 48" fill="none">
              <path d="M24 3L42 13.5V34.5L24 45L6 34.5V13.5L24 3Z" fill="#1D70B8" />
              <rect x="15" y="18.5" width="3.5" height="11" rx="1.75" fill="white" />
              <rect x="22.25" y="14" width="3.5" height="20" rx="1.75" fill="white" />
              <rect x="29.5" y="18.5" width="3.5" height="11" rx="1.75" fill="white" />
            </svg>
          </div>
          <span className="text-base sm:text-lg font-bold text-neutral-900 leading-tight">
            Tự động giao việc <br className="hidden sm:inline" /> qua Base.vn
          </span>
        </div>
      </motion.div>
    </div>
  );
};
