import React from 'react';
import { Link } from 'react-router-dom';
import { FaDumbbell, FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-br from-primary-500 to-secondary-500 p-2 rounded-lg">
                <FaDumbbell className="text-white text-xl" />
              </div>
              <span className="text-xl font-bold text-white">FitLife Gym</span>
            </div>
            <p className="text-sm mb-4">
              Transform your body and mind with our expert trainers, modern equipment, and personalized fitness programs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-primary-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/workouts" className="hover:text-primary-400 transition-colors">Workouts</Link>
              </li>
              <li>
                <Link to="/diets" className="hover:text-primary-400 transition-colors">Diet Plans</Link>
              </li>
              <li>
                <Link to="/membership" className="hover:text-primary-400 transition-colors">Membership</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary-400 transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Programs</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/workouts?level=beginner" className="hover:text-primary-400 transition-colors">
                  Beginner Training
                </Link>
              </li>
              <li>
                <Link to="/workouts?level=intermediate" className="hover:text-primary-400 transition-colors">
                  Intermediate Training
                </Link>
              </li>
              <li>
                <Link to="/workouts?level=advanced" className="hover:text-primary-400 transition-colors">
                  Advanced Training
                </Link>
              </li>
              <li>
                <Link to="/diets?goal=weight-loss" className="hover:text-primary-400 transition-colors">
                  Weight Loss
                </Link>
              </li>
              <li>
                <Link to="/diets?goal=muscle-gain" className="hover:text-primary-400 transition-colors">
                  Muscle Gain
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-primary-400 mt-1 flex-shrink-0" />
                <span className="text-sm">A-152 Block 3 Gulistan-e-Johar</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-primary-400 flex-shrink-0" />
                <span className="text-sm">+92-3196939133</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-primary-400 flex-shrink-0" />
                <span className="text-sm">info@fitlifegym.com</span>
              </li>
            </ul>
            <div className="mt-4">
              <p className="text-sm font-semibold text-white mb-2">Opening Hours:</p>
              <p className="text-sm">Mon - Fri: 6:00 AM - 10:00 PM</p>
              <p className="text-sm">Sat - Sun: 7:00 AM - 8:00 PM</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} FitLife Gym. All rights reserved. 
            <span className="mx-2">|</span>
            <Link to="/privacy" className="hover:text-primary-400 transition-colors">Privacy Policy</Link>
            <span className="mx-2">|</span>
            <Link to="/terms" className="hover:text-primary-400 transition-colors">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;