import React from 'react';
import { motion } from 'motion/react';
import { Eye, Sliders, ShieldCheck, Radio, KeyRound, Lock } from 'lucide-react';

export const Slide15: React.FC = () => {
  const pillars = [
    {
      num: '01',
      en: 'TRANSPARENCY',
      vn: 'MINH BẠCH',
      icon: Radio,
      desc: 'Người dùng luôn biết rõ khi nào Amber đang ghi lại cuộc hội thoại thông qua tín hiệu đèn LED vật lý và chỉ báo âm thanh rõ ràng.',
      tag: 'Chỉ báo phần cứng rõ ràng',
    },
    {
      num: '02',
      en: 'CONTROL',
      vn: 'KIỂM SOÁT',
      icon: Sliders,
      desc: 'Với hệ thống phân quyền trên kiến trúc Service Architecture, doanh nghiệp kiểm soát được tuyệt đối việc xem, chỉnh sửa, sử dụng từng bản ghi.',
      tag: 'Phân quyền truy cập chi tiết',
    },
    {
      num: '03',
      en: 'SECURITY',
      vn: 'BẢO MẬT',
      icon: ShieldCheck,
      desc: 'Dữ liệu thoại và bản dịch được bảo vệ bằng mã hóa AES-256 xuyên suốt quá trình lưu trữ, xử lý AI và truyền tải.',
      tag: 'Mã hóa đầu cuối toàn diện',
    },
  ];

  return (
    <div className="flex flex-col justify-center max-w-7xl mx-auto px-1 sm:px-3 w-full my-auto">
      {/* Title & Core Philosophy */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <span className="text-sm uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-2">
          BẢO MẬT & KIỂM SOÁT DỮ LIỆU
        </span>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900 mb-3">
          DỮ LIỆU THUỘC VỀ DOANH NGHIỆP
        </h2>
        <p className="text-base sm:text-xl text-neutral-600 font-light max-w-3xl mx-auto">
          Mọi cuộc trò chuyện chỉ thực sự trở thành dữ liệu doanh nghiệp khi được ghi nhận minh bạch, kiểm soát chặt chẽ và bảo vệ an toàn.
        </p>
      </motion.div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((p, index) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="p-6 sm:p-7 rounded-3xl border border-neutral-800 bg-neutral-900 text-white shadow-xl flex flex-col justify-between hover:border-neutral-700 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl font-bold text-neutral-500 group-hover:text-blue-400 transition-colors">
                    {p.num}
                  </span>
                  <div className="p-3 rounded-xl bg-neutral-800 text-blue-400 border border-neutral-700">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <div className="space-y-0.5 mb-3">
                  <h3 className="text-2xl font-bold tracking-tight text-white">
                    {p.vn}
                  </h3>
                  <div className="text-xs uppercase tracking-widest text-neutral-400 font-medium">
                    {p.en}
                  </div>
                </div>

                <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                  {p.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-800 text-xs text-neutral-400 flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-neutral-500" />
                <span>{p.tag}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
