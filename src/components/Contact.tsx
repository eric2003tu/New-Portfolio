import React, { useEffect, useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact :React.FC= () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ text: '', color: '' });
  const [isFormValid, setIsFormValid] = useState(false);
  
  useEffect(() => {
    // Scroll event for navbar shadow
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 100) {
        navbar.classList.add('shadow-md');
        navbar.classList.remove('shadow-sm');
      } else {
        navbar.classList.remove('shadow-md');
        navbar.classList.add('shadow-sm');
      }
    };

    // Intersection Observer for fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
        }
      });
    }, { threshold: 0.1 });

    fadeElements.forEach(element => {
      observer.observe(element);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    // Form validation
    const isValid = Object.values(formErrors).every(error => !error) && 
                    Object.values(formData).every(field => field.trim());
    setIsFormValid(isValid);
  }, [formData, formErrors]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validation
    if (name === 'email') {
      if (!value.trim()) {
        setFormErrors(prev => ({ ...prev, email: 'Email cannot be empty' }));
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setFormErrors(prev => ({ ...prev, email: 'Invalid email' }));
      } else {
        setFormErrors(prev => ({ ...prev, email: '' }));
      }
    } else if (name === 'name') {
      if (!value.trim()) {
        setFormErrors(prev => ({ ...prev, name: 'Name cannot be empty' }));
      } else if (value.trim().length < 2) {
        setFormErrors(prev => ({ ...prev, name: 'Name too short' }));
      } else {
        setFormErrors(prev => ({ ...prev, name: '' }));
      }
    } else if (name === 'subject') {
      if (!value.trim()) {
        setFormErrors(prev => ({ ...prev, subject: 'Subject cannot be empty' }));
      } else if (value.trim().length < 4) {
        setFormErrors(prev => ({ ...prev, subject: 'Subject too short' }));
      } else {
        setFormErrors(prev => ({ ...prev, subject: '' }));
      }
    } else if (name === 'message') {
      if (!value.trim()) {
        setFormErrors(prev => ({ ...prev, message: 'Message cannot be empty' }));
      } else if (value.trim().length < 5) {
        setFormErrors(prev => ({ ...prev, message: 'Message too short' }));
      } else {
        setFormErrors(prev => ({ ...prev, message: '' }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  const api = window.location.hostname === 'localhost'
  ? 'http://localhost:2000/api/send'
  : 'https://backend-qnfm.onrender.com/api/send';

    
    try {
      const response = await fetch(`${api}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      setSubmitMessage({ 
        text: "Thank you for contacting me! Your message has been received.", 
        color: "text-green-500" 
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error("Error:", error);
      setSubmitMessage({ 
        text: "An error occurred while sending the message.", 
        color: "text-red-500" 
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSubmitMessage({ text: '', color: '' });
      }, 4000);
    }
  };
  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl mb-4">
            Get In Touch
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-200 dark:text-gray-300">
            Have a project in mind or want to chat? Feel free to contact me!
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Send Me a Message
            </h3>
            <form onSubmit={handleSubmit} className="lg:col-span-2">
              <p className="mb-6 text-gray-200">
                Fill this form to contact me. and remember that <strong className="text-red-500">*</strong> means required.
              </p>
              <div className="form-group mb-4">
                <label htmlFor="name" className="block mb-2 text-gray-200">
                  Name<strong className="text-red-500">*</strong>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-500 bg-gray-500 text-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your Name"
                />
                {formErrors.name && (
                  <p className={`mt-1 text-sm ${formErrors.name.includes('valid') ? 'text-green-500' : 'text-red-500'} font-semibold`}>
                    {formErrors.name}
                  </p>
                )}
              </div>
              <div className="form-group mb-4">
                <label htmlFor="email" className="block mb-2 text-gray-200">
                  Email<strong className="text-red-500">*</strong>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-500 bg-gray-500 text-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your Email"
                />
                {formErrors.email && (
                  <p className={`mt-1 text-sm ${formErrors.email.includes('valid') ? 'text-green-500' : 'text-red-500'} font-semibold`}>
                    {formErrors.email}
                  </p>
                )}
              </div>
              <div className="form-group mb-4">
                <label htmlFor="subject" className="block mb-2 text-gray-200">
                  Subject<strong className="text-red-500">*</strong>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-500 bg-gray-500 text-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Subject"
                />
                {formErrors.subject && (
                  <p className={`mt-1 text-sm ${formErrors.subject.includes('valid') ? 'text-green-500' : 'text-red-500'} font-semibold`}>
                    {formErrors.subject}
                  </p>
                )}
              </div>
              <div className="form-group mb-6">
                <label htmlFor="message" className="block mb-2 text-gray-200">
                  Message<strong className="text-red-500">*</strong>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-500 bg-gray-500 text-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your Message"
                ></textarea>
                {formErrors.message && (
                  <p className={`mt-1 text-sm ${formErrors.message.includes('valid') ? 'text-green-500' : 'text-red-500'} font-semibold`}>
                    {formErrors.message}
                  </p>
                )}
              </div>
              {submitMessage.text && (
                <p className={`mb-4 ${submitMessage.color} font-semibold`}>
                  {submitMessage.text}
                </p>
              )}
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`w-full px-6 py-3 rounded font-bold text-white ${isFormValid ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer' : 'bg-blue-300 cursor-not-allowed'} transition-colors relative`}
              >
                {isSubmitting ? (
                  <div className="flex justify-center">
                    <div className="w-6 h-6 border-2 border-white border-t-blue-600 rounded-full animate-spin"></div>
                  </div>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
          
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Contact Information
            </h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-blue-600 mr-4" />
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">Email</h4>
                  <p className="text-gray-600 dark:text-gray-300">erictuyishime574@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-6 w-6 text-blue-600 mr-4" />
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">Phone</h4>
                  <p className="text-gray-600 dark:text-gray-300">+250 783687408</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-blue-600 mr-4" />
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">Location</h4>
                  <p className="text-gray-600 dark:text-gray-300">Kigali Rwanda kg 656 Ave</p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Connect With Me</h4>
              <div className="flex space-x-4">
                <a href="https://x.com/TUYISHIERIC" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="https://github.com/eric2003tu" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;