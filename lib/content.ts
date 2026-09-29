import type { StaticImageData } from "next/image";
import portraitImage from "@/public/eggwae.jpeg";
import deosxImage from "@/public/projects/deosx.jpg";
import juncturaxImage from "@/public/projects/juncturax.jpg";
import ominariImage from "@/public/projects/ominari.jpg";
import ovantiImage from "@/public/projects/ovanti.jpg";

export const site = {
  name: "Tan Aik Wei",
};

// The hero reads: NAME / ROLE / SPECIALIZING IN / (SPECIALTY)
export const profile = {
  role: "Full-stack developer",
  specialty: "Smart contracts",
};

// Tech stack shown as a logo marquee under the hero headline, in this order.
// `use` is the one-liner in the hover popup. Every name needs a logo in
// lib/stack-icons.ts.
export const stack = [
  { name: "Solidity", use: "My main language for writing smart contracts." },
  { name: "Foundry", use: "Compiling, testing and scripting my contracts." },
  { name: "Ethereum", use: "The network my contracts are built for." },
  { name: "ethers.js", use: "Reading and writing contracts from JavaScript apps." },
  { name: "viem", use: "Type-safe contract calls in TypeScript front ends." },
  { name: "wagmi", use: "Wallet connections and contract hooks in React." },
  { name: "TypeScript", use: "My default language across front end and back end." },
  { name: "JavaScript", use: "The foundation under all my web work." },
  { name: "React", use: "Building the interfaces people use to reach contracts." },
  { name: "Next.js", use: "Full-stack web apps, including this site." },
  { name: "Tailwind CSS", use: "Styling interfaces quickly and consistently." },
  { name: "Node.js", use: "APIs, scripts and back-end services." },
  { name: "PostgreSQL", use: "Relational data for app back ends." },
];

export const sections = {
  about: { id: "about", number: "01", label: "About" },
  experience: { id: "experience", number: "02", label: "Experience" },
  projects: { id: "projects", number: "03", label: "Projects" },
  contact: { id: "contact", number: "04", label: "Contact" },
};

export const navItems = Object.values(sections);

export const about =
  "Tan Aik Wei is a Web3 enthusiast and aspiring DevRel from Puchong, Malaysia. He focused on growing blockchain communities and educating members about Web3 technologies. With 3 years of experience in the largest student blockchain club in South East Asia, he has grown the community from a couple hundred to almost 1000 members, organizing hackathons and educational activities.";

export const portrait = {
  image: portraitImage,
  alt: "Portrait of Tan Aik Wei",
};

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

export const experience: Experience[] = [
  {
    title: "President",
    company: "Asia Pacific University Blockchain and Cryptocurrency Club",
    period: "2024 - Present",
    description:
      "Leading the largest student blockchain club in South East Asia. Organizing educational events and hackathons to promote blockchain technology.",
  },
  {
    title: "Community Department and Guild Lead",
    company: "Superteam Malaysia",
    period: "July 2024 - Dec 2024",
    description:
      "Assist in handling planning for meetups and community events. Organize hackathons with at least 200 registrations. Responsible for grooming the Solana Malaysia ecosystem.",
  },
  {
    title: "IT Project Management Intern",
    company: "Averis Sdn Bhd",
    period: "July 2024 - Oct 2024",
    description:
      "Assisted 2 project managers managing 4 IT projects. Prepared 2 project closures for Head of IT and Digital.",
  },
  {
    title: "One Stop Shop Support Intern",
    company: "Roche Service and Solutions",
    period: "April 2023 - August 2023",
    description:
      "Handles IT support on a daily basis. Assists in SAP support and handled over 100 tickets.",
  },
];

export interface Project {
  title: string;
  summary: string;
  link: string;
  // Screenshot of the live landing page
  image: StaticImageData;
}

export const projects: Project[] = [
  {
    title: "Ominari",
    summary:
      "A beginner-friendly prediction market across Polygon, BNB Chain and Base. Sign in with email and back your view on real-world events with a few dollars.",
    link: "https://ominari.com/",
    image: ominariImage,
  },
  {
    title: "JuncturaX",
    summary:
      "Deep-tier supply chain finance. An anchor buyer's approved invoice becomes a divisible claim that suppliers down to Tier-4 can finance at anchor-linked rates.",
    link: "https://www.juncturax.com/",
    image: juncturaxImage,
  },
  {
    title: "DEOS-X",
    summary:
      "A digital economy operating system for institutions, bringing on-chain FX, payments, custody and tokenisation onto one set of programmable rails.",
    link: "https://www.deosx.com/",
    image: deosxImage,
  },
  {
    title: "Ovanti",
    summary:
      "One app for every financial need. A global SuperApp bringing payments, credit, investing, insurance and loyalty together.",
    link: "https://www.ovanti.com/",
    image: ovantiImage,
  },
];

export const contact = {
  heading: "Get in touch",
  intro:
    "Feel free to reach out for collaborations, speaking opportunities, or just to say hello.",
  email: "aikwei3310@gmail.com",
  phone: { display: "+60 12-396 3860", href: "tel:+60123963860" },
};
