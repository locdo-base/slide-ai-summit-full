import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { AMBER_IMAGES } from '../AmberDeviceMockup';

export const Slide13: React.FC = () => {
  const contextItems = [
    { label: 'Những gì đã trao đổi', desc: 'Ý kiến, phản biện, thảo luận' },
    { label: 'Những gì đã quyết định', desc: 'Kết luận chốt từ lãnh đạo' },
    { label: 'Ai chịu trách nhiệm', desc: 'Phân quyền & cam kết cá nhân' },
    { label: 'Vì sao cần thực hiện', desc: 'Lý do cốt lõi & bối cảnh kinh doanh' },
  ];

  const workApps = [
    {
      name: 'Task',
      desc: 'Task, deadline, trạng thái',
      imgSrc: 'https://basev3-static-public.base.vn/fav/task?color=3B82F6%2C6366F1%2C8B5CF6&angle=315',
      color: 'border-blue-200/80 hover:border-blue-400 bg-white',
    },
    {
      name: 'Workflow',
      desc: 'Các bước duyệt chuẩn hóa',
      imgSrc: 'https://basev3-static-public.base.vn/fav/workflow?color=1ABC9C%2C3498DB%2C2980B9&angle=225',
      color: 'border-teal-200/80 hover:border-teal-400 bg-white',
    },
    {
      name: 'HRIS',
      desc: 'Sơ đồ tổ chức & chức danh',
      imgSrc: 'https://basev3-static-public.base.vn/fav/hris?color=3B82F6%2C6366F1%2C6366F1%2C8B5CF6&angle=120&isolated=1',
      color: 'border-indigo-200/80 hover:border-indigo-400 bg-white',
    },
    {
      name: 'Sales',
      desc: 'Khách hàng, cơ hội & dữ liệu',
      imgSrc: 'https://basev3-static-public.base.vn/fav/sales?color=22C55E%2C0D9488%2C22D3EE%2C2563EB&angle=90&isolated=1',
      color: 'border-emerald-200/80 hover:border-emerald-400 bg-white',
    },
    {
      name: '100+ Ứng dụng',
      desc: 'Hệ sinh thái quản trị Base.vn',
      isSpecial: true,
      color: 'border-amber-300/90 bg-gradient-to-r from-amber-50/50 via-white to-orange-50/40 hover:border-amber-400',
    },
  ];

  return (
    <div className="flex flex-col justify-center max-w-7xl mx-auto px-1 sm:px-4 w-full my-auto">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-5"
      >
        <span className="text-sm uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-1">
          Tiến trình Tiến hóa Phần mềm Doanh nghiệp
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900">
          TỪ HỆ THỐNG NGỮ CẢNH ĐẾN HỆ THỐNG CÔNG VIỆC
        </h2>
        <p className="text-sm sm:text-lg uppercase tracking-widest text-neutral-500 mt-2 font-medium">
          VẪN CON NGƯỜI ẤY, VẪN CÔNG VIỆC ẤY, NHƯNG THẤU HIỂU SÂU SẮC HƠN.
        </p>
      </motion.div>

      {/* Main Flow: AMBER -> HỆ THỐNG NGỮ CẢNH -> 5 DÒNG CHẠY DẪN ĐẾN TỪNG APP */}
      <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-0 mb-5 w-full">
        {/* 1. AMBER Device Node (Step 1) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center shrink-0 p-2 sm:p-3 lg:pr-3"
        >
          <div className="relative group flex items-center justify-center">
            <div className="absolute inset-0 bg-slate-300/30 rounded-full blur-xl scale-90 pointer-events-none" />
            <img
              src={AMBER_IMAGES.xam}
              alt="Thiết bị Base Amber Note"
              referrerPolicy="no-referrer"
              className="h-28 sm:h-36 md:h-40 w-auto object-contain filter drop-shadow-xl transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <span className="text-base sm:text-lg font-black tracking-widest text-neutral-900 mt-2 uppercase">
            AMBER
          </span>
        </motion.div>

        {/* Arrow 1: Amber -> Context System */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.4, delay: 0.75 }}
          className="hidden lg:flex items-center justify-center shrink-0 text-neutral-900 px-2 origin-left"
        >
          <ArrowRight className="w-7 h-7 stroke-[2.5] text-indigo-600" />
        </motion.div>

        {/* 2. Middle Card: HỆ THỐNG NGỮ CẢNH (Step 2) */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 w-full max-w-md lg:max-w-none p-5 sm:p-6 rounded-3xl border border-indigo-200/90 bg-gradient-to-b from-indigo-50/40 via-white to-white shadow-sm flex flex-col justify-between"
        >
          <div>
            <h3 className="text-base sm:text-lg font-bold tracking-tight text-neutral-900 uppercase mb-3 sm:mb-4">
              HỆ THỐNG NGỮ CẢNH (SYSTEM OF CONTEXT)
            </h3>

            <div className="space-y-2.5">
              {contextItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.1 + i * 0.12 }}
                  className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl bg-white border border-indigo-100 shadow-2xs hover:border-indigo-200 transition-colors"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                  <div className="flex-1 text-sm sm:text-base leading-snug">
                    <span className="font-semibold text-neutral-900">{item.label}</span>
                    <span className="text-neutral-500 font-light text-xs sm:text-sm ml-1.5">
                      ({item.desc})
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.6 }}
            className="mt-4 pt-3 border-t border-indigo-100 text-xs sm:text-sm text-blue-600 font-medium"
          >
            Ngữ cảnh sâu sắc đằng sau công việc
          </motion.div>
        </motion.div>

        {/* Dynamic Branching Connector Lines (Step 3: Traced branches) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.7 }}
          className="hidden lg:flex shrink-0 w-16 h-80 items-center justify-center relative"
        >
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 64 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Trunk node at context card edge */}
            <circle cx="0" cy="160" r="4.5" fill="#4f46e5" />
            <line x1="0" y1="160" x2="16" y2="160" stroke="#4f46e5" strokeWidth="2.5" />

            {/* Branch 1 -> Base Task (y=32) */}
            <path
              d="M 16 160 C 36 160, 36 32, 64 32"
              stroke="#6366f1"
              strokeWidth="2"
            />
            <polygon points="62,28 68,32 62,36" fill="#6366f1" />

            {/* Branch 2 -> Base Workflow (y=96) */}
            <path
              d="M 16 160 C 36 160, 40 96, 64 96"
              stroke="#0ea5e9"
              strokeWidth="2"
            />
            <polygon points="62,92 68,96 62,100" fill="#0ea5e9" />

            {/* Branch 3 -> Base HRIS (y=160) */}
            <path
              d="M 16 160 L 64 160"
              stroke="#8b5cf6"
              strokeWidth="2"
            />
            <polygon points="62,156 68,160 62,164" fill="#8b5cf6" />

            {/* Branch 4 -> Base CRM (y=224) */}
            <path
              d="M 16 160 C 36 160, 40 224, 64 224"
              stroke="#10b981"
              strokeWidth="2"
            />
            <polygon points="62,220 68,224 62,228" fill="#10b981" />

            {/* Branch 5 -> 100+ Apps (y=288) */}
            <path
              d="M 16 160 C 36 160, 36 288, 64 288"
              stroke="#f59e0b"
              strokeWidth="2"
            />
            <polygon points="62,284 68,288 62,292" fill="#f59e0b" />
          </svg>
        </motion.div>

        {/* 3. Right: Standalone Base APPs (Step 3: Staggered sequential reveals) */}
        <div className="flex-1 w-full max-w-md lg:max-w-none flex flex-col justify-center gap-2 sm:gap-2.5 py-1">
          {workApps.map((app, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.45,
                delay: 1.85 + i * 0.14,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`flex items-center gap-3 p-2 sm:p-2.5 rounded-2xl border shadow-2xs hover:shadow-md transition-all duration-200 ${app.color}`}
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden shrink-0 flex items-center justify-center bg-white shadow-2xs">
                {app.isSpecial ? (
                  <div className="w-full h-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-black text-xs rounded-xl shadow-xs">
                    <span className="tracking-tighter">100+</span>
                  </div>
                ) : (
                  <img
                    src={app.imgSrc}
                    alt={app.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain rounded-xl"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0 text-sm sm:text-base leading-snug">
                <div className={`font-bold tracking-tight ${app.isSpecial ? 'text-amber-900' : 'text-neutral-900'}`}>
                  {app.name}
                </div>
                <div className={`text-xs sm:text-sm font-light truncate ${app.isSpecial ? 'text-amber-700/80' : 'text-neutral-500'}`}>
                  {app.desc}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 4. Bottom Quote Callout (Step 4 - Last to reveal) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.8, ease: [0.16, 1, 0.3, 1] }}
        className="p-4 sm:p-5 rounded-2xl bg-neutral-900 text-white text-center text-sm sm:text-base lg:text-lg font-semibold tracking-wide shadow-md"
      >
        AI KHÔNG CHỈ BIẾT DOANH NGHIỆP ĐANG LÀM GÌ — MÀ CÒN <span className="text-sky-400">HIỂU NGỮ CẢNH ĐẰNG SAU MỖI CÔNG VIỆC.</span>
      </motion.div>
    </div>
  );
};
