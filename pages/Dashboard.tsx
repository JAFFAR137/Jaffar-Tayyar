
import React from 'react';
import { ProjectState, EngagementLevel } from '../types';
import { 
  Users, 
  Calendar, 
  Activity, 
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Dashboard: React.FC<{ state: ProjectState }> = ({ state }) => {
  const engagementData = [
    { name: 'Supportive', value: state.stakeholders.filter(s => s.currentEngagement === EngagementLevel.SUPPORTIVE).length },
    { name: 'Resistant', value: state.stakeholders.filter(s => s.currentEngagement === EngagementLevel.RESISTANT).length },
    { name: 'Neutral', value: state.stakeholders.filter(s => s.currentEngagement === EngagementLevel.NEUTRAL).length },
    { name: 'Leading', value: state.stakeholders.filter(s => s.currentEngagement === EngagementLevel.LEADING).length },
  ];

  const COLORS = ['#6366f1', '#f43f5e', '#94a3b8', '#10b981'];

  const milestoneData = state.milestones.map(m => ({
    name: m.title,
    status: m.status === 'on-track' ? 100 : m.status === 'delayed' ? 50 : 0
  }));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Project Overview</h1>
          <p className="text-slate-500 font-medium">Monitoring PMBOK Processes Flow (v8.0)</p>
        </div>
        <div className="bg-indigo-50 border border-indigo-100 px-6 py-3 rounded-xl">
          <span className="text-indigo-400 text-xs font-bold uppercase tracking-widest block">Authorized Dashboard</span>
          <span className="text-indigo-900 font-black text-xl italic tracking-wider">JAFFAR TAYYAR</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Stakeholders (5.2)" 
          value={state.stakeholders.length} 
          icon={<Users className="w-6 h-6 text-blue-500" />}
          trend="+2 New this week"
          color="blue"
        />
        <StatCard 
          label="Active Milestones (3.1)" 
          value={state.milestones.length} 
          icon={<Calendar className="w-6 h-6 text-indigo-500" />}
          trend="Next: June 15"
          color="indigo"
        />
        <StatCard 
          label="System Health" 
          value="Optimal" 
          icon={<Activity className="w-6 h-6 text-emerald-500" />}
          trend="PMBOK Verified"
          color="emerald"
        />
        <StatCard 
          label="Pending Risks" 
          value="3" 
          icon={<AlertCircle className="w-6 h-6 text-amber-500" />}
          trend="Action required"
          color="amber"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-500" />
            Stakeholder Engagement Distribution
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={engagementData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {engagementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {engagementData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                <span className="text-xs font-medium text-slate-600">{d.name}: {d.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-500" />
            Schedule Performance Index (SPI)
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={milestoneData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="status" fill="#6366f1" radius={[8, 8, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-slate-500 text-center mt-4">
            Progress tracked against original Plan Schedule Management (3.1)
          </p>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ label: string, value: string | number, icon: React.ReactNode, trend: string, color: string }> = ({ label, value, icon, trend, color }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 transition-all hover:shadow-md group">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl bg-${color}-50 group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <span className="text-slate-400 text-xs font-semibold">Live Data</span>
      </div>
      <div className="space-y-1">
        <h4 className="text-slate-500 text-sm font-medium">{label}</h4>
        <div className="text-2xl font-bold text-slate-900">{value}</div>
      </div>
      <div className="mt-4 pt-4 border-t border-slate-50 flex items-center gap-2 text-xs font-semibold text-slate-500">
        {trend}
      </div>
    </div>
  );
};

export default Dashboard;
