import { useCallback } from 'react';
import { removeTextInsideAsterisks } from '../utils';
import { EMessageRole, MessagePayload } from '../store/dialog/types';

const headers = new Headers({
  'Access-Control-Allow-Origin': '*',
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Headers':
    'Content-Type, Authorization, X-Requested-With',
});

const url = 'http://18.171.155.16:8080/process_message';

const useCallToLlama = () => {
  const processMessage = useCallback(
    (newMessage: string, history: MessagePayload): Promise<string> => {
      const payload = {
        history: [
          ...history.map((e) => ({ role: e.role, content: e.content })),
          { role: EMessageRole.USER, content: newMessage },
        ],
      };

      return new Promise((resolve, reject) => {
        resolve(Math.random().toString());
      });

      return new Promise((resolve, reject) => {
        fetch(url, {
          method: 'POST',
          headers,
          body: JSON.stringify(payload),
        })
          .then((response) => {
            response.json().then((message) => {
              resolve(removeTextInsideAsterisks(message));
            });
          })
          .catch(() => {
            reject();
          });
      });
    },
    []
  );

  return { processMessage };
};

export default useCallToLlama;
