import { ScenarioDetail } from "src/store/scenario/types";

interface Props {
  detail?: ScenarioDetail;
}

const PatientDetail = ({ detail }: Props) => {
  return (
    <div className="flex flex-col gap-2 p-2">
      <div>
        Patient Name: {detail?.patientName} ({detail?.gender})
      </div>
      <div>DOB: {detail?.dateOfBirth}</div>
      <div>Reason for visit: {detail?.clinicalContext}</div>
      <div>Symptoms: {detail?.symptoms}</div>
      <div>Medical history: {detail?.medicalHistory}</div>
      <div>Life styles: {detail?.lifeStyle}</div>
    </div>
  );
};

export default PatientDetail;
