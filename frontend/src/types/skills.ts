export interface Skill {
  id: string;
  name: string;
  category?: string;
}

export const AVAILABLE_SKILLS: Skill[] = [
  { id: 'react', name: 'React' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'javascript', name: 'JavaScript' },
  { id: 'python', name: 'Python' },
  { id: 'node', name: 'Node.js' },
  { id: 'java', name: 'Java' },
  { id: 'spring', name: 'Spring' },
  { id: 'machine-learning', name: 'Machine Learning' },
  { id: 'data-science', name: 'Data Science' },
  { id: 'css', name: 'CSS' },
  { id: 'html', name: 'HTML' },
  { id: 'ui-design', name: 'UI Design' },
  { id: 'figma', name: 'Figma' },
  { id: 'postgresql', name: 'PostgreSQL' },
  { id: 'django', name: 'Django' },
  { id: 'vue', name: 'Vue.js' },
  { id: 'react-native', name: 'React Native' },
  { id: 'mobile-dev', name: 'Mobile Development' },
  { id: 'microservices', name: 'Microservices' },
  { id: 'angular', name: 'Angular' },
  { id: 'rxjs', name: 'RxJS' },
  { id: 'devops', name: 'DevOps' },
  { id: 'aws', name: 'AWS' },
  { id: 'docker', name: 'Docker' },
  { id: 'blockchain', name: 'Blockchain' },
  { id: 'solidity', name: 'Solidity' },
  { id: 'web3', name: 'Web3' },
  { id: 'tensorflow', name: 'TensorFlow' },
  { id: 'express', name: 'Express.js' }
]; 