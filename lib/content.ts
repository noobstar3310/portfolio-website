import portraitImage from "@/public/eggwae.jpeg";

export const site = {
  name: "Tan Aik Wei",
};

export const sections = {
  about: { id: "about", number: "01", label: "About" },
  experience: { id: "experience", number: "02", label: "Experience" },
  projects: { id: "projects", number: "03", label: "Projects" },
  contact: { id: "contact", number: "04", label: "Contact" },
};

export const navItems = Object.values(sections);

export const hero = {
  headline: "Web3",
  roles: ["Developer", "Educator", "Community Builder"],
  details: [
    {
      label: "Currently",
      value: "President of APU Blockchain and Cryptocurrency Club",
    },
    { label: "Based on", value: "Puchong, Selangor" },
  ],
  focus: ["Web3 Development", "Community Building", "Blockchain Education"],
};

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
  event: string;
  link: string;
}

export const projects: Project[] = [
  {
    title: "Funds in Need",
    event: "ETH Global Bangkok",
    link: "https://github.com/Funds-In-Need",
  },
  {
    title: "Rasa Review",
    event: "ETH KL 2024",
    link: "https://github.com/rasaReview",
  },
  {
    title: "Asset Tracking App",
    event: "Blockchain Development Assignment",
    link: "https://github.com/noobstar3310/bcd-assignment",
  },
  {
    title: "Data.Auc",
    event: "Encode Club Hackathon",
    link: "https://encode-hackathon-ten.vercel.app/",
  },
  {
    title: "Aliqudity",
    event: "ETH Global Agentic Hack",
    link: "https://ethglobal-agentic.vercel.app/",
  },
];

export const contact = {
  heading: "Get in touch",
  intro:
    "Feel free to reach out for collaborations, speaking opportunities, or just to say hello.",
  email: "aikwei3310@gmail.com",
  phone: { display: "+60 12-396 3860", href: "tel:+60123963860" },
};
