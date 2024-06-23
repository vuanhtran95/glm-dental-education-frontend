interface Props {
  label?: string;
  onChange: (value: string | number) => void;
  value: string | number;
  type?: string;
}

const Input = ({ label, onChange, value, type = 'text' }: Props) => {
  return (
    <div>
      {!!label && (
        <label className='block text-sm font-medium leading-6 text-gray-900'>
          {label}
        </label>
      )}
      <div className='mt-2'>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          id='email'
          name='email'
          autoComplete='email'
          className='block w-full rounded-md border-0 px-2 py-1.5 bg-white text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
        />
      </div>
    </div>
  );
};

export default Input;
