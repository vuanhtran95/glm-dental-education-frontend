export const removeButtonCss =
  'mr-4 bg-red-700 dark:hover:bg-red-700 dark:focus:ring-red-800 hover:bg-red-800 focus:ring-red-300 absolute text-white end-20 bottom-2.5 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2';

export const sendButtonCss =
  'bg-green-700 dark:hover:bg-green-700 dark:focus:ring-green-800 hover:bg-green-800 focus:ring-green-300 absolute text-white end-10 bottom-2.5 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2';

export const transcriptInputCss =
  'w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';

export const recordButtonCss = (listening: boolean) =>
  `text-white absolute end-10 bottom-2.5 ${
    listening
      ? 'bg-red-700 dark:hover:bg-red-700 dark:focus:ring-red-800 hover:bg-red-800 focus:ring-red-300'
      : 'bg-blue-700  dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:bg-blue-800 focus:ring-blue-300'
  } focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2`;
