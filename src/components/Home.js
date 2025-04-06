import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Box,
  useTheme,
  Paper,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  School as SchoolIcon,
  Group as GroupIcon,
  Edit as EditIcon,
  MusicNote as MusicIcon,
  TrendingUp as TrendingIcon,
  AccessTime as TimeIcon,
} from '@mui/icons-material';

function Home() {
  const theme = useTheme();
  const navigate = useNavigate();

  const features = [
    {
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      title: 'Interactive Learning',
      description: 'Engage in real-time collaborative study sessions with peers.',
      color: '#0056D2',
    },
    {
      icon: <GroupIcon sx={{ fontSize: 40 }} />,
      title: 'Study Groups',
      description: 'Join or create study groups to learn together.',
      color: '#00A76F',
    },
    {
      icon: <EditIcon sx={{ fontSize: 40 }} />,
      title: 'Whiteboard',
      description: 'Collaborate on a shared digital whiteboard.',
      color: '#FFAB00',
    },
    {
      icon: <MusicIcon sx={{ fontSize: 40 }} />,
      title: 'Music Sync',
      description: 'Synchronize your study music with peers.',
      color: '#7635DC',
    },
    {
      icon: <TrendingIcon sx={{ fontSize: 40 }} />,
      title: 'Progress Tracking',
      description: 'Track your study progress and achievements.',
      color: '#00B8D9',
    },
    {
      icon: <TimeIcon sx={{ fontSize: 40 }} />,
      title: 'Time Management',
      description: 'Schedule and manage your study sessions.',
      color: '#FF5630',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#f5f6fa' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          color: 'white',
          py: 8,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                mb: 3,
                textAlign: 'center',
              }}
            >
              Learn Together, Grow Together
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                textAlign: 'center',
                opacity: 0.9,
                maxWidth: '800px',
                mx: 'auto',
              }}
            >
              Join a community of learners and enhance your study experience with collaborative tools and features.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/auth')}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  borderRadius: 2,
                  background: 'white',
                  color: theme.palette.primary.main,
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.9)',
                  },
                }}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  borderRadius: 2,
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    background: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                Learn More
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              mb: 6,
              color: theme.palette.secondary.main,
            }}
          >
            Features
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div variants={itemVariants}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      p: 3,
                      borderRadius: 2,
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                      },
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          color: feature.color,
                          mb: 2,
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography
                        variant="h5"
                        component="h3"
                        gutterBottom
                        sx={{ fontWeight: 'bold', textAlign: 'center' }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        color="text.secondary"
                        sx={{ textAlign: 'center' }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* Stats Section */}
      <Box sx={{ background: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={6} sm={3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    background: 'transparent',
                  }}
                >
                  <Typography variant="h3" color="primary" gutterBottom>
                    10K+
                  </Typography>
                  <Typography variant="h6">Active Users</Typography>
                </Paper>
              </motion.div>
            </Grid>
            <Grid item xs={6} sm={3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    background: 'transparent',
                  }}
                >
                  <Typography variant="h3" color="primary" gutterBottom>
                    500+
                  </Typography>
                  <Typography variant="h6">Study Groups</Typography>
                </Paper>
              </motion.div>
            </Grid>
            <Grid item xs={6} sm={3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    background: 'transparent',
                  }}
                >
                  <Typography variant="h3" color="primary" gutterBottom>
                    24/7
                  </Typography>
                  <Typography variant="h6">Support</Typography>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default Home; 