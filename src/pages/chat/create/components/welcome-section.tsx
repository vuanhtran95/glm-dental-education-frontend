const WelcomeSection = () => {
  return (
    <>
      <a
        target="_blank"
        href="https://eur03.safelinks.protection.outlook.com/?url=https%3A%2F%2Fforms.office.com%2FPages%2FResponsePage.aspx%3Fid%3DFM9wg_MWFky4PHJAcWVDVjmQyI33t55Ch-24lIq1xThUODBNWThBNlNFQ1UyR0dDRUwzSE4wVlpBWC4u&data=05%7C02%7Canh.v.tran%40kcl.ac.uk%7C163af4524e4e465f490c08dd525648c2%7C8370cf1416f34c16b83c724071654356%7C0%7C0%7C638757252751542405%7CUnknown%7CTWFpbGZsb3d8eyJFbXB0eU1hcGkiOnRydWUsIlYiOiIwLjAuMDAwMCIsIlAiOiJXaW4zMiIsIkFOIjoiTWFpbCIsIldUIjoyfQ%3D%3D%7C0%7C%7C%7C&sdata=xiokN2iZLUXtSAAsjhNQIRvG97MiBVfUClchQmA%2Bmnc%3D&reserved=0"
        className="text-white inline-flex justify-between items-center p-2 pe-4 mb-4 text-sm text-blue-200 bg-red-600 rounded-full"
      >
        <span className="text-xs bg-red-500 rounded-full px-4 py-1.5 me-3">
          New!
        </span>
        <span className="text-sm font-medium">
          Please click here to give us feedback!
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
