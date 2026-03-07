"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

import {
    Box,
    Container,
    Typography,
    Grid,
    Paper,
    Stack,
    useTheme,
} from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { ContributionDay } from '@/data/content';

const MotionBox = motion.create(Box);

export default function GitHubActivity() {
    const [contributions, setContributions] = useState<ContributionDay[]>([]);
    const theme = useTheme();

    useEffect(() => {
        async function fetchData() {
            try {
                const resp = await fetch('/api/github');
                const json = await resp.json();
                if (!json?.contributions) return;
                setContributions(json.contributions);
            } catch (err) {
                console.error("GitHub Fetch Error:", err);
            }
        }
        fetchData();
    }, []);

    const total = useMemo(
        () => contributions.reduce((s, d) => s + d.count, 0),
        [contributions]
    );

    const active30 = useMemo(
        () => contributions.slice(-30).filter((d) => d.count > 0).length,
        [contributions]
    );

    const longestStreak = useMemo(() => {
        let max = 0,
            current = 0;
        for (const d of contributions) {
            if (d.count > 0) {
                current++;
                max = Math.max(max, current);
            } else current = 0;
        }
        return max;
    }, [contributions]);

    const currentStreak = useMemo(() => {
        let streak = 0;
        for (let i = contributions.length - 1; i >= 0; i--) {
            if (contributions[i].count > 0) streak++;
            else break;
        }
        return streak;
    }, [contributions]);

    const maxDay = useMemo(
        () =>
            contributions.reduce(
                (max, d) => (d.count > max.count ? d : max),
                { date: "", count: 0 }
            ),
        [contributions]
    );

    const monthly = useMemo(() => {
        const map: Record<string, number> = {};
        contributions.forEach((d) => {
            const month = d.date.substring(0, 7);
            map[month] = (map[month] || 0) + d.count;
        });
        const maxMonth = Object.entries(map).sort((a, b) => b[1] - a[1])[0];
        return {
            bestMonth: maxMonth?.[0] || "",
            bestMonthCount: maxMonth?.[1] || 0,
        };
    }, [contributions]);

    const weeks = useMemo(() => {
        const result: ContributionDay[][] = [];
        let week: ContributionDay[] = [];

        contributions.forEach((day, i) => {
            const dt = new Date(day.date);
            if (dt.getDay() === 0 && week.length > 0) {
                result.push(week);
                week = [];
            }
            week.push(day);
            if (i === contributions.length - 1) result.push(week);
        });

        return result;
    }, [contributions]);

    const getColor = (count: number) => {
        if (count === 0) return theme.palette.background.paper;
        if (count <= 3) return theme.palette.success.light;
        if (count <= 6) return theme.palette.success.main;
        if (count <= 12) return theme.palette.success.dark;
        return theme.palette.success.dark;
    };

    const stats = [
        { label: "Total Contributions", value: total, icon: BarChartIcon },
        { label: "Active Days (30d)", value: active30, icon: WhatshotIcon },
        { label: "Longest Streak", value: longestStreak, icon: EmojiEventsIcon },
        { label: "Current Streak", value: currentStreak, icon: FlashOnIcon },
        { label: "Most Active Day", value: maxDay.count, icon: CalendarMonthIcon },
        { label: "Top Month", value: monthly.bestMonthCount, icon: DarkModeIcon },
    ];

    return (
        <Box
            component="section"
            px={{ xs: 2, md: 4 }}
            py={{ xs: 6, md: 8 }}
            bgcolor={theme.palette.background.default}
        >
            <Container maxWidth="lg">
                {/* Title */}
                <MotionBox
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <Typography
                        variant="h4"
                        align="center"
                        fontWeight="bold"
                        mb={1}
                        sx={{
                            background: theme.custom.gradients.text,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        GitHub Activity
                    </Typography>

                    <Typography
                        align="center"
                        fontFamily="monospace"
                        fontSize={13}
                        color="text.secondary"
                        mb={5}
                    >
                        Updated automatically from your GitHub profile
                    </Typography>
                </MotionBox>

                {/* Stats */}
                <Grid container spacing={{ xs: 1.5, sm: 2 }} mb={{ xs: 4, sm: 6 }}>
                    {stats.map((s, i) => {
                        const Icon = s.icon;
                        return (
                            <Grid size={{ xs: 4, sm: 4, md: 4, lg: 2 }} key={s.label}>
                                <MotionBox
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <Paper
                                        elevation={3}
                                        sx={{
                                            p: { xs: 1.5, sm: 2 },
                                            textAlign: "center",
                                            borderRadius: 2,
                                            backgroundColor: theme.palette.background.paper,
                                            transition: "0.3s",
                                            "&:hover": {
                                                transform: "translateY(-2px)",
                                                boxShadow: 6,
                                            },
                                        }}
                                    >
                                        <Icon sx={{ fontSize: { xs: 16, sm: 20 }, opacity: 0.8, mb: 0.5 }} />
                                        <Typography
                                            fontFamily="monospace"
                                            fontWeight="bold"
                                            fontSize={{ xs: 14, sm: 18 }}
                                            color="primary"
                                        >
                                            {s.value}
                                        </Typography>
                                        <Typography fontSize={{ xs: 8, sm: 11 }} color="text.secondary" sx={{ lineHeight: 1.2 }}>
                                            {s.label}
                                        </Typography>
                                    </Paper>
                                </MotionBox>
                            </Grid>
                        );
                    })}
                </Grid>

                {/* Heatmap */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box overflow="auto" sx={{ maxWidth: '100%' }}>
                        <Box display="flex">
                            <Stack spacing="3px" mr={1} sx={{ fontSize: 10, color: 'text.secondary' }}>
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
                                    <Box key={day} sx={{ height: 11, display: 'flex', alignItems: 'center' }}>
                                        <span style={{ visibility: i % 2 === 1 ? 'visible' : 'hidden' }}>{day}</span>
                                    </Box>
                                ))}
                            </Stack>

                            <Box display="flex" gap="3px">
                                {weeks.map((week, wi) => (
                                    <Stack key={wi} spacing="3px">
                                        {week.map((day, di) => (
                                            <Box
                                                key={di}
                                                sx={{
                                                    width: 11,
                                                    height: 11,
                                                    borderRadius: '3px',
                                                    backgroundColor: getColor(day.count),
                                                    transition: 'transform 0.15s, box-shadow 0.15s',
                                                    '&:hover': {
                                                        transform: 'scale(1.8)',
                                                        boxShadow: `0 0 6px ${getColor(day.count)}`,
                                                        zIndex: 1,
                                                    },
                                                }}
                                                title={`${day.count} contributions • ${day.date}`}
                                            />
                                        ))}
                                    </Stack>
                                ))}
                            </Box>
                        </Box>

                        {/* Legend */}
                        <Stack
                            direction="row"
                            spacing={{ xs: 0.5, sm: 1 }}
                            mt={{ xs: 2, sm: 3 }}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Typography component="span" sx={{ fontSize: { xs: 8, sm: 10 } }}>
                                Less
                            </Typography>
                            {[0, 2, 4, 8, 12].map((v, i) => (
                                <Box
                                    key={i}
                                    sx={{
                                        width: { xs: 8, sm: 11 },
                                        height: { xs: 8, sm: 11 },
                                        borderRadius: 1,
                                        bgcolor: getColor(v),
                                    }}
                                />
                            ))}
                            <Typography component="span" sx={{ fontSize: { xs: 8, sm: 10 } }}>
                                More
                            </Typography>
                        </Stack>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
