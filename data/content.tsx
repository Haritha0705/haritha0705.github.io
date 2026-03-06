import {ElementType, ReactNode} from "react";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import DownloadIcon from '@mui/icons-material/Download';
import CodeIcon from '@mui/icons-material/Code';
import TerminalIcon from '@mui/icons-material/Terminal';
import StorageIcon from '@mui/icons-material/Storage';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import BuildIcon from '@mui/icons-material/Build';
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Code, Mail, Person, Terminal, Work } from "@mui/icons-material";
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

// Hero Page Data and interfaces

export interface TerminalLine {
    type: 'command' | 'output';
    text: string;
}

export interface SocialLink {
    icon: React.ElementType;
    label: string;
    href: string;
}

export const terminalLines: TerminalLine[] = [
    { type: 'command', text: '$ whoami' },
    { type: 'output', text: 'Haritha Wickramasinga - Full Stack Developer' },
    { type: 'command', text: '$ cat skills.txt' },
    { type: 'output', text: 'React • Node.js • TypeScript • MongoDB • AWS' },
    { type: 'command', text: '$ echo $STATUS' },
    { type: 'output', text: '🟢 Available for opportunities' },
    { type: 'command', text: '$ ./start-project.sh' },
];

export const socialLinks: SocialLink[] = [
    { icon: GitHubIcon, label: 'GitHub', href: 'https://github.com' },
    { icon: LinkedInIcon, label: 'LinkedIn', href: 'https://linkedin.com' },
    { icon: MailOutlineIcon, label: 'Email', href: 'mailto:haritha@example.com' },
    { icon: DownloadIcon, label: 'Resume', href: '#' },
];

// About Page Data and interface

export interface Stat {
    label: string;
    value: string;
}

export const stats: Stat[] = [
    { label: 'Projects', value: '5+' },
    { label: 'Technologies', value: '15+' },
    { label: 'Experience', value: '3+ Yrs' },
];

export const competencies: string[] = [
    'Full Stack Development',
    'React & Next.js',
    'Node.js & Express',
    'Database Design',
    'API Development',
    'Cloud Deployment',
    'Agile Methodology',
    'Problem Solving',
];

// Skills Page Data and interfaces

export interface SkillsCode {
    frontend: string;
    backend: string;
    database: string;
    devops: string;
    tools: string;
}

export interface Tab {
    id: string;
    label: string;
    icon: ReactNode;
}

export const skillsCode: SkillsCode = {
    frontend: `// Frontend Technologies
import React from 'react';
import NextJS from 'next';
import TypeScript from 'typescript';
import TailwindCSS from 'tailwindcss';
import Material UI from 'mui';

const skills = {
  frameworks: ['React', 'Next.js'],
  languages: ['TypeScript', 'JavaScript', 'HTML', 'CSS'],
  styling: ['Tailwind CSS' , 'MUI', 'Sass'],
  tools: ['Vite', 'Webpack', 'Redux', 'React Query'],
  proficiency: '90%'
};

export default skills;`,

    backend: `// Backend & APIs
const express = require('express');
const mongoose = require('mongoose');

class BackendDeveloper {
  constructor() {
    this.languages = ['Node.js', 'Python', 'Java'];
    this.frameworks = ['Express', 'FastAPI', 'Spring Boot', 'Flask', 'NestJS', 'Ballerina'];
    this.apis = ['REST', 'GraphQL', 'WebSocket'];
    this.auth = ['JWT', 'OAuth', 'Passport'];
  }

  buildAPI() {
    return 'Scalable & Secure APIs';
  }
}

module.exports = new BackendDeveloper();`,

    database: `-- Database & Storage
SELECT * FROM skills
WHERE category = 'Database'
ORDER BY proficiency DESC;

/* MongoDB, PostgreSQL, MySQL, Redis */

CREATE TABLE expertise (
  id SERIAL PRIMARY KEY,
  skill VARCHAR(50),
  level INT CHECK (level >= 80)
);`,

    devops: `# DevOps & Cloud
docker build -t app .
docker-compose up -d

• AWS • Vercel 
• Render • CI/CD 
• GitHub Actions
`,

    tools: `{
  "editor": "VS Code",
  "design": ["Figma", "Adobe XD"],
  "testing": ["Postman", "Jest", "JUnit"],
  "containerization": "Docker",
  "orchestration": "Kubernetes",
  "versionControl": "Git & GitHub" , "Bitbucket",
}`,
};

