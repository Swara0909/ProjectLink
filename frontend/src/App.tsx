import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Onboarding from './pages/Onboarding';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Connect from './pages/Connect';
import Mentorship from './pages/Mentorship';
import ProjectDetails from './pages/ProjectDetails';
import NewProject from './pages/NewProject';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  // Check if user is authenticated
  const isAuthenticated = () => {
    const userStr = localStorage.getItem('user');
    return !!userStr;
  };

  // Check if user has completed onboarding
  const hasCompletedOnboarding = () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return false;
    const user = JSON.parse(userStr);
    return user.onboardingCompleted;
  };

  // Protected Route component that requires both authentication and completed onboarding
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/signin" />;
    }

    if (!hasCompletedOnboarding()) {
      return <Navigate to="/onboarding" />;
    }

    return (
      <>
        <Navbar />
        {children}
      </>
    );
  };

  // Auth Route component that only requires authentication
  const AuthRoute = ({ children }: { children: React.ReactNode }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/signin" />;
    }
    return <>{children}</>;
  };

  // Mentorship Route component that requires authentication, completed onboarding, and needsMentor flag
  const MentorshipRoute = ({ children }: { children: React.ReactNode }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/signin" />;
    }

    if (!hasCompletedOnboarding()) {
      return <Navigate to="/onboarding" />;
    }

    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      if (!user.needsMentor) {
        return <Navigate to="/home" />;
      }
    }

    return (
      <>
        <Navbar />
        {children}
      </>
    );
  };

  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          
          {/* Onboarding Route - Only for authenticated users who haven't completed onboarding */}
          <Route 
            path="/onboarding" 
            element={
              <AuthRoute>
                {hasCompletedOnboarding() ? <Navigate to="/home" /> : <Onboarding />}
              </AuthRoute>
            } 
          />

          {/* Protected Routes - Require authentication and completed onboarding */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/new"
            element={
              <ProtectedRoute>
                <NewProject />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <ProtectedRoute>
                <ProjectDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/connect"
            element={
              <ProtectedRoute>
                <Connect />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mentorship"
            element={
              <MentorshipRoute>
                <Mentorship />
              </MentorshipRoute>
            }
          />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
