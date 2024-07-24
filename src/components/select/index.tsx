import { Field } from 'formik';

import { Option } from './types';

interface Props {
  options: Option[];
  label: string;
  className?: string;
  id: string;
}

const Select = ({ options, label, id, className }: Props) => {
  return (
    <div className={`${!!className && className}`}>
      <label className='block text-sm font-medium leading-6 text-gray-900'>
        {label}
      </label>
      <div className='mt-2'>
        <Field
          as='select'
          id={id}
          name={id}
          className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white 
          focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400
           dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
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
