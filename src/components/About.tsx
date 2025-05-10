import { User, BookOpen, Calendar, Award } from 'lucide-react';


const About = () => {
  return (
    <section id="about" className="py-20 px-4 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            I'm a passionate Full-Stack Developer with a focus on creating responsive and user-friendly web applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Professional Background
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              I am a dedicated and versatile Full-Stack Developer with experience in building modern web applications. My journey in software development has equipped me with a strong foundation in both frontend and backend technologies, allowing me to create seamless user experiences.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 mr-4">
                  <User size={22} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Full-Stack Developer
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Specializing in React, Node.js, and modern frameworks
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 mr-4">
                  <BookOpen size={22} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Doing Bachelor's Degree
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
  Computer Science from <a href="https://www.ur.ac.rw" target="_blank" rel="noopener noreferrer" className="text-blue-500">University of Rwanda</a>
</p>

                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 mr-4">
                  <Calendar size={22} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    2+ Years Experience
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Working on web development projects
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 mr-4">
                  <Award size={22} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Multiple Certificates
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Including AWS, MongoDB, and Web Development
                  </p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default About;