
import React, { useState } from 'react';
import { ProjectState, Stakeholder, EngagementLevel } from '../types';
import { UserPlus, Star, Target, Zap, X, Save } from 'lucide-react';

const StakeholderManager: React.FC<{ state: ProjectState, setState: React.Dispatch<React.SetStateAction<ProjectState>> }> = ({ state, setState }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newStakeholder, setNewStakeholder] = useState({
    name: '',
    role: '',
    power: 5,
    interest: 5,
    desiredEngagement: EngagementLevel.SUPPORTIVE
  });

  const toggleEngagement = (id: string) => {
    const levels = Object.values(EngagementLevel);
    setState(prev => ({
      ...prev,
      stakeholders: prev.stakeholders.map(s => {
        if (s.id === id) {
          const currentIndex = levels.indexOf(s.currentEngagement);
          const nextIndex = (currentIndex + 1) % levels.length;
          return { ...s, currentEngagement: levels[nextIndex] };
        }
        return s;
      })
    }));
  };

  const handleAddStakeholder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStakeholder.name || !newStakeholder.role) return;

    const stakeholder: Stakeholder = {
      id: Math.random().toString(36).substr(2, 9),
      name: newStakeholder.name,
      role: newStakeholder.role,
      power: newStakeholder.power,
      interest: newStakeholder.interest,
      currentEngagement: EngagementLevel.UNAWARE,
      desiredEngagement: newStakeholder.desiredEngagement
    };

    setState(prev => ({ ...prev, stakeholders: [...prev.stakeholders, stakeholder] }));
    setNewStakeholder({ name: '', role: '', power: 5, interest: 5, desiredEngagement: EngagementLevel.SUPPORTIVE });
    setIsFormOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">5.2 Plan Stakeholder Engagement</h2>
          <p className="text-slate-500 mt-1 text-sm md:text-base">Strategies for effective stakeholder participation throughout the project life cycle.</p>
        </div>
        <button 
          onClick={() => setIsFormOpen(!isFormOpen)}
          className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-all ${
            isFormOpen ? 'bg-slate-200 text-slate-700' : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {isFormOpen ? <X size={20} /> : <UserPlus size={20} />}
          {isFormOpen ? 'Cancel' : 'Identify New'}
        </button>
      </div>

      {isFormOpen && (
        <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-indigo-100 animate-in slide-in-from-top-4 duration-300">
          <form onSubmit={handleAddStakeholder} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Stakeholder Name</label>
              <input 
                required
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g. Operations Director"
                value={newStakeholder.name}
                onChange={e => setNewStakeholder({...newStakeholder, name: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Role / Department</label>
              <input 
                required
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g. Steering Committee"
                value={newStakeholder.role}
                onChange={e => setNewStakeholder({...newStakeholder, role: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Power (1-10): {newStakeholder.power}</label>
              <input 
                type="range" min="1" max="10" 
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 mt-4"
                value={newStakeholder.power}
                onChange={e => setNewStakeholder({...newStakeholder, power: parseInt(e.target.value)})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Desired Engagement</label>
              <select 
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                value={newStakeholder.desiredEngagement}
                onChange={e => setNewStakeholder({...newStakeholder, desiredEngagement: e.target.value as EngagementLevel})}
              >
                {Object.values(EngagementLevel).map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2 lg:col-span-4 flex justify-end">
               <button 
                type="submit"
                className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 shadow-md"
              >
                <Save size={18} /> Register Stakeholder
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-6">
          <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-slate-200">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-widest border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Stakeholder</th>
                  <th className="px-6 py-4">Influence</th>
                  <th className="px-6 py-4">Current Engagement</th>
                  <th className="px-6 py-4">Desired</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {state.stakeholders.map(s => (
                  <tr key={s.id} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800">{s.name}</div>
                      <div className="text-xs text-indigo-500 font-medium">{s.role}</div>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className={`w-3 h-3 rounded-sm ${i < (s.power / 2) ? 'bg-amber-400' : 'bg-slate-200'}`} />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        s.currentEngagement === EngagementLevel.LEADING ? 'bg-emerald-100 text-emerald-700' :
                        s.currentEngagement === EngagementLevel.SUPPORTIVE ? 'bg-blue-100 text-blue-700' :
                        s.currentEngagement === EngagementLevel.RESISTANT ? 'bg-rose-100 text-rose-700' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {s.currentEngagement}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-400 text-xs italic">{s.desiredEngagement}</td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => toggleEngagement(s.id)}
                        className="text-indigo-600 hover:text-indigo-800 text-xs font-bold underline"
                      >
                        Adjust Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 italic">
              <Star className="text-amber-500" /> Matrix Analysis
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                <div className="flex items-center gap-3 mb-2">
                  <Target className="text-indigo-600 w-5 h-5" />
                  <span className="font-bold text-sm text-indigo-900">Engagement Gap</span>
                </div>
                <p className="text-xs text-indigo-700 leading-relaxed">
                  {state.stakeholders.filter(s => s.currentEngagement !== s.desiredEngagement).length} out of {state.stakeholders.length} stakeholders are not at their desired level.
                </p>
              </div>

              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="text-emerald-600 w-5 h-5" />
                  <span className="font-bold text-sm text-emerald-900">Strategy Engine</span>
                </div>
                <p className="text-xs text-emerald-700 leading-relaxed">
                  Jaffar's proprietary algorithm suggests targeted communication plans for high-power resistant groups.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakeholderManager;
