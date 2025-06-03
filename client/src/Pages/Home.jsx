import React, { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";

import {
  FaLinkedin,
  FaXTwitter,
  FaEnvelope,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa6";

import SkillsSection from "../components/SkillsSection";
import ProjectsSection from "../components/ProjectsSection";

// Inside your Home component's return:
<ProjectsSection />;

function Home() {
  const [profile, setProfile] = useState(null);

  const getProfile = async () => {
    try {
      const response = await axios.get("/api/profile");
      if (response) {
        console.log("the data is >>>>", response.data);
        setProfile(response.data); // save data to state
      }
    } catch (error) {
      console.log("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  // const [projects, setProjects] = useState(null);
  // const getProjects = async () => {
  //   try {
  //     const response = await axios.get("/api/getProjects");
  //     if (response) {
  //       console.log("the projects data is >>>>", response.data);
  //       setProjects(response.data); // save data to state
  //     }
  //   } catch (error) {
  //     console.log("Error fetching projects:", error);
  //   }
  // };

  // useEffect(() => {
  //   getProjects();
  // }, []);

  return (
    <div className="flex justify-center w-full">
      <div className="main-container max-w-6xl w-full ">
        <div className="px-4 py-4 text-white">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            className="navbar flex-row justify-between text-gray-200 hidden
  lg:flex lg:justify-between lg:w-full lg:px-6 py-4 border-b-[0.5px] border-gray-600 sticky top-0 backdrop-blur-sm bg-[#0f1624]/80 z-50"
          >
            {/* Logo/Name Animation */}
            {/* <motion.h1 
    className="font-bold text-xl relative group cursor-pointer"
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.2 }}
  >
    <motion.span 
      
      className="relative z-10 bg-clip-text"
    >
      Muntadher Al-Akraa
    </motion.span>
    <motion.span 
      initial={{ width: 0 }}
      whileHover={{ width: "100%" }}
      transition={{ duration: 0.3 }}
      className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500"
    ></motion.span>
  </motion.h1> */}
            <h1 className="text-xl font-bold cursor-pointer">
              {profile?.title || "Default Title"}
            </h1>
            {/* Menu Links Animation */}
            <div className="section-titles flex flex-row gap-10 font-light">
              {["Projects", "Technologies", "Contact"].map((item, index) => (
                <motion.p
                  key={item}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.2 + index * 0.1,
                    type: "spring",
                    stiffness: 100,
                  }}
                  whileHover={{ y: -2 }}
                  className="cursor-pointer relative group"
                >
                  <motion.span className="relative z-10 transition-all duration-300 group-hover:text-white">
                    {item}
                  </motion.span>
                  <motion.span
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-0 left-0 bg-gradient-to-r from-blue-400 to-purple-500 h-px"
                  ></motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 blur-sm group-hover:from-blue-500/10 group-hover:to-purple-500/10 rounded-md -z-10 h-px"
                  ></motion.span>
                </motion.p>
              ))}
            </div>

            {/* Social Icons Animation */}
            <div className="contact-icons flex flex-row gap-4">
              {[
                {
                  href: `${profile?.socialMedia?.linkedin}`,
                  icon: "FaLinkedin",
                },
                {
                  href: `mailto:${profile?.email}`,
                  icon: "FaEnvelope",
                },
                {
                  href: `${profile?.socialMedia?.linketwitterdin}`,
                  icon: "FaXTwitter",
                },
              ].map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="relative group p-2 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.4 + index * 0.1,
                    type: "spring",
                    stiffness: 200,
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-md"
                  ></motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10"
                  ></motion.span>
                  {link.icon === "FaLinkedin" && (
                    <motion.div
                      whileHover={{ rotate: 10 }}
                      transition={{ duration: 0.2, type: "spring" }}
                    >
                      <FaLinkedin
                        size={20}
                        className="text-gray-200 transition-all duration-300 group-hover:text-blue-400"
                      />
                    </motion.div>
                  )}
                  {link.icon === "FaEnvelope" && (
                    <motion.div
                      whileHover={{ rotate: 10 }}
                      transition={{ duration: 0.2, type: "spring" }}
                    >
                      <FaEnvelope
                        size={20}
                        className="text-gray-200 transition-all duration-300 group-hover:text-purple-400"
                      />
                    </motion.div>
                  )}
                  {link.icon === "FaXTwitter" && (
                    <motion.div
                      whileHover={{ rotate: 10 }}
                      transition={{ duration: 0.2, type: "spring" }}
                    >
                      <FaXTwitter
                        size={20}
                        className="text-gray-200 transition-all duration-300 group-hover:text-blue-300"
                      />
                    </motion.div>
                  )}
                </motion.a>
              ))}
            </div>
          </motion.div>
          <div className="sections lg:px-15">
            <motion.div
              className="hero-section flex flex-col justify-center items-center w-full h-full mb-[500px] mt-2 
          lg:flex lg:flex-row lg:mt-40 lg:mb-55 md:flex lg:justify-evenly
          
          "
              initial={{ y: "-50%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <div
                className="title mb-4 
          flex flex-col gap-4 items-center
          lg:flex lg:flex-col lg:gap-10 lg:justify-start lg:items-start"
              >
                <motion.h1
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  className="text-my1-gradient text-3xl font-light 
              lg:text-4xl lg:font-bold lg:flex 
              "
                >
                  Hello, I'm Muntadher,
                </motion.h1>
                <motion.p
                  initial={{
                    opacity: 0,
                    textShadow: "0px 0px 0px rgba(255, 255, 255, 0)", // No shadow
                  }}
                  animate={{
                    opacity: 1,
                    textShadow: "0px 0px 5px rgba(255, 255, 255, 0.5)", // Reduced white glow
                  }}
                  transition={{ duration: 1, ease: "easeInOut", yoyo: 1 }}
                  className="text-xl font-light text-white
                lg:text-2xl
                "
                >
                  {profile?.title}
                </motion.p>
                <motion.p
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="about max-w-4/5 text-gray-400 font-light 
                lg:max-w-4/5 lg:text-sm
                "
                >
                  {profile?.bio}

                  {/* Bringing modern technologies into the real world is in my{" "}
                  <span className="text-my1-gradient">DNA</span>. I have worked
                  on full-stack web applications using React, Node.js, and
                  MongoDB. I focus on building intuitive and efficient solutions
                  that bridge technology with real-world needs. */}
                </motion.p>

                <button
                  className="hidden lg:block w-35 h-10 text-sm rounded-4xl z-11 font-light relative overflow-hidden transition-all duration-300 
             shadow-[0_10px_15px_rgba(0,178,255,0.35)] group cursor-pointer"
                  style={{
                    background:
                      "linear-gradient(270deg, #13ADC7, #6978D1, #945DD6) border-box",
                  }}
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href =
                      "https://drive.usercontent.google.com/download?id=1wpznr-aoF2cxRNjRzJfNVMT1J6Yxh1of&export=download&authuser=1&confirm=t&uuid=ac9e4177-b752-4378-ae20-945473c25415&at=ALoNOglUIjbgYCk29MfdHPPZ_9_d:1748514308009";
                    link.download = "Muntadher_AlAkraa_CV.pdf"; // filename you want
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                  Download CV
                </button>
              </div>

              <div className="circles relative lg:h-full lg:w-fit lg:-left-30">
                <motion.div
                  className="w-96 h-96 rounded-full bg-transparent flex items-center justify-center -z-2 absolute -left-85 mt-12 lg:hidden"
                  style={{
                    boxShadow: "0 0 0 1px transparent", // Transparent border placeholder
                    background:
                      "linear-gradient(360deg, #13ADC7, #6978D1, #945DD6) border-box", // Gradient for the border
                    WebkitMask:
                      "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)", // Mask to isolate gradient to border
                    WebkitMaskComposite: "xor", // Combine masks to exclude inner area
                    maskComposite: "exclude", // Standard property for masking
                    border: "1px solid transparent", // Transparent border to hold the gradient
                  }}
                />

                <div
                  className="w-30 h-30 rounded-full shadow-[0_10px_15px_rgba(0,178,255,0.35)] absolute top-50 animate-pulse
              lg:w-40 lg:h-40 lg:-right-25 lg:top-15 lg:z-2
              "
                  style={{
                    background:
                      "linear-gradient(330deg,#00B2FF , #13ADC7, #6978D1) border-box",
                    animation: "float 3s ease-in-out infinite",
                  }}
                ></div>

                <div
                  className="image absolute h-60 w-60 rounded-full p-[1px] -right-20 top-10 z-10
              lg:w-40 lg:h-40 lg:-top-10 lg:-right-5
              "
                  style={{
                    background:
                      "linear-gradient(330deg, #13ADC7, #6978D1, #945DD6) border-box",
                  }}
                >
                  <img
                    src="./my-image.jpg"
                    alt=""
                    className=" rounded-full left-50 z-10  shadow-[0_10px_15px_rgba(0,178,255,0.35)]"
                  />
                </div>
                <div className="big-circel">
                  <motion.div
                    className="w-80 h-80 rounded-full bg-transparent  items-center justify-center hidden 
          lg:flex
        
        "
                    style={{
                      boxShadow: "0 0 0 1px transparent", // Transparent border placeholder
                      background:
                        "linear-gradient(90deg, #13ADC7, #6978D1, #945DD6) border-box", // Gradient for the border
                      WebkitMask:
                        "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)", // Mask to isolate gradient to border
                      WebkitMaskComposite: "xor", // Combine masks to exclude inner area
                      maskComposite: "exclude", // Standard property for masking
                      border: "1px solid transparent", // Transparent border to hold the gradient
                    }}
                    whileHover={{ scale: 1.5 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  />
                </div>
                <button
                  className="w-40 h-15 rounded-4xl z-11 absolute -right-1 top-85 shadow-[0_10px_15px_rgba(0,178,255,0.35)]
              lg:hidden
              "
                  style={{
                    background:
                      "linear-gradient(270deg, #13ADC7, #6978D1, #945DD6) border-box ",
                  }}
                >
                  Download CV
                </button>
              </div>
            </motion.div>
            {/* ----------------------------------------------------------------------------------
            {projects &&
  projects.map((project, index) => (
    <motion.div
      key={project._id || index}
      className="project-card flex flex-col items-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.15,
        type: "spring",
        stiffness: 100,
      }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
    >
      <motion.div
        className="card-gradient w-[350px] h-[450px] bg-[#0f1624] rounded-xl flex flex-col items-center justify-center relative p-6 overflow-hidden border border-gray-600"
        whileHover={{
          boxShadow: "0 10px 25px rgba(19, 173, 199, 0.25)",
          transition: { duration: 0.3 },
        }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-transparent to-blue-900/10 z-0"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        <motion.div
          className="h-[190px] w-[290px] -mt-15 mb-4 overflow-hidden rounded-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <motion.img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>

        <motion.h2
          className="text-white text-xl font-medium mb-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
        >
          {project.name}
        </motion.h2>

        <motion.p
          className="text-gray-400 text-center mt-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
        >
          {project.description}
        </motion.p>

        <motion.div
          className="buttons flex flex-row justify-between absolute w-full px-6 bottom-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
        >
          <motion.a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="relative h-10 rounded-4xl w-fit px-6 overflow-hidden group"
            style={{
              background:
                "linear-gradient(270deg, #13ADC7, #6978D1, #945DD6) border-box",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.2 }}
            />
            Live Preview
          </motion.a>

          <motion.a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 px-4 flex items-center space-x-1 rounded-4xl border-gray-400 border-1 group"
            whileHover={{ scale: 1.05, borderColor: "#6978D1" }}
            whileTap={{ scale: 0.95 }}
          >
            <p>GitHub</p>
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <FaGithub
                size={30}
                color="white"
                className="group-hover:text-blue-400 transition-colors duration-300"
              />
            </motion.div>
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.div>
  ))} */}
            <ProjectsSection />

            <div className="techs-section mt-20 lg:-mt-20">
              {/* <div className="flex flex-col items-center justify-center min-h-screen text-white"> */}

              <SkillsSection />
              {/* </div> */}
            </div>
            <div
              className="contact flex justify-center mt-15 flex-col 
        lg:mt-1
        "
            >
              <div className="contact ">
                <div className="section-title mb-4">
                  <h1 className="text-2xl font-light flex justify-center ">
                    Contact me
                  </h1>
                  <div className="flex flex-row justify-center ">
                    <div className="line bg-gray-500 h-[0.1px]  w-2/3 mt-4"></div>
                  </div>
                </div>
                <div className=" flex justify-center flex-col mb-10">
                  <div className="email flex flex-row items-center justify-center gap-2  ">
                    <FaEnvelope size={20} color="white" />
                    <h1 className="font-light text-xl">{profile?.email}</h1>
                  </div>
                </div>
              </div>

              {/* <div className="follow-me lg:hidden">
            <div className="section-title  mb-6">
              <h1 className="text-2xl font-light flex justify-center">
                Follow Me
              </h1>
              <div className="flex flex-row justify-center ">
                <div className="line bg-gray-500 h-[0.4px]  w-1/3 mt-4"></div>
              </div>
            </div>
            <div className="contact-icons  flex-row gap-6 flex justify-center mb-10 ">
              <a
                href="https://www.linkedin.com/in/your-username"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={35} color="white" />
              </a>
              <a href="mailto:muntadher.alakraa@gmail.com">
                <FaGithub size={35} color="white" />
              </a>
              <a
                href="https://twitter.com/your-username"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXTwitter size={35} color="white" />
              </a>
            </div>
          </div> */}
            </div>
            <div className="w-full py-8 ">
              <div className="flex flex-col items-center">
                {/* Gradient Line */}
                <div
                  className="w-4/5 h-px mb-8"
                  style={{
                    background:
                      "linear-gradient(90deg, #13ADC7, #6978D1, #945DD6)",
                  }}
                />

                {/* Footer Convtent */}
                <div className="w-full flex flex-col lg:flex-row justify-between items-center px-8 lg:px-16">
                  {/* Logo/Name */}
                  <div className="mb-6 lg:mb-0 flex-row justify-center">
                    <h2 className="font-bold text-xl text-white">
                      Muntadher Al-Akraa
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">
                      Frontend Developer
                    </p>
                  </div>

                  {/* Site Links */}
                  <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-12 mb-6 lg:mb-0">
                    <a
                      href="#projects"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Projects
                    </a>
                    <a
                      href="#technologies"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Technologies
                    </a>
                    <a
                      href="#contact"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Contact
                    </a>
                  </div>

                  {/* Social Media */}
                  <div className="flex gap-6">
                    <a
                      href={profile?.socialMedia?.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <FaLinkedin size={20} />
                    </a>
                    <a
                      href={profile?.socialMedia?.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <FaGithub size={20} />
                    </a>
                    <a
                      href={profile?.socialMedia?.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <FaXTwitter size={20} />
                    </a>
                  </div>
                </div>

                {/* Copyright */}
                {/* <div className="mt-8 text-gray-500 text-sm">
            <p>© {currentYear} Muntadher Al-Akraa. All rights reserved.</p>
          </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
