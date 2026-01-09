
import React from 'react';
import { ProjectState } from '../types';
// Fix: Added missing ShieldCheck import from lucide-react to resolve the reference error on line 80
import { Save, User, Briefcase, FileText, LayoutTemplate, ShieldCheck } from 'lucide-react';

const Settings: React.FC<{ state: ProjectState, setState: React.Dispatch<React.SetStateAction<ProjectState>> }> = ({ state, setState }) => {
  const handleChange = (field: keyof ProjectState, value: string) => {
    setState(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Project Settings</h2>
        <p className="text-slate-500">Global configuration for Jaffar Tayyar's PM framework.</p>
      </header>

      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="bg-indigo-900 p-8 text-white flex items-center gap-4">
          <div className="p-3 bg-indigo-800 rounded-2xl">
            <LayoutTemplate className="w-8 h-8 text-indigo-300" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Metadata Input</h3>
            <p className="text-indigo-300 text-sm">Configure the core parameters of your project.</p>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                <Briefcase size={14} className="text-indigo-500" />
                Project Name
              </label>
              <input 
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-slate-800"
                value={state.projectName}
                onChange={e => handleChange('projectName', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                <User size={14} className="text-indigo-500" />
                Project Owner
              </label>
              <input 
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-slate-800"
                value={state.owner}
                onChange={e => handleChange('owner', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <FileText size={14} className="text-indigo-500" />
              Management Methodology (3.1 & 5.2 Strategy)
            </label>
            <textarea 
              rows={5}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 leading-relaxed resize-none"
              placeholder="Describe how the schedule and stakeholders will be balanced..."
              value={state.scheduleManagementPlan}
              onChange={e => handleChange('scheduleManagementPlan', e.target.value)}
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-slate-500">
            <p className="text-xs italic">Changes are saved to the current session state.</p>
            <button className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">
              <Save size={18} /> Confirm Changes
            </button>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl flex items-start gap-4">
        <div className="p-2 bg-amber-100 rounded-lg shrink-0">
          <ShieldCheck className="text-amber-600 w-5 h-5" />
        </div>
        <div>
          <h4 className="font-bold text-amber-900 text-sm">System Validation</h4>
          <p className="text-amber-800 text-xs leading-relaxed mt-1">
            Ensure your project owner name is correctly set to <strong>JAFFAR TAYYAR</strong> to maintain compliance with your authorized framework signature.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
