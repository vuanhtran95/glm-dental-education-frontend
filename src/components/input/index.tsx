import { Field } from "formik";

interface Props {
  label?: string;
  type?: string;
  id?: string;
  name?: string;
  value?: string;
  onChange?: () => void;
  placeholder?: string;
}

const Input = ({
  label,
  value,
  type = "text",
  id,
  name,
  placeholder,
}: Props) => {
  return (
    <div>
      {!!label && (
        <label className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
      )}
      <div className="mt-2">
        <Field
          placeholder={placeholder}
          type={type}
          value={value}
          id={id}
          name={name}
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default Input;
