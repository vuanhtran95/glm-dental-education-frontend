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
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg dark:bg-gray-800 border-gray-700 dark:text-white"
        />
      </div>
    </div>
  );
};

export default Input;
