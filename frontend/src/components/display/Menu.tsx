import { FC, useState, SyntheticEvent } from "react";

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

import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import NotificationsIcon from "@material-ui/icons/Notifications";
//import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";

import { logout } from "../../redux/actions/jwt/logoutAction";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appbar: {
      display: "flex",
      justifyItems: "space-between",
      alignItems: "space-between",
    },
    menuButton: {
      marginRight: theme.spacing(2),
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

  const [open, setOpen] = useState(false);

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
          <IconButton edge="end" color="inherit" aria-label="menu">
            <NotificationsIcon />
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
          <ListItem>
            <ListItemText primary={"Profile"} />
          </ListItem>
          <Divider />
          <ListItem onClick={logout}>
            <ListItemText primary={"Logout"} className={classes.logout} />
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
          </ListItem>
        </List>
      </SwipeableDrawer>
    </>
  );
};

export default Menu;
