import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import io from 'socket.io-client';

function MusicSync() {
  const [socket, setSocket] = useState(null);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

    newSocket.on('playMusic', (data) => {
      setIsPlaying(true);
      setCurrentTrack(data.url);
    });

    newSocket.on('pauseMusic', () => {
      setIsPlaying(false);
    });

    return () => newSocket.close();
  }, []);

  const handlePlay = () => {
    if (socket && youtubeUrl) {
      socket.emit('playMusic', { url: youtubeUrl });
      setIsPlaying(true);
      setCurrentTrack(youtubeUrl);
    }
  };

  const handlePause = () => {
    if (socket) {
      socket.emit('pauseMusic');
      setIsPlaying(false);
    }
  };

  const getVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <Container maxWidth="md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mt: 4,
            borderRadius: 2,
            background: 'white',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <IconButton onClick={() => navigate('/')} sx={{ mr: 2 }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" component="h1">
              Music Sync
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <TextField
              fullWidth
              label="YouTube URL"
              variant="outlined"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                onClick={handlePlay}
                disabled={!youtubeUrl || isPlaying}
              >
                Play
              </Button>
              <Button
                variant="outlined"
                onClick={handlePause}
                disabled={!isPlaying}
              >
                Pause
              </Button>
            </Box>
          </Box>

          {currentTrack && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Box
                sx={{
                  position: 'relative',
                  paddingBottom: '56.25%',
                  height: 0,
                  overflow: 'hidden',
                  borderRadius: 2,
                }}
              >
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${getVideoId(currentTrack)}?autoplay=${isPlaying ? 1 : 0}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                  }}
                />
              </Box>
            </motion.div>
          )}
        </Paper>
      </motion.div>
    </Container>
  );
}

export default MusicSync; 