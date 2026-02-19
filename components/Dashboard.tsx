
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: '08:00', issues: 12, quality: 85 },
  { name: '10:00', issues: 18, quality: 88 },
  { name: '12:00', issues: 8, quality: 92 },
  { name: '14:00', issues: 24, quality: 84 },
  { name: '16:00', issues: 14, quality: 91 },
  { name: '18:00', issues: 5, quality: 96 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-slate-400 text-sm font-medium mb-1">Requirement Quality</h3>
          <p className="text-3xl font-bold text-white">94%</p>
          <div className="mt-4 flex items-center text-xs text-green-400">
            <span className="mr-1">↑ 2.4%</span>
            <span className="text-slate-500">vs last sprint</span>
          </div>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-slate-400 text-sm font-medium mb-1">Prevented Escapes</h3>
          <p className="text-3xl font-bold text-white">42</p>
          <div className="mt-4 flex items-center text-xs text-blue-400">
            <span className="mr-1">★ Live Monitoring</span>
            <span className="text-slate-500">in VS Code & Jira</span>
          </div>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-slate-400 text-sm font-medium mb-1">Current Active Tasks</h3>
          <p className="text-3xl font-bold text-white">1,208</p>
          <div className="mt-4 flex items-center text-xs text-amber-400">
            <span className="mr-1">● 4 Critical</span>
            <span className="text-slate-500">awaiting review</span>
          </div>
        </div>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-bold text-white">Real-time Quality Index</h3>
          <div className="flex gap-2">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              Quality Score
            </div>
          </div>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorQuality" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#f1f5f9' }}
                itemStyle={{ color: '#3b82f6' }}
              />
              <Area type="monotone" dataKey="quality" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorQuality)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-4">Recent Autonomous Actions</h3>
          <div className="space-y-4">
            {[
              { time: '2m ago', action: 'Flagged vague requirement', source: 'Slack', user: 'Sarah J.' },
              { time: '15m ago', action: 'Suggested unit tests for PR-442', source: 'VS Code', user: 'Mike T.' },
              { time: '1h ago', action: 'Requested AC clarification', source: 'Jira', user: 'Dev Team B' },
              { time: '3h ago', action: 'Blocked deployment due to logic flaw', source: 'CI/CD', user: 'System' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-sm">
                  {item.source === 'Slack' ? '💬' : item.source === 'VS Code' ? '💻' : '📋'}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">{item.action}</p>
                  <p className="text-xs text-slate-500">{item.user} • {item.source}</p>
                </div>
                <div className="text-[10px] font-mono text-slate-500 uppercase">{item.time}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
            <span className="text-3xl">🚀</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">The Ordino Brain</h3>
          <p className="text-slate-400 text-sm max-w-sm mb-6">
            Ordino is connected to every tool in your SDLC. It doesn't just watch; it intervenes to maintain the highest standard of excellence.
          </p>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs font-bold text-slate-300">Slack Integration Active</div>
            <div className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs font-bold text-slate-300">Jira Sync Active</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
