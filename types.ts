
export enum EngagementLevel {
  UNAWARE = 'Unaware',
  RESISTANT = 'Resistant',
  NEUTRAL = 'Neutral',
  SUPPORTIVE = 'Supportive',
  LEADING = 'Leading'
}

export interface Stakeholder {
  id: string;
  name: string;
  role: string;
  power: number; // 1-10
  interest: number; // 1-10
  currentEngagement: EngagementLevel;
  desiredEngagement: EngagementLevel;
}

export interface Milestone {
  id: string;
  title: string;
  dueDate: string;
  status: 'planned' | 'on-track' | 'delayed' | 'completed';
  assignedStakeholderId: string;
}

export interface ProjectState {
  projectName: string;
  owner: string;
  scheduleManagementPlan: string;
  stakeholders: Stakeholder[];
  milestones: Milestone[];
}
