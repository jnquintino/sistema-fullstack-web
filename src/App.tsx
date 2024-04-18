import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import UsersList from './lists/UsersList';
import './App.css';
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import PostsList from "./lists/PostsList";
import ReportList from "./lists/ReportList";

function App() {
  const token = localStorage.getItem('token');
  return (
      <Router>
        <div>
          <Routes>
              <Route path="/" element={token ? <HomePage /> : <Navigate to="/login" replace />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/logout" element={<LoginPage />} />
              <Route path="/users" element={token ? <UsersList /> : <Navigate to="/login" replace />} />
              <Route path="/posts" element={token ? <PostsList /> : <Navigate to="/login" replace />} />
              <Route path="/reports" element={token ? <ReportList /> : <Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
