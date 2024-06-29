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
import { Gender, ScenarioDetail } from '../../store/scenario/types';
import Select from '../../components/select';
import { Field, Form, Formik } from 'formik';

interface ScenarioFormValues {
  name: string;
  patientName: string;
  age: number;
  gender: Gender;
  symptoms: string;
  medicalHistory: string;
  lifeStyle: string;
  communicationStyle: string;
  additionalInformation: string;
}

const Scenario = () => {
  const { scenarios, fetchScenarioList } = useScenarioList();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const dispatch = useDispatch();
  const userInfo = getUserInfo();

  const initialValues: ScenarioFormValues = {
    name: '',
    patientName: '',
    age: 20,
    gender: '',
    symptoms: '',
    medicalHistory: '',
    lifeStyle: '',
    communicationStyle: '',
    additionalInformation: '',
  };

  const onSubmitDialog = useCallback(
    (values: ScenarioFormValues) => {
      if (!userInfo?._id) return;

      const successCallback = () => {
        setIsModalVisible(false);
        fetchScenarioList();
      };
      dispatch(
        createScenarioAction(
          {
            ...values,
            createdUserId: userInfo?._id,
          } as ScenarioDetail,
          successCallback
        )
      );
    },
    [dispatch, fetchScenarioList, userInfo?._id]
  );

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
        <div className='flex align-middle flex-col justify-center mr-2'>
          <Button label={'Create'} onClick={onCreateScenario} />
        </div>
      </div>
      <DataTable data={scenarios} />
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => onSubmitDialog(values)}
      >
        <Form>
          <Modal
            visible={isModalVisible}
            title='Create Dialog'
            onClose={() => setIsModalVisible(false)}
          >
            <>
              <Input label={'Scenario Name'} name='name' id='name' />
              <Input
                label={'Patient Name'}
                name='patientName'
                id='patientName'
              />
              <Input type='number' label={'Age'} name='age' id='age' />
              <Select
                options={[
                  { key: 'male', label: 'Male' },
                  { key: 'female', label: 'Female' },
                ]}
                label={'Gender'}
                name={'gender'}
                id='gender'
              />
              <Input label={'Symptoms'} name='symptoms' id='symptoms' />
              <Input
                label={'Medical History'}
                name='medicalHistory'
                id='medicalHistory'
              />
              <Input label={'Life Style'} name='lifeStyle' id='lifeStyle' />
              <Input
                label={'Communication Style'}
                name='communicationStyle'
                id='communicationStyle'
              />
              <Input
                label={'Additional Information'}
                name='additionalInformation'
                id='additionalInformation'
              />
            </>
          </Modal>
        </Form>
      </Formik>
    </>
  );
};

export default Scenario;
