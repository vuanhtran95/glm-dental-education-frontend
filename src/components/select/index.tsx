import { Field } from "formik";

import { Option } from "./types";

interface Props {
  options: Option[];
  label?: string;
  className?: string;
  id: string;
}

const Select = ({ options, label, id, className }: Props) => {
  return (
    <div className={`${!!className && className}`}>
      {label && (
        <label className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
      )}
      <div className="mt-2">
        <Field
          as="select"
          id={id}
          name={id}
          className="appearance-none block w-full p-4 h-[52px] ps-10 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 dark:bg-gray-800
           dark:text-white"
        >
          {options.map((option: Option) => {
            return (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            );
          })}
        </Field>
      </div>
    </div>
  );
};

export default Select;
