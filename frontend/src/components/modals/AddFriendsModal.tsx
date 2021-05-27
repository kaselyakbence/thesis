import { FC, useState, useEffect, SetStateAction } from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import IconButton from "@material-ui/core/IconButton";

import CustomModal from "../utils/CustomModal";

import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";

import VisitModal from "./VisitModal";

import { makeAuthorizedRequest } from "../../utils/api";
import { addFriend } from "../../redux/actions/user/addFriend";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    list: {
      height: "60vh",
      width: "70vw",
      overflowY: "auto",
    },
  })
);

interface AddFriendsModalProps {
  onClose: (value: SetStateAction<boolean>) => void;
}

const AddFriendsModal: FC<AddFriendsModalProps> = ({ onClose }) => {
  const classes = useStyles();

  const [visitModalOpen, setVisitModalOpen] = useState(false);
  const [user, setUser] = useState("");

  const [query, setQuery] = useState("");
  const [options, setOptions] = useState<{ nick_name: string }[]>([]);

  useEffect(() => {
    makeAuthorizedRequest("/users/search", "POST", { query, no_friends: true }).then((res) =>
      res.json().then((json) => setOptions(json))
    );
  }, [query]);

  const handleClick = (user: string) => {
    setUser(user);
    setVisitModalOpen(true);
  };

  return (
    <>
      <CustomModal onClose={onClose}>
        <div>
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
          <List className={classes.list}>
            {options.map((user) => (
              <ListItem key={user.nick_name}>
                <ListItemText
                  primary={user.nick_name}
                  onClick={() => handleClick(user.nick_name)}
                />
                <ListItemIcon onClick={() => addFriend(user.nick_name)}>
                  <IconButton>
                    <AddIcon />
                  </IconButton>
                </ListItemIcon>
              </ListItem>
            ))}
          </List>
        </div>
      </CustomModal>
      <Modal
        open={visitModalOpen}
        onClose={() => setVisitModalOpen(false)}
        aria-labelledby="Visit"
        aria-describedby="Visit user modal"
      >
        <VisitModal nick_name={user} onClose={() => setVisitModalOpen(false)} />
      </Modal>
    </>
  );
};

export default AddFriendsModal;
