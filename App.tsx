
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CalendarRange, 
  Users, 
  Scale, 
  Menu, 
  X, 
  ChevronRight,
  ShieldCheck,
  Settings as SettingsIcon
} from 'lucide-react';
import Dashboard from './pages/Dashboard';
import SchedulePlanner from './pages/SchedulePlanner';
import StakeholderManager from './pages/StakeholderManager';
import CheckBalance from './pages/CheckBalance';
import Settings from './pages/Settings';
import { ProjectState, EngagementLevel } from './types';

const INITIAL_STATE: ProjectState = {
  projectName: "Strategic Infrastructure 2025",
  owner: "JAFFAR TAYYAR",
  scheduleManagementPlan: "Hybrid methodology utilizing critical path for core milestones and iterative sprints for deliverables.",
  stakeholders: [
    { id: '1', name: 'Project Sponsor', role: 'Executive', power: 10, interest: 8, currentEngagement: EngagementLevel.SUPPORTIVE, desiredEngagement: EngagementLevel.LEADING },
    { id: '2', name: 'IT Department', role: 'Resource Team', power: 7, interest: 9, currentEngagement: EngagementLevel.NEUTRAL, desiredEngagement: EngagementLevel.SUPPORTIVE },
    { id: '3', name: 'Local Community', role: 'External', power: 4, interest: 10, currentEngagement: EngagementLevel.RESISTANT, desiredEngagement: EngagementLevel.NEUTRAL },
  ],
  milestones: [
    { id: 'm1', title: 'Phase 1 Completion', dueDate: '2025-06-15', status: 'on-track', assignedStakeholderId: '1' },
    { id: 'm2', title: 'Quality Assurance Review', dueDate: '2025-08-20', status: 'delayed', assignedStakeholderId: '2' },
  ]
};

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/schedule', label: '3.1 Schedule Planning', icon: CalendarRange },
    { path: '/stakeholders', label: '5.2 Stakeholder Plan', icon: Users },
    { path: '/check-balance', label: 'Check & Balance', icon: Scale },
    { path: '/settings', label: 'Project Settings', icon: SettingsIcon },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className="bg-indigo-950 text-white w-64 min-h-screen hidden md:flex flex-col fixed left-0 top-0 shadow-xl z-50">
        <div className="p-6 border-b border-indigo-900/50 flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-indigo-400" />
          <span className="font-bold text-xl tracking-tight italic">PM-Sync</span>
        </div>
        
        <div className="flex-1 py-8 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive(item.path) 
                  ? 'bg-indigo-600 shadow-lg shadow-indigo-900/40 text-white' 
                  : 'text-indigo-200 hover:bg-indigo-900/40'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive(item.path) ? 'text-white' : 'text-indigo-400 group-hover:text-white'}`} />
              <span className="font-medium text-sm">{item.label}</span>
              {isActive(item.path) && <ChevronRight className="w-4 h-4 ml-auto" />}
            </Link>
          ))}
        </div>

        <div className="p-6 mt-auto border-t border-indigo-900/50">
          <p className="text-[10px] text-indigo-400 uppercase tracking-widest font-bold mb-1">Lead Project Engineer</p>
          <p className="text-sm font-semibold text-white tracking-wide truncate">JAFFAR TAYYAR</p>
        </div>
      </nav>

      {/* Mobile Nav */}
      <div className="md:hidden bg-indigo-950 text-white p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
           <ShieldCheck className="w-6 h-6 text-indigo-400" />
           <span className="font-bold">PM-Sync</span>
        </div>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-indigo-950 z-40 pt-16 px-4">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-4 text-lg p-4 bg-indigo-900/30 rounded-lg text-white"
              >
                <item.icon /> {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default function App() {
  const [state, setState] = useState<ProjectState>(INITIAL_STATE);

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
        <Navigation />
        <main className="flex-1 md:ml-64 p-4 md:p-8">
          <Routes>
            <Route path="/" element={<Dashboard state={state} />} />
            <Route path="/schedule" element={<SchedulePlanner state={state} setState={setState} />} />
            <Route path="/stakeholders" element={<StakeholderManager state={state} setState={setState} />} />
            <Route path="/check-balance" element={<CheckBalance state={state} />} />
            <Route path="/settings" element={<Settings state={state} setState={setState} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
