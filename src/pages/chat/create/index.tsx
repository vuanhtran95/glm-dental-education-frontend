import { useDispatch } from "react-redux";
import { getUserInfo } from "../../../utils";
import { useSelector } from "react-redux";
import { useCallback, useState } from "react";
import { Form, Navigate, useNavigate } from "react-router-dom";
import WelcomeSection from "./components/welcome-section";
import Button from "src/components/button";
import { Formik } from "formik";
import {
  emotionalStateOptions,
  genderOptions,
  generateScenarioInitialValues,
  verbosityLevelOptions,
} from "./constants";
import Input from "src/components/input";
import Select from "src/components/select";
import { ScenarioGenerateForm } from "./types";
import ScenarioDetailSection from "./components/scenario-detail";
import { getButtonLabel } from "./utils";
import {
  generateScenarioAction,
  resetScenarioAction,
} from "src/store/scenario/actions";
import { selectScenarioDetailState } from "src/store/scenario/selectors";
import { createDialogAction } from "src/store/dialog/actions";
import { ScenarioDetail } from "src/store/scenario/types";
import { UserRole } from "src/store/user/types";
import Textarea from "src/components/textarea";

const CreateChat = () => {
  const user = getUserInfo();
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAdvanced, setIsAdvanced] = useState<boolean>(false);

  const scenarioDetail: ScenarioDetail | null = useSelector(
    selectScenarioDetailState,
  );

  const onGenerate = useCallback(
    (values: ScenarioGenerateForm) => {
      setIsLoading(true);

      const successCallback = () => {
        setIsLoading(false);
      };
      const errorCallback = () => {
        setIsLoading(false);
      };
      dispatch(generateScenarioAction(values, successCallback, errorCallback));
    },
    [dispatch],
  );

  const onStart = useCallback(() => {
    if (!user?._id || !scenarioDetail?._id) return;
    const successCallback = (id: string) => {
      dispatch(resetScenarioAction());
      navigation(`/dialog/${id}`);
      return;
    };
    dispatch(
      createDialogAction(user?._id, scenarioDetail?._id, successCallback),
    );
  }, [dispatch, navigation, scenarioDetail, user?._id]);

  const isButtonDisabled = useCallback((values: ScenarioGenerateForm) => {
    return !values.patientName || !values.presentingComplaint;
  }, []);

  if (user?.role !== UserRole.STUDENT)
    return <Navigate to="/not-found" replace />;

  return (
    <section id="create-chat-container" className="md:pl-[255px] md:mx-auto">
      <div className="py-8 pt-[80px] px-2 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
        <WelcomeSection />
        <div className="w-full max-w-md mx-auto">
          <Formik
            initialValues={generateScenarioInitialValues}
            onSubmit={(values) => onGenerate(values)}
          >
            {({ values, handleChange }) => (
              <Form className="flex flex-col gap-4">
                <div className="flex flex-row gap-2 justify-center">
                  <Input
                    id="patientName"
                    name="patientName"
                    placeholder="Please input"
                    label="Patient Name *"
                    className="grow"
                  />
                  <Select
                    id="gender"
                    handleChange={handleChange}
                    options={genderOptions}
                    label="Gender *"
                    innerClassName="pl-4"
                  />
                </div>

                <Textarea
                  id="presentingComplaint"
                  name="presentingComplaint"
                  placeholder="Please input"
                  label="Presenting Complaint (Reason for visit) *"
                />

                <a
                  className="text-left text-sm mb-0"
                  onClick={() => setIsAdvanced(!isAdvanced)}
                >
                  Advanced settings
                </a>
                {isAdvanced && (
                  <>
                    <Select
                      id="emotionalState"
                      handleChange={handleChange}
                      options={emotionalStateOptions}
                      label="Emotional State (Optional)"
                    />

                    <Select
                      id="verbosityLevel"
                      handleChange={handleChange}
                      options={verbosityLevelOptions}
                      label="Verbosity Level"
                    />
                    <Textarea
                      id="clinicalContext"
                      name="clinicalContext"
                      placeholder="Please input"
                      label="Clinical Context (Optional)"
                    />
                  </>
                )}

                <div className="flex justify-center mt-4">
                  <Button
                    loading={isLoading}
                    label={getButtonLabel(isLoading)}
                    disabled={isButtonDisabled(values)}
                    onClick={() => onGenerate(values)}
                  />
                </div>
              </Form>
            )}
          </Formik>
          <ScenarioDetailSection
            scenarioDetail={scenarioDetail}
            onStart={onStart}
          />
        </div>
      </div>
    </section>
  );
};

export default CreateChat;
