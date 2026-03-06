'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import {
    Box,
    Container,
    Typography,
    Chip,
    Grid,
    Paper,
    Stack,
    useTheme,
} from '@mui/material';
import { stats, competencies } from '@/data/content';

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

export default function About() {
    const theme = useTheme();

    return (
        <Box
            component="section"
            id="about"
            sx={{
                py: { xs: 6, sm: 8, lg: 10 },
                backgroundColor: theme.palette.background.default,
            }}
        >
            <Container maxWidth="lg">
                {/* ---------------- Header ---------------- */}
                <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    sx={{ textAlign: 'center', mb: { xs: 3, sm: 5, lg: 8 } }}
                >
                    <Typography
                        variant="h4"
                        fontWeight={800}
                        mb={1}
                        sx={{
                            fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' },
                            background: theme.custom.gradients.text,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        {'<'}About Me{' />'}
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: { xs: 14, sm: 16 },
                            color: theme.palette.text.secondary,
                        }}
                    >
                        Get to know more about who I am and what I do
                    </Typography>
                </MotionBox>

                <Grid container spacing={{ xs: 4, lg: 6 }} alignItems="center">
                    {/* ---------------- Left Side ---------------- */}
                    <Grid size={{ xs: 12, lg: 6 }}>
                        <MotionBox
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            {/* Profile Image */}
                            <Paper
                                elevation={0}
                                sx={{
                                    p: { xs: 2, sm: 3 },
                                    mb: 3,
                                    borderRadius: 3,
                                    backgroundColor: theme.palette.background.paper,
                                    border: `1px solid ${theme.palette.divider}`,
                                }}
                            >
                                <Image
                                    src="/about_Img.png"
                                    alt="Profile"
                                    width={400}
                                    height={400}
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        borderRadius: 16,
                                    }}
                                    priority
                                />
                            </Paper>

                            {/* Stats */}
                            <Grid container spacing={2}>
                                {stats.map((stat, index) => (
                                    <Grid size={4} key={stat.label}>
                                        <MotionPaper
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            elevation={0}
                                            sx={{
                                                textAlign: 'center',
                                                p: { xs: 1.5, sm: 2 },
                                                borderRadius: 2,
                                                backgroundColor: theme.palette.background.paper,
                                                border: `1px solid ${theme.palette.divider}`,
                                            }}
                                        >
                                            <Typography
                                                fontWeight={700}
                                                fontSize={{ xs: 16, sm: 20, md: 22 }}
                                                sx={{ background: theme.custom.gradients.text,
                                                    WebkitBackgroundClip: 'text',
                                                    WebkitTextFillColor: 'transparent',
                                                }}
                                            >
                                                {stat.value}
                                            </Typography>
                                            <Typography
                                                fontSize={{ xs: 10, sm: 12 }}
                                                sx={{ color: theme.palette.text.secondary }}
                                            >
                                                {stat.label}
                                            </Typography>
                                        </MotionPaper>
                                    </Grid>
                                ))}
                            </Grid>
                        </MotionBox>
                    </Grid>

                    {/* ---------------- Right Side ---------------- */}
                    <Grid size={{ xs: 12, lg: 6 }}>
                        <MotionBox
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <Typography
                                variant="h5"
                                fontWeight={700}
                                mb={{ xs: 2, sm: 3 }}
                                sx={{
                                    color: theme.palette.text.primary,
                                    fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                                }}
                            >
                                Passionate Developer & Problem Solver
                            </Typography>

                            <Stack spacing={{ xs: 1.5, sm: 2 }} mb={{ xs: 3, sm: 4 }}>
                                {[
                                    'I am a 2nd-year Software Engineering student passionate about building impactful digital experiences.',
                                    'I specialize in full-stack development with React, Node.js, and TypeScript.',
                                    'I believe in continuous learning and staying ahead of technology trends.',
                                ].map((text, i) => (
                                    <Typography key={i} sx={{ color: theme.palette.text.secondary, fontSize: { xs: 13, sm: 14, md: 16 } }}>
                                        {text}
                                    </Typography>
                                ))}
                            </Stack>

                            <Typography
                                fontWeight={600}
                                mb={2}
                                sx={{ color: theme.palette.text.primary }}
                            >
                                Core Competencies
                            </Typography>

                            {/* Skills */}
                            <Box display="flex" flexWrap="wrap" gap={1.2}>
                                {competencies.map((skill, index) => (
                                    <MotionBox
                                        key={skill}
                                        initial={{ opacity: 0, scale: 0.85 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Chip
                                            label={skill}
                                            variant="outlined"
                                            sx={{
                                                borderColor: theme.palette.divider,
                                                color: theme.palette.text.primary,
                                                backgroundColor: theme.palette.background.paper,
                                                '&:hover': {
                                                    backgroundColor: theme.palette.action.hover,
                                                },
                                            }}
                                        />
                                    </MotionBox>
                                ))}
                            </Box>
                        </MotionBox>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
