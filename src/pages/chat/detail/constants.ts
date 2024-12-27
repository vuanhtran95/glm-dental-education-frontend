export const removeButtonCss =
  "bg-red-700 text-white rounded-lg text-sm";

export const sendButtonCss =
  "bg-green-700 text-white rounded-lg text-sm ml-2";

export const transcriptInputCss =
  "p-3 w-full text-sm bg-gray-500 rounded-2xl";

export const recordButtonCss = (listening: boolean) =>
  `text-white ${
    listening
      ? "bg-red-700"
      : "bg-blue-700"
  } font-medium rounded-lg text-sm`;
