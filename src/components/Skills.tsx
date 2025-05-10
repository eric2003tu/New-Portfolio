import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, 
  FaPython, FaGitAlt, FaAws, FaDocker, FaDatabase,
  FaJava, FaAngular, FaLinux, FaWindows
} from 'react-icons/fa';
import { FaMicrosoft } from 'react-icons/fa';  // Microsoft icon (includes Azure)
import { 
  SiTypescript, SiTailwindcss, SiExpress, SiMongodb, 
  SiJest, SiNextdotjs, SiGraphql, SiPostgresql,
  SiCplusplus, SiKubernetes, SiTensorflow, SiPytorch,
  SiScikitlearn, SiFlask, SiCisco, SiGooglecloud,
} from 'react-icons/si';
import { 
  FiMonitor, FiLayers, FiCpu, FiServer, 
  FiCode, FiCloud, FiZap, FiShield
} from 'react-icons/fi';

const Skills = () => {
  // Frontend Skills with proficiency levels
  const frontendSkills = [
    { name: 'HTML5', icon: <FaHtml5 className="text-orange-500" />, level: 95 },
    { name: 'CSS3', icon: <FaCss3Alt className="text-blue-500" />, level: 90 },
    { name: 'JavaScript', icon: <FaJs className="text-yellow-400" />, level: 92 },
    { name: 'TypeScript', icon: <SiTypescript className="text-blue-600" />, level: 85 },
    { name: 'React', icon: <FaReact className="text-blue-400" />, level: 90 },
    { name: 'Angular', icon: <FaAngular className="text-red-500" />, level: 75 },
    { name: 'Next.js', icon: <SiNextdotjs className="text-gray-800 dark:text-gray-200" />, level: 80 },
    { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-cyan-400" />, level: 88 },
  ];

  // Backend Skills with proficiency levels
  const backendSkills = [
    { name: 'Node.js', icon: <FaNodeJs className="text-green-500" />, level: 88 },
    { name: 'Express', icon: <SiExpress className="text-gray-800 dark:text-gray-200" />, level: 85 },
    { name: 'Python', icon: <FaPython className="text-blue-400" />, level: 85 },
    { name: 'Flask', icon: <SiFlask className="text-gray-800 dark:text-gray-200" />, level: 80 },
    { name: 'Java', icon: <FaJava className="text-red-600" />, level: 75 },
    { name: 'C/C++', icon: <SiCplusplus className="text-blue-600" />, level: 70 },
    { name: 'GraphQL', icon: <SiGraphql className="text-pink-600" />, level: 75 },
    { name: 'REST APIs', icon: <FiServer className="text-purple-500" />, level: 90 },
  ];

  // Database Skills
  const databaseSkills = [
    { name: 'MongoDB', icon: <SiMongodb className="text-green-600" />, level: 82 },
    { name: 'PostgreSQL', icon: <SiPostgresql className="text-blue-700" />, level: 78 },
    { name: 'MySQL', icon: <FaDatabase className="text-blue-500" />, level: 80 },
  ];

  // Cloud & DevOps Skills
  const cloudDevOpsSkills = [
    { name: 'AWS', icon: <FaAws className="text-yellow-600" />, level: 80 },
    { name: 'Google Cloud', icon: <SiGooglecloud className="text-blue-500" />, level: 70 },
    { name: 'Azure', icon: < FaMicrosoft className="text-blue-600" />, level: 65 },
    { name: 'Docker', icon: <FaDocker className="text-blue-400" />, level: 75 },
    { name: 'Kubernetes', icon: <SiKubernetes className="text-blue-500" />, level: 65 },
    { name: 'CI/CD', icon: <FiZap className="text-green-500" />, level: 80 },
  ];

  // Networking & Security Skills
  const networkingSkills = [
    { name: 'Cisco Networking', icon: <SiCisco className="text-blue-500" />, level: 85 },
    { name: 'Network Security', icon: <FiShield className="text-green-500" />, level: 80 },
    { name: 'VLAN Configuration', icon: <FiCpu className="text-purple-500" />, level: 75 },
    { name: 'Routing Protocols', icon: <FiCode className="text-blue-400" />, level: 80 },
  ];

  // AI/ML Skills
  const aiMlSkills = [
    { name: 'TensorFlow', icon: <SiTensorflow className="text-orange-500" />, level: 75 },
    { name: 'PyTorch', icon: <SiPytorch className="text-red-500" />, level: 70 },
    { name: 'Scikit-learn', icon: <SiScikitlearn className="text-blue-500" />, level: 80 },
  ];

  // Other Skills
  const otherSkills = [
    { name: 'Git', icon: <FaGitAlt className="text-orange-600" /> },
    { name: 'Jest', icon: <SiJest className="text-red-500" /> },
    { name: 'Responsive Design', icon: <FiMonitor className="text-indigo-500" /> },
    { name: 'UI/UX', icon: <FiLayers className="text-pink-500" /> },
    { name: 'System Design', icon: <FiCpu className="text-amber-500" /> },
    { name: 'Linux', icon: <FaLinux className="text-gray-800 dark:text-gray-200" /> },
    { name: 'Windows', icon: <FaWindows className="text-blue-500" /> },
    { name: 'Penetration Testing', icon: <FiShield className="text-red-500" /> },
  ];

  const SkillBar = ({ level }: { level: number }) => (
    <div className="w-full h-2 bg-gray-200/50 dark:bg-gray-700/50 rounded-full overflow-hidden backdrop-blur-sm">
      <div 
        className="h-full rounded-full bg-gradient-to-r from-blue-400 to-purple-500"
        style={{ width: `${level}%` }}
      />
    </div>
  );

  const SkillCard = ({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) => (
    <div className="relative bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-lg hover:shadow-2xl transition-all duration-500 group overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 dark:from-blue-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="flex items-center mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white mr-4 shadow-lg">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
        </div>
        {children}
      </div>
    </div>
  );

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              Technical Skills
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 mx-auto mb-6 rounded-full" />
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            The tools and technologies I use to craft exceptional digital experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Frontend Development */}
          <SkillCard 
            title="Frontend Development" 
            icon={<FiMonitor size={22} />}
          >
            <div className="space-y-6">
              {frontendSkills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="mr-3 text-xl">{skill.icon}</div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                    </div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{skill.level}%</span>
                  </div>
                  <SkillBar level={skill.level} />
                </div>
              ))}
            </div>
          </SkillCard>

          {/* Backend Development */}
          <SkillCard 
            title="Backend Development" 
            icon={<FiServer size={22} />}
          >
            <div className="space-y-6">
              {backendSkills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="mr-3 text-xl">{skill.icon}</div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                    </div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{skill.level}%</span>
                  </div>
                  <SkillBar level={skill.level} />
                </div>
              ))}
            </div>
          </SkillCard>

          {/* Database Management */}
          <SkillCard 
            title="Database Management" 
            icon={<FaDatabase size={22} />}
          >
            <div className="space-y-6">
              {databaseSkills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="mr-3 text-xl">{skill.icon}</div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                    </div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{skill.level}%</span>
                  </div>
                  <SkillBar level={skill.level} />
                </div>
              ))}
            </div>
          </SkillCard>

          {/* Cloud & DevOps */}
          <SkillCard 
            title="Cloud & DevOps" 
            icon={<FiCloud size={22} />}
          >
            <div className="space-y-6">
              {cloudDevOpsSkills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="mr-3 text-xl">{skill.icon}</div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                    </div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{skill.level}%</span>
                  </div>
                  <SkillBar level={skill.level} />
                </div>
              ))}
            </div>
          </SkillCard>

          {/* Networking & Security */}
          <SkillCard 
            title="Networking & Security" 
            icon={<FiShield size={22} />}
          >
            <div className="space-y-6">
              {networkingSkills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="mr-3 text-xl">{skill.icon}</div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                    </div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{skill.level}%</span>
                  </div>
                  <SkillBar level={skill.level} />
                </div>
              ))}
            </div>
          </SkillCard>

          {/* AI/ML */}
          <SkillCard 
            title="AI/ML" 
            icon={<FiCode size={22} />}
          >
            <div className="space-y-6">
              {aiMlSkills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="mr-3 text-xl">{skill.icon}</div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                    </div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{skill.level}%</span>
                  </div>
                  <SkillBar level={skill.level} />
                </div>
              ))}
            </div>
          </SkillCard>

          {/* Other Technologies */}
          <SkillCard 
            title="Other Technologies" 
            icon={<FiZap size={22} />}
          >
            <div className="grid grid-cols-2 gap-4">
              {otherSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center bg-white/50 dark:bg-gray-700/50 px-4 py-3 rounded-xl backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div className="mr-3 text-lg">{skill.icon}</div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                </div>
              ))}
            </div>
          </SkillCard>
        </div>
      </div>
    </section>
  );
};

export default Skills;