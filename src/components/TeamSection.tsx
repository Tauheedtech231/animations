"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

const team: TeamMember[] = [
  {
    id: 1,
    name: "Mark Jackson",
    role: "Co-Founder & CEO",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Valeria Novikova",
    role: "Lighting Specialist",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Alex Podzemsky",
    role: "Graphics Designer",
    image:
      "https://images.unsplash.com/photo-1614289371518-722f8ce0ad07?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Sophia Kim",
    role: "Interior Architect",
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80",
  },
];

export default function TeamSection() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".team-heading", {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });
      gsap.from(".team-list-item", {
        opacity: 0,
        x: 50,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
      gsap.from(".cta-content", {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 85%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* TEAM SECTION */}
      <section
        ref={sectionRef}
        className="bg-gray-50 dark:bg-gray-900 py-20 transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-lg">
            <Image
              src={team[active].image}
              alt={team[active].name}
              width={600}
              height={700}
              className="object-cover w-full h-[550px] transition-all duration-700 ease-in-out"
            />
          </div>

          {/* Right Content */}
          <div>
            <span className="uppercase text-yellow-600 font-semibold tracking-wide">
              ● Amazing Design Team
            </span>
            <h2 className="team-heading text-4xl md:text-5xl font-extrabold leading-tight mt-3 text-gray-900 dark:text-white">
              Meet The <span className="text-yellow-600">Experts</span> Our{" "}
              <br />
              Interior Designers
            </h2>

            <div className="mt-10 space-y-6">
              {team.map((member, i) => (
                <div
                  key={member.id}
                  onMouseEnter={() => setActive(i)}
                  className={`team-list-item flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4 cursor-pointer group`}
                >
                  <div className="flex items-center gap-5">
                    <span
                      className={`text-lg font-semibold ${
                        active === i
                          ? "text-yellow-600"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3
                      className={`text-2xl font-bold ${
                        active === i
                          ? "text-yellow-600"
                          : "text-gray-900 dark:text-white"
                      }`}
                    >
                      {member.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-400 uppercase tracking-wide">
                      {member.role}
                    </p>
                    <ArrowUpRight
                      className={`w-5 h-5 transition-transform ${
                        active === i
                          ? "text-yellow-600 translate-x-1"
                          : "text-gray-500 group-hover:text-yellow-500"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

     
    </>
  );
}
