import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Chat from './Chat';
import GroupChat from './GroupChat';

interface ChatSession {
  id: string;
  type: 'peer' | 'mentor' | 'group';
  name: string;
  projectId?: string;
  projectTitle?: string;
  mentors?: Array<{
    id: string;
    name: string;
    role: 'mentor';
  }>;
}

interface ChatListProps {
  sessions: ChatSession[];
  onClose: (sessionId: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({ sessions, onClose }) => {
  const [minimizedSessions, setMinimizedSessions] = useState<Set<string>>(new Set());
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const toggleMinimize = (sessionId: string) => {
    setMinimizedSessions(prev => {
      const next = new Set(prev);
      if (next.has(sessionId)) {
        next.delete(sessionId);
      } else {
        next.add(sessionId);
      }
      return next;
    });
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-row-reverse space-x-4 space-x-reverse">
      <AnimatePresence>
        {sessions.map((session, index) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, y: 20, x: index * 320 }}
            animate={{ 
              opacity: 1,
              y: 0,
              x: index * 320,
              height: minimizedSessions.has(session.id) ? 'auto' : '600px'
            }}
            exit={{ opacity: 0, y: 20 }}
            className="relative"
            style={{ marginRight: index * 20 }}
          >
            {minimizedSessions.has(session.id) ? (
              <button
                onClick={() => toggleMinimize(session.id)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
              >
                {session.name}
              </button>
            ) : (
              session.type === 'group' ? (
                <GroupChat
                  projectId={session.projectId!}
                  projectTitle={session.projectTitle!}
                  mentors={session.mentors!}
                  onClose={() => onClose(session.id)}
                  onMinimize={() => toggleMinimize(session.id)}
                />
              ) : (
                <Chat
                  peerId={session.id}
                  peerName={session.name}
                  peerType={session.type}
                  onClose={() => onClose(session.id)}
                  onMinimize={() => toggleMinimize(session.id)}
                />
              )
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ChatList; 