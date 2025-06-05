import { AVAILABLE_SKILLS } from '../types/skills';

export interface Mentor {
  id: string;
  name: string;
  role: string;
  experience: string;
  skills: string[];
  bio: string;
  availability: string;
}

export const MENTORS: Mentor[] = [
  {
    id: 'm1',
    name: 'Dr. Sarah Chen',
    role: 'Senior Software Architect',
    experience: '12 years',
    skills: ['1', '2', '3'], // Python, Web Development, AI/ML
    bio: 'Experienced software architect specializing in scalable web applications and machine learning systems.',
    availability: 'Weekends'
  },
  {
    id: 'm2',
    name: 'James Wilson',
    role: 'Frontend Lead Developer',
    experience: '8 years',
    skills: ['2', '4'], // Web Development, UI/UX Design
    bio: 'Frontend expert with a passion for creating beautiful and accessible web applications.',
    availability: 'Evenings'
  },
  {
    id: 'm3',
    name: 'Maria Rodriguez',
    role: 'AI/ML Engineer',
    experience: '6 years',
    skills: ['1', '3'], // Python, AI/ML
    bio: 'Machine learning specialist focusing on computer vision and natural language processing.',
    availability: 'Flexible'
  },
  {
    id: 'm4',
    name: 'Alex Thompson',
    role: 'Full Stack Developer',
    experience: '10 years',
    skills: ['1', '2'], // Python, Web Development
    bio: 'Full stack developer with expertise in building scalable web applications and mentoring junior developers.',
    availability: 'Weekdays'
  },
  {
    id: 'm5',
    name: 'Emily Zhang',
    role: 'UX/UI Designer',
    experience: '7 years',
    skills: ['4', '5'], // UI/UX Design, Graphic Design
    bio: 'User experience designer specializing in creating intuitive and accessible interfaces.',
    availability: 'Weekends'
  },
  {
    id: 'm6',
    name: 'Michael Brown',
    role: 'DevOps Engineer',
    experience: '9 years',
    skills: ['1', '2'], // Python, Web Development
    bio: 'DevOps specialist with experience in cloud infrastructure and CI/CD pipelines.',
    availability: 'Flexible'
  }
]; 