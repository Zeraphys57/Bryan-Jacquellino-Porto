import React from "react";
import { motion } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "Bashion Fashion",
    description: "A brief description of Project One.",
    imageUrl: "https://via.placeholder.com/300",
    link: "#",
  },
  {
    id: 2,
    title: "Dentist Workshop",
    description: "A brief description of Project Two.",
    imageUrl: "https://via.placeholder.com/300",
    link: "#",
  },
  {
    id: 3,
    title: "Lawcorps",
    description: "A brief description of Project Three.",
    imageUrl: "https://via.placeholder.com/300",
    link: "#",
  },
];

const PortfolioDisplay = () => {
  return (
    <section className="py-12 bg-transparent">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-8 text-gray-800 dark:text-gray-200">
          What I Do?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-24">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
              whileTap={{ scale: 0.97 }}
              className="bg-transparent dark:bg-gray-800 rounded-lg shadow-md overflow-hidden
                transition-[transform,box-shadow] duration-200
                [@media(hover:hover)_and_(pointer:fine)]:hover:scale-[1.03]
                [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-xl"
            >
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {project.description}
                </p>
                <motion.a
                  href={project.link}
                  whileTap={{ scale: 0.96 }}
                  className="inline-block mt-4 px-4 py-2 bg-gray-700 text-white rounded-md
                    transition-colors duration-150
                    [@media(hover:hover)_and_(pointer:fine)]:hover:bg-gray-500"
                >
                  View Project
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioDisplay;
