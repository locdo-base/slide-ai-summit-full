import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  UserCheck2,
  HelpCircle,
  ArrowRightCircle,
  Sparkles,
  MessageSquare,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  CheckCircle2,
  Building2,
  Users,
  Target,
  Calendar,
  Zap,
} from 'lucide-react';

export const Slide10: React.FC = () => {
  // Simulation progression: 0 to 100%
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [currentTime, setCurrentTime] = useState('00:00');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Phases based on progress:
  // 0 - 20%: Audio starts, speaker 1 starts speaking
  // 20 - 45%: Speaker 1 completes -> AI extracts Card 1 (KHÁCH HÀNG LÀ AI)
  // 45 - 75%: Speaker 2 responds -> AI extracts Card 2 (HỌ CẦN GÌ)
  // 75 - 100%: Concludes -> AI extracts Card 3 (TIẾP THEO LÀ GÌ) & syncs task to Base CRM/Task

  const isCard1Extracted = progress >= 25;
  const isCard2Extracted = progress >= 55;
  const isCard3Extracted = progress >= 85;
  const isCompleted = progress >= 100;

  useEffect(() => {
    if (isPlaying && progress < 100) {
      timerRef.current = setInterval(() => {
        setProgress((prev) => {
          const next = prev + 1.2;
          if (next >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return next;
        });
      }, 100);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, progress]);

  // Update timer display
  useEffect(() => {
    const totalSeconds = Math.floor((progress / 100) * 18); // 18 seconds simulated talk
    const mins = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');
    setCurrentTime(`${mins}:${secs}`);
  }, [progress]);

  const handleRestart = () => {
    setProgress(0);
    setIsPlaying(true);
  };

  const handleFastForward = () => {
    setProgress(100);
    setIsPlaying(false);
  };

  return (
    <div className="slide10-wrapper flex flex-col justify-center max-w-[1550px] mx-auto px-2 sm:px-4 w-full my-auto py-2 sm:py-4 lg:py-6">
      {/* Top Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-4"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold tracking-wider uppercase mb-1.5">
          <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
          Mô phỏng Xử lý Hội thoại Thời gian thực
        </div>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900">
          TỪ CUỘC HỘI THOẠI ĐẾN NGỮ CẢNH KHÁCH HÀNG
        </h2>
        <p className="text-base sm:text-lg text-neutral-500 font-normal mt-1">
          Amber nghe &bull; Bóc tách thực thể &bull; Tự động hóa hành động tức thì
        </p>
      </motion.div>

      {/* Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 mb-5 rounded-2xl bg-neutral-900 text-white shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-white text-neutral-900 hover:bg-neutral-100 transition-transform active:scale-95 cursor-pointer shadow-sm"
            title={isPlaying ? 'Tạm dừng' : 'Chạy tiếp'}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-neutral-900" /> : <Play className="w-4 h-4 fill-neutral-900 ml-0.5" />}
          </button>

          <button
            onClick={handleRestart}
            className="flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Chạy lại</span>
          </button>

          <div className="h-4 w-px bg-neutral-700 mx-1 hidden sm:block" />

          {/* Real-time Status Badge */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="flex h-2 w-2 relative">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isCompleted ? 'bg-emerald-400' : 'bg-rose-400'} opacity-75`} />
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isCompleted ? 'bg-emerald-500' : 'bg-rose-500'}`} />
            </span>
            <span className="text-neutral-200">
              {progress < 25 && 'Đang nghe & nhận diện giọng nói...'}
              {progress >= 25 && progress < 55 && 'AI đang bóc tách hồ sơ khách hàng...'}
              {progress >= 55 && progress < 85 && 'AI đang phân tích nhu cầu & rủi ro...'}
              {progress >= 85 && progress < 100 && 'AI đang tổng hợp Action Items...'}
              {progress >= 100 && 'Đã hoàn tất phân tích 100% ngữ cảnh'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs font-mono text-neutral-400">
            Thời lượng: <span className="text-white font-semibold">{currentTime}</span> / 00:18
          </div>
          <button
            onClick={handleFastForward}
            className="text-xs text-neutral-400 hover:text-white underline cursor-pointer"
          >
            Xem kết quả ngay
          </button>
        </div>
      </div>

      {/* Interactive AI Understanding Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch mb-5">
        {/* Left: Raw Audio Conversation snippet */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5 p-5 rounded-3xl bg-neutral-50/90 border border-neutral-200 flex flex-col justify-between relative overflow-hidden"
        >
          {/* Subtle Live Scan Line */}
          {isPlaying && (
            <motion.div
              animate={{ y: [0, 320, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
              className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent pointer-events-none z-10"
            />
          )}

          <div>
            {/* Header with audio waveform */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-700">
                <Volume2 className="w-4 h-4 text-blue-600" />
                <span>Bản ghi âm thực tế #REC-0412</span>
              </div>
              <div className="flex items-center gap-1.5">
                {/* Dynamic Soundwave */}
                <div className="flex items-center gap-0.5 h-3">
                  {[40, 85, 30, 95, 60, 100, 45, 80, 50].map((h, i) => (
                    <motion.span
                      key={i}
                      animate={{
                        height: isPlaying ? [`${h * 0.25}%`, `${h}%`, `${h * 0.4}%`] : '20%',
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.7,
                        delay: i * 0.08,
                        ease: 'easeInOut',
                      }}
                      className="w-1 bg-blue-500 rounded-full"
                    />
                  ))}
                </div>
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 ml-1.5">
                  Live STT
                </span>
              </div>
            </div>

            {/* Conversation Dialog with Animated Keywords */}
            <div className="space-y-3 mt-4 text-xs sm:text-sm leading-relaxed">
              {/* Message 1: Customer Lan */}
              <div
                className={`p-3.5 rounded-2xl border transition-all duration-300 ${
                  progress >= 10
                    ? 'bg-white border-blue-200 shadow-sm'
                    : 'bg-white/50 border-neutral-200/50 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <strong className="font-semibold text-neutral-900 text-xs">
                      Khách hàng: Chị Lan (TechCorp)
                    </strong>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400">00:03</span>
                </div>
                <p className="text-neutral-700 font-light">
                  &ldquo;Bên mình hiện có{' '}
                  <span
                    className={`transition-colors duration-300 font-medium px-1 rounded ${
                      isCard1Extracted ? 'bg-blue-100 text-blue-900 ring-1 ring-blue-300' : ''
                    }`}
                  >
                    300 nhân sự
                  </span>{' '}
                  đang dùng phần mềm cũ nhưng hay{' '}
                  <span
                    className={`transition-colors duration-300 font-medium px-1 rounded ${
                      isCard2Extracted ? 'bg-amber-100 text-amber-900 ring-1 ring-amber-300' : ''
                    }`}
                  >
                    nghẽn dữ liệu
                  </span>
                  . Sang tháng tới ban giám đốc muốn{' '}
                  <span
                    className={`transition-colors duration-300 font-medium px-1 rounded ${
                      isCard2Extracted ? 'bg-amber-100 text-amber-900 ring-1 ring-amber-300' : ''
                    }`}
                  >
                    tích hợp hệ thống phê duyệt mới
                  </span>{' '}
                  và cần{' '}
                  <span
                    className={`transition-colors duration-300 font-medium px-1 rounded ${
                      isCard3Extracted ? 'bg-emerald-100 text-emerald-900 ring-1 ring-emerald-300' : ''
                    }`}
                  >
                    demo trước thứ Sáu
                  </span>
                  .&rdquo;
                </p>
              </div>

              {/* Message 2: Specialist Tuan */}
              <div
                className={`p-3.5 rounded-2xl border transition-all duration-300 ${
                  progress >= 40
                    ? 'bg-white border-neutral-200 shadow-sm'
                    : 'bg-white/40 border-neutral-200/40 opacity-40'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <strong className="font-semibold text-neutral-800 text-xs">
                      Chuyên viên Base: Tuấn
                    </strong>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400">00:09</span>
                </div>
                <p className="text-neutral-700 font-light">
                  &ldquo;Dạ em đã nắm bài toán. Em sẽ chuẩn bị{' '}
                  <span
                    className={`transition-colors duration-300 font-medium px-1 rounded ${
                      isCard3Extracted ? 'bg-emerald-100 text-emerald-900 ring-1 ring-emerald-300' : ''
                    }`}
                  >
                    kịch bản demo phê duyệt chuyên sâu
                  </span>{' '}
                  và gửi qua cho chị vào{' '}
                  <span
                    className={`transition-colors duration-300 font-medium px-1 rounded ${
                      isCard3Extracted ? 'bg-emerald-100 text-emerald-900 ring-1 ring-emerald-300' : ''
                    }`}
                  >
                    9h sáng thứ Năm
                  </span>{' '}
                  nhé.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Extraction Status */}
          <div className="mt-4 pt-3 border-t border-neutral-200 flex items-center justify-between text-xs">
            <span className="text-neutral-500 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-neutral-400" />
              Micro kép Amber khử ồn 98%
            </span>
            <span className="flex items-center gap-1 text-blue-600 font-semibold font-mono">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              {Math.round(progress)}% Hoàn tất
            </span>
          </div>
        </motion.div>

        {/* Right: AI Understanding Triad (Streaming and Highlighted) */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          {/* Card 1: KHÁCH HÀNG LÀ AI? */}
          <motion.div
            animate={{
              scale: isCard1Extracted ? 1 : 0.99,
              opacity: isCard1Extracted ? 1 : 0.45,
            }}
            transition={{ duration: 0.3 }}
            className={`p-4 sm:p-5 rounded-3xl border transition-all ${
              isCard1Extracted
                ? 'bg-blue-50/50 border-blue-300 shadow-sm ring-2 ring-blue-400/20'
                : 'bg-white border-neutral-200'
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div
                className={`p-2.5 rounded-2xl transition-colors ${
                  isCard1Extracted ? 'bg-blue-600 text-white shadow-sm' : 'bg-neutral-100 text-neutral-400'
                }`}
              >
                <UserCheck2 className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-wider text-blue-700 flex items-center gap-1.5">
                    AI HIỂU 01 &bull; BÓC TÁCH THỰC THỂ
                    {isCard1Extracted && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                  </span>
                  {isCard1Extracted && (
                    <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      Độ tin cậy: 99.4%
                    </span>
                  )}
                </div>

                <h4 className="text-lg sm:text-xl font-bold text-neutral-900 mt-0.5">
                  KHÁCH HÀNG LÀ AI?
                </h4>

                <p className="text-xs sm:text-sm text-neutral-700 mt-1 font-normal">
                  Chị Lan &mdash; Giám đốc Vận hành tại <strong className="font-semibold text-neutral-900">TechCorp</strong>
                </p>

                {/* Entity Tags Extracted Live */}
                {isCard1Extracted && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-wrap gap-2 mt-2.5"
                  >
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white border border-blue-200 text-blue-900 shadow-xs">
                      <Building2 className="w-3 h-3 text-blue-600" /> Công ty: TechCorp
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white border border-blue-200 text-blue-900 shadow-xs">
                      <Users className="w-3 h-3 text-blue-600" /> Quy mô: 300 nhân sự
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white border border-blue-200 text-blue-900 shadow-xs">
                      Phân khúc: Enterprise
                    </span>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Card 2: HỌ CẦN GÌ? */}
          <motion.div
            animate={{
              scale: isCard2Extracted ? 1 : 0.99,
              opacity: isCard2Extracted ? 1 : 0.45,
            }}
            transition={{ duration: 0.3 }}
            className={`p-4 sm:p-5 rounded-3xl border transition-all ${
              isCard2Extracted
                ? 'bg-amber-50/50 border-amber-300 shadow-sm ring-2 ring-amber-400/20'
                : 'bg-white border-neutral-200'
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div
                className={`p-2.5 rounded-2xl transition-colors ${
                  isCard2Extracted ? 'bg-amber-600 text-white shadow-sm' : 'bg-neutral-100 text-neutral-400'
                }`}
              >
                <HelpCircle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-wider text-amber-800 flex items-center gap-1.5">
                    AI HIỂU 02 &bull; NHU CẦU & VẤN ĐỀ CỐT LÕI
                    {isCard2Extracted && <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />}
                  </span>
                  {isCard2Extracted && (
                    <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                      Phân loại: Cấp thiết
                    </span>
                  )}
                </div>

                <h4 className="text-lg sm:text-xl font-bold text-neutral-900 mt-0.5">
                  HỌ CẦN GÌ?
                </h4>

                <p className="text-xs sm:text-sm text-neutral-700 mt-1 font-normal">
                  Giải quyết điểm nghẽn luồng phê duyệt phân tán, thay thế phần mềm cũ trước thềm tháng tới.
                </p>

                {isCard2Extracted && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-wrap gap-2 mt-2.5"
                  >
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white border border-amber-200 text-amber-900 shadow-xs">
                      <Target className="w-3 h-3 text-amber-600" /> Nhu cầu: Hệ thống phê duyệt số
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white border border-amber-200 text-amber-900 shadow-xs">
                      Pain-point: Nghẽn dữ liệu phần mềm cũ
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white border border-amber-200 text-amber-900 shadow-xs">
                      Thời hạn: Tháng tới
                    </span>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Card 3: TIẾP THEO LÀ GÌ? */}
          <motion.div
            animate={{
              scale: isCard3Extracted ? 1 : 0.99,
              opacity: isCard3Extracted ? 1 : 0.45,
            }}
            transition={{ duration: 0.3 }}
            className={`p-4 sm:p-5 rounded-3xl border transition-all ${
              isCard3Extracted
                ? 'bg-emerald-50/50 border-emerald-300 shadow-sm ring-2 ring-emerald-400/20'
                : 'bg-white border-neutral-200'
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div
                className={`p-2.5 rounded-2xl transition-colors ${
                  isCard3Extracted ? 'bg-emerald-600 text-white shadow-sm' : 'bg-neutral-100 text-neutral-400'
                }`}
              >
                <ArrowRightCircle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-wider text-emerald-800 flex items-center gap-1.5">
                    AI HIỂU 03 &bull; TỰ ĐỘNG HÓA HÀNH ĐỘNG
                    {isCard3Extracted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />}
                  </span>
                  {isCard3Extracted && (
                    <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-emerald-600" /> Tự động tạo Task
                    </span>
                  )}
                </div>

                <h4 className="text-lg sm:text-xl font-bold text-neutral-900 mt-0.5">
                  TIẾP THEO LÀ GÌ?
                </h4>

                <p className="text-xs sm:text-sm text-neutral-700 mt-1 font-normal">
                  Action item tự động tạo trên Base Task & CRM gán cho chuyên viên Tuấn.
                </p>

                {isCard3Extracted && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-wrap gap-2 mt-2.5"
                  >
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white border border-emerald-200 text-emerald-950 shadow-xs">
                      Nhiệm vụ: Gửi demo phê duyệt
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white border border-emerald-200 text-emerald-950 shadow-xs">
                      <Calendar className="w-3 h-3 text-emerald-600" /> Deadline: 09:00 Thứ Năm
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-lg bg-emerald-600 text-white shadow-xs">
                      Phụ trách: Tuấn (Base)
                    </span>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Key Takeaway Callout */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="p-3.5 sm:p-4 rounded-2xl bg-neutral-900 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md"
      >
        <div className="flex items-center gap-2.5 text-center sm:text-left">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-medium tracking-wide">
            &rarr; Từ một cuộc trò chuyện trực tiếp, Amber biến hội thoại thành 100% ngữ cảnh & hành động chuẩn xác trên hệ thống.
          </span>
        </div>
        <div className="shrink-0 flex items-center gap-2">
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700">
            Tích hợp liền mạch Base CRM và Task
          </span>
        </div>
      </motion.div>
    </div>
  );
};

