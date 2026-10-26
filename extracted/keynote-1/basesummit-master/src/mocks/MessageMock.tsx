import type { CSSProperties, ReactNode } from 'react'
import {
  Bell, Moon, MessageCircle, Users, PlusCircle, Search, ListFilter, SquarePen, ChevronDown, Star, Pin,
  FolderOpen, Hash, Phone, Bookmark, Image, Paperclip, Link2, MoreHorizontal, Plus, ThumbsUp, Smile,
  Lightbulb, SendHorizonal, Copy, Download, CircleCheck, BadgeCheck,
} from 'lucide-react'
import { BrandMark } from '../ui/Brand'

/* Communication · Message: a company-wide group chat at the real product's
   density — the conversation list, a pinned announcement, an event poster, a
   poll with its chart, and the CRM bot cheering a closed deal. Every person,
   handle and number is invented; avatars are initials, never photos. */

const tone = (h: number): CSSProperties => ({ background: `hsl(${h} 62% 52%)` })

function Face({ name, hue, size = 36, online }: { name: string; hue: number; size?: number; online?: boolean }) {
  const words = name.split(' ')
  const ini = (words.length > 1 ? words[words.length - 2][0] + words[words.length - 1][0] : words[0].slice(0, 2)).toUpperCase()
  return (
    <span className="mk-msg-face" style={{ ...tone(hue), width: size, height: size, fontSize: size * 0.36 }}>
      {ini}{online && <i />}
    </span>
  )
}

interface Conv { name: string; hue: number; last: string; online?: boolean; group?: boolean }

const CONVS: Conv[] = [
  { name: 'Trần Quốc Bảo', hue: 210, last: 'Bảo: Em gửi lịch demo tuần sau nhé', online: true },
  { name: 'Ban Điều hành', hue: 24, last: 'Chi: Họp giao ban 8h30 sáng thứ Hai', group: true },
  { name: 'Lê Thu Hà', hue: 330, last: 'Hà: Dạ vâng, em cảm ơn anh ạ' },
  { name: 'Kinh doanh miền Bắc', hue: 200, last: 'Huy: Chốt thêm 2 hợp đồng rồi ạ 🎉', group: true },
  { name: 'Phạm Gia Huy', hue: 150, last: 'Huy: Anh xem giúp em báo giá này' },
  { name: 'Nền tảng AI', hue: 255, last: 'Sơn: Bản thử nghiệm đã sẵn sàng', group: true },
  { name: 'Đỗ Khánh Linh', hue: 12, last: 'Linh: ok anh' },
  { name: 'Hoàng Mai Chi', hue: 290, last: 'Chi: Đã cập nhật lịch nghỉ lễ' },
  { name: 'Đội Sản phẩm', hue: 42, last: 'Vy: Vâng ạ', group: true },
  { name: 'Bùi Ngọc Sơn', hue: 180, last: 'Sơn: Cái này để em trả lời nhé', online: true },
  { name: 'Ngô Hải Nam', hue: 100, last: 'Nam: Chuẩn rồi anh' },
  { name: 'Đặng Thảo Vy', hue: 350, last: 'Vy: Em gửi file thiết kế ạ' },
  { name: 'Vũ Đức Thành', hue: 225, last: 'Thành: okay anh' },
]

const POLL: [string, number][] = [
  ['Quy trình bán hàng', 78],
  ['Chăm sóc khách hàng', 61],
  ['Báo cáo & dự báo', 35],
  ['Tự động hoá với AI', 92],
  ['Quản trị đội ngũ', 47],
  ['Khác', 4],
]
const POLL_N = 164

function Msg({ name, hue, handle, time, bot, react, children }: { name: string; hue: number; handle: string; time: string; bot?: boolean; react?: ReactNode; children: ReactNode }) {
  return (
    <div className="mk-msg-post">
      {bot ? <span className="mk-msg-face bot" style={{ width: 36, height: 36 }}><BadgeCheck size={20} /></span> : <Face name={name} hue={hue} />}
      <div className="body">
        <div className="hd"><b>{name}</b><span>@{handle}</span>{bot && <em>BOT</em>}<span>{time}</span>{react && <span className="react">{react}</span>}</div>
        {children}
      </div>
    </div>
  )
}

