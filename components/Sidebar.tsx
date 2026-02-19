
import React from 'react';
import { AppView } from '../types';

interface SidebarProps {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  const navItems = [
    { id: AppView.SLACK, label: 'Slack / Teams', icon: '💬' },
    { id: AppView.JIRA, label: 'Jira Comments', icon: '📋' },
    { id: AppView.VSCODE, label: 'VS Code Ext.', icon: '💻' },
  ];

  return (
    <aside className="w-64 border-r border-slate-800 flex flex-col bg-slate-950">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">O</div>
          <span className="text-2xl font-black text-white tracking-tighter italic">ORDINO</span>
        </div>
        
        <nav className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                currentView === item.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-slate-800">
        <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
          <p className="text-[10px] uppercase font-bold text-slate-500 mb-2">System Status</p>
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="text-slate-400">Coverage</span>
            <span className="text-blue-400">98.2%</span>
          </div>
          <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
            <div className="w-[98%] h-full bg-blue-500"></div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
