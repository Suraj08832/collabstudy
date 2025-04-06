import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';

// Components
import Navbar from './components/Navbar';
import Home from './components/Home';
import Auth from './components/Auth';
import Whiteboard from './components/Whiteboard';
import MusicSync from './components/MusicSync';

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/auth" 
          element={
            isAuthenticated ? 
              <Navigate to="/" /> : 
              <Auth setIsAuthenticated={setIsAuthenticated} />
          } 
        />
        <Route 
          path="/whiteboard" 
          element={
            isAuthenticated ? 
              <Whiteboard /> : 
              <Navigate to="/auth" />
          } 
        />
        <Route 
          path="/music" 
          element={
            isAuthenticated ? 
              <MusicSync /> : 
              <Navigate to="/auth" />
          } 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App; 