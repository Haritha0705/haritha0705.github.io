"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
    Box,
    Container,
    Typography,
    Stack,
    Chip,
    Button,
    useTheme,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MediumIcon from "@/components/ui/MediumIcon";

const MotionBox = motion.create(Box);


interface BlogPost {
    title: string;
    link: string;
    pubDate: string;
    categories: string[];
    thumbnail: string;
    description: string;
    readTime: number;
}

/** Extract text content from a CDATA or plain XML node */
function nodeText(el: Element | null): string {
    if (!el) return "";
    // CDATA shows up as textContent
    return (el.textContent ?? "").trim();
}

/** Strip HTML tags and decode entities */
function stripHtml(html: string): string {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent ?? "";
}

/** Estimate read time (~200 wpm) */
function estimateReadTime(html: string): number {
    const words = stripHtml(html).split(/\s+/).length;
    return Math.max(1, Math.round(words / 200));
}

/** Extract first <img> src from HTML content */
function extractThumbnail(html: string): string {
    const match = html.match(/<img[^>]+src=["']([^"']+)["']/);
    return match?.[1] ?? "";
}

/** Parse Medium RSS XML into BlogPost[] */
function parseRss(xml: string): BlogPost[] {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "application/xml");
    const items = doc.querySelectorAll("item");
    const posts: BlogPost[] = [];

    items.forEach((item) => {
        const title = nodeText(item.querySelector("title"));
        const link = nodeText(item.querySelector("link"));
        const pubDate = nodeText(item.querySelector("pubDate"));
        const categories: string[] = [];
        item.querySelectorAll("category").forEach((cat) => {
            categories.push(nodeText(cat));
        });
        const encoded =
            item.getElementsByTagNameNS(
                "http://purl.org/rss/1.0/modules/content/",
                "encoded"
            )[0];
        const contentHtml = nodeText(encoded);
        const thumbnail = extractThumbnail(contentHtml);
        const plainText = stripHtml(contentHtml);
        const description =
            plainText.length > 160
                ? plainText.slice(0, 160).trim() + "..."
                : plainText;
        const readTime = estimateReadTime(contentHtml);

        posts.push({
            title,
            link,
            pubDate,
            categories,
            thumbnail,
            description,
            readTime,
        });
    });

    return posts;
}

function formatDate(dateStr: string): string {
    try {
        return new Date(dateStr).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    } catch {
        return dateStr;
    }
}

