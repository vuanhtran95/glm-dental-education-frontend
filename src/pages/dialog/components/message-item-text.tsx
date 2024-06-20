interface Props {
  name: string;
  time: string;
  content: string;
  index: number;
}

const MessageItemText = ({ name, time, content, index }: Props) => {
  const isRightAlign = index / 2 !== 0;
  console.log(isRightAlign, 'isRightAlign');

  return (
    <div
      className={`flex items-start gap-2.5 my-4 ${
        isRightAlign && 'justify-end'
      }`}
    >
      <img
        className='w-8 h-8 rounded-full'
        src='/docs/images/people/profile-picture-3.jpg'
        alt='Jese image'
      />
      <div className='flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700'>
        <div className='flex items-center space-x-2 rtl:space-x-reverse'>
          <span className='text-sm font-semibold text-gray-900 dark:text-white'>
            {name || 'No Name'}
          </span>
          <span className='text-sm font-normal text-gray-500 dark:text-gray-400'>
            {time}
          </span>
        </div>
        <p className='text-sm font-normal py-2.5 text-gray-900 dark:text-white'>
          {content}
        </p>
      </div>
    </div>
  );
};

export default MessageItemText;
