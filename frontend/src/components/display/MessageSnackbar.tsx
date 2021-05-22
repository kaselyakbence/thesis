import { FC, useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Portal from "@material-ui/core/Portal";

import { popMessage } from "../../redux/actions/message/PopMessage";

const MessageSnackbar: FC = () => {
  const messages = useSelector((state: RootState) => state.messages);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (messages.length > 0) {
      setOpen(true);
    }
  }, [messages.length]);

  const handleClose = () => {
    setOpen(false);
    popMessage();
  };

  return (
    <>
      {messages.length > 0 ? (
        <Portal>
          <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={messages[0].severity}>
              {messages[0].desciption}
            </Alert>
          </Snackbar>
        </Portal>
      ) : (
        <></>
      )}
    </>
  );
};

export default MessageSnackbar;
