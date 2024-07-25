import { useDispatch } from 'react-redux';
import { getUserInfo } from '../../../utils';
import { useSelector } from 'react-redux';
import { useCallback, useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import WelcomeSection from './components/welcome-section';
import Button from 'src/components/button';
import { Formik } from 'formik';
import { genderOptions, generateScenarioInitialValues } from './constants';
import Input from 'src/components/input';
import Select from 'src/components/select';
import { ScenarioGenerateForm } from './types';
import ScenarioDetailSection from './components/scenario-detail';
import { getButtonLabel } from './utils';
import { generateScenarioAction } from 'src/store/scenario/actions';
import { selectScenarioDetailState } from 'src/store/scenario/selectors';
import { createDialogAction } from 'src/store/dialog/actions';
import { ScenarioDetail } from 'src/store/scenario/types';

const CreateChat = () => {
  const user = getUserInfo();
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const scenarioDetail: ScenarioDetail | null = useSelector(
    selectScenarioDetailState
  );

  console.log(scenarioDetail, 'scenarioDetail');

  const onGenerate = useCallback(
    ({ patientName, gender }: ScenarioGenerateForm) => {
      setIsLoading(true);

      const successCallback = () => {
        setIsLoading(false);
      };
      const errorCallback = () => {
        setIsLoading(false);
      };
      dispatch(
        generateScenarioAction(
          { patientName, gender },
          successCallback,
          errorCallback
        )
      );
    },
    [dispatch]
  );

  const onStart = useCallback(() => {
    if (!user?._id || !scenarioDetail?._id) return;
    const successCallback = (id: string) => {
      navigation(`/dialog/${id}`);
      return;
    };
    dispatch(
      createDialogAction(user?._id, scenarioDetail?._id, successCallback)
    );
  }, [dispatch, navigation, scenarioDetail, user?._id]);

  return (
    <section className=''>
      <div className='py-8 px-2 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative'>
        <WelcomeSection />
        <div className='w-full max-w-md mx-auto'>
          <Formik
            initialValues={generateScenarioInitialValues}
            onSubmit={(values) => onGenerate(values)}
          >
            {({ values }) => (
              <Form className='flex flex-col gap-4'>
                <Input id='patientName' placeholder='Patient Name' />
                <Select id='gender' options={genderOptions} />

                <div className='flex justify-center mt-4'>
                  <Button
                    loading={isLoading}
                    label={getButtonLabel(isLoading)}
                    disabled={!values.patientName}
                    onClick={() => onGenerate(values)}
                  />
                </div>
              </Form>
            )}
          </Formik>
          <ScenarioDetailSection
            scenarioDetail={scenarioDetail}
            onStart={onStart}
          />
        </div>
      </div>
    </section>
  );
};

export default CreateChat;
