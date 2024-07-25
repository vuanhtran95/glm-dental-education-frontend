import ButtonLoadingIcon from './loading-icon';

interface Props {
  label: string;
  onClick?: () => void;
  loading?: boolean;
  children?: React.ReactNode;
  disabled?: boolean;
}

const Button = ({
  label,
  onClick,
  loading = false,
  children,
  disabled,
}: Props) => {
  return (
    <button
      className={`bg-primary h-12 ${disabled && 'bg-slate-600'}`}
      disabled={!!loading || disabled}
      onClick={onClick}
    >
      <div className='flex'>
        {!!loading && <ButtonLoadingIcon />}
        <span className='text-white'>{label}</span>
      </div>
      {children}
    </button>
  );
};

export default Button;
