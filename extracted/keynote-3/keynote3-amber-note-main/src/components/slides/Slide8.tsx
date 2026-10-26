import React from 'react';
import { motion } from 'motion/react';
import { Smartphone, Award, CheckCircle2 } from 'lucide-react';
import { AmberDeviceMockup } from '../AmberDeviceMockup';

export const Slide8: React.FC = () => {
  return (
    <div className="slide8-wrapper flex flex-col items-center justify-center max-w-7xl mx-auto px-1 sm:px-3 w-full my-auto">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-5"
      >
        <span className="text-sm uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-2">
          THIẾT KẾ TINH TẾ
        </span>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900">
          HIỆN DIỆN MÀ KHÔNG GÂY CHÚ Ý
        </h2>
        <p className="text-lg sm:text-2xl text-neutral-500 font-light mt-2 max-w-3xl mx-auto">
          Thiết kế tự nhiên, mỏng nhẹ tối đa để bạn hoàn toàn tập trung vào nội dung cuộc đối thoại
        </p>
      </motion.div>

      {/* 2 Use Cases Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        {/* Use Case 1: Phone Attachment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="p-6 rounded-3xl border border-neutral-200 bg-neutral-50/60 hover:bg-white hover:border-neutral-300 transition-all flex flex-col items-center text-center group shadow-xs"
        >
          {/* Visual Container: Smartphone with Amber mounted */}
          <div className="h-64 w-full flex items-center justify-center relative my-2">
            {/* Realistic Premium Smartphone Back */}
            <div className="w-48 h-60 rounded-[34px] bg-gradient-to-b from-neutral-200 via-neutral-100 to-neutral-200 border-[3px] border-neutral-300/90 shadow-[0_12px_28px_-6px_rgba(0,0,0,0.15)] relative flex items-center justify-center overflow-hidden">
              {/* Glossy Glass Reflection Diagonal Line */}
              <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/40 to-transparent rotate-25 pointer-events-none" />

              {/* Side Buttons (Left Volume / Action, Right Power) */}
              <div className="absolute -left-[3px] top-12 w-[3px] h-6 bg-neutral-400 rounded-r-xs" />
              <div className="absolute -left-[3px] top-20 w-[3px] h-6 bg-neutral-400 rounded-r-xs" />
              <div className="absolute -right-[3px] top-14 w-[3px] h-8 bg-neutral-400 rounded-l-xs" />

              {/* Triple-Lens Camera Module (Top-Left) */}
              <div className="absolute top-2.5 left-2.5 w-14 h-14 rounded-[18px] bg-neutral-200/90 border border-neutral-300 shadow-xs p-1 grid grid-cols-2 grid-rows-2 gap-1 place-items-center backdrop-blur-xs">
                {/* Lens 1 (Top Left) */}
                <div className="w-5 h-5 rounded-full bg-neutral-900 border-[1.5px] border-neutral-400 flex items-center justify-center shadow-2xs">
                  <div className="w-2 h-2 rounded-full bg-blue-950 border border-neutral-700/80" />
                </div>
                {/* Lens 2 (Top Right - Flash & LiDAR) */}
                <div className="w-5 h-5 flex flex-col items-center justify-around py-0.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-100 border border-amber-300/80 shadow-2xs" />
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
                </div>
                {/* Lens 3 (Bottom Left) */}
                <div className="w-5 h-5 rounded-full bg-neutral-900 border-[1.5px] border-neutral-400 flex items-center justify-center shadow-2xs">
                  <div className="w-2 h-2 rounded-full bg-blue-950 border border-neutral-700/80" />
                </div>
                {/* Lens 4 (Bottom Right) */}
                <div className="w-5 h-5 rounded-full bg-neutral-900 border-[1.5px] border-neutral-400 flex items-center justify-center shadow-2xs">
                  <div className="w-2 h-2 rounded-full bg-blue-950 border border-neutral-700/80" />
                </div>
              </div>

              {/* MagSafe Ring Visual Guide */}
              <div className="w-32 h-32 rounded-full border-2 border-dashed border-neutral-400/40 flex items-center justify-center relative mt-4">
                {/* Alignment Pill at bottom */}
                <div className="absolute -bottom-3 w-1.5 h-3 rounded-full bg-neutral-400/50" />

                {/* Amber Device Snapped on Back */}
                <div className="scale-75 shadow-2xl relative z-10">
                  <AmberDeviceMockup color="dark" size="sm" isRecording={true} />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full text-left mt-4 pt-4 border-t border-neutral-200/80">
            <div className="flex items-center gap-2 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-1">
              <Smartphone className="w-4 h-4" />
              <span>Kịch bản 01</span>
            </div>
            <h3 className="text-xl font-semibold text-neutral-900">
              Gắn vào mặt lưng điện thoại
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 font-light mt-1.5 leading-relaxed">
              Hít nam châm MagSafe siêu mỏng vào lưng smartphone. Bấm 1 chạm để ghi âm mọi cuộc gọi thoại hai chiều với chất lượng trong trẻo.
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-neutral-600">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Độ mỏng chỉ 4.9mm, không cấn túi</span>
            </div>
          </div>
        </motion.div>

        {/* Use Case 2: In Lanyard / Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="p-6 rounded-3xl border border-neutral-200 bg-neutral-50/60 hover:bg-white hover:border-neutral-300 transition-all flex flex-col items-center text-center group shadow-xs"
        >
          {/* Visual Container: Lanyard Badge Holder with Amber inside */}
          <div className="h-64 w-full flex items-center justify-center relative my-2">
            {/* Lanyard Strap */}
            <div className="absolute top-0 w-8 h-14 bg-neutral-800 rounded-b-md flex items-end justify-center pb-1">
              <div className="w-3 h-3 rounded-full border-2 border-neutral-400" />
            </div>

            {/* Badge Holder */}
            <div className="mt-10 w-44 h-52 rounded-2xl bg-white/90 border-2 border-neutral-300 shadow-md p-2 flex flex-col items-center justify-between relative overflow-hidden backdrop-blur-xs">
              <div className="w-full flex items-center justify-between px-1 border-b border-neutral-100 pb-1">
                <span className="text-[9px] uppercase font-bold tracking-widest text-neutral-400">
                  THÀNH VIÊN BASE
                </span>
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>

              {/* Amber inside badge */}
              <div className="scale-65 -my-6">
                <AmberDeviceMockup color="hong" size="sm" isRecording={true} />
              </div>

              {/* Clip indicator */}
              <div className="w-full text-center">
                <span className="text-[9px] text-neutral-400 font-mono uppercase">
                  Thoải mái đeo cả ngày
                </span>
              </div>
            </div>
          </div>

          <div className="w-full text-left mt-4 pt-4 border-t border-neutral-200/80">
            <div className="flex items-center gap-2 text-indigo-600 text-xs font-semibold uppercase tracking-wider mb-1">
              <Award className="w-4 h-4" />
              <span>Kịch bản 02</span>
            </div>
            <h3 className="text-xl font-semibold text-neutral-900">
              Amber trong thẻ đeo nhân viên
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 font-light mt-1.5 leading-relaxed">
              Vừa vặn trong bao thẻ nhân viên hoặc kẹp ve áo trong hội nghị, workshop và gặp gỡ đối tác. Tự nhiên như một phần của trang phục.
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-neutral-600">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Trọng lượng 38g, hoàn toàn êm ái khi đeo</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
