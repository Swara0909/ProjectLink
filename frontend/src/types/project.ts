export interface Project {
  id: string;
  title: string;
  description: string;
  skills: string[];
  type: 'solo' | 'group';
  status: 'not-started' | 'in-progress' | 'completed';
  mentors?: Array<{
    id: string;
    name: string;
    role: 'mentor';
  }>;
  requiredLevel: 'beginner' | 'intermediate' | 'advanced';
  createdAt: string;
  updatedAt: string;
} 