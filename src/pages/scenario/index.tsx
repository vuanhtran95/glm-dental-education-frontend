import { useCallback, useEffect, useState } from 'react';
import useScenarioList from '../../hooks/useScenarioList';
import DataTable from './components/data-table';
import Header from '../../components/header';
import Button from '../../components/button';
import Modal from '../../components/modal';
import { useDispatch } from 'react-redux';
import { getUserInfo } from '../../utils';
import { createScenarioAction } from '../../store/scenario/actions';
import Input from '../../components/input';
import { ScenarioDetail } from '../../store/scenario/types';
import Select from '../../components/select';

const Scenario = () => {
  const { scenarios, fetchScenarioList } = useScenarioList();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const dispatch = useDispatch();
  const userInfo = getUserInfo();

  const [createName, setCreateName] = useState<string>('');
  const [createPatientName, setCreatePatientName] = useState<string>('');
  const [createAge, setCreateAge] = useState<number>(20);
  const [createSymptoms, setCreateSymptoms] = useState<string>('');
  const [createGender, setCreateGender] = useState<string>('male');
  const [createMedicalHistory, setCreateMedicalHistory] = useState<string>('');
  const [createLifeStyle, setCreateLifeStyle] = useState<string>('');
  const [createCommunicationStyle, setCreateCommunicationStyle] =
    useState<string>('');
  const [createAdditionalInformation, setCreateAdditionalInformation] =
    useState<string>('');

  const onSubmitDialog = useCallback(() => {
    if (!userInfo?._id) return;

    const successCallback = () => {
      setIsModalVisible(false);
      fetchScenarioList();
    };
    dispatch(
      createScenarioAction(
        {
          name: createName,
          patientName: createPatientName,
          age: createAge,
          gender: createGender,
          symptoms: createSymptoms,
          createdUserId: userInfo?._id,
          medicalHistory: createMedicalHistory,
          lifeStyle: createLifeStyle,
          communicationStyle: createCommunicationStyle,
          additionalInformation: createAdditionalInformation,
        } as ScenarioDetail,
        successCallback
      )
    );
  }, [
    createAdditionalInformation,
    createAge,
    createCommunicationStyle,
    createGender,
    createLifeStyle,
    createMedicalHistory,
    createName,
    createPatientName,
    createSymptoms,
    dispatch,
    fetchScenarioList,
    userInfo?._id,
  ]);

  const onCreateScenario = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  useEffect(() => {
    fetchScenarioList();
  }, [fetchScenarioList]);

  return (
    <>
      <div className='flex justify-between align-middle	'>
        <Header title='Scenario' />
        <div className='flex align-middle flex-col justify-center'>
          <Button label={'Create'} onClick={onCreateScenario} />
        </div>
      </div>
      <DataTable data={scenarios} />
      <Modal
        visible={isModalVisible}
        title='Create Dialog'
        onClose={() => setIsModalVisible(false)}
        onSubmit={onSubmitDialog}
      >
        <>
          <Input
            label={'Scenario Name'}
            onChange={(e) => setCreateName(e)}
            value={createName}
          />
          <Input
            label={'Patient Name'}
            onChange={(e) => setCreatePatientName(e)}
            value={createPatientName}
          />
          <Select
            options={[
              { key: 'male', label: 'Male' },
              { key: 'female', label: 'Female' },
            ]}
            label={'Gender'}
            name={'gender'}
            onChange={(e) => setCreateGender(e)}
          />
          <Input
            label={'Age'}
            onChange={(e) => setCreateAge(e as number)}
            value={createAge}
            type='number'
          />
          <Input
            label={'Symptoms'}
            onChange={(e) => setCreateSymptoms(e)}
            value={createSymptoms}
          />
          <Input
            label={'Medical History'}
            onChange={(e) => setCreateMedicalHistory(e)}
            value={createMedicalHistory}
          />
          <Input
            label={'Life Style'}
            onChange={(e) => setCreateLifeStyle(e)}
            value={createLifeStyle}
          />
          <Input
            label={'Communication Style'}
            onChange={(e) => setCreateCommunicationStyle(e)}
            value={createCommunicationStyle}
          />
          <Input
            label={'Additional Information'}
            onChange={(e) => setCreateAdditionalInformation(e)}
            value={createAdditionalInformation}
          />
        </>
      </Modal>
    </>
  );
};

export default Scenario;
