interface Props {
  label: string;
  onClick: () => void;
  loading?: boolean;
  className?: string;
  type?: string;
}

const Button = ({
  label,
  onClick,
  loading = false,
  className,
  type,
}: Props) => {
  return (
    <button
      type={type}
      className={`bg-primary h-10 ${!!className && className}`}
      disabled={!!loading}
      onClick={onClick}
    >
      <div className='flex'>
        {!!loading && (
          <svg
            className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              stroke-width='4'
            ></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            ></path>
          </svg>
        )}
        <span className='text-white'>{label}</span>
      </div>
    </button>
  );
};

export default Button;
