'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Box,
    Container,
    Typography,
    Button,
    Stack,
    Divider,
    useTheme,
} from '@mui/material';
import LayersIcon from '@mui/icons-material/Layers';
import { skillsCode, tabs } from '@/data/content';

const MotionBox = motion(Box);

export default function CodeSkills() {
    const theme = useTheme();
    const [activeTab, setActiveTab] = useState('frontend');
    const codeLines = skillsCode[activeTab as keyof typeof skillsCode].split('\n');

    return (
        <Box
            component="section"
            id="skills"
            sx={{
                py: { xs: 6, md: 8 },
                backgroundColor: theme.palette.background.default,
            }}
        >
            <Container maxWidth="lg">
                {/* ---------------- Header ---------------- */}
                <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <Typography
                        variant="h4"
                        component="h2"
                        align="center"
                        fontWeight={800}
                        mb={1}
                        sx={{
                            background: theme.custom.gradients.text,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        {'<'}Tech Stack{' />'}
                    </Typography>

                    <Typography
                        align="center"
                        fontFamily="monospace"
                        color="text.secondary"
                        mb={4}
                    >
                        {'// My developer toolbox'}
                    </Typography>
                </MotionBox>

                {/* ---------------- Code Editor ---------------- */}
                <Box
                    sx={{
                        borderRadius: 2,
                        overflow: 'hidden',
                        border: `1px solid ${theme.palette.divider}`,
                        backgroundColor: theme.palette.background.paper,
                        boxShadow: theme.shadows[6],
                    }}
                >
                    {/* -------- Editor Header -------- */}
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        px={2}
                        py={1}
                        sx={{
                            backgroundColor: theme.palette.background.paper,
                            borderBottom: `1px solid ${theme.palette.divider}`,
                        }}
                    >
                        {/* Mac buttons */}
                        <Stack direction="row" spacing={1}>
                            {['#FF5F56', '#FFBD2E', '#27C93F'].map((c) => (
                                <Box
                                    key={c}
                                    sx={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: '50%',
                                        backgroundColor: c,
                                    }}
                                />
                            ))}
                        </Stack>

                        <Stack direction="row" spacing={1} alignItems="center">
                            <LayersIcon fontSize="small" sx={{ color: theme.palette.text.secondary }} />
                            <Typography fontSize={12} fontFamily="monospace" sx={{ color: theme.palette.text.secondary }}>
                                skills.{activeTab}
                            </Typography>
                        </Stack>

                        <Box width={40} />
                    </Stack>

                    {/* -------- Tabs -------- */}
                    <Stack
                        direction="row"
                        divider={<Divider orientation="vertical" flexItem />}
                        sx={{
                            borderBottom: `1px solid ${theme.palette.divider}`,
                            overflowX: 'auto',
                            '&::-webkit-scrollbar': { display: 'none' },
                            scrollbarWidth: 'none',
                        }}
                    >
                        {tabs.map((tab) => (
                            <Button
                                key={tab.id}
                                startIcon={tab.icon}
                                onClick={() => setActiveTab(tab.id)}
                                sx={{
                                    fontFamily: 'monospace',
                                    borderRadius: 0,
                                    px: { xs: 1, sm: 2 },
                                    py: { xs: 0.75, sm: 1 },
                                    fontSize: { xs: 10, sm: 12, md: 13 },
                                    minWidth: { xs: 'auto', sm: 'auto' },
                                    whiteSpace: 'nowrap',
                                    color:
                                        activeTab === tab.id
                                            ? theme.palette.primary.main
                                            : theme.palette.text.primary,
                                    backgroundColor:
                                        activeTab === tab.id
                                            ? theme.palette.action.selected
                                            : 'transparent',
                                    '&:hover': {
                                        backgroundColor: theme.palette.action.hover,
                                    },
                                    '& .MuiButton-startIcon': {
                                        marginRight: { xs: 0.5, sm: 1 },
                                    },
                                }}
                            >
                                {tab.label}
                            </Button>
                        ))}
                    </Stack>

                    {/* -------- Code Area -------- */}
                    <Box position="relative" sx={{ overflowX: 'auto' }}>
                        {/* Line Numbers */}
                        <Box
                            sx={{
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                bottom: 0,
                                width: { xs: 36, sm: 48 },
                                px: { xs: 0.5, sm: 1 },
                                py: { xs: 1.5, sm: 2 },
                                textAlign: 'right',
                                fontFamily: 'monospace',
                                fontSize: { xs: 9, sm: 11, md: 12 },
                                color: theme.palette.text.secondary,
                                backgroundColor: theme.palette.background.paper,
                                borderRight: `1px solid ${theme.palette.divider}`,
                            }}
                        >
                            {codeLines.map((_, i) => (
                                <Box key={i}>{i + 1}</Box>
                            ))}
                        </Box>

                        <AnimatePresence mode="wait">
                            <Box
                                key={activeTab}
                                component={motion.pre}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.25 }}
                                sx={{
                                    m: 0,
                                    p: { xs: '12px 12px 12px 48px', sm: '16px 16px 16px 64px' },
                                    overflowX: 'auto',
                                    fontFamily: 'monospace',
                                    fontSize: { xs: 9, sm: 11, md: 12 },
                                    lineHeight: 1.6,
                                    color: theme.palette.text.primary,
                                    minWidth: 'fit-content',
                                }}
                            >
                                {skillsCode[activeTab as keyof typeof skillsCode]}
                            </Box>
                        </AnimatePresence>
                    </Box>

                    {/* -------- Status Bar -------- */}
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        px={2}
                        py={1}
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.background.default,
                            fontFamily: 'monospace',
                        }}
                    >
                        <Stack direction="row" spacing={{ xs: 1, sm: 2 }}>
                            <Typography component="span" sx={{ fontSize: { xs: 9, sm: 15 } }}>✓ Ready</Typography>
                            <Typography component="span" sx={{ fontSize: { xs: 9, sm: 15 } }}>UTF-8</Typography>
                            <Typography component="span" sx={{ fontSize: { xs: 9, sm: 15 } }}>JavaScript</Typography>
                        </Stack>
                        <Typography component="span" sx={{ fontSize: { xs: 9, sm: 15 } }}>Spaces: 2</Typography>
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
}