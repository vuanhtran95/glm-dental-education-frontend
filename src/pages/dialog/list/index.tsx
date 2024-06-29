import { useCallback, useEffect, useState } from 'react';
import { getUserInfo } from '../../../utils';
import useDialogList from '../../../hooks/useDialogList';
import DataTable from '../components/data-table';
import Header from '../../../components/header';
import Button from '../../../components/button';
import Modal from '../../../components/modal';
import Input from '../../../components/input';
import Select from '../../../components/select';
import useScenarioList from '../../../hooks/useScenarioList';
import { useDispatch } from 'react-redux';
import { createDialogAction } from '../../../store/dialog/actions';

const DialogList = () => {
  const { scenarioOptions, fetchScenarioList } = useScenarioList();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const userInfo = getUserInfo();
  const [createDialogName, setCreateDialogName] = useState<string>('');
  const [createScenarioId, setCreateScenarioId] = useState<string>(
    scenarioOptions?.[0]?.key
  );

  const dispatch = useDispatch();

  const { dialogs, fetchDialogList } = useDialogList({
    userId: userInfo?._id || '',
  });

  const onCreateDialog = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const onSubmitDialog = useCallback(() => {
    if (!userInfo?._id) return;
    const successCallback = () => {
      setIsModalVisible(false);
      fetchDialogList();
    };
    dispatch(
      createDialogAction(
        userInfo?._id,
        createScenarioId,
        createDialogName,
        successCallback
      )
    );
  }, [
    createDialogName,
    createScenarioId,
    dispatch,
    fetchDialogList,
    userInfo?._id,
  ]);

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
      <Modal
        visible={isModalVisible}
        title='Create Dialog'
        onClose={() => setIsModalVisible(false)}
        onSubmit={onSubmitDialog}
      >
        <>
          <Input
            label={'Dialog Name'}
            onChange={(e) => setCreateDialogName(e)}
          />
          <Select
            className='mt-6'
            label={'Scenario'}
            options={scenarioOptions}
            name={'scenarioId'}
            onChange={(e) => setCreateScenarioId(e)}
          />
        </>
      </Modal>
    </>
  );
};

export default DialogList;