export function MessageMock() {
  return (
    <div className="mk-msg">
      <div className="mk-msg-rail">
        <i className="logo"><BrandMark /></i>
        <span className="bd"><Bell size={20} /><b>12</b></span>
        <Moon size={20} />
        <span className="sep" />
        <span className="on"><MessageCircle size={20} fill="currentColor" /></span>
        <Users size={20} />
        <PlusCircle size={20} />
      </div>

      <div className="mk-msg-list">
        <div className="me">
          <Face name="Nguyễn Minh Anh" hue={205} size={38} online />
          <div><b>Nguyễn Minh Anh</b><span>@minhanh · Giám đốc Sản phẩm</span></div>
          <ChevronDown size={15} />
        </div>
        <div className="search"><Search size={14} />Search (Ctrl + F)<ListFilter size={14} /><SquarePen size={14} /></div>
        <div className="sec"><ChevronDown size={12} />STARRED</div>
        <div className="row on">
          <span className="mk-msg-face co" style={{ width: 36, height: 36 }}><BrandMark /></span>
          <div><b>Toàn công ty</b><span>BOT: Phạm Gia Huy vừa chốt một deal…</span></div>
        </div>
        {CONVS.map(c => (
          <div key={c.name} className="row">
            {c.group
              ? <span className="mk-msg-face" style={{ ...tone(c.hue), width: 36, height: 36, fontSize: 13 }}>{c.name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()}</span>
              : <Face name={c.name} hue={c.hue} online={c.online} />}
            <div><b>{c.name}</b><span>{c.last}</span></div>
          </div>
        ))}
      </div>

      <div className="mk-msg-main">
        <div className="mk-msg-head">
          <span className="mk-msg-face co big"><BrandMark /></span>
          <div>
            <b>Toàn công ty</b>
            <div className="meta">
              <span className="tab on"><MessageCircle size={13} />Chat</span>
              <span className="tab"><Hash size={13} />Topics</span>
              <Star size={13} className="star" fill="currentColor" />
              <span><i className="dot" />Group chat</span>
              <span><FolderOpen size={13} />Company <ChevronDown size={11} /></span>
              <span>186 members</span>
              <span>42.315 messages</span>
              <span>2.108 files</span>
            </div>
          </div>
          <MoreHorizontal size={18} className="more" />
        </div>

        <div className="mk-msg-pin">
          <Pin size={16} className="pi" fill="currentColor" />
          <Face name="Hoàng Mai Chi" hue={290} size={30} />
          <div>
            <b>Hoàng Mai Chi: <span>@all, Lịch nghỉ lễ 2/9 và kế hoạch team building quý III đã được cập nhật trong mục Tài liệu công ty, mọi người xem…</span></b>
            <small>Pinned by Hoàng Mai Chi 12 days ago · Unpin</small>
          </div>
          <em>PINNED</em>
          <span className="n">1/2 pins <ChevronDown size={12} /></span>
        </div>

        <div className="mk-msg-feed">
          <Msg name="Lê Thu Hà" hue={330} handle="thuha" time="09:12 AM" react={<><span>💬 2</span><span>❤️ 6</span><span>😆 3</span></>}>
            <p>Chào cả nhà! Chiều thứ Sáu này mình có buổi chia sẻ nội bộ, mọi người nhớ đăng ký nhé 🎯</p>
            <div className="mk-msg-poster">
              <div className="l">
                <span className="kick">CHIA SẺ NỘI BỘ · 16H00 THỨ SÁU</span>
                <b>SALES <i>as a</i> SCIENCE</b>
                <span>Bán hàng bằng dữ liệu — từ quy trình đến AI</span>
              </div>
              <div className="r">
                <div className="mini"><Face name="Trần Quốc Bảo" hue={210} size={18} /><span>Anh em Sales miền Bắc đăng ký đủ rồi nhé 🙌</span></div>
                <div className="mini"><Face name="Đặng Thảo Vy" hue={350} size={18} /><span>Có ghi hình không chị ơi?</span></div>
                <div className="mini"><Face name="Lê Thu Hà" hue={330} size={18} /><span>Có em nhé, sẽ gửi trong Topics 👌</span></div>
              </div>
            </div>
          </Msg>

          <Msg name="Lê Thu Hà" hue={330} handle="thuha" time="09:14 AM" react={<span>💬 1</span>}>
            <div className="mk-msg-poll">
              <div className="ph"><b>Bạn quan tâm chủ đề nào nhất trong buổi chia sẻ?</b><span className="cp"><Copy size={13} />Sao chép biểu đồ</span></div>
              <small>{POLL_N} câu trả lời</small>
              <div className="bars">
                {POLL.map(([k, v]) => (
                  <div key={k} className="bar">
                    <span className="k">{k}</span>
                    <span className="track"><i style={{ width: `${(v / POLL_N) * 100}%` }} /><em>{v} ({(v / POLL_N * 100).toFixed(1).replace('.', ',')}%)</em></span>
                  </div>
                ))}
              </div>
              <Download size={16} className="dl" />
            </div>
          </Msg>

          <Msg name="Trần Quốc Bảo" hue={210} handle="quocbao" time="09:20 AM">
            <p>Chủ đề AI đang dẫn đầu kìa 😄 bao nhiêu người đăng ký rồi chị Hà?</p>
          </Msg>

          <Msg name="CRM - Thần Tốc" hue={0} handle="crm_bot" time="09:24 AM" bot react={<><span>🎉 12</span><span>👏 8</span></>}>
            <p><CircleCheck size={14} className="ok" /> Chúc mừng <a>Phạm Gia Huy</a> vừa chốt thành công một deal trị giá <b>86.500.000 ₫</b>. Ai sẽ là người tiếp theo?</p>
          </Msg>
        </div>

        <div className="mk-msg-compose">
          <Plus size={20} />
          <span className="in">Type and press Enter to send message</span>
          <span className="tools"><ThumbsUp size={17} /><Paperclip size={17} /><Smile size={17} /><Lightbulb size={17} /></span>
          <SendHorizonal size={20} className="send" />
        </div>
      </div>

      <div className="mk-msg-side">
        <span className="call"><Phone size={16} fill="currentColor" /></span>
        <Search size={17} /><Bookmark size={17} /><Image size={17} /><Paperclip size={17} /><Link2 size={17} /><MoreHorizontal size={17} />
      </div>
    </div>
  )
}
