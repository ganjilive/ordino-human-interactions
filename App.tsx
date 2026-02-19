
import React, { useState, useEffect } from 'react';
import { AppView } from './types';
import Sidebar from './components/Sidebar';
import SlackSimulation from './components/SlackSimulation';
import JiraSimulation from './components/JiraSimulation';
import VSCodeSimulation from './components/VSCodeSimulation';
import OrdinoBrain from './components/OrdinoBrain';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.SLACK);
  const [isBrainActive, setIsBrainActive] = useState(false);

  // Global "Activity" simulator for the Brain
  useEffect(() => {
    const interval = setInterval(() => {
      setIsBrainActive(true);
      setTimeout(() => setIsBrainActive(false), 2000);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const renderView = () => {
    switch (currentView) {
      case AppView.SLACK:
        return <SlackSimulation />;
      case AppView.JIRA:
        return <JiraSimulation />;
      case AppView.VSCODE:
        return <VSCodeSimulation />;
      default:
        return <SlackSimulation />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-950 text-slate-200">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-950/50 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold tracking-tight text-white uppercase">
              {currentView} <span className="text-blue-500">Prototype</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">
              <div className={`w-2 h-2 rounded-full ${isBrainActive ? 'bg-blue-400 animate-pulse' : 'bg-slate-600'}`}></div>
              <span className="text-xs font-medium text-blue-400">Ordino Core: {isBrainActive ? 'Thinking' : 'Monitoring'}</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-900/30">
          {renderView()}
        </div>

        {/* Floating Brain Visualizer - Shows Ordino is "Everywhere" */}
        <div className="absolute bottom-8 right-8 z-50">
          <OrdinoBrain active={isBrainActive} />
        </div>
      </main>
    </div>
  );
};

export default App;
