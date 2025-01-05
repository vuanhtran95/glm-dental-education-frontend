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
      <div>Symptoms: {detail?.symptoms}</div>
    </div>
  );
};

export default PatientDetail;
