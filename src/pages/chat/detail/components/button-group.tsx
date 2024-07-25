import { useCallback, useState } from 'react';
import Button from 'src/components/button';
import Modal, { ModalInterface } from 'src/components/modal';
import useDialogDetail from 'src/hooks/useDialogDetail';
import { DialogDetail } from 'src/store/dialog/types';

interface Props {
  dialogDetail?: DialogDetail;
}

const ButtonGroup = ({ dialogDetail }: Props) => {
  const { endDialog, submitDialog, fetchDialogDetail } = useDialogDetail({
    dialogId: dialogDetail?._id,
  });

  const [modal, setModal] = useState<Omit<ModalInterface, 'isShown'>>({
    title: '',
    content: '',
    onConfirm: () => {},
    onCancel: () => {},
  });

  const [isShown, setIsShown] = useState<boolean>(false);

  const onConfirmEndConversation = useCallback(() => {
    endDialog(() =>
      fetchDialogDetail(() => {
        setModal({
          title: '',
          content: 'Success!',
        });
        setTimeout(() => setIsShown(false), 1000);
      })
    );
  }, [endDialog, fetchDialogDetail]);

  const onConfirmSubmitConversation = useCallback(() => {
    submitDialog(() =>
      fetchDialogDetail(() => {
        setModal({
          title: '',
          content: 'Success!',
        });
        setTimeout(() => setIsShown(false), 1000);
      })
    );
  }, [fetchDialogDetail, submitDialog]);

  const onSubmitConversation = useCallback(() => {
    setModal({
      title: 'Confirm',
      content: 'Are you sure to submit this conversation?',
      onConfirm: () => onConfirmSubmitConversation(),
      onCancel: () => setIsShown(false),
    });
    setIsShown(true);
  }, [onConfirmSubmitConversation]);

  const onEndConversation = useCallback(() => {
    setModal({
      title: 'Confirm',
      content: 'Are you sure to end this conversation?',
      onConfirm: () => onConfirmEndConversation(),
      onCancel: () => setIsShown(false),
    });
    setIsShown(true);
  }, [onConfirmEndConversation]);

  return (
    <>
      {!dialogDetail?.isEnded ? (
        <Button
          onClick={onEndConversation}
          className='bg-red-500'
          label={'End Dialog'}
        />
      ) : (
        !dialogDetail?.isSubmitted && (
          <Button
            onClick={onSubmitConversation}
            className='bg-green-500'
            label={'Submit Dialog'}
          />
        )
      )}
      <Modal
        title={modal.title}
        content={modal.content}
        onConfirm={modal.onConfirm}
        onCancel={modal.onCancel}
        isShown={isShown}
      />
    </>
  );
};

export default ButtonGroup;
