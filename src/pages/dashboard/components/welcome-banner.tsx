import { useDispatch } from 'react-redux';
import { generateScenarioAction } from '../../../store/scenario/actions';
import { getUserInfo } from '../../../utils';
import { ScenarioDetail } from '../../../store/scenario/types';
import { useSelector } from 'react-redux';
import {
  selectScenarioDetailState,
  selectScenarioLoadingState,
} from '../../../store/scenario/selectors';
import { useCallback, useState } from 'react';
import { createDialogAction } from '../../../store/dialog/actions';
import { useNavigate } from 'react-router-dom';

function WelcomeBanner() {
  const user = getUserInfo();

  const navigation = useNavigate();

  const dispatch = useDispatch();

  const [patientName, setPatientName] = useState<string>('');

  const loading = useSelector(selectScenarioLoadingState);

  const [gender, setGender] = useState<string>('Male');

  const scenarioDetail: ScenarioDetail | null = useSelector(
    selectScenarioDetailState
  );

  const onGenerate = useCallback(
    (e) => {
      e.preventDefault();
      if (!user?._id) return;
      dispatch(
        generateScenarioAction(user?._id, { patientName, gender }, () => {
          setPatientName('');
        })
      );
    },
    [dispatch, gender, patientName, user?._id]
  );

  const onStartConvo = useCallback(() => {
    user?._id &&
      scenarioDetail?._id &&
      dispatch(
        createDialogAction(
          user?._id,
          scenarioDetail?._id,
          scenarioDetail?.patientName,
          (id?: string) => {
            setPatientName('');
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
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='m1 9 4-4-4-4'
            />
          </svg>
        </a>
        <h1 className='m-12 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>
          Welcome!
        </h1>
        <p className='mb-8 text-sm font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200'>
          Please enter patient name and generate the patient information to
          start a new conversation
        </p>
        <form className='w-full max-w-md mx-auto'>
          <div className='flex flex-col gap-4'>
            <div className='relative'>
              <input
                placeholder='Patient Name'
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              />
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className='mt-4 block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              >
                <option>Male</option>
                <option>Female</option>
              </select>
              <div className='flex justify-center'>
                <button
                  disabled={!patientName}
                  onClick={(e) => onGenerate(e)}
                  className={`
                  flex self-center
                  ${loading ? 'w-[120px]' : 'w-[120px]'}
                  ${
                    !patientName &&
                    'bg-gray-700 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800'
                  } text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                >
                  <div className='mr-2'>
                    {!loading ? 'Generate' : 'Generating'}
                  </div>
                  {!loading && (
                    <div>
                      <i className='fa-solid fa-circle-arrow-right'></i>
                    </div>
                  )}
                  {loading && (
                    <div role='status'>
                      <svg
                        aria-hidden='true'
                        className='w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-white'
                        viewBox='0 0 100 101'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                          fill='currentColor'
                        />
                        <path
                          d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                          fill='currentFill'
                        />
                      </svg>
                      <span className='sr-only'>Loading...</span>
                    </div>
                  )}
                </button>
              </div>
            </div>

            {scenarioDetail && (
              <div className='bg-slate-700 w-208 p-4 py-8 rounded-xl mt-8 flex flex-col gap-4 align-middle'>
                <p className='text-white'>
                  Patient Name: {scenarioDetail?.patientName} (
                  {scenarioDetail?.gender})
                </p>
                <p className='text-white'>
                  Date of birth: {scenarioDetail?.dateOfBirth}
                </p>
                <p className='text-white'>
                  Symptoms: {scenarioDetail?.symptoms}
                </p>
                <p className='text-white'>
                  Medical history: {scenarioDetail?.medicalHistory}
                </p>
                <button
                  onClick={() => onStartConvo()}
                  type='submit'
                  className='self-end mt-4	text-white w-32 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
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
