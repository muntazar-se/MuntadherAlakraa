import React from "react";

import { motion } from "framer-motion";
import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNodeJs,
  FaGithub,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiMongodb,
  SiJavascript,
  SiExpress,
  SiFigma,
} from "react-icons/si";

const skills = [
  {
    id: 1,
    icon: <FaHtml5 size={45} color="#E44D26" />,
    name: "HTML",
    delay: 0,
  },
  {
    id: 2,
    icon: <FaCss3Alt size={45} color="#1572B6" />,
    name: "CSS",
    delay: 0.2,
  },
  {
    id: 3,
    icon: <SiJavascript size={45} color="#F7DF1E" />,
    name: "JavaScript",
    delay: 0.4,
  },
  {
    id: 4,
    icon: <FaReact size={45} color="#61DAFB" />,
    name: "React.js",
    delay: 0.6,
  },
  {
    id: 5,
    icon: <SiTailwindcss size={45} color="#38BDF8" />,
    name: "Tailwind CSS",
    delay: 0.8,
  },
  {
    id: 6,
    icon: <FaNodeJs size={45} color="#83CD29" />,
    name: "Node.js",
    delay: 1,
  },
  {
    id: 7,
    icon: <SiExpress size={45} color="#FFFFFF" />,
    name: "Express.js",
    delay: 1.2,
  },
  {
    id: 8,
    icon: <SiMongodb size={45} color="#47A248" />,
    name: "MongoDB",
    delay: 1.4,
  },
  {
    id: 9,
    icon: <FaGithub size={45} color="#FFFFFF" />,
    name: "GitHub",
    delay: 1.6,
  },
  {
    id: 10,
    icon: <SiFigma size={45} color="#F24E1E" />,
    name: "Figma",
    delay: 1.8,
  },
];

export default function SkillsSection() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white ">
      <div className="section-title  flex flex-col justify-center mb-10 items-center">
        <h2 className="text-2xl font-light">My Tech Stack</h2>
        <div className="line bg-gray-500 h-[0.4px] w-3/2 mt-4 "></div>
      </div>

      <div className="flex flex-wrap justify-center gap-10 w-3/4">
        {skills.map((skill) => (
          <motion.div
            key={skill.id}
            className="w-24 h-24 flex flex-col items-center justify-center rounded-full bg-gray-800 shadow-lg relative"
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: skill.delay }}

            whileTap={{ scale: 1 }}
          >
            <motion.div
              animate={{
                y: [0, -12, 0, 8, 0], // Floating effect with slight randomization
                scale: [1, 1.05, 1],
                rotate: [-2, 2, -2, 2, -2], // Tiny tilting for depth effect
              }}
              transition={{
                duration: 3.5 + skill.delay * 0.3, // Varies the speed
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror",
              }}
            >
              {skill.icon}
            </motion.div>
            <p className="text-sm text-gray-300 mt-2">{skill.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
