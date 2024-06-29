import { Field } from 'formik';

interface Props {
  label?: string;
  type?: string;
  id?: string;
  name?: string;
  value?: string;
}

const Input = ({ label, value, type = 'text', id, name }: Props) => {
  return (
    <div>
      {!!label && (
        <label className='block text-sm font-medium leading-6 text-gray-900'>
          {label}
        </label>
      )}
      <div className='mt-2'>
        <Field
          type={type}
          value={value}
          id={id}
          name={name}
          className='block w-full rounded-md border-0 px-2 py-1.5 bg-white text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
        />
      </div>
    </div>
  );
};

export default Input;
