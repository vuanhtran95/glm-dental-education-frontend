import { useCallback, useState } from "react";
import { APP_MESSAGES } from "src/constants";
import { NOTIFICATION_TYPE } from "./types";
import NotificationMessage from "./notification-message";

const useNotification = () => {
  const [type, setType] = useState<NOTIFICATION_TYPE>(NOTIFICATION_TYPE.ERROR);

  const [notification, setNotification] = useState<APP_MESSAGES | string>("");

  const notifyError = useCallback((message: APP_MESSAGES) => {
    setNotification(message);
    setType(NOTIFICATION_TYPE.ERROR);
  }, []);

  const notifySuccess = useCallback((message: APP_MESSAGES) => {
    setNotification(message);
    setType(NOTIFICATION_TYPE.SUCCESS);
  }, []);

  return {
    type,
    notification,
    notifyError,
    notifySuccess,
  };
};

export { useNotification, NotificationMessage };
