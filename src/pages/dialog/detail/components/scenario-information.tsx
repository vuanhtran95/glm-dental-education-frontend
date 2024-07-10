import { ScenarioDetail } from '../../../../store/scenario/types';

interface Props {
  scenario?: ScenarioDetail;
}

const ScenarioInformation = ({ scenario }: Props) => {
  if (!scenario) return <></>;
  return (
    <div className='border-gray-200 w-[300px] shadow dark:bg-gray-800 dark:border-gray-700'>
      <div className='flex items-start flex-col py-10 pl-6 pr-4'>
        <img
          className='w-24 h-24 mb-3 rounded-full shadow-lg'
          src='https://api.dicebear.com/7.x/pixel-art/svg'
          alt='Bonnie image'
        />
        <div className='rounded-xl p-4 bg-gray-700 w-full'>
          <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
            Name: {scenario.patientName}
          </h5>
          <span className='text-sm dark:text-gray-400'>
            Age: {scenario.age} ({scenario.gender})
          </span>
          <p className='dark:text-gray-400 text-sm mt-1'>
            Date of birth: 14/07/1995
          </p>
        </div>
        <div className='flex w-12 mt-8'>
          <span className='bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300'>
            Default
          </span>
          <span className='bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300'>
            Yellow
          </span>
        </div>

        <div className='flex mt-12 justify-start' style={{ maxWidth: '300px' }}>
          <div>
            <p className='text-gray-200 text-sm mb-3'>
              <b>Life style:</b> {scenario.lifeStyle}
            </p>

            <p className='text-gray-200 text-sm mb-3'>
              <b>Status: </b>
              {scenario.symptoms}
            </p>
            <p className='text-gray-200 text-sm mb-3'>
              <b>Medical History: </b> {scenario.medicalHistory}
            </p>
            <p className='text-gray-200 text-sm mb-3'>
              <b>Additional Information: </b> {scenario.additionalInformation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioInformation;
