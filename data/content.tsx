import {ElementType, ReactNode} from "react";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import DownloadIcon from '@mui/icons-material/Download';
import StorageIcon from '@mui/icons-material/Storage';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import BuildIcon from '@mui/icons-material/Build';
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CodeIcon from "@mui/icons-material/Code";
import TerminalIcon from "@mui/icons-material/Terminal";
import WorkIcon from '@mui/icons-material/Work';
import MailIcon from "@mui/icons-material/Mail";
import PersonIcon from "@mui/icons-material/Person";
import ArticleIcon from "@mui/icons-material/Article";
import SchoolIcon from '@mui/icons-material/School';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MediumIcon from '@/components/ui/MediumIcon';

// Hero Page Data and interfaces

export interface TerminalLine {
    type: 'command' | 'output';
    text: string;
}

export interface SocialLink {
    icon: ElementType;
    label: string;
    href: string;
}

export const terminalLines: TerminalLine[] = [
    { type: 'command', text: '$ whoami' },
    { type: 'output', text: 'Haritha Wickremesinghe — Full Stack Developer' },
    { type: 'command', text: '$ cat skills.txt' },
    { type: 'output', text: 'React • Next.js • Node.js • NestJS • TypeScript • MongoDB • PostgreSQL' },
    { type: 'command', text: '$ echo $STATUS' },
    { type: 'output', text: '🟢 Available for opportunities' },
    { type: 'command', text: '$ ./start-project.sh' },
];

export const socialLinks: SocialLink[] = [
    { icon: GitHubIcon, label: 'GitHub', href: 'https://github.com/Haritha0705' },
    { icon: LinkedInIcon, label: 'LinkedIn', href: 'https://linkedin.com/in/haritha-wickremesinghe' },
    { icon: MediumIcon, label: 'Medium', href: 'https://medium.com/@harithawikramasinha2003' },
    { icon: MailOutlineIcon, label: 'Email', href: 'mailto:harithawikramasinha2003@gmail.com' },
    { icon: DownloadIcon, label: 'Resume', href: '/Haritha _Wickremesinghe.pdf' },
];

// About Page Data and interface

export interface Stat {
    label: string;
    value: string;
}

export const stats: Stat[] = [
    { label: 'Projects', value: '6+' },
    { label: 'Technologies', value: '20+' },
    { label: 'Experience', value: '1+ Yr' },
];

