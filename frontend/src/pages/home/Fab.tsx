import { useState, Dispatch, SetStateAction } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import Modal from "@material-ui/core/Modal";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";

import AddFriendsModal from "../../components/modals/AddFriendsModal";

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

export default function OpenIconSpeedDial(): JSX.Element {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [friendModalOpen, setFriendModalOpen] = useState(false);

  const handleFabClick = (openModal: Dispatch<SetStateAction<boolean>>) => {
    setOpen(false);
    openModal(true);
  };

  return (
    <>
      <div className={classes.root}>
        <SpeedDial
          ariaLabel="SpeedDial openIcon example"
          className={classes.speedDial}
          icon={<SpeedDialIcon openIcon={<CloseIcon />} />}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
        >
          <SpeedDialAction
            key="Friends"
            icon={<ContactsIcon />}
            tooltipTitle="Friends"
            onClick={() => handleFabClick(setFriendModalOpen)}
          />
        </SpeedDial>
      </div>
      <Modal
        open={friendModalOpen}
        onClose={() => setFriendModalOpen(false)}
        aria-labelledby="Friends"
        aria-describedby="Add friends modal"
      >
        <AddFriendsModal onClose={() => setFriendModalOpen(false)} />
      </Modal>
    </>
  );
}
