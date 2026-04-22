import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "aos/dist/aos.css";
import ScrollTrigger from "gsap/ScrollTrigger";
import "../index.css";


gsap.registerPlugin(ScrollTrigger);

// Data untuk setiap item edukasi
const educationData = [
  { status: "High School",  desc: "Science Major Gembala Baik", location: "Pontianak" },  
  { status: "D1",           desc: "IT & Engineering",           location: "Taiwan" },  
  { status: "University",   desc: "IT Atma Jaya",               location: "Yogyakarta" },  
  { status: "Present",      desc: "Making Your Website",        location: "My Room" },   
];

const About = () => {
  const lineRef = useRef(null);
  const descRefs = useRef([]);
  // Mengosongkan ref untuk menghindari duplikasi saat re-render
  descRefs.current = [];

  useEffect(() => {
    const line = lineRef.current;
    const triggerElem = descRefs.current[0];

    // Animasi garis vertikal menggunakan GSAP dan ScrollTrigger
    gsap.fromTo(
      line,
      { strokeDasharray: 1000, strokeDashoffset: 1000 },
      {
        strokeDashoffset: 0,
        scrollTrigger: {
          trigger: triggerElem,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
        duration: 4,
        ease: "power2.out",
      }
    );

    // Animasi setiap item edukasi menggunakan GSAP
    descRefs.current.forEach((el, i) => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          x: i % 2 === 0 ? -100 : 100,
        },
        {
          opacity: 1,
          x: 0,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "bottom 75%",
            scrub: 1,
          },
          duration: 3,
          ease: "power3.out",
        }
      );
    });
    
  }, []);

  const addToRefs = (el) => {
    if (el && !descRefs.current.includes(el)) {
      descRefs.current.push(el);
    }
  };


  return (
    <div className="relative overflow-x-hidden sm:w-full bg-transparent py-20 px-4 sm:px-6">
        
      {/* Judul bagian timeline */}
      <h2 className="text-4xl sm:text-6xl text-gray-900 dark:text-gray-100 font-mono font-bold text-center mb-20">
        Education Timeline
      </h2>
    
      {/* Garis vertikal SVG */}
      <svg
        ref={lineRef}
        className="absolute left-1/2 transform -translate-x-1/2 top-32 z-0 mt-10"
        height={educationData.length * 240}
        width="4"
      >
        <line
          x1="2"
          y1="0"
          x2="2"
          y2={educationData.length * 240}
          stroke="#4B5563"
          strokeWidth="4"
        />
      </svg>

      {/* Konten timeline */}
      <div className="relative z-10 space-y-40">
        {educationData.map((edu, i) => (
          <div
            key={i}
            ref={(el) => addToRefs(el)}
            className={`relative flex items-center ${
              // Layout zigzag untuk desktop, di tengah untuk mobile
              i % 2 === 0 ? "justify-start sm:justify-start" : "justify-end sm:justify-end"
            }`}
          >
            <div
              className={`
                 bg-gray-100 dark:bg-gray-800 shadow-md p-6 rounded-lg w-[240px] sm:w-[20%]
                 transition-[transform,box-shadow] duration-200
                 [@media(hover:hover)_and_(pointer:fine)]:hover:scale-[1.03]
                 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-xl
                 ${i % 2 === 0 ? "ml-auto sm:ml-128" : "mr-auto sm:mr-128"}
               `}
            >
              <h3 className="text-lg sm:text-xl text-center font-bold font-mono dark:text-gray-100">{edu.status}</h3>
              <p className="text-gray-600 text-center font-mono text-sm sm:text-base dark:text-gray-400">{edu.desc}</p>
              <p className="text-teal-500 text-center font-mono text-sm sm:text-base dark:text-teal-400">{edu.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
