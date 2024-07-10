import { useCallback } from 'react';
import { removeTextInsideAsterisks } from '../utils';
import { MessagePayload } from '../store/dialog/types';
import api from '../services/api';

const headers = new Headers({
  'Access-Control-Allow-Origin': '*',
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Headers':
    'Content-Type, Authorization, X-Requested-With',
});

const url =
  'https://sbyv3a06nk.execute-api.eu-west-2.amazonaws.com/default/Testing/';

const useCallToLlama = () => {
  const processMessage = useCallback(
    (newMessage: string, history: MessagePayload): Promise<string> => {
      const payload = {
        inputs: newMessage,
        parameters: {
          max_new_tokens: 48,
          top_p: 0.9,
          temperature: 0.6,
        },
      };

      return new Promise((resolve, reject) => {
        api
          .post(url, {
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
