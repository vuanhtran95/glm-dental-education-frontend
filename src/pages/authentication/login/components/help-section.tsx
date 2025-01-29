const HelpSection = () => {
  return (
    <div className="text-center">
      <div
        className="text-center"
        onClick={() => {
          window.open("/help", "_blank");
        }}
      >
        <a className="cursor-pointer text-white inline-flex justify-between items-center p-2 pe-4 mb-4 text-sm text-blue-200 bg-green-600 rounded-full">
          <span className="text-xs bg-green-800 rounded-full px-4 py-1.5 me-3">
            Click here
          </span>
          <span className="text-sm font-medium">
            To learn how to use the system
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
      </div>
      <h1 className="my-4 text-4xl font-extrabold tracking-tight leading-none md:text-3xl lg:text-4xl text-gray-600">
        Welcome to virtual patient platform.
      </h1>
    </div>
  );
};

export default HelpSection;
