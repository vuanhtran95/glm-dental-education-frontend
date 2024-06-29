interface Props {
  onClick?: () => void;
}

const Logo = ({ onClick }: Props) => {
  return (
    <div className='flex-shrink-0' onClick={onClick}>
      <img
        className='h-8 w-8'
        src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500'
        alt='Your Company'
      />
    </div>
  );
};

export default Logo;
