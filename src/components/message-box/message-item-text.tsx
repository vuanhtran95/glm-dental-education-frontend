import { EMessageRole, MessageDetail } from '../../store/dialog/types';
import dayjs from 'dayjs';
import avatar from '../../assets/avatar.png';
import patient from '../../assets/patient.png';
import { useMemo } from 'react';
import MessageItemVoice from './message-item-voice';

interface Props {
  message: MessageDetail;
  index: number;
}

const MessageItemText = ({ message }: Props) => {
  const { createdAt, content, role } = message;

  const date = dayjs(createdAt).format('YYYY MM DD');

  const displayedRole = useMemo(() => {
    switch (role) {
      case EMessageRole.ASSISTANT:
        return 'Patient';
      case EMessageRole.USER:
        return 'Doctor';
      default:
        return 'System';
    }
  }, [role]);

  const img =
    role === EMessageRole.USER || role === EMessageRole.SYSTEM
      ? avatar
      : patient;

  const isRightAlign = role === EMessageRole.USER;

  return (
    <div
      className={`flex items-start gap-2.5 my-4 ${
        isRightAlign && 'justify-end'
      }`}
    >
      <img className='w-8 h-8 rounded-full' src={img} alt='Jese image' />
      <div className='flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700'>
        <div className='flex items-center space-x-2 rtl:space-x-reverse'>
          <span className='text-sm font-semibold text-gray-900 dark:text-white'>
            {displayedRole}
          </span>
          <span className='text-sm font-normal text-gray-500 dark:text-gray-400'>
            {date}
          </span>
        </div>
        <p className='text-sm font-normal py-2.5 text-gray-900 dark:text-white'>
          {content}
        </p>
        <MessageItemVoice />
      </div>
    </div>
  );
};

export default MessageItemText;
