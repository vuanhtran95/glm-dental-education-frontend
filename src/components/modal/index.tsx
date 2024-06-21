interface Props {
  visible: boolean;
  title?: string;
  content?: React.ReactElement;
  onClose?: () => void;
  onSubmit?: () => void;
  children?: React.ReactElement;
}

const Modal = ({
  visible,
  title,
  content,
  onClose,
  onSubmit,
  children,
}: Props) => {
  if (!visible) return <></>;

  return (
    <div
      className='relative z-10'
      aria-labelledby='modal-title'
      role='dialog'
      aria-modal='true'
    >
      <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>

      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
          <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
            <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
              <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                <h2
                  className='text-xl font-semibold leading-6 text-gray-900'
                  id='modal-title'
                >
                  {title}
                </h2>
                <div className='mt-6'>
                  <p className='text-sm text-gray-500'>
                    {children ? children : content}
                  </p>
                </div>
              </div>
            </div>
            <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
              <button
                onClick={onSubmit}
                type='button'
                className='inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto'
              >
                Submit
              </button>
              <button
                onClick={onClose}
                type='button'
                className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
