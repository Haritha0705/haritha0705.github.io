'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Paper,
    Stack,
    IconButton,
    useTheme,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { toast } from 'sonner';
import { contactInfo, socialLinksContact } from '@/data/content';
import { FormData } from '@/data/content';

const MotionBox = motion.create(Box);

export default function Contact() {
    const theme = useTheme();

    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                {
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                },
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            );

            toast.success('Message sent successfully!');

            setFormData({
                name: '',
                email: '',
                message: '',
            });
        } catch (error) {
            console.error(error);
            toast.error('Failed to send message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box
            component="section"
            id="contact"
            py={{ xs: 6, sm: 8, md: 10 }}
            bgcolor={theme.palette.background.default}
        >
            <Container maxWidth="lg">
                {/* Header */}
                <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    sx={{ textAlign: 'center', mb: { xs: 4, sm: 6, md: 8 } }}
                >
                    <Typography
                        variant="h4"
                        fontWeight={800}
                        sx={{
                            background: theme.custom.gradients.text,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        {'<'}Get In Touch{' />'}
                    </Typography>
                    <Typography color="text.secondary" fontSize={14}>
                        Have a project in mind? Let’s work together.
                    </Typography>
                </MotionBox>

                <Box
                    display="grid"
                    gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}
                    gap={{ xs: 4, sm: 5, md: 6 }}
                >
                    {/* Left */}
                    <MotionBox
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Stack spacing={3}>
                            {contactInfo.map((info) => {
                                const Icon = info.icon;
                                return (
                                    <Stack direction="row" spacing={2} key={info.label}>
                                        <Box
                                            sx={{
                                                width: 48,
                                                height: 48,
                                                borderRadius: 2,
                                                background: theme.custom.gradients.text,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Icon sx={{ color: '#fff' }} />
                                        </Box>
                                        <Box>
                                            <Typography fontSize={12} color="text.secondary">
                                                {info.label}
                                            </Typography>
                                            <Typography color="text.primary">
                                                {info.value}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                );
                            })}
                        </Stack>

                        <Typography fontWeight={700} mt={4} mb={2}>
                            Follow Me
                        </Typography>

                        <Stack direction="row" spacing={2}>
                            {socialLinksContact.map((s) => {
                                const Icon = s.icon;
                                return (
                                    <IconButton
                                        key={s.label}
                                        component="a"
                                        href={s.href}
                                        target="_blank"
                                        sx={{
                                            border: `1px solid ${theme.palette.divider}`,
                                        }}
                                    >
                                        <Icon />
                                    </IconButton>
                                );
                            })}
                        </Stack>

                        <Paper
                            sx={{
                                p: 3,
                                mt: 4,
                                background: theme.custom.glass.background,
                                backdropFilter: theme.custom.glass.blur,
                                border: theme.custom.glass.border,
                            }}
                        >
                            <Stack direction="row" spacing={2}>
                                <CheckCircleIcon color="success" />
                                <Box>
                                    <Typography fontWeight={700}>
                                        Open to Opportunities
                                    </Typography>
                                    <Typography fontSize={14} color="text.secondary">
                                        Available for internships & freelance work.
                                    </Typography>
                                </Box>
                            </Stack>
                        </Paper>
                    </MotionBox>

                    {/* Right – Form */}
                    <MotionBox
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Box component="form" onSubmit={handleSubmit}>
                            <Stack spacing={{ xs: 2, sm: 3 }}>
                                <TextField
                                    label="Your Name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    size="small"
                                    sx={{ '& .MuiInputBase-root': { fontSize: { xs: 14, sm: 16 } } }}
                                />
                                <TextField
                                    label="Your Email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    size="small"
                                    sx={{ '& .MuiInputBase-root': { fontSize: { xs: 14, sm: 16 } } }}
                                />
                                <TextField
                                    label="Message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    multiline
                                    rows={4}
                                    sx={{ '& .MuiInputBase-root': { fontSize: { xs: 14, sm: 16 } } }}
                                />

                                <Button
                                    type="submit"
                                    size="large"
                                    variant="contained"
                                    startIcon={<SendIcon />}
                                    disabled={isSubmitting}
                                    sx={{ fontSize: { xs: 13, sm: 15 }, py: { xs: 1.25, sm: 1.5 } }}
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </Button>
                            </Stack>
                        </Box>
                    </MotionBox>
                </Box>
            </Container>
        </Box>
    );
}
