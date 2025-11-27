import {
  // Existing icons from the template that we will use as placeholders
  frontend,
  backend,
  ux,
  prototyping,
  // Keep imports for icons used in 'technologies', 'experiences', 'projects'
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  git,
  figma,
  docker,
  postgresql,
  rubyrails,
  graphql,
  komikult,    // Will use as placeholder for a service image
  leaderboard, // Will use as placeholder for a service image
  math,        // Will use as placeholder for a service image
  movie,       // Will use as placeholder for a service image
  nyeusi,
  space,
  coverhunt,
  dcc,
  kelhel,
  microverse,
} from '../assets'; // This assumes these are correctly exported from src/assets/index.js

const navLinks = [
  {
    id: 'about',
    title: 'About',
    path: '/#about',
    type: 'hash',
  },
  {
    id: 'services', // Changed from 'projects'
    title: 'Services', // Changed from 'Projects'
    path: '/#services',
    type: 'hash',
  },
  {
    id: 'contact',
    title: 'Contact',
    path: '/#contact',
    type: 'hash',
  },
  {
    id: 'blog',
    title: 'Blog',
    path: '/blog',
    type: 'route',
  },
];

// Renamed from 'services' to 'aboutServices' for clarity
const aboutServices = [ // This is for your "About Us" cards
  {
    title: "About",
    description: "Anu Software Solutions designs and builds custom web, mobile and ERP systems for businesses in Iraq and the region.",
    icon: frontend,
  },
  {
    title: "Our Mission",
    description: "To help companies move from spreadsheets and WhatsApp to robust apps, without over-engineering.",
    icon: backend,
  },
  {
    title: "Our Vision",
    description: "To be the local tech partner that can design, build and run mission-critical systems for Iraqi businesses.",
    icon: ux,
  },
  {
    title: "Our Approach",
    description: "We combine business analysis (BPMN, TOGAF, ArchiMate) with strong engineering in React, Next.js, Node.js and Odoo when needed.",
    icon: prototyping,
  },
];

// New array for the Services section (formerly Projects)
const anuCompanyServices = [
  {
    id: 'service-ea', // Unique ID for the service
    name: 'Enterprise Architecture',
    description: 'We analyze business processes using TOGAF, identify inefficiencies, and design optimized architectures tailored to each organization.',
    image: komikult, // Placeholder image - replace with an actual relevant image
  },
  {
    id: 'service-erp',
    name: 'Odoo Implementation',
    description: 'We deploy and customize Odoo ERP to match your workflows — including sales, accounting, inventory, HR, Project and manufacturing.',
    image: leaderboard, // Placeholder image - replace with an actual relevant image
  },
  {
    id: 'service-ia',
    name: 'Intelligent Automation',
    description: 'We automate workflows, integrate systems like GPS and WhatsApp, and train & tailor LLMs (Large Language Models) to your business needs.',
    image: math, // Placeholder image - replace with an actual relevant image
  },
  {
    id: 'service-ca',
    name: 'Custom Apps & Dashboards', // Updated title to match previous discussion
    description: 'We build web/mobile apps and data dashboards that streamline operations and provide real-time insights.',
    image: movie, // Placeholder image - replace with an actual relevant image
  },
];

const technologies = [
  {
    name: 'HTML 5',
    icon: html,
  },
  {
    name: 'CSS 3',
    icon: css,
  },
  {
    name: 'JavaScript',
    icon: javascript,
  },
  {
    name: 'TypeScript',
    icon: typescript,
  },
  {
    name: 'React JS',
    icon: reactjs,
  },
  {
    name: 'Redux Toolkit',
    icon: redux,
  },
  {
    name: 'Tailwind CSS',
    icon: tailwind,
  },
  {
    name: 'Node JS',
    icon: nodejs,
  },
  {
    name: 'Rails',
    icon: rubyrails,
  },
  {
    name: 'graphql',
    icon: graphql,
  },
  {
    name: 'postgresql',
    icon: postgresql,
  },
  {
    name: 'git',
    icon: git,
  },
  {
    name: 'figma',
    icon: figma,
  },
  {
    name: 'docker',
    icon: docker,
  },
];

