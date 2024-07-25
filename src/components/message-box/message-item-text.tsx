import { EMessageRole, MessageDetail } from '../../store/dialog/types';
import dayjs from 'dayjs';

import { useCallback, useMemo } from 'react';
import useTextToSpeech from '../../hooks/useTextToSpeech';
import { avatarImg, displayedRole } from './utils';

interface Props {
  message: MessageDetail;
  index: number;
  id: string;
  isMale: boolean;
}

const MessageItemText = ({ message, id, isMale }: Props) => {
  const { createdAt, content, role } = message;

  const audio = useMemo(() => {
    const newAudio = new Audio(message.uri);
    newAudio.preload = 'none';
    newAudio.setAttribute('type', 'audio/mpeg');
    return newAudio;
  }, [message.uri]);

  const { onSpeak } = useTextToSpeech(isMale);

  const onPlay = useCallback(() => {
    audio.play();
  }, [audio]);

  const date = dayjs(createdAt).format('HH:mm');

  const isUserRole = role === EMessageRole.USER;

  return (
    <div
      className={`flex items-center gap-2.5 my-4 px-2 md:px-8 ${
        isUserRole && 'flex-row-reverse'
      }`}
    >
      <img
        className='w-8 h-8 rounded-full cursor-pointer'
        src={avatarImg(role)}
      />
      <div className='flex flex-col leading-1.5 px-4 py-2 border-gray-200 rounded-lg dark:bg-gray-700 max-w-[80%]'>
        <div className='flex items-center space-x-2 rtl:space-x-reverse'>
          <span className='text-sm font-semibold text-gray-900 dark:text-white'>
            {displayedRole(role)}
          </span>
          <span className='text-sm font-normal text-gray-500 dark:text-gray-400'>
            {date}
            <i
              className='fa-regular fa-circle-play ml-2 cursor-pointer'
              onClick={() => {
                if (isUserRole) onPlay();
                else {
                  onSpeak(message.content);
                }
              }}
            ></i>
          </span>
        </div>
        <p
          id={id}
          className='text-sm font-normal py-2.5 text-gray-900 dark:text-white cursor-pointer'
        >
          {content}
        </p>
        <p className='text-sm text-green-500'>
          <b>Feedback:</b>{' '}
          <span className='italic'>{message.feedback || 'Testing'}</span>
        </p>
      </div>
    </div>
  );
};

export default MessageItemText;
