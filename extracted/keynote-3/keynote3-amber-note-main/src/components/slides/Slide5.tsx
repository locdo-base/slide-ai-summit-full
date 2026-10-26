import React from 'react';
import { motion } from 'motion/react';
import { AmberDeviceMockup } from '../AmberDeviceMockup';
import { PhoneCall, Users2, ArrowRight, Mic, Smartphone } from 'lucide-react';

export const Slide5: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-7xl mx-auto px-1 sm:px-3 w-full my-auto">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <span className="text-sm uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-2">
          Linh hoạt & Toàn diện
        </span>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900">
          THIẾT KẾ CHO MỌI CUỘC TRÒ CHUYỆN
        </h2>
      </motion.div>

      {/* Center Stage: Device -> Split Streams */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-14 w-full">
        {/* Device on left / top */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative flex flex-col items-center"
        >
          <AmberDeviceMockup color="silver" size="md" showAudioWave={true} />
          <span className="text-sm text-neutral-400 tracking-widest mt-3 uppercase font-medium">
            Thu âm thông minh tất cả trong một
          </span>
        </motion.div>

        {/* Dynamic Arrow Indicator */}
        <div className="hidden lg:flex items-center text-neutral-300">
          <ArrowRight className="w-12 h-12 stroke-[1.5]" />
        </div>

        {/* 2 Scenarios */}
        <div className="flex flex-col gap-4 w-full max-w-xl">
          {/* Stream 1: Ghi âm Phone */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-6 sm:p-7 rounded-2xl border border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-md transition-all group"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 group-hover:scale-105 transition-transform">
                <PhoneCall className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-semibold text-neutral-900">
                    Cuộc gọi Điện thoại
                  </h3>
                </div>
                <p className="text-base text-neutral-500 mt-2 font-light leading-relaxed">
                  Gắn từ tính hít chặt vào mặt lưng smartphone. Ghi lại trọn vẹn 2 chiều cuộc gọi thoại, Zalo, WhatsApp, Zoom Phone với chất lượng âm thanh trong trẻo.
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs sm:text-sm text-neutral-400">
                  <Smartphone className="w-4 h-4" />
                  <span>Phân tách âm thanh 2 chiều độc lập</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stream 2: Offline Meetings */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="p-6 sm:p-7 rounded-2xl border border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-md transition-all group"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 group-hover:scale-105 transition-transform">
                <Users2 className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-semibold text-neutral-900">
                    Họp Trực tiếp
                  </h3>
                </div>
                <p className="text-base text-neutral-500 mt-2 font-light leading-relaxed">
                  Đặt giữa bàn họp, gặp gỡ đối tác hoặc trao đổi trực tiếp 1-1. Thu âm định hướng 360 độ, tự động nhận diện từng người phát biểu và lọc tạp âm. Tối ưu cho cuộc họp từ 2 đến 4 người.
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs sm:text-sm text-neutral-400">
                  <Mic className="w-4 h-4" />
                  <span>Mảng mic thu âm đa hướng 360°</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
