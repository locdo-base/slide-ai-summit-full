import React from 'react';
import { motion } from 'motion/react';
import { AmberDeviceMockup } from '../AmberDeviceMockup';
import { BatteryCharging, Zap, Clock, ShieldCheck } from 'lucide-react';

export const Slide7: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-7xl mx-auto px-1 sm:px-3 w-full my-auto">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-5"
      >
        <span className="text-sm uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-2">
          Năng lượng & Thời lượng Pin
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900">
          SẴN SÀNG CHO CẢ NGÀY LÀM VIỆC
        </h2>
      </motion.div>

      {/* Main Grid: Device on left, Hero Stats on right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
        {/* Device Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="md:col-span-5 flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl bg-neutral-50/60 border border-neutral-200"
        >
          <AmberDeviceMockup color="silver" size="hero" />
          <div className="mt-4 flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            Pin 100% · Đã sẵn sàng
          </div>
        </motion.div>

        {/* Hero Battery Stats */}
        <div className="md:col-span-7 flex flex-col gap-5">
          {/* Stat 1: 30 hours */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-6 sm:p-7 rounded-2xl border border-neutral-200 bg-white hover:border-neutral-300 transition-all shadow-xs"
          >
            <div className="flex items-center gap-3 text-neutral-500 text-xs sm:text-sm uppercase tracking-wider font-semibold mb-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>Thời lượng hoạt động liên tục</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-neutral-900">
                30
              </span>
              <span className="text-2xl sm:text-4xl font-medium text-neutral-600">
                giờ ghi âm liên tục
              </span>
            </div>
            <p className="text-base sm:text-lg text-neutral-500 font-light mt-2">
              Đủ năng lượng cho cả tuần làm việc với hàng chục cuộc họp mà không cần bận tâm về việc sạc lại giữa chừng.
            </p>
          </motion.div>

          {/* Stat 2: 15 mins to full charge */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="p-6 sm:p-7 rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50/40 to-white hover:border-amber-300 transition-all shadow-xs"
          >
            <div className="flex items-center gap-3 text-amber-700 text-xs sm:text-sm uppercase tracking-wider font-semibold mb-2">
              <Zap className="w-4 h-4 text-amber-600" />
              <span>Công nghệ sạc siêu tốc SuperCharge</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-amber-900">
                15
              </span>
              <span className="text-2xl sm:text-4xl font-medium text-amber-800">
                phút sạc đầy pin
              </span>
            </div>
            <p className="text-base sm:text-lg text-neutral-600 font-light mt-2">
              Chỉ cần cắm sạc nhanh trong giờ nghỉ giải lao 15 phút, Amber đã sẵn sàng cho 30 giờ ghi âm tiếp theo.
            </p>
          </motion.div>

          {/* Supporting badges */}
          <div className="flex items-center gap-5 text-sm text-neutral-600 px-1">
            <div className="flex items-center gap-2">
              <BatteryCharging className="w-4 h-4 text-neutral-500" />
              <span>Chân sạc từ tính Pogo Pin</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Bảo vệ cell pin chuẩn an toàn</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
