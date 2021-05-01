import { useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";

import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import CloseIcon from "@material-ui/icons/Close";
import ContactsIcon from "@material-ui/icons/Contacts";
// import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "absolute",
      bottom: "1vh",
      right: "1vw",
      transform: "translateZ(0px)",
      flexGrow: 1,
    },
    speedDial: {
      position: "absolute",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  })
);

const actions = [{ icon: <ContactsIcon />, name: "Friends" }];

export default function OpenIconSpeedDial(): JSX.Element {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        className={classes.speedDial}
        icon={<SpeedDialIcon openIcon={<CloseIcon />} />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={handleClose}
          />
        ))}
      </SpeedDial>
    </div>
  );
}
