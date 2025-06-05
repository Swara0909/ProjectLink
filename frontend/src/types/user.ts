export interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio: string;
  skills: string[];
  preferredProjectType: ('solo' | 'group')[];
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  needsMentor: boolean;
  isMentor?: boolean;
  onboardingCompleted?: boolean;
  joinedDate?: string;
  projectsCompleted?: number;
  githubUrl?: string;
  linkedinUrl?: string;
} 