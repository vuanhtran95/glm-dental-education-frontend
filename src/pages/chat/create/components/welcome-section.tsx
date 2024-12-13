const WelcomeSection = () => {
  return (
    <>
      <a
        href="#"
        className="inline-flex justify-between items-center py-1 px-1 pe-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800"
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
      <h1 className="m-6 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Welcome!
      </h1>
      <p className="mb-4 text-sm font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
        Please enter patient name and generate the patient information to start
        a new conversation
      </p>
    </>
  );
};

export default WelcomeSection;
