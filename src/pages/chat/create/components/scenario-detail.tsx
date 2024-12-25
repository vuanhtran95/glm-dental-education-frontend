import { ScenarioDetail } from "src/store/scenario/types";

interface Props {
  scenarioDetail: ScenarioDetail | null;
  onStart: () => void;
}

const ScenarioDetailSection = ({ scenarioDetail, onStart }: Props) => {
  if (!scenarioDetail) return <></>;
  return (
    <div className="bg-slate-700 w-208 p-4 py-8 rounded-xl mt-8 flex flex-col gap-2 align-middle">
      <p className="text-white">
        Patient Name: {scenarioDetail?.patientName} ({scenarioDetail?.gender})
      </p>
      <p className="text-white">Date of birth: {scenarioDetail?.dateOfBirth}</p>
      <p className="text-white">Symptoms: {scenarioDetail?.symptoms}</p>
      <p className="text-white">
        Medical history: {scenarioDetail?.medicalHistory}
      </p>
      <p className="text-white">Life style: {scenarioDetail?.lifeStyle}</p>
      <button
        onClick={() => onStart()}
        type="submit"
        className="self-end mt-4	text-white w-32 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
      >
        Start <i className="fa-solid fa-start"></i>
      </button>
    </div>
  );
};

export default ScenarioDetailSection;
