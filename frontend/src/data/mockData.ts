import { UserProfile } from '../types/user';
import { Project } from '../types/project';

export const mockPeers = [
  {
    id: 'p1',
    name: 'Alex Johnson',
    skills: ['react', 'typescript', 'node'],
    bio: 'Frontend developer passionate about React and TypeScript.',
    experienceLevel: 'intermediate',
    isMentor: false
  },
  {
    id: 'p2',
    name: 'Sarah Chen',
    skills: ['python', 'machine-learning', 'data-science'],
    bio: 'ML enthusiast working on deep learning projects.',
    experienceLevel: 'advanced',
    isMentor: false
  },
  {
    id: 'p3',
    name: 'Mike Brown',
    skills: ['javascript', 'react', 'css'],
    bio: 'Web developer learning modern frontend technologies.',
    experienceLevel: 'beginner',
    isMentor: false
  }
];

export const mockMentors = [
  {
    id: 'm1',
    name: 'Dr. Emily Zhang',
    skills: ['python', 'machine-learning', 'data-science'],
    bio: 'Senior Data Scientist with 10 years of experience.',
    experienceLevel: 'advanced',
    isMentor: true,
    specialization: 'Machine Learning',
    availability: 'Weekends'
  },
  {
    id: 'm2',
    name: 'James Wilson',
    skills: ['react', 'typescript', 'node'],
    bio: 'Tech Lead at a major tech company.',
    experienceLevel: 'advanced',
    isMentor: true,
    specialization: 'Web Development',
    availability: 'Evenings'
  }
];

export const mockProjects = [
  {
    id: 'proj1',
    title: 'AI Image Recognition App',
    description: 'Build an AI-powered image recognition application using Python and TensorFlow.',
    skills: ['python', 'machine-learning', 'tensorflow'],
    type: 'group',
    status: 'in-progress',
    requiredLevel: 'intermediate',
    members: [],
    mentors: []
  },
  {
    id: 'proj2',
    title: 'React Portfolio Builder',
    description: 'Create a portfolio website builder using React and TypeScript.',
    skills: ['react', 'typescript', 'css'],
    type: 'solo',
    status: 'open',
    requiredLevel: 'beginner',
    members: [],
    mentors: []
  },
  {
    id: 'proj3',
    title: 'Node.js REST API',
    description: 'Develop a RESTful API using Node.js and Express.',
    skills: ['node', 'javascript', 'express'],
    type: 'group',
    status: 'open',
    requiredLevel: 'intermediate',
    members: [],
    mentors: []
  }
];

// Initialize mock data in localStorage
export const initializeMockData = () => {
  if (!localStorage.getItem('peers')) {
    localStorage.setItem('peers', JSON.stringify(mockPeers));
  }
  if (!localStorage.getItem('mentors')) {
    localStorage.setItem('mentors', JSON.stringify(mockMentors));
  }
  if (!localStorage.getItem('projects')) {
    localStorage.setItem('projects', JSON.stringify(mockProjects));
  }
}; 