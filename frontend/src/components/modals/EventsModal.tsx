import { FC, SetStateAction, useState } from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { useSelector } from "react-redux";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import IconButton from "@material-ui/core/IconButton";
import Modal from "@material-ui/core/Modal";

import CustomModal from "../utils/CustomModal";

import { RootState } from "../../redux/store";

import { Notification, EventType } from "../../redux/reducers/profileReducers/notificationsReducer";

import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";

import { acceptNotification } from "../../redux/actions/profile/notifications/acceptNotification";
import { rejectNotification } from "../../redux/actions/profile/notifications/rejectNotifications";

import VisitModal from "./VisitModal";
import VisitDueModal from "./VisitDueModal";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    events_text: {
      minWidth: "150px",
      width: "fit-content",
    },
    list: {
      height: "80vh",
      overflowY: "auto",
    },
    no_events: {
      minWidth: "200px",
      width: "fit-content",
    },
    accept_icon: {
      marginLeft: "10px",
      color: theme.palette.success.main,
    },
    reject_icon: {
      color: theme.palette.error.main,
    },
  })
);

interface EventsModalProps {
  onClose: (value: SetStateAction<boolean>) => void;
}

const EventModal: FC<EventsModalProps> = ({ onClose }) => {
  const classes = useStyles();

  const [visitModalOpen, setVisitModalOpen] = useState(false);
  const [visited, setVisited] = useState("");

  const [dueModalOpen, setDueModalOpen] = useState(false);
  const [visitedDue, setVisitedDue] = useState("");

  const notifications = useSelector<RootState>(
    (state) => state.profile.notifications
  ) as Notification[];

  const handleAccept = async (pubId: string, event?: EventType) => {
    acceptNotification(pubId, event);
  };

  const handleReject = async (pubId: string) => {
    rejectNotification(pubId);
  };

  const openVisited = (pubId: string) => {
    setVisited(pubId);
    setVisitModalOpen(true);
  };

  const openVisitedDue = (pubId: string) => {
    setVisitedDue(pubId);
    setDueModalOpen(true);
  };

  return (
    <>
      <CustomModal onClose={onClose}>
        <List className={classes.list}>
          <>
            {notifications.length === 0 ? (
              <ListItem>
                <ListItemText className={classes.no_events}>No notifications found...</ListItemText>
              </ListItem>
            ) : null}
            {/* Display friend requests */}
            {notifications.some((notification) => notification.type === "FRIEND_REQUEST")
              ? notifications.map((notification) =>
                  notification.type === "FRIEND_REQUEST" ? (
                    <ListItem key={notification.pubId}>
                      <ListItemText
                        className={classes.events_text}
                        onClick={() => openVisited(notification.from)}
                      >{`Friend request from: ${notification.from}`}</ListItemText>
                      <ListItemIcon>
                        <IconButton
                          onClick={() => handleAccept(notification.pubId, notification.type)}
                        >
                          <CheckIcon className={classes.accept_icon} />
                        </IconButton>
                      </ListItemIcon>
                      <ListItemIcon>
                        <IconButton onClick={() => handleReject(notification.pubId)}>
                          <ClearIcon className={classes.reject_icon} />
                        </IconButton>
                      </ListItemIcon>
                    </ListItem>
                  ) : null
                )
              : null}
            {notifications.some((notification) => notification.type === "LENT_REQUEST")
              ? notifications.map((notification) =>
                  notification.type === "LENT_REQUEST" ? (
                    <ListItem key={notification.pubId}>
                      <ListItemText
                        className={classes.events_text}
                        onClick={() => {
                          openVisitedDue(notification.payload ?? "");
                        }}
                      >{`You owe money to: ${notification.from}`}</ListItemText>
                      <ListItemIcon>
                        <IconButton
                          onClick={() => handleAccept(notification.pubId, notification.type)}
                        >
                          <CheckIcon className={classes.accept_icon} />
                        </IconButton>
                      </ListItemIcon>
                      <ListItemIcon>
                        <IconButton onClick={() => handleReject(notification.pubId)}>
                          <ClearIcon className={classes.reject_icon} />
                        </IconButton>
                      </ListItemIcon>
                    </ListItem>
                  ) : null
                )
              : null}
          </>
        </List>
      </CustomModal>
      <Modal
        open={visitModalOpen}
        onClose={() => setVisitModalOpen(false)}
        aria-labelledby="Visit"
        aria-describedby="Visit a user modal"
      >
        <VisitModal nick_name={visited} onClose={() => setVisitModalOpen(false)} />
      </Modal>
      <Modal
        open={dueModalOpen}
        onClose={() => setDueModalOpen(false)}
        aria-labelledby="Visit"
        aria-describedby="Visit a due modal"
      >
        <VisitDueModal pubId={visitedDue} onClose={() => setDueModalOpen(false)} />
      </Modal>
    </>
  );
};

export default EventModal;
