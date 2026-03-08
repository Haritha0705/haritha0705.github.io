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
    { label: 'Projects', value: '10+' },
    { label: 'Technologies', value: '25+' },
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
    { id: 'web', label: '// Web Apps' },
    { id: 'devops', label: '// DevOps' },
    { id: 'mobile', label: '// Mobile' },
];

export const projects: Project[] = [
    {
        id: 1,
        title: 'Nextora – Digital Campus Platform',
        description: 'A scalable full-stack Progressive Web Application (SDGP group project) addressing university academic and administrative challenges with a modular architecture adaptable for multiple institutions.',
        category: ['web'],
        tech: ['Next.js', 'Spring Boot', 'PostgreSQL', 'Material UI', 'PWA'],
        stars: 0,
        forks: 0,
        language: 'TypeScript',
        languageColor: '#3178C6',
        github: 'https://github.com/Haritha0705/etutor_lms_clientSide',
        githubRepo: 'Haritha0705/etutor_lms_clientSide',
        demo: null,
        lines: '18K+',
        commits: '200+',
        images: [],
        readme: `## Nextora – Digital Campus Platform

A scalable full-stack **Progressive Web Application** developed as a second-year university group project (SDGP), addressing common academic and administrative management challenges.

### Key Features

- Modular digital campus architecture adaptable for multiple universities
- Responsive, accessible frontend built with Next.js and Material UI
- RESTful API layer powered by Spring Boot with PostgreSQL persistence
- Progressive Web App capabilities for offline-first access
- Role-based dashboards for students, lecturers, and administrators

### Architecture

The project is split across three repositories:

- **Client** — Next.js + Material UI frontend
- **Server** — Spring Boot REST API + PostgreSQL
- **Marketing** — Nextora marketing and landing page site

### Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js, Material UI, PWA |
| Backend | Spring Boot, Java |
| Database | PostgreSQL |
| Deployment | Vercel, Render |

### Repositories

- Client: \`etutor_lms_clientSide\`
- Server: \`etutor_lms_serverSide\`
- Marketing: \`nextora-marketing-website\`
`,
    },
    {
        id: 2,
        title: 'TaskMaster DevOps Platform',
        description: 'Production-ready task management API with a full DevSecOps pipeline — JWT authentication, Docker containerization, AWS ECS deployment, Terraform infrastructure, and GitHub Actions CI/CD.',
        category: ['devops'],
        tech: ['Spring Boot', 'Docker', 'AWS ECS', 'Terraform', 'GitHub Actions', 'JWT'],
        stars: 0,
        forks: 0,
        language: 'Java',
        languageColor: '#B07219',
        github: 'https://github.com/Haritha0705',
        githubRepo: 'Haritha0705/taskmaster-devops',
        demo: null,
        lines: '8K+',
        commits: '90+',
        images: [],
        readme: `## TaskMaster DevOps Platform

A production-ready task management API with a complete **DevSecOps** pipeline.

### Key Features

- JWT-based authentication and secure REST APIs
- Containerized services using Docker
- Deployed on AWS ECS with production-grade configuration
- CI/CD automation with GitHub Actions
- Infrastructure provisioned with Terraform (IaC)
- Security scanning integrated into the pipeline

### Architecture

\`\`\`
Client Request
    |
    v
API Gateway --> Spring Boot API --> PostgreSQL
    |
    v
Docker Container --> AWS ECS
    |
    v
Terraform (IaC) <-> GitHub Actions (CI/CD)
\`\`\`

### Tech Stack

| Layer | Technology |
|---|---|
| Backend | Spring Boot, Java |
| Auth | JWT, Spring Security |
| Container | Docker |
| Cloud | AWS ECS, ECR |
| IaC | Terraform |
| CI/CD | GitHub Actions |

### DevSecOps Pipeline

1. Code push triggers GitHub Actions workflow
2. Build and unit tests run automatically
3. Docker image built and pushed to ECR
4. Terraform provisions/updates ECS infrastructure
5. Automated deployment to AWS ECS
`,
    },
    {
        id: 3,
        title: 'CloudCart – Microservices E-Commerce',
        description: 'Enterprise-style e-commerce platform using microservices architecture with independent services for users, products, orders, and payments — containerized with Docker and Kubernetes-ready.',
        category: ['devops'],
        tech: ['Microservices', 'Docker', 'Kubernetes', 'API Gateway', 'CI/CD', 'Node.js'],
        stars: 0,
        forks: 0,
        language: 'TypeScript',
        languageColor: '#3178C6',
        github: 'https://github.com/Haritha0705',
        githubRepo: 'Haritha0705/cloudcart',
        demo: null,
        lines: '15K+',
        commits: '130+',
        images: [],
        readme: `## CloudCart – Microservices E-Commerce Platform

An enterprise-style e-commerce platform built with a **microservices architecture**.

### Key Features

- Independent services for users, products, orders, and payments
- API Gateway for unified request routing
- Containerized services using Docker
- Kubernetes orchestration for scaling and resilience
- CI/CD pipelines for automated testing and deployment
- Service discovery and inter-service communication

### Architecture

\`\`\`
Client
  |
  v
API Gateway
  |
  +---> User Service
  +---> Product Service
  +---> Order Service
  +---> Payment Service
  |
  v
Docker / Kubernetes Cluster
\`\`\`

### Tech Stack

| Layer | Technology |
|---|---|
| Services | Node.js, Express |
| Gateway | API Gateway |
| Container | Docker |
| Orchestration | Kubernetes |
| CI/CD | GitHub Actions |
| Communication | REST, Message Queues |
`,
    },
    {
        id: 4,
        title: 'Blog Post Application',
        description: 'Full-stack blog platform using monorepo architecture with a Next.js frontend optimized for performance and a NestJS GraphQL API for creating, editing, and publishing posts.',
        category: ['web'],
        tech: ['Next.js', 'NestJS', 'GraphQL', 'TypeScript', 'Monorepo'],
        stars: 0,
        forks: 0,
        language: 'TypeScript',
        languageColor: '#3178C6',
        github: 'https://github.com/Haritha0705',
        githubRepo: 'Haritha0705/blog-post-app',
        demo: null,
        lines: '9K+',
        commits: '85+',
        images: [],
        readme: `## Blog Post Application

A full-stack blog platform built with a **monorepo architecture**.

### Key Features

- Performance-optimized Next.js frontend with SSR and ISR
- GraphQL API powered by NestJS for flexible data querying
- Create, edit, and publish blog posts with a rich text editor
- Monorepo structure for shared types, utilities, and configurations
- Authentication and authorization for authors

### Architecture

The project uses a monorepo approach with shared packages:

- **apps/web** — Next.js frontend application
- **apps/api** — NestJS GraphQL backend
- **packages/shared** — Shared TypeScript types and utilities

### Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js, TypeScript |
| Backend | NestJS, GraphQL |
| Architecture | Monorepo |
| Language | TypeScript |
`,
    },
    {
        id: 5,
        title: 'Library Management System',
        description: 'Full-stack library management platform for books, inventory, borrowing records, and member management with a React + TypeScript frontend, Node.js backend, and admin panel.',
        category: ['web'],
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

A full-stack web application for managing books, inventory, borrowing records, and member details.

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
`,
    },
    {
        id: 6,
        title: 'E-Tutor LMS',
        description: 'A complete Learning Management System with separate client and server repositories, featuring user authentication, course management, and interactive dashboards for online learning.',
        category: ['web'],
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

- **Client**: Next.js + TypeScript, styled with Tailwind CSS
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
        id: 7,
        title: 'Mobile Fitness App',
        description: 'A cross-platform mobile app for tracking workouts, monitoring fitness progress, and syncing data across devices, designed with an intuitive user interface.',
        category: ['mobile'],
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
        id: 8,
        title: 'Student Management System',
        description: 'A robust full-stack student management system for handling student records, attendance, and academic performance with an efficient and user-friendly interface.',
        category: ['web'],
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
