import { ElementType } from 'react';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import DownloadIcon from '@mui/icons-material/Download';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import MediumIcon from '@/components/ui/MediumIcon';

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
    { type: 'output', text: 'Haritha Wickremesinghe - Full Stack Developer' },
    { type: 'command', text: '$ cat skills.txt' },
    { type: 'output', text: 'React - Next.js - Node.js - NestJS - TypeScript - MongoDB - PostgreSQL' },
    { type: 'command', text: '$ echo $STATUS' },
    { type: 'output', text: 'Available for opportunities' },
    { type: 'command', text: '$ ./start-project.sh' },
];

export const socialLinks: SocialLink[] = [
    { icon: GitHubIcon, label: 'GitHub', href: 'https://github.com/Haritha0705' },
    { icon: LinkedInIcon, label: 'LinkedIn', href: 'https://www.linkedin.com/in/haritha-wickremesinghe-11ab05271/' },
    { icon: MediumIcon, label: 'Medium', href: 'https://medium.com/@harithawikramasinha2003' },
    { icon: FacebookIcon, label: 'Facebook', href: 'https://web.facebook.com/haritha.wickremesinghe/' },
    { icon: InstagramIcon, label: 'Instagram', href: 'https://www.instagram.com/haritha_wickremesinghe/' },
    { icon: MailOutlineIcon, label: 'Email', href: 'mailto:harithawikramasinha2003@gmail.com' },
    { icon: DownloadIcon, label: 'Resume', href: '/Haritha _Wickremesinghe.pdf' },
];



