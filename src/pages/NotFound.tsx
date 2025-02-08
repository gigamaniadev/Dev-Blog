import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-7xl font-bold text-gray-800 mb-4 dark:text-gray-100">
        404
      </h1>
      <p className="text-xl text-gray-600 mb-8 dark:text-gray-400">
        Oops! Page not found
      </p>
      <Link
        to="/"
        className="flex items-center space-x-2 bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors shadow-sm"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
