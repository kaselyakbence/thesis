import { FC, SetStateAction } from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      padding: "10px",
    },
    header: {
      height: "10%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    header_text: {
      marginLeft: "auto",
      transform: "translate(40%, 0)",
      fontSize: theme.typography.fontSize * 1.4,
    },
    close: {
      marginLeft: "auto",
      /* position: "absolute",
      top: "5px",
      right: "5px",*/
    },
    body: {
      marginTop: "10px",
    },
  })
);

interface CustomModalProps {
  name?: string;
  onClose?: (value: SetStateAction<boolean>) => void;
  children: JSX.Element[] | JSX.Element;
}

const CustomModal: FC<CustomModalProps> = ({ name, onClose, children }) => {
  const classes = useStyles();

  return (
    <Paper elevation={3} className={classes.paper}>
      <div className={classes.header}>
        {name ? <Typography className={classes.header_text}>{name}</Typography> : null}
        {onClose ? (
          <IconButton className={classes.close} onClick={() => onClose(false)}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </div>
      <div className={classes.body}>{children}</div>
    </Paper>
  );
};

export default CustomModal;
