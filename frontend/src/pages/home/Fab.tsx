import { useState, Dispatch, SetStateAction } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import Modal from "@material-ui/core/Modal";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";

import AddFriendsModal from "../../components/modals/AddFriendsModal";
import AddDueModal from "../../components/modals/AddDueModal";

import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import CloseIcon from "@material-ui/icons/Close";
import ContactsIcon from "@material-ui/icons/Contacts";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
// import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100vh",
      transform: "translateZ(50%)",
      flexGrow: 1,
    },
    speedDial: {
      position: "absolute",
      bottom: theme.spacing(4),
      right: theme.spacing(2),
    },
    fab: {
      width: theme.typography.fontSize * 3.5,
      height: theme.typography.fontSize * 3.5,
    },

    openIcon: {
      width: theme.typography.fontSize * 1.5,
      height: theme.typography.fontSize * 1.5,
    },
  })
);

export default function OpenIconSpeedDial(): JSX.Element {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [friendModalOpen, setFriendModalOpen] = useState(false);
  const [dueModalOpen, setDueModalOpen] = useState(false);

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
          classes={{ fab: classes.fab }}
          icon={
            <SpeedDialIcon
              classes={{
                icon: classes.openIcon,
                iconOpen: classes.openIcon,
                openIconOpen: classes.openIcon,
                iconWithOpenIconOpen: classes.openIcon,
                openIcon: classes.openIcon,
              }}
              openIcon={<CloseIcon /*fontSize="large"*/ />}
            />
          }
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
        >
          <SpeedDialAction
            key="Friends"
            classes={{ fab: classes.fab }}
            icon={<ContactsIcon />}
            tooltipTitle="Friends"
            onClick={() => handleFabClick(setFriendModalOpen)}
          />
          <SpeedDialAction
            key="Dues"
            classes={{ fab: classes.fab }}
            icon={<AttachMoneyIcon />}
            tooltipTitle="Dues"
            onClick={() => handleFabClick(setDueModalOpen)}
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
      <Modal
        open={dueModalOpen}
        onClose={() => setDueModalOpen(false)}
        aria-labelledby="Friends"
        aria-describedby="Add friends modal"
      >
        <AddDueModal onClose={() => setDueModalOpen(false)} />
      </Modal>
    </>
  );
}
