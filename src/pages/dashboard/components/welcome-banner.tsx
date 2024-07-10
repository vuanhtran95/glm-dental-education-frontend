import { useDispatch } from 'react-redux';
import { generateScenarioAction } from '../../../store/scenario/actions';
import { getUserInfo } from '../../../utils';
import { ScenarioDetail } from '../../../store/scenario/types';
import { useSelector } from 'react-redux';
import { selectScenarioDetailState } from '../../../store/scenario/selectors';
import { useCallback } from 'react';
import { createDialogAction } from '../../../store/dialog/actions';
import { useNavigate } from 'react-router-dom';

function WelcomeBanner() {
  const user = getUserInfo();

  const navigation = useNavigate();

  const dispatch = useDispatch();

  const scenarioDetail: ScenarioDetail | null = useSelector(
    selectScenarioDetailState
  );

  const onGenerate = useCallback(() => {
    if (!user?._id) return;
    dispatch(generateScenarioAction(user?._id));
  }, [dispatch, user?._id]);

  const onStartConvo = useCallback(() => {
    user?._id &&
      scenarioDetail?._id &&
      dispatch(
        createDialogAction(
          user?._id,
          scenarioDetail?._id,
          scenarioDetail?.patientName,
          (id?: string) => {
            id && navigation(`/dialog/${id}`);
          }
        )
      );
  }, [
    dispatch,
    navigation,
    scenarioDetail?._id,
    scenarioDetail?.patientName,
    user?._id,
  ]);

  return (
    <section className='bg-white '>
      <div className='py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative'>
        <a
          href='#'
          className='inline-flex justify-between items-center py-1 px-1 pe-4 mb-7 text-sm text-blue-700 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800'
        >
          <span className='text-xs bg-blue-600 rounded-full text-white px-4 py-1.5 me-3'>
            New
          </span>
          <span className='text-sm font-medium'>
            New virtual patient, self directed learning platform has been
            launched
          </span>
          <svg
            className='w-2.5 h-2.5 ms-2 rtl:rotate-180'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 6 10'
          >
            <path
              stroke='currentColor'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='m1 9 4-4-4-4'
            />
          </svg>
        </a>
        <h1 className='m-12 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>
          Hello {user?.fullName}
        </h1>
        <p className='mb-8 text-sm font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200'>
          Please enter patient name and generate the patient information to
          start a new conversation
        </p>
        <form className='w-full max-w-md mx-auto'>
          <div className='flex flex-col gap-4'>
            <div className='relative'>
              <input
                id='symptoms'
                name='symptoms'
                placeholder='Patient Name'
                className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              />
              <button
                onClick={() => onGenerate()}
                type='submit'
                className='text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                Generate <i className='fa-solid fa-circle-arrow-right'></i>
              </button>
            </div>
            {scenarioDetail && (
              <div className='bg-gray-500 w-208 p-4 rounded mt-8 flex flex-col gap-4 align-middle'>
                <p>
                  Patient Name: {scenarioDetail?.patientName} (
                  {scenarioDetail?.gender})
                </p>
                <p>Date of birth: {scenarioDetail?.dateOfBirth}</p>
                <p>Symptoms: {scenarioDetail?.symptoms}</p>
                <p>Medical history: {scenarioDetail?.medicalHistory}</p>
                <button
                  onClick={() => onStartConvo()}
                  type='submit'
                  className='text-white w-32 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                  Start <i className='fa-solid fa-start'></i>
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
      <div className='bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900 w-full h-full absolute top-0 left-0 z-0'></div>
    </section>
  );
}

export default WelcomeBanner;
