
import React from 'react';

interface BrainProps {
  active: boolean;
}

const OrdinoBrain: React.FC<BrainProps> = ({ active }) => {
  return (
    <div className="relative group">
      <div className={`absolute -inset-4 bg-blue-500/20 rounded-full blur-xl transition-opacity duration-700 ${active ? 'opacity-100' : 'opacity-0'}`}></div>
      <div className={`
        relative w-16 h-16 rounded-2xl bg-slate-900 border border-slate-700 
        flex items-center justify-center cursor-pointer transition-all duration-500
        ${active ? 'scale-110 border-blue-500 shadow-2xl shadow-blue-500/40' : 'hover:border-slate-500'}
      `}>
        <div className="relative flex items-center justify-center">
          <div className={`absolute w-8 h-8 rounded-full border-2 border-blue-400/30 ${active ? 'animate-ping' : ''}`}></div>
          <svg className={`w-8 h-8 transition-colors duration-500 ${active ? 'text-blue-400' : 'text-slate-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
      </div>
      <div className="absolute right-20 top-1/2 -translate-y-1/2 bg-slate-900 border border-slate-800 p-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        <p className="text-xs font-bold text-white mb-1">Ordino Intelligence</p>
        <p className="text-[10px] text-slate-400">Monitoring all SDLC signals...</p>
      </div>
    </div>
  );
};

export default OrdinoBrain;
