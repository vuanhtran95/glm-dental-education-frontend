import { ScenarioDetail } from '../../../../store/scenario/types';

interface Props {
  scenario?: ScenarioDetail;
}

const ScenarioInformation = ({ scenario }: Props) => {
  if (!scenario) return <></>;
  return (
    <div className='border-gray-200 w-[350px] shadow dark:bg-gray-800 dark:border-gray-700'>
      <div className='flex flex-col items-center py-10'>
        <img
          className='w-24 h-24 mb-3 rounded-full shadow-lg'
          src='https://api.dicebear.com/7.x/pixel-art/svg'
          alt='Bonnie image'
        />
        <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
          Name: {scenario.patientName}
        </h5>
        <span className='text-sm text-gray-500 dark:text-gray-400'>
          Age: {scenario.age} ({scenario.gender})
        </span>
        <div className='flex w-12 mt-8 justify-center'>
          <span className='bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300'>
            Default
          </span>
          <span className='bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300'>
            Yellow
          </span>
          <span className='bg-pink-100 text-pink-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300'>
            Pink
          </span>
        </div>

        <div className='flex mt-12 justify-start' style={{ maxWidth: '300px' }}>
          <div>
            <p className='text-white mb-3'>
              <b>Life style:</b> {scenario.lifeStyle}
            </p>

            <p className='text-white mb-3'>
              <b>Status: </b>
              {scenario.symptoms}
            </p>
            <p className='text-white mb-3'>
              <b>Medical History: </b> {scenario.medicalHistory}
            </p>
            <p className='text-white mb-3'>
              <b>Additional Information: </b> {scenario.additionalInformation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioInformation;
