import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'src/components/button';
import MessageBox from 'src/components/message-box/message-box';
import { APP_ROUTES } from 'src/constants';
import useDialogDetail from 'src/hooks/useDialogDetail';
import useAllowedRoles from 'src/hooks/useUserRole';
import ScenarioInformation from 'src/pages/chat/detail/components/scenario-information';
import { EMessageRole } from 'src/store/dialog/types';
import { Gender } from 'src/store/scenario/types';
import { UserRole } from 'src/store/user/types';

const EvaluateDetail = () => {
  const params = useParams();
  const dialogId = params.id;
  const navigate = useNavigate();

  const { fetchDialogDetail, scenario, messages } = useDialogDetail({
    dialogId,
  });

  const onClickBack = useCallback(() => {
    navigate(APP_ROUTES.EVALUATE);
  }, [navigate]);

  useAllowedRoles([UserRole.SUPERVISOR]);

  useEffect(() => {
    fetchDialogDetail();
  }, [fetchDialogDetail]);

  return (
    <div className='flex justify-between p-10'>
      <div className='min-w-[75%]'>
        <div className='flex items-center'>
          <Button className='flex' label={''} onClick={onClickBack}>
            <i className='text-white fa-solid fa-chevron-left' />
          </Button>
        </div>
        <div className='mt-4'>Messages:</div>
        <MessageBox
          shouldShowFeedback
          messages={
            messages?.filter((e) => e.role !== EMessageRole.SYSTEM) || []
          }
          isMale={scenario?.gender === Gender.MALE}
        />
      </div>
      <ScenarioInformation hasButtonGroup={false} scenario={scenario} />
    </div>
  );
};

export default EvaluateDetail;