export const tabs: Tab[] = [
    { id: 'frontend', label: 'Frontend', icon: <CodeIcon /> },
    { id: 'backend', label: 'Backend', icon: <TerminalIcon /> },
    { id: 'database', label: 'Database', icon: <StorageIcon /> },
    { id: 'devops', label: 'DevOps', icon: <CloudQueueIcon /> },
    { id: 'tools', label: 'Tools', icon: <BuildIcon /> },
];

// Command Palette Data and interface

export interface Command {
    icon: ReactNode;
    label: string;
    action: string;
    keywords: string;
}

export const commands: Command[] = [
    { icon: <Person />, label: 'Go to About', action: 'about', keywords: 'about me profile' },
    { icon: <Terminal />, label: 'View Skills', action: 'skills', keywords: 'skills tech stack' },
    { icon: <Code />, label: 'Browse Projects', action: 'projects', keywords: 'projects portfolio' },
    { icon: <Work />, label: 'View Experience', action: 'experience', keywords: 'experience timeline' },
    { icon: <Mail />, label: 'Contact Me', action: 'contact', keywords: 'contact email message' },
];

// Contact Page Data and interfaces
export interface FormData {
    name: string;
    email: string;
    message: string;
}

export interface ContactItem {
    icon: ElementType;
    label: string;
    value: string;
    href: string | null;
}

export interface SocialLinkContact {
    icon: ElementType;
    label: string;
    href: string;
}

export const contactInfo: ContactItem[] = [
    {
        icon: EmailIcon,
        label: "Email",
        value: "haritha@example.com",
        href: "mailto:haritha@example.com",
    },
    {
        icon: PhoneIcon,
        label: "Phone",
        value: "+94 77 123 4567",
        href: "tel:+94771234567",
    },
    {
        icon: LocationOnIcon,
        label: "Location",
        value: "Colombo, Sri Lanka",
        href: null,
    },
];

export const socialLinksContact: SocialLinkContact[] = [
    { icon: GitHubIcon, label: "GitHub", href: "https://github.com" },
    { icon: LinkedInIcon, label: "LinkedIn", href: "https://linkedin.com" },
    { icon: TwitterIcon, label: "Twitter", href: "https://twitter.com" },
];

// DevProject Page Data and interfaces

export interface Filter {
    id: string;
    label: string;
}

export interface Project {
    id: number;
    title: string;
    description: string;
    category: string[];
    tech: string[];
    stars: number;
    forks: number;
    language: string;
    languageColor: string;
    github: string;
    githubRepo: string;
    demo: string | null;
    lines: string;
    commits: string;
}

export const filters: Filter[] = [
    { id: 'all', label: '// All Projects' },
    { id: 'featured', label: '// Featured' },
    { id: 'web', label: '// Web Apps' },
    { id: 'api', label: '// APIs' },
];

