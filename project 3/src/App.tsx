import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PlayersPage from './pages/PlayersPage';
import TournamentsPage from './pages/TournamentsPage';
import StreamsPage from './pages/StreamsPage';
import PhotosPage from './pages/PhotosPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import FestivalPage from './pages/FestivalPage';
import LeagueRulesPage from './pages/LeagueRulesPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="players" element={<PlayersPage />} />
        <Route path="tournaments" element={<TournamentsPage />} />
        <Route path="streams" element={<StreamsPage />} />
        <Route path="photos" element={<PhotosPage />} />
        <Route path="festival" element={<FestivalPage />} />
        <Route path="leaderboard" element={<LeaderboardPage />} />
        <Route path="rules" element={<LeagueRulesPage />} />
        <Route 
          path="profile" 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;