import { FC, useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Friend } from "../redux/reducers/profileReducers/friendsReducer";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import Modal from "@material-ui/core/Modal";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import InputAdornment from "@material-ui/core/InputAdornment";

import Menu from "../components/display/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";

import AddFriendsModal from "../components/modals/AddFriendsModal";
import VisitModal from "../components/modals/VisitModal";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    page: { backgroundColor: theme.palette.background.paper, height: "100vh", overflowY: "auto" },
    header: { width: "100%", display: "flex", justifyContent: "center" },
    list: {
      position: "relative",
      minHeight: "90vh",
      marginLeft: "5%",
    },
    add_button: {
      position: "absolute",
      bottom: theme.spacing(4),
      right: theme.spacing(2),
      backgroundColor: theme.palette.success.main,
      width: theme.typography.fontSize * 3.5,
      height: theme.typography.fontSize * 3.5,
    },
    add_icon: {
      color: theme.palette.common.white,
      width: theme.typography.fontSize * 2,
      height: theme.typography.fontSize * 2,
    },
    no_friends: {
      height: "100vh",
      marginTop: "5%",
      textAlign: "center",
    },
  })
);

const Friends: FC = () => {
  const classes = useStyles();

  const friends = useSelector<RootState>((state) => state.profile.friends) as Friend[];

  const [query, setQuery] = useState("");

  const [addFriendModalOpen, setAddFriendModalOpen] = useState(false);
  const [visitModalOpen, setVisitModalOpen] = useState(false);
  const [user, setUser] = useState("");

  const [queryedFriends, setQueryedFriends] = useState(friends);

  useEffect(() => {
    setQueryedFriends(friends.filter((friend) => friend.nick_name.includes(query)));
  }, [query, friends]);

  const handleClick = (chosenUser: string) => {
    setUser(chosenUser);
    setVisitModalOpen(true);
  };

  return (
    <>
      <Menu />
      <div className={classes.page}>
        <div className={classes.header}>
          <TextField
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={classes.margin}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <Divider />
        {queryedFriends.length > 0 ? (
          <>
            <List className={classes.list}>
              {queryedFriends.map((friend, i) => (
                <ListItem key={i}>
                  <ListItemText
                    primary={friend.nick_name}
                    onClick={() => handleClick(friend.nick_name)}
                  />
                </ListItem>
              ))}
            </List>
          </>
        ) : (
          <Typography className={classes.no_friends} component="address">
            You have no friends
          </Typography>
        )}
      </div>
      <IconButton className={classes.add_button} onClick={() => setAddFriendModalOpen(true)}>
        <AddIcon className={classes.add_icon} />
      </IconButton>
      <Modal
        open={addFriendModalOpen}
        onClose={() => setAddFriendModalOpen(false)}
        aria-labelledby="Friends"
        aria-describedby="Add friends modal"
      >
        <AddFriendsModal onClose={() => setAddFriendModalOpen(false)} />
      </Modal>
      <Modal
        open={visitModalOpen}
        onClose={() => setVisitModalOpen(false)}
        aria-labelledby="Visit"
        aria-describedby="Visit friends modal"
      >
        <VisitModal nick_name={user} onClose={() => setVisitModalOpen(false)} />
      </Modal>
    </>
  );
};

export default Friends;
