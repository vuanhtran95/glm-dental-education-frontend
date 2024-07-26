import Button from '../button';

interface Props {
  onSubmit: () => void;
  feedback: string;
  setFeedback: (text: string) => void;
}

const FeedbackInput = ({ onSubmit, feedback, setFeedback }: Props) => {
  return (
    <div className='flex gap-3 flex-row-reverse'>
      <Button onClick={onSubmit} label={'Submit'} />
      <textarea
        className='text-white bg-slate-800 w-[375px] text-sm rounded-md p-2'
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
    </div>
  );
};

export default FeedbackInput;
