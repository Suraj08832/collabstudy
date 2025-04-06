import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Slider,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  ArrowBack,
  Delete,
  ColorLens,
  Brush,
} from '@mui/icons-material';
import { io } from 'socket.io-client';
import { motion } from 'framer-motion';

const Whiteboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(2);
  const [showColorPicker, setShowColorPicker] = useState(false);

  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Drawing functions
    const startDrawing = (e) => {
      setIsDrawing(true);
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ctx.beginPath();
      ctx.moveTo(x, y);
    };

    const draw = (e) => {
      if (!isDrawing) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ctx.lineTo(x, y);
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();

      if (socket) {
        socket.emit('draw', {
          x1: x,
          y1: y,
          x2: x,
          y2: y,
          color,
          width: brushSize,
        });
      }
    };

    const stopDrawing = () => {
      setIsDrawing(false);
    };

    // Event listeners
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Socket event listeners
    if (socket) {
      socket.on('draw', (data) => {
        ctx.beginPath();
        ctx.moveTo(data.x1, data.y1);
        ctx.lineTo(data.x2, data.y2);
        ctx.strokeStyle = data.color;
        ctx.lineWidth = data.width;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      });
    }

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseout', stopDrawing);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [socket, isDrawing, color, brushSize]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const colors = [
    '#000000',
    '#FF0000',
    '#00FF00',
    '#0000FF',
    '#FFFF00',
    '#FF00FF',
    '#00FFFF',
    '#FFFFFF',
  ];

  return (
    <Container maxWidth="xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 3,
            mt: 4,
            borderRadius: 2,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate('/')}
              sx={{ color: theme.palette.primary.main }}
            >
              Back
            </Button>
            <Typography variant="h4" sx={{ color: theme.palette.secondary.main }}>
              Interactive Whiteboard
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                onClick={() => setShowColorPicker(!showColorPicker)}
                sx={{ color: theme.palette.primary.main }}
              >
                <ColorLens />
              </IconButton>
              <IconButton
                onClick={clearCanvas}
                sx={{ color: theme.palette.primary.main }}
              >
                <Delete />
              </IconButton>
            </Box>
          </Box>

          {showColorPicker && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  mb: 2,
                  p: 2,
                  background: 'rgba(0,0,0,0.05)',
                  borderRadius: 1,
                }}
              >
                {colors.map((c) => (
                  <Box
                    key={c}
                    sx={{
                      width: 30,
                      height: 30,
                      borderRadius: '50%',
                      background: c,
                      cursor: 'pointer',
                      border: color === c ? '2px solid #000' : 'none',
                    }}
                    onClick={() => setColor(c)}
                  />
                ))}
              </Box>
            </motion.div>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Brush sx={{ mr: 1, color: theme.palette.primary.main }} />
            <Slider
              value={brushSize}
              onChange={(e, newValue) => setBrushSize(newValue)}
              min={1}
              max={20}
              sx={{ width: 200 }}
            />
          </Box>

          <Box
            sx={{
              width: '100%',
              height: '70vh',
              background: 'white',
              borderRadius: 1,
              overflow: 'hidden',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            }}
          >
            <canvas
              ref={canvasRef}
              style={{
                width: '100%',
                height: '100%',
                cursor: 'crosshair',
              }}
            />
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Whiteboard; 