
import React, { useState, useRef, useEffect } from 'react';
import { getOrdinoResponse } from '../geminiService';

const VSCodeSimulation: React.FC = () => {
  const [terminalHistory, setTerminalHistory] = useState<{ type: 'input' | 'output', text: string }[]>([
    { type: 'output', text: 'Ordino Agent v2.4.0 - Autonomous QA Layer Connected.' },
    { type: 'output', text: 'Ready to assist with test automation and code quality. Type "ordino help" or just ask a question.' }
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const termEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    termEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  const handleTerminalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const input = terminalInput;
    setTerminalInput('');
    setTerminalHistory(prev => [...prev, { type: 'input', text: input }]);
    setIsProcessing(true);

    const context = "Test automation engineer using VS Code terminal. Asking for help with test code, debugging, or test generation.";
    const response = await getOrdinoResponse(context, input, 'terminal');

    setIsProcessing(false);
    setTerminalHistory(prev => [...prev, { type: 'output', text: response }]);
  };

  return (
    <div className="h-full bg-[#1e1e1e] flex flex-col font-mono text-sm overflow-hidden rounded-xl border border-slate-800 shadow-2xl">
      {/* Top Editor Area */}
      <div className="h-2/5 flex border-b border-slate-800">
        <div className="w-10 bg-[#1e1e1e] text-[#858585] text-right pr-2 py-4 select-none">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <div className="flex-1 p-4 text-blue-300">
          <span className="text-purple-400">describe</span>(<span className="text-amber-200">'Checkout Flow'</span>, () =&gt; &#123;<br/>
          &nbsp;&nbsp;<span className="text-purple-400">it</span>(<span className="text-amber-200">'should handle invalid credit cards'</span>, <span className="text-purple-400">async</span> () =&gt; &#123;<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-500">// Ordino suggested adding a timeout here</span><br/>
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">await</span> page.<span className="text-yellow-200">goto</span>(<span className="text-amber-200">'/checkout'</span>);<br/>
          &nbsp;&nbsp;&#125;);<br/>
          &#125;);
        </div>
      </div>

      {/* Terminal Area */}
      <div className="flex-1 flex flex-col bg-[#0c0c0c] p-2 overflow-hidden">
        <div className="flex items-center gap-4 text-[10px] uppercase font-bold text-slate-500 px-2 py-1 border-b border-slate-800 mb-2">
          <span className="text-blue-400 border-b-2 border-blue-400 pb-1">Terminal</span>
          <span>Output</span>
          <span>Debug Console</span>
          <div className="ml-auto flex gap-2">
            <span className="text-green-500">● Ordino Active</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {terminalHistory.map((item, i) => (
            <div key={i} className={item.type === 'input' ? 'text-white' : 'text-green-400'}>
              {item.type === 'input' && <span className="text-blue-500 mr-2">➜ ordino-cli</span>}
              {item.type === 'output' && <span className="text-slate-500 mr-2">[Ordino]</span>}
              <span className="whitespace-pre-wrap">{item.text}</span>
            </div>
          ))}
          {isProcessing && (
            <div className="text-blue-400 animate-pulse flex items-center gap-2">
               <span>[Ordino] Thinking...</span>
            </div>
          )}
          <div ref={termEndRef} />
        </div>

        <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 p-2 border-t border-slate-800">
          <span className="text-blue-500 font-bold">➜</span>
          <input
            type="text"
            autoFocus
            value={terminalInput}
            onChange={(e) => setTerminalInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder-slate-700"
            placeholder="Ask Ordino to 'Generate playwright test for login' or 'Check for logic bugs'..."
          />
        </form>
      </div>
    </div>
  );
};

export default VSCodeSimulation;
