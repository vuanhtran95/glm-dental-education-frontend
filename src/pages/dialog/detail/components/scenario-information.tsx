import { ScenarioDetail } from '../../../../store/scenario/types';

interface Props {
  scenario?: ScenarioDetail;
}

const ScenarioInformation = ({ scenario }: Props) => {
  if (!scenario) return <></>;
  return (
    <div className='max-w-60 flex flex-col gap-4'>
      <div>
        <b>Scenario:</b>
      </div>
      <div>
        <b>Patient name:</b> {scenario?.patientName}
      </div>
      <div>
        <b>Age: </b> {scenario?.age}
      </div>
      <div>
        <b>Communication style: </b> {scenario?.communicationStyle}
      </div>
      <div>
        <b>Symptoms:</b> {scenario?.symptoms}
      </div>
      <div>
        <b>Medical history:</b> {scenario?.medicalHistory}
      </div>
      <div>
        <b>Life style:</b> {scenario?.lifeStyle}
      </div>
      <div>
        <b>Additional Information:</b> {scenario?.additionalInformation}
      </div>
    </div>
  );
};

export default ScenarioInformation;
