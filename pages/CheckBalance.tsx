
import React, { useState, useEffect } from 'react';
import { ProjectState } from '../types';
import { getProjectAudit } from '../services/geminiService';
import { ShieldAlert, BrainCircuit, RefreshCw, Layers } from 'lucide-react';

const CheckBalance: React.FC<{ state: ProjectState }> = ({ state }) => {
  const [audit, setAudit] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const runAudit = async () => {
    setLoading(true);
    const result = await getProjectAudit(state);
    setAudit(result || 'No response from AI Auditor.');
    setLoading(false);
  };

  useEffect(() => {
    runAudit();
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in zoom-in-95 duration-500">
      <div className="text-center space-y-4 py-8">
        <h2 className="text-4xl font-black text-slate-900 tracking-tighter">PROJECT CHECK & BALANCE</h2>
        <div className="flex items-center justify-center gap-4 text-slate-400 font-bold tracking-widest text-xs">
          <span>PROCESS 3.1 (SCHEDULE)</span>
          <Layers className="w-4 h-4 text-indigo-400" />
          <span>PROCESS 5.2 (STAKEHOLDERS)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <ShieldAlert size={80} />
          </div>
          <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
            <BrainCircuit className="text-indigo-600" />
            AI Audit Analysis
          </h3>
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <RefreshCw className="w-10 h-10 text-indigo-600 animate-spin" />
              <p className="text-slate-400 font-medium italic">Consulting PMBOK 8th Ed. Logic...</p>
            </div>
          ) : (
            <div className="prose prose-slate max-w-none">
              <div className="whitespace-pre-line text-slate-700 leading-relaxed">
                {audit}
              </div>
            </div>
          )}

          <button 
            onClick={runAudit}
            disabled={loading}
            className="mt-8 w-full py-4 rounded-2xl bg-slate-900 text-white font-bold tracking-wide hover:bg-black transition-all disabled:opacity-50"
          >
            Refresh Audit
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-indigo-900 p-8 rounded-3xl text-white shadow-2xl relative">
            <h3 className="text-xl font-black italic tracking-widest mb-6 border-b border-indigo-800 pb-4">
              JAFFAR'S COMMAND CENTER
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-indigo-700 flex items-center justify-center shrink-0 font-bold">1</div>
                <div>
                  <h4 className="font-bold text-indigo-300 text-sm">Schedule Health (3.1)</h4>
                  <p className="text-xl font-bold">78% Alignment</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-indigo-700 flex items-center justify-center shrink-0 font-bold">2</div>
                <div>
                  <h4 className="font-bold text-indigo-300 text-sm">Engagement Index (5.2)</h4>
                  <p className="text-xl font-bold">Critical (Gap Detected)</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-indigo-700 flex items-center justify-center shrink-0 font-bold">3</div>
                <div>
                  <h4 className="font-bold text-indigo-300 text-sm">Risk Synchronization</h4>
                  <p className="text-xl font-bold">Unbalanced</p>
                </div>
              </div>
            </div>
            <div className="mt-10 p-4 bg-indigo-950/50 rounded-xl border border-indigo-800 italic text-xs text-indigo-400">
               "If the stakeholders aren't moving with the schedule, the schedule isn't moving." — Jaffar Tayyar
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Immediate Corrective Actions</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                Re-align Sponsor (ID 1) with Delayed Milestone (m2)
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                Execute Communication Plan 5.3 for IT Dept
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckBalance;
