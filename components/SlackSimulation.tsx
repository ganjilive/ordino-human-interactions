
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { getOrdinoResponse } from '../geminiService';

const SlackSimulation: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 'proactive-1', 
      sender: 'Ordino', 
      content: "👋 Hi! I've just reviewed the new requirement you documented in Jira (**ORD-102: Implement User Profile Settings**). \n\nI've flagged this as **Incomplete** and **Untestable**. You've mentioned users should be able to update their email, but there's no mention of validation rules (e.g., regex patterns) or whether a verification loop is required. \n\nHow should we handle email format validation and the verification process to ensure we maintain high quality standards?", 
      timestamp: new Date(Date.now() - 360000) 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), sender: 'User', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const context = "Ordino proactively reached out to the user in Slack because Jira ticket ORD-102 was found to be incomplete and untestable due to missing validation rules. The user is now responding to Ordino's critique.";
    const response = await getOrdinoResponse(context, input, 'slack');

    setIsTyping(false);
    setMessages(prev => [...prev, {
      id: (Date.now() + 1).toString(),
      sender: 'Ordino',
      content: response,
      timestamp: new Date()
    }]);
  };

  return (
    <div className="h-full flex flex-col bg-white text-slate-900 border border-slate-300 rounded-xl overflow-hidden shadow-2xl">
      {/* Slack Header */}
      <div className="p-4 border-b border-slate-200 bg-white flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-[#4A154B] flex items-center justify-center text-white font-bold text-lg">#</div>
          <div>
            <h2 className="text-sm font-black text-slate-800"># feature-discussion</h2>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <p className="text-[10px] text-slate-500 font-medium">Ordino (AI) is active</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
        {messages.map((msg) => (
          <div key={msg.id} className="group flex gap-3 hover:bg-slate-100/50 -mx-6 px-6 py-2 transition-colors">
            <div className={`w-9 h-9 rounded flex-shrink-0 flex items-center justify-center font-bold text-white ${msg.sender === 'Ordino' ? 'bg-[#1264A3]' : 'bg-[#E01E5A]'}`}>
              {msg.sender[0]}
            </div>
            <div className="flex-1">
              <div className="flex items-baseline gap-2 mb-0.5">
                <span className="text-sm font-black text-slate-900">{msg.sender === 'Ordino' ? 'Ordino AI' : 'John (Product)'}</span>
                <span className="text-[10px] text-slate-500">{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <div className="text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-3 px-6 py-2">
            <div className="w-9 h-9 rounded bg-[#1264A3] flex items-center justify-center font-bold text-white">O</div>
            <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-200 rounded-full h-fit">
               <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
               <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
               <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-slate-200">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
             <span className="text-xl">+</span>
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Discuss the requirement with Ordino..."
            className="w-full pl-10 pr-12 py-3 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1264A3] focus:border-transparent outline-none transition-all shadow-inner"
          />
          <button onClick={handleSend} className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#1264A3] hover:scale-110 transition-transform">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/></svg>
          </button>
        </div>
        <div className="mt-2 flex gap-4 text-[10px] text-slate-400 font-medium">
          <span className="flex items-center gap-1"><b>B</b> <i>I</i> <s>S</s></span>
          <span>&lt;/&gt; Code block</span>
        </div>
      </div>
    </div>
  );
};

export default SlackSimulation;
