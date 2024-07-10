import { useCallback, useEffect, useState } from 'react';
import { getUserInfo } from '../../../utils';
import useDialogList from '../../../hooks/useDialogList';
import DataTable from '../components/data-table';
import Button from '../../../components/button';
import Modal from '../../../components/modal';
import Input from '../../../components/input';
import Select from '../../../components/select';
import useScenarioList from '../../../hooks/useScenarioList';
import { useDispatch } from 'react-redux';
import { createDialogAction } from '../../../store/dialog/actions';
import { Form, Formik } from 'formik';

interface DialogFormValues {
  name: string;
  scenarioId: string;
}

const DialogList = () => {
  const { scenarioOptions, fetchScenarioList } = useScenarioList();

  const initialValues: DialogFormValues = {
    name: '',
    scenarioId: '',
  };

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const userInfo = getUserInfo();

  const dispatch = useDispatch();

  const { dialogs, fetchDialogList } = useDialogList({
    userId: userInfo?._id || '',
  });

  const onCreateDialog = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const onSubmit = useCallback(
    (values: DialogFormValues) => {
      if (!userInfo?._id) return;
      const successCallback = () => {
        setIsModalVisible(false);
        fetchDialogList();
      };
      dispatch(
        createDialogAction(
          userInfo?._id,
          values.scenarioId,
          values.name,
          successCallback
        )
      );
    },
    [dispatch, fetchDialogList, userInfo?._id]
  );

  useEffect(() => {
    fetchDialogList();
    fetchScenarioList();
  }, [fetchDialogList, fetchScenarioList]);

  return (
    <>
      <div className='flex justify-between align-middle	'>
        <Header title='Dialog List' />
        <div className='flex align-middle flex-col justify-center mr-2'>
          <Button label={'Create'} onClick={onCreateDialog} />
        </div>
      </div>
      <DataTable data={dialogs} />
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => onSubmit(values)}
      >
        <Form>
          <Modal
            visible={isModalVisible}
            title='Create Dialog'
            onClose={() => setIsModalVisible(false)}
          >
            <Input label='Dialog Name' name='name' />
            <Select
              className='mt-6'
              label={'Scenario'}
              options={scenarioOptions}
              name={'scenarioId'}
            />
          </Modal>
        </Form>
      </Formik>
    </>
  );
};

export default DialogList;
