import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface GroupChatProps {
  projectId: string;
  projectTitle: string;
  mentors: Array<{
    id: string;
    name: string;
    role: 'mentor';
  }>;
  onClose: () => void;
  onMinimize: () => void;
}

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: number;
  role?: 'mentor' | 'member';
}

interface Member {
  id: string;
  name: string;
  role: 'mentor' | 'member';
}

interface User {
  id: string;
  name: string;
}

const GroupChat: React.FC<GroupChatProps> = ({
  projectId,
  projectTitle,
  mentors,
  onClose,
  onMinimize
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [showMembers, setShowMembers] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load user data
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }

    // Load existing chat messages
    const chatKey = `group_chat_${projectId}`;
    const existingMessages = localStorage.getItem(chatKey);
    if (existingMessages) {
      setMessages(JSON.parse(existingMessages));
    }

    // Load group members
    const membersKey = `group_members_${projectId}`;
    const existingMembers = localStorage.getItem(membersKey);
    if (existingMembers) {
      setMembers(JSON.parse(existingMembers));
    } else {
      // Initialize with mentors
      const initialMembers = mentors.map(mentor => ({
        ...mentor,
        role: 'mentor' as const
      }));
      setMembers(initialMembers);
      localStorage.setItem(membersKey, JSON.stringify(initialMembers));
    }
  }, [projectId, mentors]);

  useEffect(() => {
    // Save messages to localStorage
    if (messages.length > 0) {
      const chatKey = `group_chat_${projectId}`;
      localStorage.setItem(chatKey, JSON.stringify(messages));
    }
  }, [messages, projectId]);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    const isMentor = mentors.some(mentor => mentor.id === user.id);

    const message: Message = {
      id: Date.now().toString(),
      senderId: user.id,
      senderName: user.name,
      text: newMessage.trim(),
      timestamp: Date.now(),
      role: isMentor ? 'mentor' : 'member'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const addMember = (memberId: string, memberName: string) => {
    const newMember: Member = {
      id: memberId,
      name: memberName,
      role: 'member'
    };

    const updatedMembers = [...members, newMember];
    setMembers(updatedMembers);
    localStorage.setItem(`group_members_${projectId}`, JSON.stringify(updatedMembers));
  };

  const removeMember = (memberId: string) => {
    const updatedMembers = members.filter(m => m.id !== memberId);
    setMembers(updatedMembers);
    localStorage.setItem(`group_members_${projectId}`, JSON.stringify(updatedMembers));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="w-96 bg-white rounded-lg shadow-lg flex flex-col relative"
      style={{ height: '600px' }}
    >
      {/* Chat Header */}
      <div className="p-4 border-b flex justify-between items-center bg-green-600 text-white rounded-t-lg">
        <div>
          <h3 className="font-medium">{projectTitle}</h3>
          <p className="text-xs text-green-100">Group Chat</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowMembers(!showMembers)}
            className="text-white hover:text-gray-200"
            title="Toggle members"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </button>
          <button
            onClick={onMinimize}
            className="text-white hover:text-gray-200"
            title="Minimize chat"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200"
            title="Close chat"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Members Panel */}
      {showMembers && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          className="absolute right-0 top-0 w-64 h-full bg-white shadow-lg rounded-r-lg border-l z-10"
        >
          <div className="p-4 border-b">
            <h3 className="font-medium text-gray-900">Members</h3>
          </div>
          <div className="p-4 space-y-4">
            {members.map(member => (
              <div key={member.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{member.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{member.role}</p>
                </div>
                {member.role !== 'mentor' && user?.id !== member.id && (
                  <button
                    onClick={() => removeMember(member.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${
              message.senderId === user?.id ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                message.senderId === user?.id
                  ? message.role === 'mentor'
                    ? 'bg-purple-600 text-white'
                    : 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">{message.senderName}</span>
                {message.role === 'mentor' && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white bg-opacity-20">
                    Mentor
                  </span>
                )}
              </div>
              <p className="text-sm mt-1">{message.text}</p>
              <span className="text-xs opacity-75">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default GroupChat; 