export const projects: Project[] = [
    {
        id: 1,
        title: 'DevConnect Platform',
        description: 'Real-time collaboration platform for developers with code sharing, video calls, and project management.',
        category: ['featured', 'web'],
        tech: ['Next.js', 'Socket.io', 'PostgreSQL', 'Redis'],
        stars: 234,
        forks: 45,
        language: 'TypeScript',
        languageColor: '#3178C6',
        github: 'https://github.com/devconnect/platform',
        githubRepo: 'devconnect/platform',
        demo: 'https://devconnect.demo.com',
        lines: '15.2K',
        commits: '234',
    },
    {
        id: 2,
        title: 'AI Code Reviewer',
        description: 'ML-powered code review assistant that provides intelligent suggestions and detects potential bugs.',
        category: ['featured', 'api'],
        tech: ['Python', 'FastAPI', 'TensorFlow', 'Docker'],
        stars: 567,
        forks: 89,
        language: 'Python',
        languageColor: '#3776AB',
        github: 'https://github.com/ai/reviewer',
        githubRepo: 'ai/reviewer',
        demo: null,
        lines: '8.7K',
        commits: '156',
    },
    {
        id: 3,
        title: 'TaskFlow API',
        description: 'RESTful API for task management with advanced filtering, real-time updates, and team collaboration.',
        category: ['api'],
        tech: ['Node.js', 'Express', 'MongoDB', 'JWT'],
        stars: 189,
        forks: 34,
        language: 'JavaScript',
        languageColor: '#F7DF1E',
        github: 'https://github.com/taskflow/api',
        githubRepo: 'taskflow/api',
        demo: 'https://taskflow.demo.com',
        lines: '6.3K',
        commits: '98',
    },
    {
        id: 4,
        title: 'Design System Kit',
        description: 'Comprehensive React component library with 50+ customizable components and theming support.',
        category: ['web'],
        tech: ['React', 'TypeScript', 'Storybook', 'Tailwind'],
        stars: 423,
        forks: 67,
        language: 'TypeScript',
        languageColor: '#3178C6',
        github: 'https://github.com/design/system-kit',
        githubRepo: 'design/system-kit',
        demo: 'https://designkit.demo.com',
        lines: '12.1K',
        commits: '189',
    },
    {
        id: 5,
        title: 'WeatherPulse',
        description: 'Beautiful weather dashboard with interactive maps, forecasts, and location-based alerts.',
        category: ['web'],
        tech: ['React', 'Leaflet', 'OpenWeather API', 'Chart.js'],
        stars: 145,
        forks: 28,
        language: 'JavaScript',
        languageColor: '#F7DF1E',
        github: 'https://github.com/weather/pulse',
        githubRepo: 'weather/pulse',
        demo: 'https://weatherpulse.demo.com',
        lines: '4.5K',
        commits: '67',
    },
    {
        id: 6,
        title: 'DevMetrics Analytics',
        description: 'Developer productivity analytics platform with GitHub integration and insights dashboard.',
        category: ['featured', 'web'],
        tech: ['Next.js', 'D3.js', 'Supabase', 'GitHub API'],
        stars: 312,
        forks: 52,
        language: 'TypeScript',
        languageColor: '#3178C6',
        github: 'https://github.com/devmetrics/analytics',
        githubRepo: 'devmetrics/analytics',
        demo: 'https://devmetrics.demo.com',
        lines: '9.8K',
        commits: '145',
    },
];

// Experience Page Data and interface

interface TimelineItem {
    type: 'experience' | 'education' | 'achievement';
    icon: ElementType;
    title: string;
    company: string;
    period: string;
    current: boolean;
    description: string;
    achievements: string[];
}

export const timeline: TimelineItem[] = [
    {
        type: 'experience',
        icon: WorkIcon,
        title: 'React Developer Intern',
        company: 'Ceylon Edge',
        period: 'Jul 2025 - Present',
        current: true,
        description:
            'Contributing to dynamic web applications using React.js, enhancing UI/UX, and collaborating\n' +
            'with the team on real-world projects to build scalable frontend solutions.',
        achievements: [],
    },
    {
        type: 'education',
        icon: SchoolIcon,
        title: 'BSc Software Engineering',
        company: 'University of Westminster',
        period: '2025 - 2028 (Expected)',
        current: true,
        description:
            '2nd Year student. Specializing in Full Stack Development, Cloud Computing, and Software Architecture.',
        achievements: [],
    },
    {
        type: 'education',
        icon: AccountBalanceIcon,
        title: 'Foundation Program',
        company: 'Informatics Institute of Technology',
        period: '2023 - 2024',
        current: false,
        description: '',
        achievements: [],
    },
    {
        type: 'education',
        icon: AccountBalanceIcon,
        title: 'High School Diploma',
        company: 'St. Aloysius College',
        period: '2009 - 2022',
        current: false,
        description: '',
        achievements: [],
    },
];

// Footer Section Data and interfaces

export interface FooterLink {
    label: string;
    href: string;
}

export interface SocialLinkFooter {
    icon: React.ElementType;
    href: string;
    label: string;
}

export const footerLinks: FooterLink[] = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
];

export const socialLinksFooter: SocialLinkFooter[] = [
    { icon: GitHubIcon, href: 'https://github.com', label: 'GitHub' },
    { icon: LinkedInIcon, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: TwitterIcon, href: 'https://twitter.com', label: 'Twitter' },
    { icon: EmailIcon, href: 'mailto:haritha@example.com', label: 'Email' },
];

// GitHubActivity Section Interface

export interface ContributionDay {
    date: string;
    count: number;
}

// Navigation Section Data and interfaces

export interface NavItem {
    id: string;
    label: string;
}

export const navItems: NavItem[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
];
