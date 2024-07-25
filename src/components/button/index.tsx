import ButtonLoadingIcon from './loading-icon';

interface Props {
  label: string;
  onClick?: () => void;
  loading?: boolean;
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const Button = ({
  label,
  onClick,
  loading = false,
  children,
  disabled,
  className,
}: Props) => {
  return (
    <button
      className={`bg-primary h-10 ${disabled && 'bg-slate-600'} ${className}`}
      disabled={!!loading || disabled}
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
      }}
    >
      <div className='flex'>
        {!!loading && <ButtonLoadingIcon />}
        <span className='text-white text-sm'>{label}</span>
      </div>
      {children}
    </button>
  );
};

export default Button;
