import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import axios from "axios";

const ProjectsSection = ({ id }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiURL = import.meta.env.VITE_API_URL;

  const getProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${apiURL}/projects`);
      if (response) {
        console.log("projects data is>>>:::::", response.data);
        setProjects(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      setError("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div id={id} className="projects-section h-full mt-32 mb-32">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="section-header mb-16"
      >
        <motion.h1
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="section-title text-2xl mb-6 font-light flex justify-center"
        >
          My Projects
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-row justify-center"
        >
          <div className="line bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 h-[0.4px] w-1/3 lg:-mt-1 lg:mb-15"></div>
        </motion.div>
      </motion.div>

      <motion.div
        className="cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 justify-items-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project._id}
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
                viewport={{ once: true }}
              >
                {project.name}
              </motion.h2>

              <motion.p
                className="text-gray-400 text-center mt-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
              >
                {project.description}
              </motion.p>

              <motion.div
                className="buttons flex flex-row justify-between absolute w-full px-6 bottom-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                viewport={{ once: true }}
              >
                {project.liveLink && (
                  <motion.a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative h-10 rounded-4xl w-fit px-6 overflow-hidden group flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(270deg, #13ADC7, #6978D1, #945DD6) border-box",
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 5px 15px rgba(19, 173, 199, 0.3)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Professional Light Indicator */}
                    <motion.div
                      className="absolute left-3 w-2 h-2 rounded-full bg-cyan-400 transition-all duration-300"
                      initial={{ opacity: 0.6 }}
                      whileHover={{ 
                        opacity: 1,
                        scale: 1.5,
                        boxShadow: "0 0 15px rgba(34, 211, 238, 0.9), 0 0 25px rgba(34, 211, 238, 0.6), 0 0 35px rgba(34, 211, 238, 0.3), inset 0 0 8px rgba(255, 255, 255, 0.4)"
                      }}
                      animate={{
                        boxShadow: [
                          "0 0 0px rgba(34, 211, 238, 0)",
                          "0 0 8px rgba(34, 211, 238, 0.7)",
                          "0 0 0px rgba(34, 211, 238, 0)"
                        ]
                      }}
                      transition={{
                        boxShadow: {
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }
                      }}
                    />
                    
                    <span className="text-white text-sm font-medium ml-3">Live Preview</span>
                  </motion.a>
                )}

                {project.githubLink && (
                  <motion.a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 px-5 flex items-center space-x-1 rounded-4xl border-gray-400 border-1 group cursor-pointer"
                    whileHover={{
                      scale: 1.05,
                      borderColor: "#6978D1",
                      boxShadow: "0 5px 15px rgba(105, 120, 209, 0.3)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="text-white text-sm">GitHub</p>
                    <motion.div
                      className="group-hover:rotate-360 transition-transform duration-500"
                    >
                      <FaGithub
                        size={24}
                        color="white"
                        className="group-hover:text-blue-400 transition-colors duration-300"
                      />
                    </motion.div>
                  </motion.a>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="view-more-container flex justify-center mt-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.button
          className="px-4 w-fit h-11 text-sm rounded-4xl z-11 font-light relative overflow-hidden transition-all duration-300 
             shadow-[0_10px_15px_rgba(0,178,255,0.35)] group cursor-pointer"
          style={{
            background:
              "linear-gradient(270deg, #13ADC7, #6978D1, #945DD6) border-box",
          }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 5px 15px rgba(19, 173, 199, 0.3)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-white font-medium ">View More Projects</span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ProjectsSection;
