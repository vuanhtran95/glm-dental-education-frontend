import { DialogDetail } from 'src/store/dialog/types';

interface Props {
  dialogDetail?: DialogDetail;
}

const StatusGroup = ({ dialogDetail }: Props) => {
  if (!dialogDetail?.isEnded) return <></>;
  return (
    <div className='bg-gray-800 p-3 rounded-xl flex justify-end'>
      {dialogDetail?.isSubmitted ? (
        <div className='text-green-500'>
          <span>Conversation Submitted</span>
          <i className='fa-solid fa-circle-check ml-2'></i>
        </div>
      ) : (
        dialogDetail?.isEnded && (
          <div className='text-red-400'>
            <span>Conversation Ended</span>
            <i className='fa-solid fa-circle-check ml-2'></i>
          </div>
        )
      )}
    </div>
  );
};

export default StatusGroup;
