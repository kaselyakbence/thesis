import { FC, useState, useEffect, SyntheticEvent } from "react";

import { useSelector, useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { RootState } from "../../redux/store";

import Modal from "@material-ui/core/Modal";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Badge from "@material-ui/core/Badge";

import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import NotificationsIcon from "@material-ui/icons/Notifications";

import EventsModal from "../modals/EventsModal";

import MessageSnackBar from "./MessageSnackbar";

import { User } from "../../redux/reducers/profileReducers/userReducer";
import { logout } from "../../redux/actions/jwt/logoutAction";
import { loadNotifications } from "../../redux/actions/profile/notifications/loadNotifications";
import { loadFriends } from "../../redux/actions/profile/loadFriends";
import { loadDues } from "../../redux/actions/profile/loadDues";
import { loadUser } from "../../redux/actions/profile/loadUser";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appbar: {
      display: "flex",
      justifyItems: "space-between",
      alignItems: "space-between",
    },
    menuButton: {
      marginRight: theme.spacing(1),
    },
    notifications: {
      marginRight: "-8px",
      marginTop: "5px",
    },
    menuHeader: {
      marginTop: "5%",

      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    menuHeaderText: {
      textAlign: "center",
    },
    title: {
      flexGrow: 1,
    },
    logout: {
      marginRight: "10px",
    },
  })
);

const Menu: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [eventsModalOpen, setEventsModalOpen] = useState(false);

  const [open, setOpen] = useState(false);

  const notificationsSum = useSelector<RootState>(
    (state) => state.profile.notifications.length
  ) as number;
  const friensSum = useSelector<RootState>((state) => state.profile.friends.length) as number;
  const duesNum = useSelector<RootState>((state) => state.profile.userDues.length) as number;

  const profile = useSelector<RootState>((state) => state.profile.user) as User;

  useEffect(() => {
    loadUser();
    loadDues();
    loadFriends();
    loadNotifications();
  }, []);

  const toggleDrawer = (event: SyntheticEvent<any, Event>, isOpen: boolean) => {
    if (
      event &&
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setOpen(isOpen);
  };

  return (
    <>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={(e) => toggleDrawer(e, true)}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.title} />
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            className={classes.notifications}
            onClick={() => setEventsModalOpen(true)}
          >
            {notificationsSum > 0 ? (
              <Badge badgeContent={notificationsSum} color="error">
                <NotificationsIcon />
              </Badge>
            ) : (
              <NotificationsIcon />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        anchor="left"
        open={open}
        onClose={(e) => toggleDrawer(e, false)}
        onOpen={(e) => toggleDrawer(e, true)}
      >
        <List>
          <ListItem className={classes.menuHeader} onClick={() => dispatch(push("/profile"))}>
            <ListItemText
              className={classes.menuHeaderText}
              primary={profile.nick_name ?? "Loading..."}
            />
          </ListItem>
          <Divider />
          <ListItem onClick={() => dispatch(push("/"))}>
            <ListItemText primary={"Home"} className={classes.logout} />
          </ListItem>
          <ListItem onClick={() => dispatch(push("/dues"))}>
            <ListItemText primary={"Dues"} secondary={`${duesNum} dues`} />
          </ListItem>
          <ListItem onClick={() => dispatch(push("/friends"))}>
            <ListItemText primary={"Friends"} secondary={`${friensSum} friends`} />
          </ListItem>
          <ListItem onClick={logout}>
            <ListItemText primary={"Logout"} className={classes.logout} />
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <Modal
        open={eventsModalOpen}
        onClose={() => setEventsModalOpen(false)}
        aria-labelledby="Friends"
        aria-describedby="Add friends modal"
      >
        <EventsModal onClose={() => setEventsModalOpen(false)} />
      </Modal>
      <MessageSnackBar />
    </>
  );
};

export default Menu;
