import ButtonLoadingIcon from './loading-icon';

interface Props {
  label: string;
  onClick?: () => void;
  loading?: boolean;
  className?: string;
}

const Button = ({ label, onClick, loading = false, className }: Props) => {
  return (
    <button
      className={`bg-primary h-10 ${!!className && className}`}
      disabled={!!loading}
      onClick={onClick}
    >
      <div className='flex'>
        {!!loading && <ButtonLoadingIcon />}
        <span className='text-white'>{label}</span>
      </div>
    </button>
  );
};

export default Button;
