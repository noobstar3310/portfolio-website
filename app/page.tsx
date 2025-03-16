"use client";

import type React from "react";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TypeAnimation } from "react-type-animation";

interface ExperienceItemProps {
  title: string;
  company: string;
  period: string;
  description: string;
  isVisible: boolean;
}

interface ProjectItemProps {
  title: string;
  event: string;
  link: string;
  isDark: boolean;
}

export default function Home() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsDarkTheme(true), 100);
        } else {
          setTimeout(() => setIsDarkTheme(false), 100);
        }
      },
      {
        threshold: 0.3,
        rootMargin: "-300px 0px",
      }
    );

    if (experienceRef.current) {
      observer.observe(experienceRef.current);
    }

    return () => {
      if (experienceRef.current) {
        observer.unobserve(experienceRef.current);
      }
    };
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full bg-white z-50 py-8 px-12">
        <div className="flex justify-between items-center">
          <div className="font-bold text-xl">
            <Link href="/">
              Tan Aik Wei<sup className="text-xs ml-1">TM</sup>
            </Link>
          </div>
          <div className="flex space-x-12">
            <button
              onClick={() => scrollToSection(aboutRef)}
              className="hover:underline"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection(experienceRef)}
              className="hover:underline"
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection(projectsRef)}
              className="hover:underline"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection(contactRef)}
              className="hover:underline"
            >
              Contact
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen relative px-12">
        <div className="absolute inset-0 flex flex-col justify-end pb-32">
          <h1 className="font-bold tracking-tight mb-16">
            <div className="text-[15vw] leading-none">Web3</div>
            <TypeAnimation
              sequence={[
                "Developer",
                2000,
                "Educator",
                2000,
                "Community Builder",
                2000,
              ]}
              wrapper="div"
              cursor={true}
              repeat={Infinity}
              style={{ fontSize: "10vw", lineHeight: "1", marginTop: "-2vw" }}
            />
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 px-12 py-8 bg-gradient-to-t from-white via-white to-transparent">
          <div className="flex justify-between">
            <div>
              <p className="text-sm">Currently</p>
              <p className="text-sm text-gray-500">
                Community Department Lead at Superteam Malaysia
              </p>
            </div>
            <div>
              <p className="text-sm">Based on</p>
              <p className="text-sm text-gray-500">Puchong, Selangor</p>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-sm">Web3 Development</p>
              <p className="text-sm">Community Building</p>
              <p className="text-sm">Blockchain Education</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        ref={aboutRef}
        className={`py-32 px-12 transition-all duration-500 ease-in-out ${
          isDarkTheme ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <div
          className={`max-w-3xl mx-auto transition-opacity duration-500 ${
            isDarkTheme ? "opacity-100" : "opacity-90"
          }`}
        >
          <p className="text-4xl leading-relaxed">
            Tan Aik Wei is a Web3 enthusiast and aspiring DevRel from Puchong,
            Malaysia. He focused on growing blockchain communities and educating
            members about Web3 technologies. With 3 years of experience in the
            largest student blockchain club in South East Asia, he has grown the
            community from a couple hundred to almost 1000 members, organizing
            hackathons and educational activities.
          </p>
        </div>
      </section>

      {/* Experience Section */}
      <section
        ref={experienceRef}
        className={`py-32 px-12 transition-all duration-500 ease-in-out ${
          isDarkTheme ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <div>
          <h2 className="text-5xl font-bold mb-16">Experience</h2>

          <div className="grid gap-16">
            <ExperienceItem
              title="President"
              company="Asia Pacific University Blockchain and Cryptocurrency Club"
              period="2024 - Present"
              description="Leading the largest student blockchain club in South East Asia. Organizing educational events and hackathons to promote blockchain technology."
              isVisible={isDarkTheme}
            />

            <ExperienceItem
              title="Community Department and Guild Lead"
              company="Superteam Malaysia"
              period="July 2024 - Dec 2024"
              description="Assist in handling planning for meetups and community events. Organize hackathons with at least 200 registrations. Responsible for grooming the Solana Malaysia ecosystem."
              isVisible={isDarkTheme}
            />

            <ExperienceItem
              title="IT Project Management Intern"
              company="Averis Sdn Bhd"
              period="July 2024 - Oct 2024"
              description="Assisted 2 project managers managing 4 IT projects. Prepared 2 project closures for Head of IT and Digital."
              isVisible={isDarkTheme}
            />

            <ExperienceItem
              title="One Stop Shop Support Intern"
              company="Roche Service and Solutions"
              period="April 2023 - August 2023"
              description="Handles IT support on a daily basis. Assists in SAP support and handled over 100 tickets."
              isVisible={isDarkTheme}
            />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        ref={projectsRef}
        className={`py-32 px-12 transition-all duration-500 ease-in-out ${
          isDarkTheme ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <div>
          <h2 className="text-5xl font-bold mb-16">Projects</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProjectItem
              title="Funds in Need"
              event="ETH Global Bangkok"
              link="https://github.com/Funds-In-Need"
              isDark={isDarkTheme}
            />

            <ProjectItem
              title="Rasa Review"
              event="ETH KL 2024"
              link="https://github.com/rasaReview"
              isDark={isDarkTheme}
            />

            <ProjectItem
              title="Asset Tracking App"
              event="Blockchain Development Assignment"
              link="https://github.com/noobstar3310/bcd-assignment"
              isDark={isDarkTheme}
            />

            <ProjectItem
              title="Data.Auc"
              event="Encode Club Hackathon"
              link="https://encode-hackathon-ten.vercel.app/"
              isDark={isDarkTheme}
            />

            <ProjectItem
              title="Aliqudity"
              event="ETH Global Agentic Hack"
              link="https://ethglobal-agentic.vercel.app/"
              isDark={isDarkTheme}
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="py-32 px-12 bg-black text-white">
        <div className="max-w-3xl">
          <h2 className="text-5xl font-bold mb-8">Get in touch</h2>
          <p className="text-xl mb-8">
            Feel free to reach out for collaborations, speaking opportunities,
            or just to say hello.
          </p>

          <div className="flex flex-col space-y-4">
            <a
              href="mailto:aikwei3310@gmail.com"
              className="text-2xl hover:underline flex items-center"
            >
              aikwei3310@gmail.com <ArrowUpRight className="ml-2 h-5 w-5" />
            </a>
            <a
              href="tel:+60123963860"
              className="text-2xl hover:underline flex items-center"
            >
              +60 12-396 3860 <ArrowUpRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="py-8 px-12 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Tan Aik Wei. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href="https://github.com/Funds-In-Need"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:underline"
            >
              GitHub
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:underline"
            >
              LinkedIn
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:underline"
            >
              Twitter
            </a>
          </div>
        </div>
      </footer> */}
    </main>
  );
}

function ExperienceItem({
  title,
  company,
  period,
  description,
  isVisible,
}: ExperienceItemProps) {
  return (
    <div
      className={`border-t ${
        isVisible ? "border-white" : "border-black"
      } pt-8 transition-colors duration-500`}
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
        <div>
          <h3 className="text-2xl font-bold">{title}</h3>
          <p className="text-lg">{company}</p>
          <p className="text-sm text-gray-500">{period}</p>
        </div>
        <div>
          <p className="text-lg">{description}</p>
        </div>
      </div>
    </div>
  );
}

function ProjectItem({ title, event, link, isDark }: ProjectItemProps) {
  return (
    <div
      className={`p-8 transition-colors duration-500 ${
        isDark
          ? "border-white border hover:bg-white hover:text-black"
          : "border-black border hover:bg-black hover:text-white"
      }`}
    >
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-lg mb-4">{event}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-sm underline"
      >
        View Project <ArrowUpRight className="ml-1 h-4 w-4" />
      </a>
    </div>
  );
}
