import { FC, SetStateAction } from "react";

import { makeStyles, createStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";

import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      padding: "10px",
    },
    close: {
      position: "absolute",
      top: "5px",
      right: "5px",
    },
    body: {
      marginTop: "30px",
    },
  })
);

interface CustomModalProps {
  onClose?: (value: SetStateAction<boolean>) => void;
  children: JSX.Element[] | JSX.Element;
}

const CustomModal: FC<CustomModalProps> = ({ onClose, children }) => {
  const classes = useStyles();

  return (
    <Paper elevation={3} className={classes.paper}>
      {onClose ? (
        <IconButton className={classes.close} onClick={() => onClose(false)}>
          <CloseIcon />
        </IconButton>
      ) : null}
      <div className={classes.body}>{children}</div>
    </Paper>
  );
};

export default CustomModal;
