interface Props {
  label: string;
  onClick: () => void;
}

const Button = ({ label, onClick }: Props) => {
  return (
    <button
      className='text-white bg-primary h-10 flex items-center justify-center'
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
