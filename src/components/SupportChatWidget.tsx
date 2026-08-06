import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Wifi,
  Phone,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Minimize2,
  ChevronRight,
  LifeBuoy,
  Loader2
} from 'lucide-react';
import { BRANCH_INFO } from '../data/plans';
import managerAvatar from '../assets/images/regenerated_image_1786005386073.avif';

interface SupportChatWidgetProps {
  onOpenSupportTicket?: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'bot' | 'agent';
  text: string;
  timestamp: string;
  quickActions?: { label: string; action: () => void }[];
}

const PRESET_QUESTIONS = [
  '🔴 Red light blinking on ONU device',
  '📱 How to pay monthly bill via bKash?',
  '⚡ Check fiber coverage in my union',
  '🚀 How to upgrade to 100 Mbps fiber?'
];

export const SupportChatWidget: React.FC<SupportChatWidgetProps> = ({ onOpenSupportTicket }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLauncherLoading, setIsLauncherLoading] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);

  const [chatMode, setChatMode] = useState<'web' | 'messenger'>('web');

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'bot',
      text: 'Assalamu Alaikum! Welcome to Delta Mithapukur Fiber Support Desk. You can chat here or connect directly via Facebook Messenger for instant response.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      scrollToBottom();
    }
  }, [isOpen, messages, isTyping]);

  const handleOpenChat = () => {
    setIsLauncherLoading(true);
    setTimeout(() => {
      setIsLauncherLoading(false);
      setIsOpen(true);
      setUnreadCount(0);
    }, 400);
  };

  const generateAutoReply = (userQuery: string) => {
    setIsTyping(true);

    const query = userQuery.toLowerCase();
    let replyText = '';

    if (query.includes('red light') || query.includes('los') || query.includes('onu') || query.includes('blinking')) {
      replyText =
        '🔴 A red blinking LOS light on your ONU device indicates a physical optical fiber drop line cut or optical power drop. Please check if the yellow fiber patch cord is firmly plugged in. Our Mithapukur field team has been notified for optical power signal diagnostics.';
    } else if (query.includes('bkash') || query.includes('nagad') || query.includes('bill') || query.includes('pay')) {
      replyText =
        '📱 You can pay your monthly bill directly via bKash or Nagad Merchant Pay. Go to bKash app → Pay Bill → Internet → Select "Delta Fiber" → Enter your Customer ID (e.g., DF-MITH-XXXX). Your line will auto-renew immediately!';
    } else if (query.includes('coverage') || query.includes('area') || query.includes('boldipukur') || query.includes('union')) {
      replyText =
        '📍 We offer 100% Optical Fiber Broadband across Mithapukur Sadar, Boldipukur, Ranipukur, Gopalpur, Kafrikhal, and surrounding union markets. Share your location details and we will check the nearest optical splitter box!';
    } else if (query.includes('upgrade') || query.includes('speed') || query.includes('100') || query.includes('plan')) {
      replyText =
        '🚀 Package upgrades (e.g. Starter 30 Mbps → Delta 100 Mbps Business) are processed instantly without any cable replacement fees! Simply request through our contact form or hotline.';
    } else if (query.includes('slow') || query.includes('lag') || query.includes('buffering')) {
      replyText =
        '⚡ If your internet feels slow, try restarting your Wi-Fi router by turning off power for 30 seconds. You can also run our built-in Speed Test tool on this page to test live BDIX & International throughput!';
    } else {
      replyText =
        'Thank you for reaching out! Our local Mithapukur Akmal Market desk agent is reviewing your query. For urgent connection restorations, call our 24/7 Hotline directly at ' +
        BRANCH_INFO.phone;
    }

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `m-${Date.now()}`,
          sender: 'agent',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1200);
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `m-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');

    generateAutoReply(text);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      {/* Closed Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={handleOpenChat}
          disabled={isLauncherLoading}
          className="group relative flex items-center gap-2.5 bg-gradient-to-r from-blue-600 via-sky-500 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl shadow-blue-600/50 transition-all transform hover:scale-105 active:scale-95 cursor-pointer border border-blue-400/30 disabled:opacity-85"
          aria-label="Open Mithapukur Fiber Support Chat"
        >
          <div className="relative flex items-center justify-center">
            {isLauncherLoading ? (
              <Loader2 className="h-6 w-6 text-white animate-spin" />
            ) : (
              <>
                <MessageSquare className="h-6 w-6 text-white" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white border border-white">
                    {unreadCount}
                  </span>
                )}
              </>
            )}
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="font-extrabold text-xs tracking-wide flex items-center gap-1.5">
              {isLauncherLoading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 text-sky-200 animate-spin" />
                  <span>Connecting Node...</span>
                </>
              ) : (
                'Delta Support Desk'
              )}
            </span>
            <span className="text-[10px] text-emerald-200 font-semibold flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Mithapukur Node Active
            </span>
          </div>
        </button>
      )}

      {/* Expanded Support Chat Window */}
      {isOpen && (
        <div className="w-[340px] sm:w-[380px] h-[520px] bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header Bar */}
          <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 px-4 py-3 border-b border-slate-800 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  {chatMode === 'messenger' ? (
                    <div className="h-9 w-9 rounded-full bg-[#0084FF]/20 border border-[#0084FF]/40 text-[#0084FF] flex items-center justify-center font-bold">
                      <svg className="h-5 w-5 fill-current text-[#0084FF]" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.301 2.246.464 3.443.464 6.627 0 12-4.974 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26 6.559-6.963 3.13 3.259 5.889-3.259-6.56 6.964z"/>
                      </svg>
                    </div>
                  ) : (
                    <img
                      src={managerAvatar}
                      alt="Mahamudul Hasan - Manager"
                      className="h-9 w-9 rounded-full object-cover border-2 border-blue-400/80 shadow-md ring-2 ring-blue-500/30"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-950" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">
                    {chatMode === 'messenger' ? 'Delta Facebook Messenger' : 'Mithapukur Support Assistant'}
                  </h4>
                  <p className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                    <span>{chatMode === 'messenger' ? 'Manager Mahamudul Hasan' : '24/7 Fiber Hotline Active'}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Minimize Chat"
                >
                  <Minimize2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Close Chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex p-0.5 bg-slate-950/80 rounded-xl border border-slate-800/80 text-[11px] font-bold gap-0.5">
              <button
                onClick={() => setChatMode('web')}
                className={`flex-1 py-1 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
                  chatMode === 'web'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Bot className="h-3.5 w-3.5" />
                <span>Live Chat</span>
              </button>

              <button
                onClick={() => setChatMode('messenger')}
                className={`flex-1 py-1 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
                  chatMode === 'messenger'
                    ? 'bg-[#0084FF] text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <svg className="h-3.5 w-3.5 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.301 2.246.464 3.443.464 6.627 0 12-4.974 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26 6.559-6.963 3.13 3.259 5.889-3.259-6.56 6.964z"/>
                </svg>
                <span>Facebook Messenger</span>
              </button>

              {onOpenSupportTicket && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenSupportTicket();
                  }}
                  className="px-2 py-1 rounded-lg bg-rose-600/30 hover:bg-rose-600/50 text-rose-300 border border-rose-500/40 transition-all cursor-pointer flex items-center justify-center gap-1 shrink-0"
                  title="Create Support Ticket"
                >
                  <LifeBuoy className="h-3.5 w-3.5 text-rose-400" />
                  <span>Ticket</span>
                </button>
              )}
            </div>
          </div>

          {/* Chat Stream Body / Facebook Messenger View */}
          {chatMode === 'messenger' ? (
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950 text-xs flex flex-col justify-between">
              
              <div className="space-y-3">
                {/* Facebook Messenger Header Card */}
                <div className="bg-gradient-to-br from-blue-950/80 via-slate-900 to-slate-950 p-4 rounded-2xl border border-[#0084FF]/30 space-y-3 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-[#0084FF]/20 border border-[#0084FF]/40 rounded-xl text-[#0084FF] shrink-0">
                      <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.301 2.246.464 3.443.464 6.627 0 12-4.974 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26 6.559-6.963 3.13 3.259 5.889-3.259-6.56 6.964z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Delta Facebook Messenger Chat</h4>
                      <div className="flex flex-col gap-0.5 mt-0.5">
                        <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 inline-block w-max">
                          ● Messenger Lead: Mahamudul Hasan
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Connect directly on Facebook Messenger with Manager Mahamudul Hasan or our Mithapukur Fiber desk for instant help with new connections, bill checks, and fiber line status.
                  </p>
                </div>

                {/* Instant Direct Messenger Options */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-1">
                    Select Messenger Chat Option:
                  </span>

                  <a
                    href={BRANCH_INFO.messengerLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-blue-900/60 to-slate-900 hover:bg-[#0084FF]/30 border border-blue-500/40 text-slate-100 transition-colors group"
                  >
                    <span className="flex items-center gap-2">
                      <svg className="h-4 w-4 fill-current text-[#0084FF]" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.301 2.246.464 3.443.464 6.627 0 12-4.974 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26 6.559-6.963 3.13 3.259 5.889-3.259-6.56 6.964z"/>
                      </svg>
                      <span className="text-xs font-bold text-white">Direct Messenger Chat</span>
                    </span>
                    <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                  </a>

                  <a
                    href={BRANCH_INFO.facebookPageLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 hover:bg-[#0084FF]/20 border border-slate-800 hover:border-[#0084FF]/40 text-slate-200 transition-colors group"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#0084FF]">/facebook</span>
                      <span className="text-xs">Official Facebook Page</span>
                    </span>
                    <ChevronRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                  </a>

                  <a
                    href={`${BRANCH_INFO.messengerLink}?text=Bill%20Check`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 hover:bg-[#0084FF]/20 border border-slate-800 hover:border-[#0084FF]/40 text-slate-200 transition-colors group"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-amber-400">/bill</span>
                      <span className="text-xs">Check Bill & Instant bKash Payment</span>
                    </span>
                    <ChevronRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                  </a>

                  <a
                    href={`${BRANCH_INFO.messengerLink}?text=Report%20Fiber%20Outage`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 hover:bg-[#0084FF]/20 border border-slate-800 hover:border-[#0084FF]/40 text-slate-200 transition-colors group"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-rose-400">/los</span>
                      <span className="text-xs">Report Fiber Outage / Red Light</span>
                    </span>
                    <ChevronRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                  </a>

                  <a
                    href={`${BRANCH_INFO.messengerLink}?text=Coverage%20Check`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 hover:bg-[#0084FF]/20 border border-slate-800 hover:border-[#0084FF]/40 text-slate-200 transition-colors group"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-emerald-400">/coverage</span>
                      <span className="text-xs">Verify Union Fiber Availability</span>
                    </span>
                    <ChevronRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>

              {/* Messenger Primary Action Launcher */}
              <div className="pt-2 space-y-2">
                <a
                  href={BRANCH_INFO.messengerLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#0084FF] hover:bg-[#0073E6] text-white font-extrabold py-3 px-4 rounded-xl shadow-lg shadow-[#0084FF]/30 transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.301 2.246.464 3.443.464 6.627 0 12-4.974 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26 6.559-6.963 3.13 3.259 5.889-3.259-6.56 6.964z"/>
                  </svg>
                  <span>LAUNCH FACEBOOK MESSENGER</span>
                </a>

                <p className="text-[10px] text-center text-slate-500 font-mono">
                  Facebook: mahamudul.hasan.delta
                </p>
              </div>

            </div>
          ) : (
            <>
              {/* Chat Stream Body */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-950/80 text-xs">
                
                {/* Messenger Callout Banner inside Web Chat */}
                <div className="p-2.5 bg-gradient-to-r from-blue-950/90 to-slate-900 border border-[#0084FF]/30 rounded-2xl flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 fill-current text-[#0084FF] shrink-0" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.301 2.246.464 3.443.464 6.627 0 12-4.974 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26 6.559-6.963 3.13 3.259 5.889-3.259-6.56 6.964z"/>
                    </svg>
                    <span className="text-[11px] text-slate-200">Prefer Facebook Messenger?</span>
                  </div>
                  <button
                    onClick={() => setChatMode('messenger')}
                    className="text-[10px] font-bold text-[#0084FF] hover:underline bg-[#0084FF]/10 px-2.5 py-1 rounded-lg border border-[#0084FF]/20 cursor-pointer shrink-0"
                  >
                    Open Messenger →
                  </button>
                </div>

                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-blue-600 text-white rounded-tr-none'
                          : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-tl-none'
                      }`}
                    >
                      <p>{msg.text}</p>
                    </div>
                    <span className="text-[9px] text-slate-500 mt-1 px-1">{msg.timestamp}</span>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex items-center gap-2 text-slate-400 bg-slate-900/60 p-2.5 rounded-2xl border border-slate-800 w-28">
                    <Bot className="h-3.5 w-3.5 text-blue-400" />
                    <span className="text-[11px] animate-pulse">Thinking...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Preset Buttons */}
              <div className="p-2.5 bg-slate-900/90 border-t border-slate-800 space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 px-1 uppercase tracking-wider block">
                  Quick FAQ Suggestions:
                </span>
                <div className="flex flex-col gap-1 max-h-24 overflow-y-auto pr-1">
                  {PRESET_QUESTIONS.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q)}
                      className="text-left text-[11px] text-slate-300 hover:text-white bg-slate-950 hover:bg-blue-600/20 px-2.5 py-1.5 rounded-xl border border-slate-800/80 hover:border-blue-500/40 transition-colors truncate cursor-pointer flex items-center justify-between"
                    >
                      <span className="truncate">{q}</span>
                      <ChevronRight className="h-3 w-3 text-slate-500 shrink-0 ml-1" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your question..."
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white p-2 rounded-xl transition-all cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </>
          )}

          {/* Footer Call Shortcut */}
          <div className="bg-slate-900/80 px-3 py-1.5 text-[10px] text-slate-400 flex items-center justify-between border-t border-slate-800/80">
            <span>Urgent outage?</span>
            <a
              href={`tel:${BRANCH_INFO.phone.replace(/[^0-9]/g, '')}`}
              className="text-emerald-400 font-bold hover:underline flex items-center gap-1"
            >
              <Phone className="h-3 w-3" />
              Call Hotline: {BRANCH_INFO.phone}
            </a>
          </div>

        </div>
      )}
    </div>
  );
};
