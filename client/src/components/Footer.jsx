import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
      <footer className="bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-20 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <img
              src="/logo.png"
              alt="Grabbite Logo"
              className="h-24 w-1/3 mb-2"
            />
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Grab. Bite. Repeat.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-black dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link
                  to="/"
                  className="hover:text-blue-700 dark:hover:text-white"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-blue-700 dark:hover:text-white"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/restaurants"
                  className="hover:text-blue-700 dark:hover:text-white"
                >
                  Restaurants
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-blue-700 dark:hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-black dark:text-white">
              Support
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:text-blue-700 dark:hover:text-white"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-700 dark:hover:text-white"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-700 dark:hover:text-white"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-700 dark:hover:text-white"
                >
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-black dark:text-white">
              Connect
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              📧 support@grabbite.com
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              📞 +91 98765 43210
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                aria-label="Facebook"
                className="hover:text-blue-700 dark:hover:text-white"
              >
                <i className="fab fa-facebook text-xl text-gray-600 dark:text-gray-400"></i>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-pink-600 dark:hover:text-white"
              >
                <i className="fab fa-instagram text-xl text-gray-600 dark:text-gray-400"></i>
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="hover:text-blue-400 dark:hover:text-white"
              >
                <i className="fab fa-twitter text-xl text-gray-600 dark:text-gray-400"></i>
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="hover:text-red-600 dark:hover:text-white"
              >
                <i className="fab fa-youtube text-xl text-gray-600 dark:text-gray-400"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-10 border-t border-gray-300 dark:border-slate-700 pt-6">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold">Grabbite</span>. All Rights Reserved
        </div>
      </div>
    </footer>
  )
}

export default Footer