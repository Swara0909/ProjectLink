import { AVAILABLE_SKILLS } from '../types/skills';

export interface SampleUser {
  id: string;
  name: string;
  email: string;
  bio: string;
  skills: string[];
  preferredProjectType: ('solo' | 'group')[];
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  needsMentor: boolean;
}

export const SAMPLE_USERS: SampleUser[] = [
  {
    id: 'u1',
    name: 'Alex Johnson',
    email: 'alex.j@example.com',
    bio: 'Frontend developer passionate about creating beautiful user interfaces.',
    skills: ['2', '4'], // Web Development, UI/UX Design
    preferredProjectType: ['solo', 'group'],
    experienceLevel: 'intermediate',
    needsMentor: true
  },
  {
    id: 'u2',
    name: 'Sarah Chen',
    email: 'sarah.c@example.com',
    bio: 'Machine learning enthusiast with a background in Python development.',
    skills: ['1', '3'], // Python, AI/ML
    preferredProjectType: ['group'],
    experienceLevel: 'advanced',
    needsMentor: false
  },
  {
    id: 'u3',
    name: 'Mike Brown',
    email: 'mike.b@example.com',
    bio: 'Beginner developer excited to learn and collaborate on projects.',
    skills: ['1', '2'], // Python, Web Development
    preferredProjectType: ['group'],
    experienceLevel: 'beginner',
    needsMentor: true
  },
  {
    id: 'u4',
    name: 'Emily Zhang',
    email: 'emily.z@example.com',
    bio: 'UX designer with a focus on creating intuitive user experiences.',
    skills: ['4', '5'], // UI/UX Design, Graphic Design
    preferredProjectType: ['solo', 'group'],
    experienceLevel: 'intermediate',
    needsMentor: false
  },
  {
    id: 'u5',
    name: 'David Kim',
    email: 'david.k@example.com',
    bio: 'Full-stack developer interested in building scalable web applications.',
    skills: ['1', '2'], // Python, Web Development
    preferredProjectType: ['solo'],
    experienceLevel: 'advanced',
    needsMentor: false
  }
]; 