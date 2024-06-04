import { useEffect, useState } from 'react';
import inactiveMicrophone from '../../assets/inactive-microphone.png';
import activeMicrophone from '../../assets/active-microphone.gif';
import { getHealth } from '../../services/api';

const Home = () => {
  const [initialised, setInitialised] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [microphoneActive, setMicrophoneActive] = useState<boolean>(false);

  useEffect(() => {
    if (!initialised) {
      getHealth().then(() => {
        setInitialised(true);
        setLoading(false);
      });
    }
  }, [initialised]);

  if (loading) return <>There is something wrong</>;

  return (
    <>
      <h3>Click to speak</h3>
      <div
        style={{
          cursor: 'pointer',
        }}
      >
        {microphoneActive ? (
          <img
            onClick={() => setMicrophoneActive(false)}
            src={activeMicrophone}
            className='logo react'
            alt='React logo'
          />
        ) : (
          <img
            src={inactiveMicrophone}
            className='logo react'
            alt='React logo'
            onClick={() => setMicrophoneActive(true)}
          />
        )}
      </div>
      <p className='read-the-docs'>There are some random text here</p>
    </>
  );
};
export default Home;
