import { EMessageRole, MessageDetail } from '../../store/dialog/types';
import dayjs from 'dayjs';

import { useCallback, useMemo, useState } from 'react';
import useTextToSpeech from '../../hooks/useTextToSpeech';
import { avatarImg, displayedRole } from './utils';
import FeedbackInput from './feedback-input';
import useMessage from 'src/hooks/useMessage';
import { getUserInfo } from 'src/utils';
import { UserRole } from 'src/store/user/types';

interface Props {
  message: MessageDetail;
  index: number;
  id: string;
  isMale: boolean;
  shouldShowFeedback?: boolean;
}

const MessageItemText = ({
  message,
  id,
  isMale,
  shouldShowFeedback = false,
}: Props) => {
  const { createdAt, content, role } = message;

  const userInfo = getUserInfo();

  const [showFeedbackInput, setShowFeedbackInput] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>(message.feedback || '');

  const audio = useMemo(() => {
    const newAudio = new Audio(message.uri);
    newAudio.preload = 'none';
    newAudio.setAttribute('type', 'audio/mpeg');
    return newAudio;
  }, [message.uri]);

  const { onSpeak } = useTextToSpeech(isMale);

  const { feedbackMessage } = useMessage({});

  const onPlay = useCallback(() => {
    audio.play();
  }, [audio]);

  const date = dayjs(createdAt).format('HH:mm');

  const isUserRole = role === EMessageRole.USER;

  const onClickFeedback = useCallback(() => {
    if (userInfo?.role === UserRole.SUPERVISOR) setShowFeedbackInput(true);
  }, [userInfo?.role]);

  const onSubmitFeedback = useCallback(() => {
    const successCallback = () => {
      setShowFeedbackInput(false);
    };
    feedbackMessage(message._id, feedback, successCallback);
  }, [feedback, feedbackMessage, message._id]);

  return (
    <div>
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
            onClick={onClickFeedback}
            id={id}
            className='text-sm font-normal py-2.5 text-gray-900 dark:text-white cursor-pointer'
          >
            {content}
          </p>
          {!showFeedbackInput &&
            isUserRole &&
            shouldShowFeedback &&
            (!!feedback || !!message.feedback) && (
              <p
                className='text-sm text-green-500 cursor-pointer'
                onClick={onClickFeedback}
              >
                <b>Feedback: </b>
                <span className='italic'>{feedback || message.feedback}</span>
              </p>
            )}
        </div>
      </div>
      {showFeedbackInput && isUserRole && (
        <FeedbackInput
          feedback={feedback}
          setFeedback={setFeedback}
          onSubmit={onSubmitFeedback}
        />
      )}
    </div>
  );
};

export default MessageItemText;
