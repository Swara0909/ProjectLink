import React, { useState } from 'react';
import { AVAILABLE_SKILLS } from '../types/skills';

interface InterestFormProps {
  onSubmit: (data: {
    selectedSkills: string[];
    projectType: 'solo' | 'group';
    experienceLevel: 'beginner' | 'intermediate' | 'advanced';
    needMentor: boolean;
  }) => void;
}

const InterestForm: React.FC<InterestFormProps> = ({ onSubmit }) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [projectType, setProjectType] = useState<'solo' | 'group'>('group');
  const [experienceLevel, setExperienceLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [needMentor, setNeedMentor] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      selectedSkills,
      projectType,
      experienceLevel,
      needMentor,
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Tell us about your interests</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Skills Selection */}
        <div>
          <label className="block text-lg font-medium mb-2">Select your skills and interests</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {AVAILABLE_SKILLS.map((skill) => (
              <label key={skill.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedSkills.includes(skill.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedSkills([...selectedSkills, skill.id]);
                    } else {
                      setSelectedSkills(selectedSkills.filter(id => id !== skill.id));
                    }
                  }}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span>{skill.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Project Type */}
        <div>
          <label className="block text-lg font-medium mb-2">Preferred Project Type</label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="solo"
                checked={projectType === 'solo'}
                onChange={(e) => setProjectType(e.target.value as 'solo' | 'group')}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span>Solo Projects</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="group"
                checked={projectType === 'group'}
                onChange={(e) => setProjectType(e.target.value as 'solo' | 'group')}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span>Group Projects</span>
            </label>
          </div>
        </div>

        {/* Experience Level */}
        <div>
          <label className="block text-lg font-medium mb-2">Experience Level</label>
          <select
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value as 'beginner' | 'intermediate' | 'advanced')}
            className="form-select w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        {/* Mentor Option */}
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={needMentor}
              onChange={(e) => setNeedMentor(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span>I would like to work with a mentor</span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Find Projects
        </button>
      </form>
    </div>
  );
};

export default InterestForm; 