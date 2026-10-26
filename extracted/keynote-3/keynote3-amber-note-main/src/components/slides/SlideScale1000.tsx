import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Users, User, ArrowRight, Sparkles, Zap, BrainCircuit, Waves } from 'lucide-react';

export const SlideScale1000: React.FC = () => {
  // Sample nodes for the 1000 conversations crowd visualization
  const crowdNodes = [
    { id: 1, x: '18%', y: '22%', size: 'w-10 h-10', role: 'Sales & Khách hàng', delay: 0.1, color: 'from-amber-400 to-amber-500' },
    { id: 2, x: '42%', y: '16%', size: 'w-12 h-12', role: 'Họp Chiến lược Ban GD', delay: 0.25, color: 'from-blue-500 to-indigo-600' },
    { id: 3, x: '72%', y: '20%', size: 'w-10 h-10', role: 'Đội Dự án Sprint', delay: 0.4, color: 'from-emerald-400 to-teal-500' },
    { id: 4, x: '24%', y: '52%', size: 'w-11 h-11', role: '1-on-1 Quản lý & Nhân sự', delay: 0.15, color: 'from-purple-400 to-indigo-500' },
    { id: 5, x: '58%', y: '48%', size: 'w-14 h-14', role: 'Họp Giao ban Toàn quốc', delay: 0.3, color: 'from-amber-500 to-orange-500' },
    { id: 6, x: '82%', y: '56%', size: 'w-9 h-9', role: 'Hỗ trợ Kỹ thuật Khách lớn', delay: 0.5, color: 'from-rose-400 to-pink-500' },
    { id: 7, x: '35%', y: '80%', size: 'w-10 h-10', role: 'Phỏng vấn Tuyển dụng', delay: 0.2, color: 'from-cyan-400 to-blue-500' },
    { id: 8, x: '68%', y: '78%', size: 'w-11 h-11', role: 'Đàm phán Hợp đồng Đối tác', delay: 0.35, color: 'from-emerald-500 to-green-600' },
  ];

  return (
    <div className="slide-scale1000-wrapper flex flex-col items-center justify-center max-w-7xl mx-auto px-2 sm:px-4 w-full my-auto text-center select-none py-1 sm:py-2">
      {/* Super Impact Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6 sm:mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900 text-white text-xs sm:text-sm font-bold tracking-widest uppercase mb-3 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Bài toán Quy mô Doanh nghiệp</span>
        </div>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-neutral-900 uppercase">
          TỪ 1 ĐẾN 1.000?
        </h2>
        <p className="text-base sm:text-xl text-neutral-500 font-medium mt-2 max-w-3xl mx-auto">
          Một cuộc hội thoại tạo ra một công việc. Hàng nghìn cuộc hội thoại tạo nên bức tranh toàn cảnh doanh nghiệp.
        </p>
      </motion.div>

      {/* Comparison Dual Layout: 1 vs 1000 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-center w-full max-w-6xl">
        {/* LEFT COLUMN: 1 Conversation (2 People Talking) - 5 cols */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-5 relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white border-2 border-neutral-200 shadow-md hover:shadow-lg transition-all min-h-[380px] sm:min-h-[420px] text-left overflow-hidden"
        >
          {/* Subtle Top Badge */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500 animate-ping" />
              <span className="text-xs font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                Quy mô: 01
              </span>
            </div>
            <span className="text-2xl sm:text-3xl font-black text-neutral-300">#01</span>
          </div>

          {/* Visual: 2 People in Conversation */}
          <div className="relative my-auto flex flex-col items-center justify-center py-4">
            {/* Conversation Soundwave Bridge */}
            <div className="flex items-center justify-center gap-6 sm:gap-8 w-full">
              {/* Person A */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="flex flex-col items-center relative"
              >
                {/* Speech Bubble A */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                  className="absolute -top-11 -left-2 bg-blue-600 text-white text-[11px] font-bold px-3 py-1 rounded-2xl rounded-bl-xs shadow-md whitespace-nowrap z-20 flex items-center gap-1"
                >
                  <MessageSquare className="w-3 h-3 fill-white" />
                  <span>"Chốt kế hoạch..."</span>
                </motion.div>

                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center shadow-lg border-2 border-white">
                  <User className="w-9 h-9 sm:w-11 sm:h-11" />
                </div>
                <span className="text-xs font-bold text-neutral-800 mt-2">Người A</span>
              </motion.div>

              {/* Dynamic Soundwaves / Conversation Connection */}
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center gap-1 px-2 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 shadow-inner">
                  <motion.div
                    animate={{ height: ['8px', '22px', '8px'] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                    className="w-1 bg-blue-500 rounded-full"
                  />
                  <motion.div
                    animate={{ height: ['14px', '28px', '14px'] }}
                    transition={{ repeat: Infinity, duration: 0.9, ease: 'easeInOut' }}
                    className="w-1 bg-amber-500 rounded-full"
                  />
                  <motion.div
                    animate={{ height: ['6px', '18px', '6px'] }}
                    transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
                    className="w-1 bg-indigo-500 rounded-full"
                  />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-400 mt-1">1 Hội thoại</span>
              </div>

              {/* Person B */}
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut', delay: 0.5 }}
                className="flex flex-col items-center relative"
              >
                {/* Speech Bubble B */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut', delay: 1 }}
                  className="absolute -top-11 -right-2 bg-amber-500 text-neutral-950 text-[11px] font-bold px-3 py-1 rounded-2xl rounded-br-xs shadow-md whitespace-nowrap z-20 flex items-center gap-1"
                >
                  <MessageSquare className="w-3 h-3 fill-current" />
                  <span>"Giao việc Task!"</span>
                </motion.div>

                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-400 text-white flex items-center justify-center shadow-lg border-2 border-white">
                  <User className="w-9 h-9 sm:w-11 sm:h-11" />
                </div>
                <span className="text-xs font-bold text-neutral-800 mt-2">Người B</span>
              </motion.div>
            </div>
          </div>

          {/* Bottom Context Card */}
          <div className="z-10 pt-3 border-t border-neutral-100">
            <h4 className="font-extrabold text-neutral-900 text-base sm:text-lg">
              1 Cuộc Trò Chuyện Đơn Lẻ
            </h4>
            <p className="text-xs sm:text-sm text-neutral-600 mt-0.5">
              Tạo ra 1 bản ghi nhớ, 1 ticket giao việc hoặc 1 cập nhật tiến độ tức thời.
            </p>
          </div>
        </motion.div>

        {/* CENTER BRIDGE: Question & Multiplier Icon - 2 cols */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="lg:col-span-2 flex flex-col items-center justify-center my-auto py-1"
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-neutral-900 via-neutral-800 to-neutral-950 text-white flex items-center justify-center shadow-xl border-2 border-neutral-700 relative">
            <ArrowRight className="w-7 h-7 sm:w-8 sm:h-8 text-amber-400 rotate-90 lg:rotate-0" />
            <motion.div
              animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 rounded-full border-2 border-amber-400"
            />
          </div>
          <span className="text-xs sm:text-sm font-black text-neutral-900 uppercase tracking-widest mt-2 bg-amber-100/80 text-amber-900 px-3 py-0.5 rounded-full border border-amber-300/60">
            x 1.000 Lần
          </span>
          <span className="text-[11px] font-semibold text-neutral-500 mt-1">
            Mở rộng toàn tổ chức
          </span>
        </motion.div>

        {/* RIGHT COLUMN: 1,000 Conversations (Massive Crowd & Parallel Meetings) - 5 cols */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="lg:col-span-5 relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-950 text-white border-2 border-neutral-800 shadow-2xl min-h-[380px] sm:min-h-[420px] text-left overflow-hidden"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-amber-500/20 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-indigo-500/20 blur-2xl pointer-events-none" />

          {/* Top Badge */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-400 animate-ping" />
              <span className="text-xs font-black uppercase tracking-widest text-amber-300 bg-amber-500/20 px-2.5 py-1 rounded-full border border-amber-400/40">
                Quy mô: 1.000+
              </span>
            </div>
            <span className="text-2xl sm:text-3xl font-black text-neutral-700">#1000</span>
          </div>

          {/* Visual: Crowd Network of Many Simultaneous Conversations */}
          <div className="relative my-auto w-full h-[190px] sm:h-[210px] rounded-2xl bg-neutral-950/60 border border-neutral-800/80 p-3 overflow-hidden">
            {/* Animated Grid / Radar Lines */}
            <div className="absolute inset-0 bg-[radial-gradient(#404040_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

            {/* Connecting Mesh Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30 stroke-neutral-500 stroke-[1.2] stroke-dasharray-[3_3]">
              <line x1="22%" y1="30%" x2="45%" y2="25%" />
              <line x1="45%" y1="25%" x2="75%" y2="30%" />
              <line x1="25%" y1="55%" x2="60%" y2="52%" />
              <line x1="60%" y1="52%" x2="84%" y2="60%" />
              <line x1="38%" y1="82%" x2="70%" y2="80%" />
              <line x1="45%" y1="25%" x2="60%" y2="52%" />
              <line x1="25%" y1="55%" x2="38%" y2="82%" />
            </svg>

            {/* Render Cluster of Meeting Groups / Avatars */}
            {crowdNodes.map((node) => (
              <motion.div
                key={node.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: node.delay }}
                style={{ left: node.x, top: node.y }}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center group cursor-pointer"
              >
                <div className={`${node.size} rounded-xl bg-gradient-to-tr ${node.color} text-white flex items-center justify-center shadow-lg border border-white/40 group-hover:scale-125 transition-transform`}>
                  <Users className="w-5 h-5 text-white drop-shadow-sm" />
                </div>

                {/* Floating Micro Speech Indicator */}
                <motion.div
                  animate={{ y: [0, -3, 0], opacity: [0.7, 1, 0.7] }}
                  transition={{ repeat: Infinity, duration: 2, delay: node.delay }}
                  className="absolute -top-4 -right-2 bg-neutral-900 border border-white/30 text-[9px] font-bold px-1.5 py-0.5 rounded-full text-neutral-200 shadow-sm whitespace-nowrap"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block mr-1" />
                  Đang ghi
                </motion.div>
              </motion.div>
            ))}

            {/* Central Intelligence Pulse Badge */}
            <div className="absolute inset-x-0 bottom-2 flex justify-center">
              <div className="flex items-center gap-1.5 bg-neutral-900/90 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/40 text-amber-300 text-[11px] font-extrabold shadow-lg">
                <BrainCircuit className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>Hàng trăm cuộc họp diễn ra đồng thời mỗi ngày</span>
              </div>
            </div>
          </div>

          {/* Bottom Context Card */}
          <div className="z-10 pt-3 border-t border-neutral-800">
            <h4 className="font-extrabold text-white text-base sm:text-lg flex items-center gap-2">
              <span>1.000+ Cuộc Hội Thoại Doanh Nghiệp</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </h4>
            <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
              Làm thế nào để nắm bắt xu hướng thị trường, tiếng nói khách hàng và đo lường hiệu suất toàn diện?
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
