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
  LifeBuoy
} from 'lucide-react';
import { BRANCH_INFO } from '../data/plans';

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
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);

  const [chatMode, setChatMode] = useState<'web' | 'telegram'>('web');

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'bot',
      text: 'Assalamu Alaikum! Welcome to Delta Mithapukur Fiber Support Desk. You can chat here or connect directly with our Telegram Live Bot for instant response.',
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
    setIsOpen(true);
    setUnreadCount(0);
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
          className="group relative flex items-center gap-2.5 bg-gradient-to-r from-blue-600 via-sky-500 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl shadow-blue-600/50 transition-all transform hover:scale-105 active:scale-95 cursor-pointer border border-blue-400/30"
          aria-label="Open Mithapukur Fiber Support Chat"
        >
          <div className="relative">
            <MessageSquare className="h-6 w-6 text-white" />
            {unreadCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white border border-white">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="font-extrabold text-xs tracking-wide">Delta Support Desk</span>
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
                  <div className="h-9 w-9 rounded-full bg-blue-600/30 border border-blue-500/40 text-blue-400 flex items-center justify-center font-bold">
                    {chatMode === 'telegram' ? (
                      <svg className="h-5 w-5 fill-current text-[#26A5E4]" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.122.099.155.232.17.327.016.096.035.313.019.485z"/>
                      </svg>
                    ) : (
                      <Bot className="h-5 w-5" />
                    )}
                  </div>
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-950" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">
                    {chatMode === 'telegram' ? 'Delta Telegram Live Bot' : 'Mithapukur Support Assistant'}
                  </h4>
                  <p className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                    <span>{chatMode === 'telegram' ? BRANCH_INFO.telegramBotUsername : '24/7 Fiber Hotline Active'}</span>
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
                <span>Web Chat</span>
              </button>

              <button
                onClick={() => setChatMode('telegram')}
                className={`flex-1 py-1 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
                  chatMode === 'telegram'
                    ? 'bg-[#26A5E4] text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Send className="h-3.5 w-3.5" />
                <span>Telegram</span>
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

          {/* Chat Stream Body / Telegram View */}
          {chatMode === 'telegram' ? (
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950 text-xs flex flex-col justify-between">
              
              <div className="space-y-3">
                {/* Telegram Bot & Direct Number Header Card */}
                <div className="bg-gradient-to-br from-blue-950/80 via-slate-900 to-slate-950 p-4 rounded-2xl border border-[#26A5E4]/30 space-y-3 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-[#26A5E4]/20 border border-[#26A5E4]/40 rounded-xl text-[#26A5E4] shrink-0">
                      <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.122.099.155.232.17.327.016.096.035.313.019.485z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Delta Telegram Live Chat</h4>
                      <div className="flex flex-col gap-0.5 mt-0.5">
                        <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 inline-block w-max">
                          ● Chat Number: {BRANCH_INFO.telegramNumber}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Chat live on Telegram via Number <strong className="text-white font-mono">{BRANCH_INFO.telegramNumber}</strong> or use our automated Telegram Bot for instant status checks and bill receipts.
                  </p>
                </div>

                {/* Instant Direct Chat / Bot Command Shortcuts */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-1">
                    Select Telegram Chat Option:
                  </span>

                  <a
                    href={BRANCH_INFO.telegramDirectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-blue-900/60 to-slate-900 hover:bg-[#26A5E4]/30 border border-blue-500/40 text-slate-100 transition-colors group"
                  >
                    <span className="flex items-center gap-2">
                      <svg className="h-4 w-4 fill-current text-[#26A5E4]" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.122.099.155.232.17.327.016.096.035.313.019.485z"/>
                      </svg>
                      <span className="text-xs font-bold text-white">Direct Chat: {BRANCH_INFO.telegramNumber}</span>
                    </span>
                    <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                  </a>

                  <a
                    href={`${BRANCH_INFO.telegramBotLink}?start=bill_check`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 hover:bg-[#26A5E4]/20 border border-slate-800 hover:border-[#26A5E4]/40 text-slate-200 transition-colors group"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#26A5E4]">/bill</span>
                      <span className="text-xs">Check Bill & Instant bKash Pay</span>
                    </span>
                    <ChevronRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                  </a>

                  <a
                    href={`${BRANCH_INFO.telegramBotLink}?start=report_los`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 hover:bg-[#26A5E4]/20 border border-slate-800 hover:border-[#26A5E4]/40 text-slate-200 transition-colors group"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-rose-400">/los</span>
                      <span className="text-xs">Report Fiber Outage / Red Light</span>
                    </span>
                    <ChevronRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                  </a>

                  <a
                    href={`${BRANCH_INFO.telegramBotLink}?start=coverage`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 hover:bg-[#26A5E4]/20 border border-slate-800 hover:border-[#26A5E4]/40 text-slate-200 transition-colors group"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-emerald-400">/coverage</span>
                      <span className="text-xs">Verify Union Fiber Line Availability</span>
                    </span>
                    <ChevronRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                  </a>

                  <a
                    href={`${BRANCH_INFO.telegramBotLink}?start=manager_chat`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 hover:bg-[#26A5E4]/20 border border-slate-800 hover:border-[#26A5E4]/40 text-slate-200 transition-colors group"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-amber-400">/manager</span>
                      <span className="text-xs">Talk to Manager Mahamudul Hasan</span>
                    </span>
                    <ChevronRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>

              {/* Telegram Primary Action Launcher */}
              <div className="pt-2 space-y-2">
                <a
                  href={BRANCH_INFO.telegramBotLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#26A5E4] hover:bg-[#2094ce] text-white font-extrabold py-3 px-4 rounded-xl shadow-lg shadow-[#26A5E4]/30 transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.122.099.155.232.17.327.016.096.035.313.019.485z"/>
                  </svg>
                  <span>LAUNCH TELEGRAM LIVE CHAT</span>
                </a>

                <p className="text-[10px] text-center text-slate-500 font-mono">
                  Bot Username: {BRANCH_INFO.telegramBotUsername}
                </p>
              </div>

            </div>
          ) : (
            <>
              {/* Chat Stream Body */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-950/80 text-xs">
                
                {/* Telegram Callout Banner inside Web Chat */}
                <div className="p-2.5 bg-gradient-to-r from-blue-950/90 to-slate-900 border border-[#26A5E4]/30 rounded-2xl flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 fill-current text-[#26A5E4] shrink-0" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.122.099.155.232.17.327.016.096.035.313.019.485z"/>
                    </svg>
                    <span className="text-[11px] text-slate-200">Prefer Telegram?</span>
                  </div>
                  <button
                    onClick={() => setChatMode('telegram')}
                    className="text-[10px] font-bold text-[#26A5E4] hover:underline bg-[#26A5E4]/10 px-2.5 py-1 rounded-lg border border-[#26A5E4]/20 cursor-pointer shrink-0"
                  >
                    Open Telegram Bot →
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
