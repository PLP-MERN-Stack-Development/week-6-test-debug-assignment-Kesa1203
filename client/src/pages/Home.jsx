import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { 
  BugAntIcon, 
  CodeBracketIcon, 
  BoltIcon, 
  EyeIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const Home = () => {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      icon: BugAntIcon,
      title: 'Smart Bug Tracking',
      description: 'AI-powered categorization and priority detection to streamline your workflow.'
    },
    {
      icon: CodeBracketIcon,
      title: 'Seamless Integration',
      description: 'Works with your existing tools - GitHub, VS Code, Slack, and more.'
    },
    {
      icon: BoltIcon,
      title: 'Real-time Collaboration',
      description: 'Live updates and team synchronization for faster issue resolution.'
    },
    {
      icon: EyeIcon,
      title: 'Advanced Analytics',
      description: 'Deep insights into patterns, velocity, and code quality metrics.'
    },
  ];

  const stats = [
    { value: '99.9%', label: 'Uptime' },
    { value: '< 50ms', label: 'Response Time' },
    { value: '50k+', label: 'Issues Resolved' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')`
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-blue-900/75 to-indigo-900/85" />
      
      {/* Subtle animated elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {mounted && [...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.8,
            }}
            style={{
              left: `${20 + i * 10}%`,
              top: `${30 + i * 5}%`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 text-blue-100 px-4 py-2 rounded-full mb-8">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium">Bug tracker</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
              Debug with
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Confidence
              </span>
            </h1>
            
            <p className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto leading-relaxed">
              The modern bug tracker that integrates seamlessly with your development workflow.
              Built for teams who ship fast and break less.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link
                  to="/dashboard"
                  className="group inline-flex items-center space-x-2 bg-white/95 backdrop-blur-md text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-white transition-all hover:scale-105 hover:shadow-xl"
                >
                  <span>Open Dashboard</span>
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="group inline-flex items-center space-x-2 bg-white/95 backdrop-blur-md text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-white transition-all hover:scale-105 hover:shadow-xl"
                  >
                    <span>Get Started</span>
                    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/login"
                    className="group inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all hover:scale-105"
                  >
                    <span>Sign In</span>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything you need to ship quality code
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Powerful tools designed to integrate seamlessly with your existing workflow
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                className="group bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl hover:bg-white/15 transition-all hover:scale-105"
              >
                <div className="bg-blue-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors">
                  <feature.icon className="h-6 w-6 text-blue-300" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-300 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to improve your workflow?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who have streamlined their debugging process
            </p>
            {!user && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="group inline-flex items-center space-x-2 bg-white/95 backdrop-blur-md text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-white transition-all hover:scale-105 hover:shadow-xl"
                >
                  <span>Start Free Trial</span>
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/demo"
                  className="group inline-flex items-center space-x-2 bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all hover:scale-105"
                >
                  <span>View Demo</span>
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;