export const competencies: string[] = [
    'Full Stack Development',
    'React & Next.js',
    'Node.js & NestJS',
    'Flutter & React Native',
    'REST API Design',
    'Database Design',
    'Docker & Kubernetes',
    'OOP & Data Structures',
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
import MaterialUI from '@mui/material';

const skills = {
  frameworks: ['React', 'Next.js'],
  languages: ['TypeScript', 'JavaScript', 'HTML5', 'CSS3'],
  styling: ['Tailwind CSS', 'MUI', 'Sass'],
  mobile: ['Flutter', 'React Native'],
  tools: ['Vite', 'Redux', 'React Query'],
  proficiency: '90%'
};

export default skills;`,

    backend: `// Backend & APIs
const express = require('express');
const mongoose = require('mongoose');

class BackendDeveloper {
  constructor() {
    this.languages = ['Node.js', 'Java', 'Python'];
    this.frameworks = ['Express', 'NestJS', 'Spring Boot', 'Flask'];
    this.apis = ['REST', 'GraphQL', 'WebSocket'];
    this.auth = ['JWT', 'OAuth', 'Passport'];
    this.orm = ['Prisma', 'Mongoose', 'TypeORM'];
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

/* MongoDB, PostgreSQL, MySQL, Redis, Firebase */

CREATE TABLE expertise (
  id SERIAL PRIMARY KEY,
  skill VARCHAR(50),
  level INT CHECK (level >= 80)
);`,

    devops: `# DevOps & Cloud
docker build -t app .
docker-compose up -d
kubectl apply -f deployment.yaml

• AWS • Vercel • Render
• Docker • Kubernetes
• Git • GitHub Actions
`,

    tools: `{
  "editor": ["VS Code", "WebStorm", "IntelliJ", "PyCharm"],
  "design": ["Figma"],
  "testing": ["Postman", "Jest", "JUnit"],
  "containerization": "Docker",
  "orchestration": "Kubernetes",
  "versionControl": ["Git & GitHub", "Bitbucket"]
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
    { icon: <PersonIcon />, label: 'Go to About', action: 'about', keywords: 'about me profile' },
    { icon: <TerminalIcon />, label: 'View Skills', action: 'skills', keywords: 'skills tech stack' },
    { icon: <CodeIcon />, label: 'Browse Projects', action: 'projects', keywords: 'projects portfolio' },
    { icon: <ArticleIcon />, label: 'Read Blog', action: 'blog', keywords: 'blog articles medium posts' },
    { icon: <WorkIcon />, label: 'View Experience', action: 'experience', keywords: 'experience timeline' },
    { icon: <MailIcon />, label: 'Contact Me', action: 'contact', keywords: 'contact email message' },
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
        value: "harithawikramasinha2003@gmail.com",
        href: "mailto:harithawikramasinha2003@gmail.com",
    },
    {
        icon: PhoneIcon,
        label: "Phone",
        value: "+94 785 156 282",
        href: "tel:+94785156282",
    },
    {
        icon: LocationOnIcon,
        label: "Location",
        value: "Colombo, Sri Lanka",
        href: null,
    },
];

export const socialLinksContact: SocialLinkContact[] = [
    { icon: GitHubIcon, label: "GitHub", href: "https://github.com/Haritha0705" },
    { icon: LinkedInIcon, label: "LinkedIn", href: "https://linkedin.com/in/haritha-wickremesinghe" },
    { icon: MediumIcon, label: "Medium", href: "https://medium.com/@harithawikramasinha2003" },
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
    images: string[];
    readme: string;
}

export const filters: Filter[] = [
    { id: 'all', label: '// All Projects' },
    { id: 'featured', label: '// Featured' },
    { id: 'web', label: '// Web Apps' },
    { id: 'api', label: '// APIs' },
    { id: 'mobile', label: '// Mobile' },
];

export const projects: Project[] = [
    {
        id: 1,
        title: 'E-Tutor LMS',
        description: 'A complete Learning Management System with separate client and server repositories, featuring user authentication, course management, and interactive dashboards for a seamless online learning experience.',
        category: ['featured', 'web'],
        tech: ['Next.js', 'TypeScript', 'NestJS', 'Tailwind CSS', 'Prisma', 'PostgreSQL'],
        stars: 0,
        forks: 0,
        language: 'TypeScript',
        languageColor: '#3178C6',
        github: 'https://github.com/Haritha0705/etutor_lms_clientSide',
        githubRepo: 'Haritha0705/etutor_lms_clientSide',
        demo: null,
        lines: '12K+',
        commits: '150+',
        images: [],
        readme: `## E-Tutor LMS

A complete **Learning Management System** with separate client and server repositories.

### Key Features

- User authentication and role-based access control
- Course creation and management dashboard
- Interactive student dashboards with progress tracking
- Responsive design for all devices

### Architecture

The project follows a **monorepo-inspired** structure with decoupled client and server:

- **Client**: Built with Next.js and TypeScript, styled with Tailwind CSS
- **Server**: NestJS API with Prisma ORM connected to PostgreSQL

### Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js, TypeScript, Tailwind CSS |
| Backend | NestJS, Prisma ORM |
| Database | PostgreSQL |
`,
    },
    {
        id: 2,
        title: 'Library Management System',
        description: 'Web-based application for managing books, inventory, borrowing records, and member details, built with modern full-stack frameworks for libraries and educational institutions.',
        category: ['featured', 'web', 'api'],
        tech: ['React', 'TypeScript', 'Node.js', 'Vite', 'Tailwind CSS', 'MongoDB', 'PostgreSQL'],
        stars: 0,
        forks: 0,
        language: 'TypeScript',
        languageColor: '#3178C6',
        github: 'https://github.com/Haritha0705/library_management_system',
        githubRepo: 'Haritha0705/library_management_system',
        demo: null,
        lines: '10K+',
        commits: '120+',
        images: [],
        readme: `## Library Management System

A web-based application for managing books, inventory, borrowing records, and member details.

### Key Features

- Book catalog with search and filtering
- Member registration and management
- Borrowing and return tracking with due dates
- Admin panel with inventory analytics

### Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, TypeScript, Vite, Tailwind CSS |
| Backend | Node.js, TypeScript, Express |
| Database | MongoDB, PostgreSQL |

### API Documentation

Full REST API documentation is available via the linked API docs.
`,
    },
    {
        id: 3,
        title: 'Mobile Fitness App',
        description: 'A cross-platform mobile app for tracking workouts, monitoring fitness progress, and syncing data across devices, designed with an intuitive user interface.',
        category: ['featured', 'mobile'],
        tech: ['Dart', 'Flutter'],
        stars: 0,
        forks: 0,
        language: 'Dart',
        languageColor: '#00B4AB',
        github: 'https://github.com/Haritha0705/workout_planner_app',
        githubRepo: 'Haritha0705/workout_planner_app',
        demo: null,
        lines: '5K+',
        commits: '60+',
        images: [],
        readme: `## Mobile Fitness App

A cross-platform mobile application for tracking workouts and monitoring fitness progress.

### Key Features

- Workout logging with custom exercise support
- Progress charts and fitness analytics
- Cross-device data synchronization
- Intuitive, gesture-driven UI

### Tech Stack

| Layer | Technology |
|---|---|
| Framework | Flutter |
| Language | Dart |
| State Mgmt | Provider |
`,
    },
    {
        id: 4,
        title: 'Student Management System',
        description: 'A robust full-stack student management system for handling student records, attendance, and academic performance with an efficient and user-friendly interface.',
        category: ['web', 'api'],
        tech: ['React', 'TypeScript', 'Node.js', 'Vite', 'Tailwind CSS', 'MongoDB'],
        stars: 0,
        forks: 0,
        language: 'TypeScript',
        languageColor: '#3178C6',
        github: 'https://github.com/Haritha0705/Student-Management-System',
        githubRepo: 'Haritha0705/Student-Management-System',
        demo: null,
        lines: '6K+',
        commits: '80+',
        images: [],
        readme: `## Student Management System

A full-stack system designed to handle student records, attendance, and academic performance.

### Key Features

- Student CRUD operations with validation
- Attendance tracking and reporting
- Academic performance dashboard
- Role-based access for admins and teachers

### Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, TypeScript, Vite, Tailwind CSS |
| Backend | Node.js, TypeScript, Express |
| Database | MongoDB |
`,
    },
    {
        id: 5,
        title: 'Courier Delivery Management System',
        description: 'Console-based courier delivery system with admin controls for agents and packages, delivery tracking, and customer search by tracking ID. Built with OOP principles and file handling.',
        category: ['api'],
        tech: ['Java', 'OOP', 'File I/O'],
        stars: 0,
        forks: 0,
        language: 'Java',
        languageColor: '#B07219',
        github: 'https://github.com/Haritha0705/Courier-Delivery-Management-System-Java-Console-App',
        githubRepo: 'Haritha0705/Courier-Delivery-Management-System-Java-Console-App',
        demo: null,
        lines: '3K+',
        commits: '40+',
        images: [],
        readme: `## Courier Delivery Management System

A console-based courier delivery application built with core Java and OOP principles.

### Key Features

- Admin controls for managing agents and packages
- Delivery status tracking with real-time updates
- Customer search by tracking ID
- File-based data persistence

### Design Principles

- Object-Oriented Programming with encapsulation and inheritance
- Clean separation of concerns
- File I/O for persistent storage
`,
    },
    {
        id: 6,
        title: 'Developer Portfolio',
        description: 'This portfolio — a modern, responsive single-page application with dark/light themes, live GitHub heatmap, command palette, and animated sections.',
        category: ['featured', 'web'],
        tech: ['Next.js', 'TypeScript', 'MUI', 'Framer Motion', 'Tailwind CSS'],
        stars: 0,
        forks: 0,
        language: 'TypeScript',
        languageColor: '#3178C6',
        github: 'https://github.com/Haritha0705/portfolio-v2',
        githubRepo: 'Haritha0705/portfolio-v2',
        demo: null,
        lines: '8K+',
        commits: '100+',
        images: [],
        readme: `## Developer Portfolio

A modern, responsive single-page application showcasing projects, skills, and experience.

### Key Features

- Dark and light theme with persistent toggle
- Live GitHub contribution heatmap
- Command palette with Cmd+K navigation
- Animated sections with Framer Motion
- EmailJS-powered contact form
- Docker-ready production build

### Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16, React 19 |
| Language | TypeScript 5 |
| UI Library | Material UI 7 |
| Animation | Framer Motion 12 |
| Styling | Tailwind CSS 4, Emotion |
| Deploy | Docker, Vercel |
`,
    },
];

// Experience Page Data and interface

export interface TimelineItem {
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
        type: 'education',
        icon: SchoolIcon,
        title: 'BSc (Hons) Software Engineering',
        company: 'University of Westminster (via IIT)',
        period: 'Jan 2025 - Sep 2028 (Expected)',
        current: true,
        description:
            'Undergraduate specializing in Full Stack Development, Cloud Computing, and Software Architecture with a strong foundation in algorithms, data structures, and OOP.',
        achievements: [],
    },
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
        period: '2008 - 2022',
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
    icon: ElementType;
    href: string;
    label: string;
}

export const footerLinks: FooterLink[] = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Blog', href: '#blog' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
];

export const socialLinksFooter: SocialLinkFooter[] = [
    { icon: GitHubIcon, href: 'https://github.com/Haritha0705', label: 'GitHub' },
    { icon: LinkedInIcon, href: 'https://linkedin.com/in/haritha-wickremesinghe', label: 'LinkedIn' },
    { icon: MediumIcon, href: 'https://medium.com/@harithawikramasinha2003', label: 'Medium' },
    { icon: TwitterIcon, href: 'https://twitter.com', label: 'Twitter' },
    { icon: EmailIcon, href: 'mailto:harithawikramasinha2003@gmail.com', label: 'Email' },
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
    { id: 'blog', label: 'Blog' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
];
