import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AVAILABLE_SKILLS } from '../types/skills';
import { UserProfile } from '../types/user';
import { Project } from '../types/project';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<UserProfile>>({});

  useEffect(() => {
    // Load user data
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      navigate('/signin');
      return;
    }

    try {
      const userData = JSON.parse(userStr);
      setUser(userData);
      setEditForm(userData);

      // Load projects
      const projectsStr = localStorage.getItem('projects');
      if (projectsStr) {
        const projectsData = JSON.parse(projectsStr);
        setProjects(projectsData.filter((p: Project) => 
          p.status === 'in-progress' || p.status === 'completed'
        ));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      navigate('/signin');
    }
  }, [navigate]);

  const handleSaveProfile = () => {
    if (!user || !editForm) return;

    const updatedUser = {
      ...user,
      ...editForm
    };

    // Save to localStorage
    localStorage.setItem('user', JSON.stringify(updatedUser));

    // Update users array if it exists
    const usersStr = localStorage.getItem('users');
    if (usersStr) {
      try {
        const users = JSON.parse(usersStr);
        const updatedUsers = users.map((u: any) => 
          u.id === updatedUser.id ? updatedUser : u
        );
        localStorage.setItem('users', JSON.stringify(updatedUsers));
      } catch (error) {
        console.error('Error updating users array:', error);
      }
    }

    setUser(updatedUser);
    setIsEditing(false);

    // If mentor preference changed from false to true, show a confirmation dialog
    if (!user.needsMentor && updatedUser.needsMentor) {
      const wantToVisitMentorship = window.confirm(
        'Would you like to visit the mentorship page to find a mentor now?'
      );
      if (wantToVisitMentorship) {
        navigate('/mentorship');
      }
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm overflow-hidden"
          >
            <div className="px-6 py-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-2xl font-semibold text-blue-600">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                    <p className="text-gray-500">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>

              {isEditing ? (
                <div className="mt-8 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Bio</label>
                    <textarea
                      value={editForm.bio || ''}
                      onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Skills</label>
                    <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {AVAILABLE_SKILLS.map(skill => (
                        <button
                          key={skill.id}
                          type="button"
                          onClick={() => {
                            const skills = editForm.skills || [];
                            setEditForm({
                              ...editForm,
                              skills: skills.includes(skill.id)
                                ? skills.filter(id => id !== skill.id)
                                : [...skills, skill.id]
                            });
                          }}
                          className={`p-3 rounded-lg text-left ${
                            (editForm.skills || []).includes(skill.id)
                              ? 'bg-blue-50 border-2 border-blue-500'
                              : 'bg-gray-50 border-2 border-gray-200'
                          }`}
                        >
                          <div className="font-medium text-gray-900">{skill.name}</div>
                          <div className="text-sm text-gray-500">{skill.category}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Experience Level</label>
                    <div className="mt-2 grid grid-cols-3 gap-4">
                      {(['beginner', 'intermediate', 'advanced'] as const).map(level => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setEditForm({ ...editForm, experienceLevel: level })}
                          className={`p-3 rounded-lg ${
                            editForm.experienceLevel === level
                              ? 'bg-blue-50 border-2 border-blue-500'
                              : 'bg-gray-50 border-2 border-gray-200'
                          }`}
                        >
                          <div className="font-medium text-gray-900 capitalize">{level}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Project Preferences</label>
                    <div className="mt-4 space-y-4">
                      {/* Project Type Preference */}
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Project Type</label>
                        <div className="grid grid-cols-2 gap-4">
                          {(['solo', 'group'] as const).map(type => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setEditForm({
                                ...editForm,
                                preferredProjectType: [type]
                              })}
                              className={`p-3 rounded-lg ${
                                editForm.preferredProjectType?.[0] === type
                                  ? 'bg-blue-50 border-2 border-blue-500'
                                  : 'bg-gray-50 border-2 border-gray-200'
                              }`}
                            >
                              <div className="font-medium text-gray-900 capitalize">{type}</div>
                              <div className="text-sm text-gray-500">
                                {type === 'solo' ? 'Work independently' : 'Work with a team'}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Mentor Preference */}
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Mentorship</label>
                        <div className="grid grid-cols-2 gap-4">
                          <button
                            type="button"
                            onClick={() => setEditForm({
                              ...editForm,
                              needsMentor: true
                            })}
                            className={`p-3 rounded-lg ${
                              editForm.needsMentor
                                ? 'bg-blue-50 border-2 border-blue-500'
                                : 'bg-gray-50 border-2 border-gray-200'
                            }`}
                          >
                            <div className="font-medium text-gray-900">Need Mentor</div>
                            <div className="text-sm text-gray-500">Get guidance from experienced developers</div>
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditForm({
                              ...editForm,
                              needsMentor: false
                            })}
                            className={`p-3 rounded-lg ${
                              editForm.needsMentor === false
                                ? 'bg-blue-50 border-2 border-blue-500'
                                : 'bg-gray-50 border-2 border-gray-200'
                            }`}
                          >
                            <div className="font-medium text-gray-900">No Mentor Needed</div>
                            <div className="text-sm text-gray-500">Work independently or with peers</div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleSaveProfile}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-8 space-y-6">
                  {user.bio && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">About</h3>
                      <p className="mt-2 text-gray-600">{user.bio}</p>
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Skills</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {user.skills?.map(skillId => {
                        const skill = AVAILABLE_SKILLS.find(s => s.id === skillId);
                        return skill && (
                          <span
                            key={skill.id}
                            className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                          >
                            {skill.name}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Experience Level</h3>
                    <p className="mt-2 text-gray-600 capitalize">{user.experienceLevel}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Project Preferences</h3>
                    <div className="mt-4 space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Project Type</h4>
                        <p className="mt-1 text-gray-600 capitalize">
                          {user.preferredProjectType?.[0] || 'Not specified'}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Mentorship</h4>
                        <p className="mt-1 text-gray-600">
                          {user.needsMentor ? 'Looking for mentor guidance' : 'No mentor needed'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Projects Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm overflow-hidden"
          >
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Projects</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {projects.length === 0 ? (
                <div className="px-6 py-8 text-center text-gray-500">
                  No projects yet. Start or join a project to see it here.
                </div>
              ) : (
                projects.map(project => (
                  <div
                    key={project.id}
                    className="px-6 py-4 hover:bg-gray-50 transition-all duration-300 border-2 border-transparent hover:border-blue-500 rounded-lg cursor-pointer"
                    onClick={() => navigate(`/projects/${project.id}`)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {project.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {project.description}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {project.skills.map(skillId => {
                            const skill = AVAILABLE_SKILLS.find(s => s.id === skillId);
                            return skill && (
                              <span
                                key={skill.id}
                                className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                              >
                                {skill.name}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          project.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 