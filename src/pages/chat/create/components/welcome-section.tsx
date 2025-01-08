const WelcomeSection = () => {
  return (
    <>
      <a
        href="#"
        className="inline-flex justify-between items-center p-2 pe-4 mb-4 text-sm text-blue-200 bg-blue-100 rounded-full bg-blue-900 text-blue-300 hover:bg-blue-200 hover:bg-blue-800"
      >
        <span className="text-xs bg-blue-600 rounded-full text-white px-4 py-1.5 me-3">
          New
        </span>
        <span className="text-sm font-medium">
          New virtual patient, self directed learning platform has been launched
        </span>
        <svg
          className="w-2.5 h-2.5 ms-2 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 9 4-4-4-4"
          />
        </svg>
      </a>
      <h1 className="m-6 text-3xl font-extrabold tracking-tight leading-none md:text-3xl lg:text-4xl text-gray-600">
        Welcome!
      </h1>
      <p className="mb-4 text-sm font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 text-gray-200">
        Please enter patient name and generate the patient information to start
        a new conversation
      </p>
    </>
  );
};

export default WelcomeSection;
