import { APP_MESSAGES } from 'src/constants';
import { NOTIFICATION_TYPE } from './types';

interface Props {
  notification: APP_MESSAGES | string;
  type: NOTIFICATION_TYPE;
}

const NotificationMessage = ({ notification, type }: Props) => {
  return (
    <p
      className={`mt-4 text-center text-sm ${
        type === NOTIFICATION_TYPE.ERROR ? 'text-red-500' : 'text-blue-500'
      }`}
    >
      {notification}
    </p>
  );
};

export default NotificationMessage;
