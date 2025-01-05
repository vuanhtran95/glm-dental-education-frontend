import { ScenarioDetail } from "src/store/scenario/types";
import ButtonGroup from "./button-group";
import { DialogDetail, MessageDetail } from "src/store/dialog/types";

interface Props {
  scenario?: ScenarioDetail;
  dialogDetail?: DialogDetail;
  messages?: MessageDetail[];
  hasButtonGroup?: boolean;
}

const ScenarioInformation = ({
  scenario,
  dialogDetail,
  messages,
  hasButtonGroup = true,
}: Props) => {
  if (!scenario) return <></>;
  return (
    <div className="flex flex-col justify-between border-gray-200 w-[500px] shadow bg-gray-800 border-gray-700">
      <div className="flex items-start flex-col py-10 pl-6 pr-4">
        <div className="rounded-xl p-4 bg-gray-700 w-full">
          <h5 className="mb-1 text-xl font-medium text-gray-900 text-white">
            Name: {scenario.patientName} ({scenario.gender})
          </h5>
          <p className="text-gray-400 text-sm mt-1">
            Date of birth: {scenario.dateOfBirth}
          </p>
        </div>

        <div
          className="flex mt-12 justify-start gap-7"
          style={{ maxWidth: "300px" }}
        >
          <div>
            <p className="text-gray-200 text-sm mb-5">
              <b>Symptoms:</b> {scenario.symptoms}
            </p>
            <p className="text-gray-200 text-sm mb-5">
              <b>Life style:</b> {scenario.lifeStyle}
            </p>

            <p className="text-gray-200 text-sm mb-5">
              <b>Medical History: </b> {scenario.medicalHistory}
            </p>
          </div>
        </div>

        {hasButtonGroup && (
          <ButtonGroup dialogDetail={dialogDetail} messages={messages} />
        )}
      </div>
    </div>
  );
};

export default ScenarioInformation;
