import { useState, useEffect } from 'react';
import { Github, ExternalLink, Star, GitFork, Calendar, Code, Zap, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string | null;
  languages_url: string;
  languages: Record<string, number>;
  stargazers_count?: number;
  forks_count?: number;
  updated_at: string;
  license?: {
    name: string;
  };
  size?: number;
  // Added fields from enhanced fetch
  full_description?: string;
  last_updated?: string;
  size_kb?: number;
  contributors?: number;
  has_wiki?: boolean;
  has_issues?: boolean;
  open_issues?: number;
}

const Projects = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        let allRepos: Repository[] = [];
        let page = 1;
        let hasMore = true;

        // Fetch all pages of repositories
        while (hasMore) {
          const response = await fetch(`https://api.github.com/users/eric2003tu/repos?page=${page}&per_page=100`);
          
          if (!response.ok) throw new Error('Failed to fetch repositories');
          
          const data = await response.json();
          allRepos = [...allRepos, ...data];
          
          if (data.length < 100) hasMore = false;
          else page++;
        }

        // Sort by most recently updated
        allRepos.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

        // Enhanced repository data fetching
        const reposWithFullData = await Promise.all(
          allRepos.map(async (repo) => {
            try {
              const [langResponse, readmeResponse, contribResponse] = await Promise.all([
                fetch(repo.languages_url),
                fetch(`https://api.github.com/repos/eric2003tu/${repo.name}/readme`).catch(() => null),
                fetch(repo.contributors_url).catch(() => null)
              ]);

              const languages = langResponse.ok ? await langResponse.json() : {};
              let readme = '';
              let contributors = 0;

              if (readmeResponse?.ok) {
                const readmeData = await readmeResponse.json();
                readme = atob(readmeData.content);
              }

              if (contribResponse?.ok) {
                const contribData = await contribResponse.json();
                contributors = contribData.length;
              }

              return { 
                ...repo,
                languages,
                readme,
                contributors,
                full_description: `${repo.description || ''}\n\n${readme.substring(0, 500)}...`,
                last_updated: new Date(repo.updated_at).toLocaleDateString(),
                size_kb: repo.size ? Math.round(repo.size / 1024 * 100) / 100 : 0,
                license: repo.license?.name || 'None'
              };
            } catch (error) {
              console.error(`Error processing ${repo.name}:`, error);
              return { 
                ...repo, 
                languages: {},
                readme: '',
                contributors: 0,
                full_description: repo.description || '',
                last_updated: new Date(repo.updated_at).toLocaleDateString(),
                size_kb: repo.size ? Math.round(repo.size / 1024 * 100) / 100 : 0,
                license: repo.license?.name || 'None'
              };
            }
          })
        );
        
        setRepos(reposWithFullData);
      } catch (error) {
        console.error('Error fetching repositories:', error);
        setError('Failed to fetch live data. Showing cached project examples.');
        setRepos(getSampleRepos());
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const getLanguageColor = (language: string): string => {
    const colors: Record<string, string> = {
      JavaScript: '#f1e05a',
      TypeScript: '#3178c6',
      HTML: '#e34c26',
      CSS: '#563d7c',
      Python: '#3572A5',
      Java: '#b07219',
      JSON: '#292929',
      Other: '#8257e5'
    };
    return colors[language] || colors.Other;
  };

  const formatProjectTitle = (name: string): string => {
    return name.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const getSampleRepos = (): Repository[] => {
    return [
      {
        id: 1,
        name: 'e-commerce',
        full_description: `A full-featured e-commerce platform with product catalog, shopping cart, and payment integration.`,
        description: 'Modern e-commerce platform with React and Node.js',
        html_url: 'https://github.com/eric2003tu/e-commerce',
        homepage: 'https://eric-ecommerce.netlify.app',
        languages: { TypeScript: 60, JavaScript: 30, CSS: 10 },
        updated_at: new Date().toISOString(),
        last_updated: new Date().toLocaleDateString(),
        stargazers_count: 15,
        forks_count: 3,
        license: 'MIT',
        size: 2500000
      },
      {
        id: 2,
        name: 'E-library',
        full_description: `Digital library management system featuring book catalog and borrowing system.`,
        description: 'Digital library system with React and Node.js',
        html_url: 'https://github.com/eric2003tu/E-library',
        homepage: null,
        languages: { TypeScript: 70, HTML: 20, CSS: 10 },
        updated_at: new Date().toISOString(),
        last_updated: new Date().toLocaleDateString(),
        stargazers_count: 8,
        forks_count: 2,
        license: 'MIT',
        size: 1800000
      },
      {
        id: 3,
        name: 'Get job Easly',
        full_description: `Post and get new trending jobs from everywhere`,
        description: 'Jop applications website with TypeScript',
        html_url: 'https://github.com/eric2003tu/job-app',
        homepage: null,
        languages: { TypeScript: 94, HTML: 1.5, Tailwindcss: 4.5 },
        updated_at: new Date().toISOString(),
        last_updated: new Date().toLocaleDateString(),
        stargazers_count: 5,
        forks_count: 1,
        license: 'None',
        size: 350000
      }
    ];
  };

  const ProjectSkeleton = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg h-full">
      <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 animate-pulse"></div>
      <div className="p-6">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4 animate-pulse"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 animate-pulse"></div>
        </div>
        <div className="flex gap-2 mt-6">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-24 animate-pulse"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-24 animate-pulse"></div>
        </div>
      </div>
    </div>
  );

  const ProjectModal = ({ repo, onClose }: { repo: Repository, onClose: () => void }) => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center p-6">
            <h3 className="text-3xl font-bold text-white text-center">
              {formatProjectTitle(repo.name)}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white dark:bg-gray-700 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-8">
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Calendar className="mr-2" size={18} />
              <span>Updated {repo.last_updated}</span>
            </div>
            {repo.license && repo.license !== 'None' && (
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Shield className="mr-2" size={18} />
                <span>{repo.license}</span>
              </div>
            )}
            {repo.stargazers_count !== undefined && (
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Star className="mr-2" size={18} />
                <span>{repo.stargazers_count}</span>
              </div>
            )}
            {repo.forks_count !== undefined && (
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <GitFork className="mr-2" size={18} />
                <span>{repo.forks_count}</span>
              </div>
            )}
            {repo.size_kb && (
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Code className="mr-2" size={18} />
                <span>{repo.size_kb} KB</span>
              </div>
            )}
          </div>

          <div className="prose dark:prose-invert max-w-none mb-8">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              {repo.full_description || repo.description || 'No description available.'}
            </p>
          </div>

          <div className="mb-8">
            <h4 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Technologies</h4>
            <div className="flex flex-wrap gap-3">
              {Object.entries(repo.languages).map(([lang]) => (
                <div key={lang} className="flex items-center">
                  <span 
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: getLanguageColor(lang) }}
                  ></span>
                  <span className="text-gray-700 dark:text-gray-300">{lang}</span>
                </div>
              ))}
              {Object.keys(repo.languages).length === 0 && (
                <span className="text-gray-500 dark:text-gray-400">No language data</span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
            >
              <Github className="mr-3" size={20} />
              <span>View Code</span>
            </a>
            {repo.homepage && (
              <a
                href={repo.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <ExternalLink className="mr-3" size={20} />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            My Projects
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.2 }}
            className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 mx-auto mb-6 rounded-full"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            A showcase of my work across various technologies and domains
          </motion.p>
        </div>

        {error && (
          // <motion.div 
          //   initial={{ opacity: 0, y: -20 }}
          //   animate={{ opacity: 1, y: 0 }}
          //   className="mb-8 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-500 p-4 rounded-lg max-w-3xl mx-auto"
          // >
          //   <p className="text-yellow-700 dark:text-yellow-400">{error}</p>
          // </motion.div>
          <div></div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <ProjectSkeleton key={i} />)
          ) : (
            repos.map((repo) => {
              const languages = Object.entries(repo.languages)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3);
              
              return (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 100 }}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col"
                >
                  <div 
                    className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center p-6 cursor-pointer"
                    onClick={() => setSelectedRepo(repo)}
                  >
                    <h3 className="text-2xl font-bold text-white text-center">
                      {formatProjectTitle(repo.name)}
                    </h3>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {repo.description || `A ${repo.name} project`}
                    </p>
                    
                    <div className="mt-auto">
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {languages.length > 0 ? (
                            languages.map(([lang]) => (
                              <span 
                                key={lang}
                                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                                style={{ 
                                  backgroundColor: `${getLanguageColor(lang)}20`,
                                  color: getLanguageColor(lang) 
                                }}
                              >
                                <span 
                                  className="w-2 h-2 mr-2 rounded-full"
                                  style={{ backgroundColor: getLanguageColor(lang) }}
                                ></span>
                                {lang}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-500 dark:text-gray-400 text-sm italic">
                              No language data
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          {repo.stargazers_count !== undefined && (
                            <span className="flex items-center">
                              <Star size={16} className="mr-1" />
                              {repo.stargazers_count}
                            </span>
                          )}
                          {repo.forks_count !== undefined && (
                            <span className="flex items-center">
                              <GitFork size={16} className="mr-1" />
                              {repo.forks_count}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex gap-3">
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center p-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-300"
                            title="View code"
                          >
                            <Code size={18} />
                          </a>
                          {repo.homepage && (
                            <a
                              href={repo.homepage}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center p-2 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
                              title="Live demo"
                            >
                              <Zap size={18} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <a
            href="https://github.com/eric2003tu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-3 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
          >
            <Github size={22} className="mr-3" />
            Explore All Projects on GitHub
          </a>
        </motion.div>
      </div>

      {selectedRepo && (
        <ProjectModal repo={selectedRepo} onClose={() => setSelectedRepo(null)} />
      )}
    </section>
  );
};

export default Projects;