import { useCallback, useState } from "react";
import Button from "src/components/button";
import Modal, { ModalInterface } from "src/components/modal";
import useDialogDetail from "src/hooks/useDialogDetail";
import useResponsive from "src/hooks/useResponsive";
import { DialogDetail, MessageDetail } from "src/store/dialog/types";

interface Props {
  dialogDetail?: DialogDetail;
  messages?: MessageDetail[];
}

const ButtonGroup = ({ dialogDetail, messages }: Props) => {
  const { endDialog, submitDialog, fetchDialogDetail } = useDialogDetail({
    dialogId: dialogDetail?._id,
  });

  const { isMobile } = useResponsive();

  const [modal, setModal] = useState<Omit<ModalInterface, "isShown">>({
    title: "",
    content: "",
    onConfirm: () => {},
    onCancel: () => {},
  });

  const [isShown, setIsShown] = useState<boolean>(false);

  const onConfirmEndConversation = useCallback(() => {
    endDialog(() =>
      fetchDialogDetail(() => {
        setModal({
          title: "",
          content: "Success!",
        });
        setTimeout(() => setIsShown(false), 1000);
      }),
    );
  }, [endDialog, fetchDialogDetail]);

  const onConfirmSubmitConversation = useCallback(() => {
    submitDialog(() =>
      fetchDialogDetail(() => {
        setModal({
          title: "",
          content: "Success!",
        });
        setTimeout(() => setIsShown(false), 1000);
      }),
    );
  }, [fetchDialogDetail, submitDialog]);

  const onSubmitConversation = useCallback(() => {
    setModal({
      title: "Confirm",
      content: "Are you sure to submit this conversation?",
      onConfirm: () => onConfirmSubmitConversation(),
      onCancel: () => setIsShown(false),
    });
    setIsShown(true);
  }, [onConfirmSubmitConversation]);

  const onEndConversation = useCallback(() => {
    if (!!messages && messages?.length < 2) {
      setModal({
        title: "Warning",
        content: "Unable to end this empty conversation",
        onCancel: () => setIsShown(false),
      });
      setIsShown(true);
    } else {
      setModal({
        title: "Confirm",
        content: "Are you sure to end this conversation?",
        onConfirm: () => onConfirmEndConversation(),
        onCancel: () => setIsShown(false),
      });
      setIsShown(true);
    }
  }, [messages, onConfirmEndConversation]);

  return (
    <>
      {!dialogDetail?.isEnded ? (
        <Button
          onClick={onEndConversation}
          className="bg-green-500 text-sm"
          label={
            isMobile ? <i className="fa-solid fa-check"></i> : "End Dialog"
          }
        />
      ) : !dialogDetail?.isSubmitted ? (
        <Button
          onClick={onSubmitConversation}
          className="bg-green-500"
          label={
            isMobile ? (
              <i className="fa-solid fa-file-import"></i>
            ) : (
              "Submit Dialog"
            )
          }
        />
      ) : (
        <Button
          className="bg-green-500"
          label={<i className="fa-regular fa-circle-check"></i>}
        />
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
