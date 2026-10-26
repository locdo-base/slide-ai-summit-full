import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Mic, CheckSquare, Layers } from 'lucide-react';
import { AmberDeviceMockup } from '../AmberDeviceMockup';

export const Slide12: React.FC = () => {
  return (
    <div className="slide12-wrapper flex flex-col items-center justify-center max-w-7xl mx-auto px-2 sm:px-4 w-full text-center my-auto py-3 sm:py-5 lg:py-7">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <span className="text-sm uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">
          Cộng hưởng & Tích hợp
        </span>
        <h2 className="text-4xl sm:text-6xl lg:text-8xl font-bold tracking-tight text-neutral-900 flex items-center justify-center gap-4 sm:gap-8">
          <span>HỘI THOẠI</span>
          <ArrowRight className="w-10 h-10 sm:w-16 sm:h-16 text-indigo-600 stroke-[2.5]" />
          <span>CÔNG VIỆC</span>
        </h2>
      </motion.div>

      {/* Two Pillars Bridge */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl items-center">
        {/* Left: Amber captures the conversation (Phase 1) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="p-8 sm:p-10 rounded-3xl border border-neutral-200 bg-neutral-50/60 hover:bg-white hover:border-neutral-300 transition-all text-left flex flex-col justify-between shadow-xs"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <Mic className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs sm:text-sm uppercase tracking-widest text-indigo-600 font-semibold block">
                GIAI ĐOẠN 01
              </span>
              <h3 className="text-2xl font-bold text-neutral-900">
                Amber ghi nhận
              </h3>
            </div>
          </div>

          <h4 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-neutral-900 leading-snug mb-3">
            Amber ghi lại trọn vẹn cuộc trò chuyện
          </h4>

          <p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed">
            Ghi nhận lời nói, người nói và những thông tin quan trọng trong cuộc trao đổi mà không làm gián đoạn cuộc trò chuyện.
          </p>

          <div className="mt-6 pt-4 border-t border-neutral-200 flex items-center gap-2 text-sm text-neutral-400">
            <span>Thu âm Phần cứng · Tách giọng nói AI</span>
          </div>
        </motion.div>

        {/* Right: Base carries the work forward (Phase 2 - reveals next) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="p-8 sm:p-10 rounded-3xl border border-indigo-200 bg-indigo-50/30 hover:bg-indigo-50/50 hover:border-indigo-300 transition-all text-left flex flex-col justify-between shadow-xs"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <CheckSquare className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs sm:text-sm uppercase tracking-widest text-blue-600 font-semibold block">
                GIAI ĐOẠN 02
              </span>
              <h3 className="text-2xl font-bold text-neutral-900">
                Base thực thi
              </h3>
            </div>
          </div>

          <h4 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-neutral-900 leading-snug mb-3">
            Base chuyển cuộc trò chuyện thành công việc
          </h4>

          <p className="text-base sm:text-lg text-neutral-700 font-light leading-relaxed">
            Chuyển những gì đã được ghi nhận thành đầu việc, quy trình và dữ liệu nghiệp vụ, đồng thời phân công và tiếp tục theo dõi trên hệ thống Base.
          </p>

          <div className="mt-6 pt-4 border-t border-indigo-100 flex items-center gap-2 text-sm text-indigo-600 font-medium">
            <span>Base Task - Base Workflow - Base CRM</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
