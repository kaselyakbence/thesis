import { FC, SetStateAction } from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { useSelector } from "react-redux";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import IconButton from "@material-ui/core/IconButton";

import CustomModal from "../utils/CustomModal";

import { RootState } from "../../redux/store";

import { Notification } from "../../redux/reducers/profileReducers/notificationsReducer";

import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";

import { makeAuthorizedRequest } from "../../utils/api";
import { EventType } from "../../redux/reducers/profileReducers/notificationsReducer";
import { loadNotifications } from "../../redux/actions/profile/loadNotifications";
import { loadFriends } from "../../redux/actions/profile/loadFriends";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    events_text: {
      minWidth: "150px",
      width: "fit-content",
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

  const notifications = useSelector<RootState>(
    (state) => state.profile.notifications
  ) as Notification[];

  const handleAccept = async (pubId: string, event?: EventType) => {
    await makeAuthorizedRequest(`/events/${pubId}/accept`, "GET");
    loadNotifications();
    switch (event) {
      case "FRIEND_REQUEST":
        loadFriends();
        break;
    }
  };

  const handleReject = async (pubId: string) => {
    await makeAuthorizedRequest(`/events/${pubId}/reject`, "GET");
    loadNotifications();
  };

  return (
    <CustomModal onClose={onClose}>
      <List>
        <>
          {notifications.length === 0 ? (
            <ListItem>
              <ListItemText className={classes.no_events}>No notifications found...</ListItemText>
            </ListItem>
          ) : null}
          {notifications.some((notification) => notification.type === "FRIEND_REQUEST")
            ? notifications.map((notification) =>
                notification.type === "FRIEND_REQUEST" ? (
                  <ListItem key={notification.pubId}>
                    <ListItemText
                      className={classes.events_text}
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
        </>
      </List>
    </CustomModal>
  );
};

export default EventModal;