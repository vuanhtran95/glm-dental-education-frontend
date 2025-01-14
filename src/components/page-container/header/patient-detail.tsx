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
      <div>Occupation: {detail?.occupation}</div>

      <div>Reason for visit: {detail?.presentingComplaint}</div>
      <div>Medical history: {detail?.medicalHistory}</div>
      <div>Life styles: {detail?.lifeStyle}</div>

      <div>Clinical context: {detail?.clinicalContext}</div>

      <div>Emotional state: {detail?.emotionalState}</div>
      <div>Communication style: {detail?.communicationStyle}</div>
    </div>
  );
};

export default PatientDetail;
