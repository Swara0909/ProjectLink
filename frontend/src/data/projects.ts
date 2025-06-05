import { AVAILABLE_SKILLS } from '../types/skills';

export interface Project {
  id: string;
  title: string;
  description: string;
  type: 'solo' | 'group';
  requiredLevel: 'beginner' | 'intermediate' | 'advanced';
  skills: string[];
  hasMentor: boolean;
  estimatedDuration: string;
}

export const PROJECTS: Project[] = [
  // Beginner Solo Projects
  {
    id: 'p1',
    title: 'Personal Portfolio Website',
    description: 'Create a responsive portfolio website to showcase your projects and skills.',
    type: 'solo',
    requiredLevel: 'beginner',
    skills: ['2', '4'], // Web Development, UI/UX Design
    hasMentor: true,
    estimatedDuration: '2-3 weeks'
  },
  {
    id: 'p2',
    title: 'Task Management CLI',
    description: 'Build a command-line task manager using Python with basic CRUD operations.',
    type: 'solo',
    requiredLevel: 'beginner',
    skills: ['1'], // Python
    hasMentor: true,
    estimatedDuration: '1-2 weeks'
  },

  // Beginner Group Projects
  {
    id: 'p3',
    title: 'Social Media Dashboard',
    description: 'Develop a simple social media analytics dashboard with a team.',
    type: 'group',
    requiredLevel: 'beginner',
    skills: ['2', '4'], // Web Development, UI/UX Design
    hasMentor: true,
    estimatedDuration: '3-4 weeks'
  },
  {
    id: 'p4',
    title: 'Recipe Sharing Platform',
    description: 'Create a platform where users can share and discover recipes.',
    type: 'group',
    requiredLevel: 'beginner',
    skills: ['1', '2'], // Python, Web Development
    hasMentor: true,
    estimatedDuration: '4-6 weeks'
  },

  // Intermediate Solo Projects
  {
    id: 'p5',
    title: 'AI Image Classifier',
    description: 'Build an image classification system using machine learning.',
    type: 'solo',
    requiredLevel: 'intermediate',
    skills: ['1', '3'], // Python, AI/ML
    hasMentor: true,
    estimatedDuration: '4-6 weeks'
  },
  {
    id: 'p6',
    title: 'E-commerce Product Page',
    description: 'Design and implement a responsive e-commerce product page with advanced features.',
    type: 'solo',
    requiredLevel: 'intermediate',
    skills: ['2', '4'], // Web Development, UI/UX Design
    hasMentor: false,
    estimatedDuration: '2-3 weeks'
  },

  // Intermediate Group Projects
  {
    id: 'p7',
    title: 'Real-time Chat Application',
    description: 'Build a real-time chat application with multiple rooms and features.',
    type: 'group',
    requiredLevel: 'intermediate',
    skills: ['1', '2'], // Python, Web Development
    hasMentor: true,
    estimatedDuration: '6-8 weeks'
  },
  {
    id: 'p8',
    title: 'Project Management Tool',
    description: 'Create a project management tool with task tracking and team collaboration features.',
    type: 'group',
    requiredLevel: 'intermediate',
    skills: ['2', '4'], // Web Development, UI/UX Design
    hasMentor: true,
    estimatedDuration: '8-10 weeks'
  },

  // Advanced Solo Projects
  {
    id: 'p9',
    title: 'Natural Language Processing API',
    description: 'Develop an API for text analysis and sentiment classification.',
    type: 'solo',
    requiredLevel: 'advanced',
    skills: ['1', '3'], // Python, AI/ML
    hasMentor: true,
    estimatedDuration: '6-8 weeks'
  },
  {
    id: 'p10',
    title: 'Design System Library',
    description: 'Create a comprehensive design system with reusable components.',
    type: 'solo',
    requiredLevel: 'advanced',
    skills: ['2', '4', '5'], // Web Development, UI/UX Design, Graphic Design
    hasMentor: false,
    estimatedDuration: '8-10 weeks'
  },

  // Advanced Group Projects
  {
    id: 'p11',
    title: 'AI-Powered Learning Platform',
    description: 'Build an adaptive learning platform using AI/ML algorithms.',
    type: 'group',
    requiredLevel: 'advanced',
    skills: ['1', '2', '3'], // Python, Web Development, AI/ML
    hasMentor: true,
    estimatedDuration: '12-16 weeks'
  },
  {
    id: 'p12',
    title: 'Social Network Platform',
    description: 'Develop a full-featured social networking platform with advanced features.',
    type: 'group',
    requiredLevel: 'advanced',
    skills: ['1', '2', '4'], // Python, Web Development, UI/UX Design
    hasMentor: true,
    estimatedDuration: '16-20 weeks'
  }
]; 