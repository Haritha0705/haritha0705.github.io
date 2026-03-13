'use client';

import { motion } from 'framer-motion';
import { timeline } from '@/data/content';
import { Box, Container, Typography, Paper, Chip, useTheme } from '@mui/material';

const MotionBox = motion.create(Box);

export default function Experience() {
    const theme = useTheme();

    return (
        <Box
            component="section"
            id="experience"
            py={{ xs: 6, md: 12 }}
            sx={{ backgroundColor: theme.palette.background.default }}
        >
            <Container maxWidth="lg">
                {/* Section Header */}
                <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    textAlign="center"
                    mb={6}
                >
                    <Typography
                        variant="h4"
                        component="h2"
                        fontWeight="bold"
                        mb={1}
                        sx={{
                            background: theme.custom.gradients.text,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        {'<'}Experience & Education{' />'}
                    </Typography>
                    <Typography fontSize={14} color="text.secondary">
                        My journey and milestones
                    </Typography>
                </MotionBox>

                {/* Timeline */}
                <Box position="relative">
                    {/* Center Line Desktop */}
                    <Box
                        sx={{
                            display: { xs: 'none', lg: 'block' },
                            position: 'absolute',
                            left: '50%',
                            top: 0,
                            bottom: 0,
                            width: 2,
                            backgroundColor: theme.palette.divider,
                            transform: 'translateX(-50%)',
                        }}
                    />
                    {/* Left Line Mobile */}
                    <Box
                        sx={{
                            display: { xs: 'block', lg: 'none' },
                            position: 'absolute',
                            left: 20,
                            top: 0,
                            bottom: 0,
                            width: 2,
                            backgroundColor: theme.palette.divider,
                        }}
                    />

                    <Box display="flex" flexDirection="column" gap={{ xs: 6, lg: 12 }}>
                        {timeline.map((item, index) => {
                            const Icon = item.icon;
                            const isLeft = index % 2 === 0;

                            return (
                                <MotionBox
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    display="flex"
                                    gap={{ xs: 1, sm: 6, lg: 8 }}
                                    flexDirection={{ xs: 'row', lg: isLeft ? 'row' : 'row-reverse' }}
                                    alignItems="flex-start"
                                >
                                    {/* Mobile Icon */}
                                    <Box
                                        sx={{
                                            display: { xs: 'flex', lg: 'none' },
                                            width: 40,
                                            height: 40,
                                            borderRadius: '50%',
                                            background: theme.custom.gradients.text,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            border: `4px solid ${theme.palette.background.paper}`,
                                            zIndex: 10,
                                            flexShrink: 0,
                                        }}
                                    >
                                        <Icon sx={{ color: '#fff', fontSize: 20 }} />
                                    </Box>

                                    {/* Content */}
                                    <Box
                                        flex={1}
                                        ml={{ xs: 1, sm: 2, lg: 0 }}
                                        textAlign={{ lg: isLeft ? 'right' : 'left' }}
                                    >
                                        <MotionBox whileHover={{ scale: 1.02 }}>
                                            <Paper
                                                elevation={3}
                                                sx={{
                                                    p: { xs: 2, sm: 2.5, md: 3, lg: 4 },
                                                    borderRadius: { xs: 2, sm: 3 },
                                                    border: '1px solid',
                                                    borderColor: theme.palette.divider,
                                                    backgroundColor: theme.palette.background.paper,
                                                }}
                                            >
                                                <Box mb={{ xs: 1.5, sm: 2 }}>
                                                    <Box
                                                        display="flex"
                                                        gap={1}
                                                        flexWrap="wrap"
                                                        mb={1}
                                                        justifyContent={{ lg: isLeft ? 'flex-end' : 'flex-start' }}
                                                    >
                                                        <Typography fontWeight="bold" fontSize={{ xs: 14, sm: 16 }}>{item.title}</Typography>
                                                        {item.current && (
                                                            <Chip
                                                                label="Current"
                                                                size="small"
                                                                color="success"
                                                                variant="outlined"
                                                                sx={{ fontSize: { xs: 10, sm: 12 } }}
                                                            />
                                                        )}
                                                    </Box>
                                                    <Typography fontWeight={500} color="primary" fontSize={{ xs: 12, sm: 14 }}>
                                                        {item.company}
                                                    </Typography>
                                                    <Typography fontSize={{ xs: 10, sm: 12 }} color="text.secondary">
                                                        {item.period}
                                                    </Typography>
                                                </Box>

                                                <Typography fontSize={{ xs: 12, sm: 14 }} color="text.secondary" mb={1}>
                                                    {item.description}
                                                </Typography>

                                                <Box
                                                    component="ul"
                                                    sx={{
                                                        pl: { xs: 1.5, sm: 2 },
                                                        mt: 1,
                                                        listStyle: 'none',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: 0.5,
                                                    }}
                                                >
                                                    {item.achievements.map((a, i) => (
                                                        <Typography
                                                            component="li"
                                                            key={i}
                                                            fontSize={{ xs: 11, sm: 13 }}
                                                            color="text.secondary"
                                                            display="flex"
                                                            alignItems="flex-start"
                                                            gap={0.5}
                                                        >
                                                            <Box sx={{ color: 'primary.main', mt: '2px' }}>▸</Box> {a}
                                                        </Typography>
                                                    ))}
                                                </Box>
                                            </Paper>
                                        </MotionBox>
                                    </Box>

                                    {/* Desktop Icon */}
                                    <Box
                                        sx={{
                                            display: { xs: 'none', lg: 'flex' },
                                            width: 64,
                                            height: 64,
                                            borderRadius: '50%',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            zIndex: 10,
                                            border: `4px solid ${theme.palette.background.paper}`,
                                            background: theme.custom.gradients.text,
                                        }}
                                    >
                                        <Icon sx={{ color: '#fff', fontSize: 28 }} />
                                    </Box>

                                    {/* Spacer for Desktop */}
                                    <Box flex={1} display={{ xs: 'none', lg: 'block' }} />
                                </MotionBox>
                            );
                        })}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
