
import React, { useState } from 'react';
import { JiraTicket, Message } from '../types';
import { getOrdinoResponse } from '../geminiService';

const JiraSimulation: React.FC = () => {
  const [ticket, setTicket] = useState<JiraTicket>({
    id: 'ORD-911',
    title: 'Bug: Missing Rate Limiting on API /auth/token',
    description: 'Autonomous scan detected that the authentication endpoint does not implement rate limiting. This exposes the system to brute-force attacks and impacts the overall security quality of the SDLC.',
    status: 'To Do',
    comments: [
      { id: '1', sender: 'Ordino', content: 'I have auto-reported this bug based on my continuous security-focused QA monitoring. I suggest a 5 requests per minute limit for this endpoint.', timestamp: new Date(Date.now() - 3600000) }
    ]
  });
  const [commentInput, setCommentInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const addComment = async () => {
    if (!commentInput.trim()) return;

    const newComment: Message = {
      id: Date.now().toString(),
      sender: 'User',
      content: commentInput,
      timestamp: new Date()
    };

    setTicket(prev => ({ ...prev, comments: [...prev.comments, newComment] }));
    const currentInput = commentInput;
    setCommentInput('');

    // Only respond if Ordino is tagged
    if (currentInput.includes('@Ordino')) {
      setIsProcessing(true);
      const context = `Jira Bug Ticket ORD-911 reported by Ordino. User has tagged Ordino in a comment: "${currentInput}". Respond as the QA brain that found this bug.`;
      const response = await getOrdinoResponse(context, currentInput, 'jira');

      setIsProcessing(false);
      setTicket(prev => ({
        ...prev,
        comments: [...prev.comments, {
          id: (Date.now() + 1).toString(),
          sender: 'Ordino',
          content: response,
          timestamp: new Date()
        }]
      }));
    }
  };

  return (
    <div className="h-full bg-white text-slate-900 rounded-lg shadow-2xl overflow-hidden flex flex-col border border-slate-300">
      <div className="bg-[#0052CC] text-white px-4 py-2 flex items-center justify-between text-[11px] font-bold">
        <div className="flex items-center gap-2">
           <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M11.5 0L2 9.5l1.5 1.5L11.5 3l8 8 1.5-1.5z"/></svg>
           Jira Software
        </div>
        <div className="flex gap-4 opacity-80">
          <span>Dashboards</span>
          <span>Projects</span>
          <span>Issues</span>
          <span>Create</span>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-auto p-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
              <span>Ordino Platform</span> / <span>Issues</span> / <span className="font-bold">{ticket.id}</span>
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-600 p-1 rounded-sm">
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 leading-tight">{ticket.title}</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                    Description
                    <span className="text-[10px] font-normal text-slate-400">(Detected by Ordino)</span>
                  </h3>
                  <div className="p-5 bg-slate-50 rounded-lg border border-slate-200 text-sm leading-relaxed text-slate-700">
                    {ticket.description}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-800 mb-6 border-b border-slate-100 pb-2">Activity</h3>
                  <div className="space-y-6">
                    {ticket.comments.map(c => (
                      <div key={c.id} className="flex gap-4">
                        <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-xs ${c.sender === 'Ordino' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                          {c.sender[0]}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-slate-900">{c.sender === 'Ordino' ? 'Ordino AI' : 'Sarah Jenkins'}</span>
                            <span className="text-[10px] text-slate-400">2 hours ago</span>
                            {c.sender === 'Ordino' && <span className="bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase border border-blue-100">Reporter</span>}
                          </div>
                          <div className="text-sm text-slate-700">
                             {/* Highlight @Ordino mention */}
                             {c.content.split(/(@Ordino)/g).map((part, i) => 
                               part === '@Ordino' ? <span key={i} className="text-blue-600 font-bold bg-blue-50 px-1 rounded">@Ordino</span> : part
                             )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {isProcessing && (
                      <div className="flex gap-4 opacity-60">
                         <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs">O</div>
                         <div className="italic text-xs py-2">Ordino is typing a response...</div>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex-shrink-0"></div>
                    <div className="flex-1">
                      <textarea
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        placeholder="Tag @Ordino to ask for clarification or test evidence..."
                        className="w-full h-24 p-4 border border-slate-300 rounded focus:ring-2 focus:ring-[#0052CC] focus:outline-none text-sm shadow-sm transition-all"
                      />
                      <div className="mt-2 flex justify-between items-center">
                        <button 
                          onClick={addComment}
                          className="bg-[#0052CC] text-white px-5 py-2 rounded text-xs font-bold hover:bg-[#0747A6] shadow-sm transition-colors"
                        >
                          Add Comment
                        </button>
                        <span className="text-[10px] text-slate-400 italic">Mention <b>@Ordino</b> to trigger AI brain</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 shadow-sm">
                  <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-4">Details</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Status</span>
                      <span className="bg-slate-200 px-2 py-0.5 rounded text-[10px] font-bold uppercase">{ticket.status}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Priority</span>
                      <span className="text-red-600 font-bold flex items-center gap-1">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 21h22L12 2zm0 3.5L19.5 19h-15L12 5.5z"/></svg>
                        Highest
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Reporter</span>
                      <span className="font-bold text-blue-600">Ordino AI</span>
                    </div>
                    <div className="flex justify-between items-center text-xs pt-4 border-t border-slate-200">
                      <span className="text-slate-500">Confidence</span>
                      <span className="text-green-600 font-bold">99.4%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JiraSimulation;
