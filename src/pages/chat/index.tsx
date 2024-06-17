import { Input, Select } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ChatBox from '../../components/chat/chatbox';
// import { processMessage } from '../../services/api';
import 'regenerator-runtime';
import useSpeechToText from '../../hooks/useSpeechToText';
import useTextToSpeech from '../../hooks/useTextToSpeech';
import { voiceList } from './constants';
import { getUserInfo } from '../../utils';

export interface Message {
  role: Role;
  content: string;
}

export enum Role {
  'USER' = 'user',
  'SYSTEM' = 'assistant',
}

const Chat = () => {
  const [message, setMessage] = useState<string>('');
  const [dialog, setDialog] = useState<Message[]>([]);
  const [options, setOptions] = useState<string[]>(
    (JSON.parse(localStorage.getItem('tags') || '[]') as string[]) || []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [isInitialised, setIsInitialised] = useState<boolean>(false);

  const userInfo = getUserInfo();

  const [voice, setVoice] = useState(voiceList[0].value);

  const [patientName, setPatientName] = useState<string>(
    localStorage.getItem('patientName') || ''
  );
  const [patientContext, setPatientContext] = useState<string>(
    localStorage.getItem('context') || ''
  );

  const { startListening, stopListening, reset, transcript, listening } =
    useSpeechToText();

  const { onSpeak, setVoiceId } = useTextToSpeech();

  const onAsk = useCallback(
    (text?: string, autoSpeaking?: boolean) => {
      setIsLoading(true);
      return new Promise((resolve, reject) => {
        stopListening();
        setMessage('');
        reset();
        // processMessage(
        //   text || message,
        //   dialog,
        //   options,
        //   patientContext,
        //   patientName
        // )
        //   .then((data) => {
        //     !!autoSpeaking &&
        //       onSpeak(data).then(() => {
        //         // startListening({ continuous: true, interimResults: true });
        //       });
        //     setDialog([
        //       ...dialog,
        //       {
        //         role: Role.USER,
        //         content: message,
        //       },
        //       {
        //         role: Role.SYSTEM,
        //         content: data,
        //       },
        //     ]);
        //     setMessage('');
        //     setIsLoading(false);
        //     resolve(resolve);
        //   })
        //   .catch(() => {
        //     setIsLoading(false);
        //     reject(reject);
        //   });
      });
    },
    [
      stopListening,
      reset,
      message,
      dialog,
      options,
      patientContext,
      patientName,
      onSpeak,
      startListening,
    ]
  );

  const onVoiceAsk = useCallback(() => {
    if (listening) {
      stopListening();
    } else {
      setMessage('');
      reset();
      startListening({ continuous: true, interimResults: true });
    }
  }, [listening, reset, startListening, stopListening]);

  const onChangeTags = (values: string[]) => {
    setOptions(values);
    localStorage.setItem('tags', JSON.stringify(values));
  };

  const onChangeVoice = useCallback(
    (value) => {
      setVoice(value);

      setVoiceId(value);
    },
    [setVoiceId]
  );

  // const onChangeContext = (value: string) => {
  //   setPatientContext(value);
  //   localStorage.setItem('context', value);
  // };

  const onChangePatientName = (value: string) => {
    setPatientName(value);
    localStorage.setItem('patientName', value);
  };

  const onSave = () => {
    setDialog([]);
  };

  useEffect(() => {
    setMessage(transcript);
  }, [transcript]);

  useEffect(() => {
    if (!isInitialised) {
      setIsInitialised(true);
      setIsLoading(true);
      onAsk()
        .then(() => {
          setIsInitialised(true);
          setIsLoading(false);
        })
        .catch(() => {
          setIsInitialised(true);
          setIsLoading(false);
        });
    }
  }, [isInitialised, onAsk]);

  return (
    <div className='w-full'>
      {userInfo && (
        <div className='mb-2 flex'>
          <div className='items-start'>Hello {userInfo?.fullName}</div>
        </div>
      )}

      <div className='flex flex-row gap-2'>
        <div className='ml-8'>
          <p>List chat</p>
        </div>

        <div className='grow'>
          <ChatBox isLoading={isLoading} dialog={[...dialog].slice(2)} />
          <div className='flex gap-8 mt-2'>
            <Input
              width={1000}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className={`bg-green-700 text-white ${listening && 'loading'}`}
              onClick={() => onVoiceAsk()}
              style={{ width: '250px' }}
              disabled={isLoading}
            >
              {listening ? 'Listening' : 'Click to speak'}
            </button>
            <button
              className='bg-green-700 text-white '
              onClick={() => onAsk(message, true)}
              disabled={isLoading}
            >
              Send
            </button>
          </div>
        </div>
        <div className='mr-24 mt-10'>
          <div className='flex flex-col'>
            <h2 className='text-[24px] mb-24'>Configuration</h2>
            <p className='mt-8 mb-2'>Patient's name:</p>
            <Input
              className='mb-6'
              value={patientName}
              onChange={(e) => onChangePatientName(e.target.value)}
            />

            <p className='mb-2'>Patient's voice</p>
            <Select
              style={{ maxWidth: '200px', width: '200px' }}
              placeholder='Select Voice'
              onChange={onChangeVoice}
              options={voiceList}
              value={voice}
              className='mb-2'
            />

            <p className='mb-2 mt-4'>Patient's symptoms:</p>
            <Select
              mode='tags'
              defaultValue={options}
              style={{ maxWidth: '200px', width: '200px' }}
              placeholder='Tags Mode'
              onChange={onChangeTags}
              options={[]}
            />

            <div className='mt-8 justify-items-end'>
              <button className='bg-green-700 text-white' onClick={onSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
