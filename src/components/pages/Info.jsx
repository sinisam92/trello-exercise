import React from "react";
import { Link } from "wouter";

const Info = () => {
  const myInfo = {
    name: "Sinisa Manojlovic",
    role: "Developer",
    contact: {
      email: "sinman@example.com",
      phone: "123-456-7890",
    },
    bugReportLink: "https://example.com/bug-reports",
    contactLink: "https://example.com/contact",
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-10">
      <h2 className="text-3xl font-semibold text-gray-800 mb-2">
        {myInfo.name}
      </h2>
      <p className="text-xl text-gray-600 mb-4">{myInfo.role}</p>
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <p className="text-lg font-medium text-gray-700 mb-2">Contact</p>
        <ul className="list-none text-gray-600 space-y-1">
          <li>
            <span className="font-medium">Email:</span> {myInfo.contact.email}
          </li>
          <li>
            <span className="font-medium">Phone:</span> {myInfo.contact.phone}
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-y-3">
          <Link
            to={myInfo.bugReportLink}
            className="inline-block text-blue-600 font-semibold hover:text-blue-800 transition-colors"
          >
            Report an Issue
          </Link>
          <Link
            to={myInfo.contactLink}
            className="inline-block text-blue-600 font-semibold hover:text-blue-800 transition-colors"
          >
            Contact Me
          </Link>
      </div>
    </div>
  );
};

export default Info;
