
import React, { useState } from 'react';
import { ProjectState, Milestone } from '../types';
import { Plus, Calendar, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

const SchedulePlanner: React.FC<{ state: ProjectState, setState: React.Dispatch<React.SetStateAction<ProjectState>> }> = ({ state, setState }) => {
  const [newMilestone, setNewMilestone] = useState({ title: '', dueDate: '' });

  const addMilestone = () => {
    if (!newMilestone.title || !newMilestone.dueDate) return;
    const milestone: Milestone = {
      id: Math.random().toString(36).substr(2, 9),
      title: newMilestone.title,
      dueDate: newMilestone.dueDate,
      status: 'planned',
      assignedStakeholderId: state.stakeholders[0]?.id || ''
    };
    setState(prev => ({ ...prev, milestones: [...prev.milestones, milestone] }));
    setNewMilestone({ title: '', dueDate: '' });
  };

  const getStatusIcon = (status: Milestone['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="text-emerald-500 w-5 h-5" />;
      case 'delayed': return <AlertCircle className="text-rose-500 w-5 h-5" />;
      default: return <Clock className="text-indigo-500 w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-indigo-600 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">3.1 Plan Schedule Management</h2>
          <p className="opacity-90 max-w-xl">Establishing policies, procedures, and documentation for planning, developing, managing, executing, and controlling the project schedule.</p>
        </div>
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-indigo-500 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Calendar className="text-indigo-600" />
              Project Milestones
            </h3>
            <div className="space-y-4">
              {state.milestones.map(milestone => (
                <div key={milestone.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 group transition-all hover:bg-white hover:shadow-md">
                  <div className="flex items-center gap-4">
                    {getStatusIcon(milestone.status)}
                    <div>
                      <h4 className="font-bold text-slate-800">{milestone.title}</h4>
                      <p className="text-xs text-slate-500">Target: {new Date(milestone.dueDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${
                    milestone.status === 'on-track' ? 'bg-indigo-100 text-indigo-700' :
                    milestone.status === 'delayed' ? 'bg-rose-100 text-rose-700' :
                    'bg-slate-200 text-slate-600'
                  }`}>
                    {milestone.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold mb-4">Add New Milestone</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="Milestone Title"
                className="p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                value={newMilestone.title}
                onChange={e => setNewMilestone(prev => ({ ...prev, title: e.target.value }))}
              />
              <input 
                type="date" 
                className="p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                value={newMilestone.dueDate}
                onChange={e => setNewMilestone(prev => ({ ...prev, dueDate: e.target.value }))}
              />
            </div>
            <button 
              onClick={addMilestone}
              className="mt-4 w-full bg-indigo-600 text-white p-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100"
            >
              <Plus size={20} /> Add to Schedule
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Management Strategy</h3>
            <textarea 
              className="w-full h-48 bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm resize-none focus:ring-2 focus:ring-indigo-500 outline-none"
              value={state.scheduleManagementPlan}
              onChange={e => setState(prev => ({ ...prev, scheduleManagementPlan: e.target.value }))}
            />
          </div>
          <div className="p-6 bg-slate-900 text-white rounded-2xl shadow-xl">
            <h3 className="font-bold mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              Jaffar's Logic
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed italic">
              "A schedule without stakeholder buy-in is just a list of wishes. Every milestone must be anchored to a power player."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulePlanner;
