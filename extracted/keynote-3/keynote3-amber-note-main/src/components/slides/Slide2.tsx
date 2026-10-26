import React from 'react';
import { motion } from 'motion/react';
import { Users, DollarSign, UserCheck, Briefcase, FileText, AlertCircle } from 'lucide-react';

export const Slide2: React.FC = () => {
  const systems = [
    { label: 'Khách hàng', target: 'CRM', icon: Users, desc: 'Lịch sử tương tác & giao dịch' },
    { label: 'Tài chính', target: 'ERP', icon: DollarSign, desc: 'Dòng tiền, chứng từ & ngân sách' },
    { label: 'Nhân sự', target: 'HRM', icon: UserCheck, desc: 'Hồ sơ nhân sự, chấm công, bảng lương' },
    { label: 'Công việc', target: 'Hệ thống quản trị', icon: Briefcase, desc: 'Tiến độ nhiệm vụ & dự án' },
    { label: 'Tài liệu, email, tin nhắn', target: 'Được lưu lại toàn bộ', icon: FileText, desc: 'Lưu trữ trên đám mây' },
  ];

  return (
    <div className="slide2-wrapper flex flex-col justify-center max-w-7xl mx-auto px-1 sm:px-3 w-full my-auto">
      {/* Top Main Heading */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-4 sm:mb-6"
      >
        <span className="text-sm uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-2">
          Hiện trạng doanh nghiệp
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-7xl font-semibold tracking-tight text-neutral-900">
          DOANH NGHIỆP CỦA BẠN GHI LẠI GẦN NHƯ MỌI THỨ
        </h2>
      </motion.div>

      {/* Systems Grid / List */}
      <div className="slide2-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5 mb-6 sm:mb-8">
        {systems.map((item, index) => {
          const Icon = item.icon;
          const isWide = index === 4;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 + index * 0.35, ease: 'easeOut' }}
              className={`p-4 sm:p-5 rounded-2xl border border-neutral-200/90 bg-neutral-50/70 flex items-start gap-3.5 hover:border-neutral-300 transition-colors ${
                isWide
                  ? 'sm:col-span-2 lg:col-span-3'
                  : 'sm:col-span-1 lg:col-span-2'
              }`}
            >
              <div className="p-2.5 rounded-xl bg-white border border-neutral-200/80 shadow-xs text-neutral-800">
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-1 flex-wrap">
                  <span className="font-semibold text-neutral-900 text-lg sm:text-xl">{item.label}</span>
                  <span className="text-xs sm:text-sm font-mono font-medium text-neutral-600 uppercase px-2 py-0.5 rounded bg-neutral-200/80">
                    {item.target}
                  </span>
                </div>
                <p className="text-sm text-neutral-500 mt-1">{item.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* The Crucial Missing Piece (Reveals Last - Slower & deliberate) */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.85, delay: 2.3, ease: [0.16, 1, 0.3, 1] }}
        className="p-6 sm:p-8 rounded-3xl bg-neutral-900 text-white text-center shadow-2xl relative overflow-hidden ring-1 ring-white/10"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs sm:text-sm font-medium mb-3 border border-rose-500/30">
          <AlertCircle className="w-4 h-4" />
          Điểm mù doanh nghiệp
        </div>
        <h3 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2">
          NGOẠI TRỪ NHỮNG GÌ CON NGƯỜI THỰC SỰ NÓI
        </h3>
        <p className="text-lg sm:text-2xl lg:text-3xl text-neutral-300 font-light italic">
          &ldquo;Ghi âm không đồng nghĩa với ghi nhớ.&rdquo;
        </p>
      </motion.div>
    </div>
  );
};