export default function BlogPosts() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();

    useEffect(() => {
        async function fetchFeed() {
            try {
                const resp = await fetch("/api/medium");
                if (!resp.ok) {
                    console.error("Feed response not ok:", resp.status);
                    return;
                }
                const xml = await resp.text();
                const parsed = parseRss(xml);
                setPosts(parsed);
            } catch (err) {
                console.error("Medium RSS Error:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchFeed();
    }, []);

    const displayPosts = useMemo(() => posts.slice(0, 6), [posts]);

    return (
        <Box
            component="section"
            id="blog"
            py={{ xs: 6, md: 8 }}
            px={{ xs: 2, md: 4 }}
            bgcolor={theme.palette.background.default}
        >
            <Container maxWidth="lg">
                {/* Header */}
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
                            fontSize: { xs: "1.25rem", sm: "1.5rem", md: "2rem" },
                            background: theme.custom.gradients.text,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        Blog Posts
                    </Typography>
                    <Typography
                        align="center"
                        fontFamily="monospace"
                        fontSize={{ xs: 12, sm: 14 }}
                        color="text.secondary"
                        mb={{ xs: 3, sm: 5 }}
                    >
                        {"// Writing about things I learn — fetched live from Medium"}
                    </Typography>
                </MotionBox>

                {/* Loading skeleton */}
                {loading && (
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                sm: "1fr 1fr",
                                md: "1fr 1fr 1fr",
                            },
                            gap: 3,
                        }}
                    >
                        {[0, 1, 2].map((i) => (
                            <Box
                                key={i}
                                sx={{
                                    height: 320,
                                    borderRadius: 2,
                                    bgcolor: theme.palette.background.paper,
                                    border: `1px solid ${theme.palette.divider}`,
                                    animation: "pulse 1.5s ease-in-out infinite",
                                    "@keyframes pulse": {
                                        "0%, 100%": { opacity: 0.4 },
                                        "50%": { opacity: 0.8 },
                                    },
                                }}
                            />
                        ))}
                    </Box>
                )}

                {/* Empty state */}
                {!loading && displayPosts.length === 0 && (
                    <MotionBox
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        sx={{ textAlign: "center", py: 6 }}
                    >
                        <MediumIcon
                            sx={{
                                fontSize: 48,
                                color: theme.palette.text.secondary,
                                mb: 2,
                                opacity: 0.5,
                            }}
                        />
                        <Typography color="text.secondary" fontSize={14}>
                            No posts available right now. Check back later.
                        </Typography>
                        <Button
                            href="https://medium.com/@harithawikramasinha2003"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ mt: 2, fontFamily: "monospace", fontSize: 13, textTransform: "none" }}
                            startIcon={<OpenInNewIcon />}
                        >
                            Visit Medium Profile
                        </Button>
                    </MotionBox>
                )}

                {/* Blog cards grid */}
                {!loading && displayPosts.length > 0 && (
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                sm: "1fr 1fr",
                                md: "1fr 1fr 1fr",
                            },
                            gap: 3,
                        }}
                    >
                        {displayPosts.map((post, i) => (
                            <MotionBox
                                key={post.link}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                            >
                                <Box
                                    component="a"
                                    href={post.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        height: "100%",
                                        textDecoration: "none",
                                        color: "inherit",
                                        borderRadius: 2,
                                        border: `1px solid ${theme.palette.divider}`,
                                        bgcolor: theme.palette.background.paper,
                                        overflow: "hidden",
                                        transition: "border-color 0.2s, transform 0.2s",
                                        "&:hover": {
                                            borderColor: theme.palette.primary.main,
                                            transform: "translateY(-4px)",
                                        },
                                    }}
                                >
                                    {/* Thumbnail */}
                                    {post.thumbnail && (
                                        <Box
                                            sx={{
                                                width: "100%",
                                                height: { xs: 160, sm: 180 },
                                                overflow: "hidden",
                                                borderBottom: `1px solid ${theme.palette.divider}`,
                                            }}
                                        >
                                            <Box
                                                component="img"
                                                src={post.thumbnail}
                                                alt={post.title}
                                                loading="lazy"
                                                sx={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                    transition: "transform 0.3s",
                                                    "&:hover": { transform: "scale(1.05)" },
                                                }}
                                            />
                                        </Box>
                                    )}

                                    {/* Content */}
                                    <Box
                                        sx={{
                                            p: { xs: 2, sm: 2.5 },
                                            display: "flex",
                                            flexDirection: "column",
                                            flexGrow: 1,
                                        }}
                                    >
                                        {/* Title */}
                                        <Typography
                                            sx={{
                                                fontWeight: 700,
                                                fontSize: { xs: 14, sm: 16 },
                                                lineHeight: 1.4,
                                                mb: 1,
                                                display: "-webkit-box",
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden",
                                            }}
                                        >
                                            {post.title}
                                        </Typography>

                                        {/* Description */}
                                        <Typography
                                            sx={{
                                                fontSize: { xs: 12, sm: 13 },
                                                color: theme.palette.text.secondary,
                                                lineHeight: 1.6,
                                                mb: 2,
                                                display: "-webkit-box",
                                                WebkitLineClamp: 3,
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden",
                                                flexGrow: 1,
                                            }}
                                        >
                                            {post.description}
                                        </Typography>

                                        {/* Tags */}
                                        {post.categories.length > 0 && (
                                            <Stack
                                                direction="row"
                                                flexWrap="wrap"
                                                gap={0.5}
                                                mb={2}
                                            >
                                                {post.categories.slice(0, 3).map((tag) => (
                                                    <Chip
                                                        key={tag}
                                                        label={tag}
                                                        size="small"
                                                        sx={{
                                                            fontFamily: "monospace",
                                                            fontSize: 10,
                                                            height: 22,
                                                            bgcolor:
                                                                theme.palette.primary.main + "18",
                                                            color: theme.palette.primary.main,
                                                            border: `1px solid ${theme.palette.primary.main}33`,
                                                        }}
                                                    />
                                                ))}
                                            </Stack>
                                        )}

                                        {/* Meta */}
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            sx={{
                                                pt: 1.5,
                                                borderTop: `1px solid ${theme.palette.divider}`,
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontFamily: "monospace",
                                                    fontSize: { xs: 10, sm: 11 },
                                                    color: theme.palette.text.secondary,
                                                }}
                                            >
                                                {formatDate(post.pubDate)}
                                            </Typography>
                                            <Stack
                                                direction="row"
                                                spacing={0.5}
                                                alignItems="center"
                                            >
                                                <AccessTimeIcon
                                                    sx={{
                                                        fontSize: 13,
                                                        color: theme.palette.text.secondary,
                                                    }}
                                                />
                                                <Typography
                                                    sx={{
                                                        fontFamily: "monospace",
                                                        fontSize: { xs: 10, sm: 11 },
                                                        color: theme.palette.text.secondary,
                                                    }}
                                                >
                                                    {post.readTime} min read
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </Box>
                                </Box>
                            </MotionBox>
                        ))}
                    </Box>
                )}

                {/* View All on Medium */}
                {!loading && displayPosts.length > 0 && (
                    <MotionBox
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        sx={{ textAlign: "center", mt: { xs: 4, md: 5 } }}
                    >
                        <Button
                            variant="outlined"
                            href="https://medium.com/@harithawikramasinha2003"
                            target="_blank"
                            rel="noopener noreferrer"
                            startIcon={<MediumIcon />}
                            sx={{
                                fontFamily: "monospace",
                                fontSize: 13,
                                textTransform: "none",
                                px: 3,
                                py: 1,
                            }}
                        >
                            Read more on Medium
                        </Button>
                    </MotionBox>
                )}
            </Container>
        </Box>
    );
}

