import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-10 mt-10 dark:bg-gray-900 dark:text-gray-400">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-2xl font-bold text-white mb-4">NesusPro</h3>
          <p className="text-sm leading-relaxed pr-8">
            A distinguished membership platform designed for top-level African
            leaders, NexusPro fosters a vibrant community of influential
            professionals across the continent, providing a space for
            networking, empowerment, and growth.
          </p>
          <div className="flex space-x-4 mt-6">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Twitter size={24} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Instagram size={24} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Facebook size={24} />
            </a>
          </div>
        </div>

        {/* Join NexusPro Section */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Join NexusPro
          </h4>
          <ul className="space-y-2">
            <li>
              <Link
                to="/membership"
                className="hover:text-white transition-colors"
              >
                Membership
              </Link>
            </li>
            <li>
              <Link
                to="/benefits"
                className="hover:text-white transition-colors"
              >
                Benefits
              </Link>
            </li>
            <li>
              <Link to="/events" className="hover:text-white transition-colors">
                Events
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition-colors">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources Section */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
          <ul className="space-y-2">
            <li>
              <Link
                to="/stories"
                className="hover:text-white transition-colors"
              >
                Stories
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-white transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/experiences"
                className="hover:text-white transition-colors"
              >
                Experiences
              </Link>
            </li>
            <li>
              <Link
                to="/updates"
                className="hover:text-white transition-colors"
              >
                Updates
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Links & Contact */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/faq" className="hover:text-white transition-colors">
                FAQs
              </Link>
            </li>
            <li>
              <Link
                to="/privacy-policy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/accessibility-policy"
                className="hover:text-white transition-colors"
              >
                Accessibility Policy
              </Link>
            </li>
            <li>
              <Link
                to="/help-support"
                className="hover:text-white transition-colors"
              >
                Help & Support
              </Link>
            </li>
          </ul>
          <p className="text-sm mt-6">
            For Inquiries contact:{" "}
            <a
              href="mailto:info@clevel.com"
              className="hover:text-white transition-colors"
            >
              info@nexuspro.com
            </a>
          </p>
        </div>
      </div>

      <div className="border-t border-gray-700 dark:border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500">
        <p>&copy; 2025 NesusPro. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
