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
    <div className="bg-secundary text-primaryTextColor  p-6 rounded-lg shadow-2xl max-w-md mx-auto mt-10">
      <h2 className="text-3xl font-semibold text-primaryTextColor mb-2">
        {myInfo.name}
      </h2>
      <p className="text-xl text-secundaryTextColor mb-4">{myInfo.role}</p>
      <div className="bg-secundary shadow-2xl p-4 rounded-lg mb-4">
        <p className="text-lg font-medium text-primaryTextColor mb-2">
          Contact
        </p>
        <ul className="list-none text-secundaryTextColor space-y-1">
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
