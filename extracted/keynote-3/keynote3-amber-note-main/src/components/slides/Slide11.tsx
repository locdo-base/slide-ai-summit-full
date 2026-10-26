import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, StopCircle, CheckCircle2, TrendingUp, Zap } from 'lucide-react';

export const Slide11: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-7xl mx-auto px-1 sm:px-3 w-full my-auto">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <span className="text-sm uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-2">
          Khoảng cách Khác biệt
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-neutral-900">
          HẦU HẾT THIẾT BỊ GHI ÂM AI DỪNG LẠI Ở ĐÂY
        </h2>
      </motion.div>

      {/* The Traditional Pipeline that stops (Black Theme) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full max-w-6xl p-6 sm:p-8 rounded-3xl border border-neutral-800 bg-neutral-900 shadow-2xl mb-8 relative text-white"
      >
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xl sm:text-3xl font-medium text-neutral-200">
          <div className="px-5 py-2.5 rounded-2xl bg-neutral-800/90 border border-neutral-700/80 shadow-xs text-neutral-100">
            Hội thoại
          </div>
          <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 text-neutral-500" />
          <div className="px-5 py-2.5 rounded-2xl bg-neutral-800/90 border border-neutral-700/80 shadow-xs text-neutral-100">
            Bản gỡ băng
          </div>
          <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 text-neutral-500" />
          <div className="px-5 py-2.5 rounded-2xl bg-neutral-800/90 border border-rose-900/60 shadow-xs text-rose-400 font-bold">
            Bản tóm tắt.
          </div>
        </div>

        {/* The Barrier Sign */}
        <div className="mt-6 pt-5 border-t border-neutral-800 flex items-center justify-center gap-2 text-rose-400 text-sm sm:text-base font-semibold tracking-wide">
          <StopCircle className="w-5 h-5 text-rose-400 shrink-0" />
          <span>Hầu hết máy ghi âm AI dừng lại ở đây — File lưu trữ tĩnh, không tạo ra hành động.</span>
        </div>
      </motion.div>

      {/* The Punchline: AMBER DOESN'T (White Theme) */}
      <motion.div
        initial={{ opacity: 0, y: 35, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-7xl p-8 sm:p-12 lg:py-12 lg:px-16 rounded-3xl bg-white text-neutral-900 border border-neutral-200 shadow-xl relative overflow-hidden text-center"
      >
        <span className="text-sm uppercase tracking-[0.3em] text-neutral-500 block mb-2 font-semibold">
          Điểm khác biệt Quyết định
        </span>
        <h3 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-neutral-900 mb-4">
          AMBER THÌ KHÔNG
        </h3>
        <p className="text-base sm:text-xl text-neutral-600 font-light max-w-4xl mx-auto leading-relaxed">
          Amber không chỉ tóm tắt thụ động mà biến từng chi tiết đàm phán thành công việc cụ thể, kết nối với dữ liệu khách hàng, dự án và người phụ trách trong toàn bộ tổ chức.
        </p>

        {/* 3 Prominent Highlight Cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto text-left">
          {/* Highlight 1 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/80 border-2 border-blue-200/90 shadow-sm flex items-center gap-4 hover:border-blue-400 transition-all">
            <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-neutral-900 leading-tight">
                Gán việc tự động
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 font-normal mt-0.5">
                Chuyển giao việc cho đúng người
              </p>
            </div>
          </div>

          {/* Highlight 2 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/80 border-2 border-indigo-200/90 shadow-sm flex items-center gap-4 hover:border-indigo-400 transition-all">
            <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-neutral-900 leading-tight">
                Cập nhật tiến độ CRM
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 font-normal mt-0.5">
                Đồng bộ dữ liệu khách hàng
              </p>
            </div>
          </div>

          {/* Highlight 3 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/80 border-2 border-emerald-200/90 shadow-sm flex items-center gap-4 hover:border-emerald-400 transition-all">
            <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-neutral-900 leading-tight">
                Kích hoạt quy trình Base
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 font-normal mt-0.5">
                Liên thông toàn hệ sinh thái
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
