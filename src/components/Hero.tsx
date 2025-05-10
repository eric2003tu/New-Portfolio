import { ArrowDown, Mail, Phone, MapPin, Github, Link as LinkIcon } from 'lucide-react';
import profile from '../assets/Eric.png'
import { FaDownload } from "react-icons/fa";
import EricCv from '../assets/EricCv.pdf'

const Hero = () => {
  const scrollToNext = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      const yOffset = -80;
      const y = aboutSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="min-h-screen flex flex-col gap-4 justify-center items-center pt-16 pb-8 px-4 relative overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-gray-900 opacity-100"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/assets/grid.svg')] opacity-10 dark:opacity-5"></div>
      </div>
      
      {/* Floating bubbles animation */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-blue-400/20 dark:bg-blue-600/20"
            style={{
              width: `${Math.random() * 10 + 5}rem`,
              height: `${Math.random() * 10 + 5}rem`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(40px)',
              transform: `scale(${Math.random() * 2 + 0.5})`,
              opacity: 0.3
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto w-full px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Profile content */}
          <div className="flex-1 text-center lg:text-left">
            <p className="text-blue-600 dark:text-blue-400 font-medium mb-4 tracking-wider uppercase text-sm md:text-base">
              Full-Stack Developer & Network Engineer
            </p>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Eric Tuyishime</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
              Results-driven Computer Science professional specializing in web development and telecommunications infrastructure. 
              I build robust applications and optimize network solutions for maximum efficiency.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <a 
                href="#projects" 
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 flex items-center justify-center gap-2"
              >
                View My Work
              </a>
              <a 
                href='#contact'
                className="px-8 py-3 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-blue-600 dark:text-blue-400 font-medium rounded-lg border border-blue-600 dark:border-blue-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 flex items-center justify-center gap-2"
              >
                <Mail size={18} /> Contact Me
              </a>
              <a 
                href={EricCv} download 
                className="px-8 py-3 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-blue-600 dark:text-blue-400 font-medium rounded-lg border border-blue-600 dark:border-blue-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 flex items-center justify-center gap-2"
              >
                <FaDownload  size={18} /> Download CV
              </a>
            </div>

            {/* Contact info */}
          </div>

          {/* Profile image placeholder */}
          <div className="relative mt-12 lg:mt-0">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1 shadow-2xl">
              <div className="w-full h-full rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden border-4 border-white dark:border-gray-900">
                {/* Replace with actual image */}
                <img src={profile} alt="profile" className='w-full rounded-full'/>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md border border-gray-200 dark:border-gray-700">
              <span className="font-medium text-blue-600 dark:text-blue-400">Available</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
        <button 
          onClick={scrollToNext}
          className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 focus:outline-none rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Scroll down"
        >
          <ArrowDown size={28} />
        </button>
      </div>
    </section>
  );
};

export default Hero;