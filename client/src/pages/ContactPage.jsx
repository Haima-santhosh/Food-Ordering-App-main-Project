import React from "react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pt-28 pb-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-3 p-4 shadow rounded-md">
            Get in Touch ✉️
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base font-extrabold">
            We'd love to hear from you! Share your thoughts, ask questions, or just say hello.
          </p>
        </div>

        {/* Contact Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="bg-white dark:bg-slate-800 shadow-lg rounded-2xl p-8 hover:shadow-xl transition-shadow">
            <form noValidate>
              <div className="space-y-5">
                <div>
                  <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Type Your Name"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-700 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-700 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">
                    Message
                  </label>
                  <textarea
                    rows="5"
                    placeholder="Write Your Message Here ..."
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-700 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-all shadow-md hover:shadow-blue-300 dark:hover:shadow-blue-800"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="bg-white dark:bg-slate-800 shadow-lg rounded-2xl p-8 flex flex-col justify-center hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 border-b border-gray-300 dark:border-slate-700 pb-2">
              Contact Details
            </h3>

            <ul className="space-y-4 text-gray-700 dark:text-gray-300">
              <li>
                📍 <strong>Address:</strong> 123 Food Street, Kochi, Kerala
              </li>
              <li>
                📞 <strong>Phone:</strong> +91 98765 43210
              </li>
              <li>
                📧 <strong>Email:</strong> support@grabbite.com
              </li>
              <li>
                ⏰ <strong>Hours:</strong> Mon – Sun, 9 AM – 11 PM
              </li>
            </ul>

           
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
