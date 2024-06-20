import { useCallback, useEffect, useState } from 'react';
// import { processMessage } from '../../services/api';
import 'regenerator-runtime';
import useSpeechToText from '../../hooks/useSpeechToText';
import useTextToSpeech from '../../hooks/useTextToSpeech';
import { voiceList } from '../chat/constants';
import { getUserInfo } from '../../utils';
import useDialogList from '../../hooks/useDialogList';
import WelcomeBanner from './components/welcome-banner';
import DataTable from './components/data-table';
import Header from '../../components/header';

export interface Message {
  role: Role;
  content: string;
}

export enum Role {
  'USER' = 'user',
  'SYSTEM' = 'assistant',
}

const Dashboard = () => {
  const [message, setMessage] = useState<string>('');
  const [dialog, setDialog] = useState<Message[]>([]);
  const [options, setOptions] = useState<string[]>(
    (JSON.parse(localStorage.getItem('tags') || '[]') as string[]) || []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [isInitialised, setIsInitialised] = useState<boolean>(false);

  const userInfo = getUserInfo();

  const { dialogs, fetchDialogList } = useDialogList({
    userId: userInfo?._id || '',
  });

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
      // onAsk()
      //   .then(() => {
      //     setIsInitialised(true);
      //     setIsLoading(false);
      //   })
      //   .catch(() => {
      //     setIsInitialised(true);
      //     setIsLoading(false);
      //   });
    }
  }, [isInitialised, onAsk]);

  useEffect(() => {
    fetchDialogList();
  }, [fetchDialogList]);

  return (
    <>
      <WelcomeBanner />
      <Header title='Dashboard' />
      <DataTable data={dialogs} />
    </>
  );
};

export default Dashboard;
