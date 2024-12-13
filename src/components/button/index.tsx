import ButtonLoadingIcon from "./loading-icon";

export type ButtonType = "submit" | "reset" | "button" | undefined;

interface Props {
  label: string;
  onClick?: () => void;
  loading?: boolean;
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  type?: ButtonType;
}

const Button = ({
  label,
  onClick,
  loading = false,
  children,
  disabled,
  className,
  type = "button",
}: Props) => {
  return (
    <button
      type={type}
      className={`bg-primary h-10 ${disabled && "bg-slate-600"} ${className}`}
      disabled={!!loading || disabled}
      onClick={() => {
        onClick?.();
      }}
    >
      <div className="flex">
        {!!loading && <ButtonLoadingIcon />}
        <span className="text-white text-sm">{label}</span>
      </div>
      {children}
    </button>
  );
};

export default Button;