const experiences = [
  {
    title: 'Front-End Developer',
    company_name: 'Cover Hunt',
    icon: coverhunt,
    iconBg: '#333333',
    date: 'Aug 2021 - Feb 2022',
  },
  {
    title: 'Mentor (Volunteer)',
    company_name: 'Microverse',
    icon: microverse,
    iconBg: '#333333',
    date: 'Mar 2022 - May 2022',
  },
  {
    title: 'Junior Software Engineer',
    company_name: 'Kelhel',
    icon: kelhel,
    iconBg: '#333333',
    date: 'May 2022 - Oct 2022',
  },
  {
    title: 'Full Stack Developer',
    company_name: 'Diversity Cyber Council',
    icon: dcc,
    iconBg: '#333333',
    date: 'Sep 2022 - Present',
  },
];

const projects = [ // Keeping original projects data if you plan to use it elsewhere
  {
    id: 'project-1',
    name: 'KomiKult',
    description: 'A comic characters list app that displays Marvel characters.',
    tags: [
      {
        name: 'react',
        color: 'blue-text-gradient',
      },
      {
        name: 'mongodb',
        color: 'green-text-gradient',
      },
      {
        name: 'tailwind',
        color: 'pink-text-gradient',
      },
    ],
    image: komikult,
    repo: 'https://github.com/shaqdeff/KomiKult',
    demo: 'https://shaqdeff.github.io/KomiKult/',
  },
  {
    id: 'project-2',
    name: 'Leaderboard',
    description:
      'A leaderboard list app that displays scores submitted by different players.',
    tags: [
      {
        name: 'react',
        color: 'blue-text-gradient',
      },
      {
        name: 'restapi',
        color: 'green-text-gradient',
      },
      {
        name: 'scss',
        color: 'pink-text-gradient',
      },
    ],
    image: leaderboard,
    repo: 'https://github.com/shaqdeff/Leaderboard',
    demo: 'https://shaqdeff.github.io/Leaderboard/',
  },
  {
    id: 'project-3',
    name: 'Math Magicians',
    description: 'This is a single-page calculator app built with React',
    tags: [
      {
        name: 'nextjs',
        color: 'blue-text-gradient',
      },
      {
        name: 'supabase',
        color: 'green-text-gradient',
      },
      {
        name: 'css',
        color: 'pink-text-gradient',
      },
    ],
    image: math,
    repo: 'https://github.com/shaqdeff/Math-Magicians',
    demo: 'https://inspiring-medovik-37d3b3.netlify.app/',
  },
  {
    id: 'project-4',
    name: 'Movie Metro',
    description: `A single-page application that allows users to search for any movie or show's ratings and its details.`,
    tags: [
      {
        name: 'nextjs',
        color: 'blue-text-gradient',
      },
      {
        name: 'supabase',
        color: 'green-text-gradient',
      },
      {
        name: 'css',
        color: 'pink-text-gradient',
      },
    ],
    image: movie,
    repo: 'https://github.com/shaqdeff/Movie-Metro',
    demo: 'https://movie-metro.netlify.app/',
  },
  {
    id: 'project-5',
    name: 'Nyeusi Fest Site',
    description:
      'This is a demo concert website for a music festival called Nyeusi.',
    tags: [
      {
        name: 'nextjs',
        color: 'blue-text-gradient',
      },
      {
        name: 'supabase',
        color: 'green-text-gradient',
      },
      {
        name: 'css',
        color: 'pink-text-gradient',
      },
    ],
    image: nyeusi,
    repo: 'https://github.com/shaqdeff/Nyeusi-Fest-Site',
    demo: 'https://shaqdeff.github.io/Nyeusi-Fest-Site/',
  },
];

export {
  navLinks,
  aboutServices, // Changed from 'services'
  anuCompanyServices, // Added new services array
  technologies,
  experiences,
  projects, // Kept original projects export
};
