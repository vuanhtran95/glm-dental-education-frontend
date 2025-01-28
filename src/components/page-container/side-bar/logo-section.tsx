interface Props {
  onClick: () => void;
}

const LogoSection = ({ onClick }: Props) => {
  return (
    <div className="mb-10 flex" onClick={onClick}>
      <a href="#" className="flex items-center ps-2.5">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="h-6 me-3 sm:h-7"
        />
        <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
          Virtual Patient
        </span>
      </a>
    </div>
  );
};

export default LogoSection;
