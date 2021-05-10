import { FC, useState, SetStateAction, useEffect } from "react";

import { makeStyles, createStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import CustomModal from "../utils/CustomModal";

import { makeAuthorizedRequest, VisitedUser } from "../../utils/api";

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      width: "85vw",
      height: "60vh",
    },
  })
);

interface EventsModalProps {
  nick_name: string;
  onClose: (value: SetStateAction<boolean>) => void;
}

const VisitModal: FC<EventsModalProps> = ({ nick_name, onClose }) => {
  const classes = useStyles();

  const [user, setUser] = useState<VisitedUser | null>(null);

  useEffect(() => {
    makeAuthorizedRequest(`/users/${nick_name}/visit`, "GET").then((result) =>
      result.json().then((res) => setUser(res))
    );
  }, [nick_name]);

  return (
    <CustomModal onClose={onClose}>
      <Container className={classes.modal}>
        {user ? (
          <>
            <Typography component="header">{user.nick_name}</Typography>
            <Typography component="address">{user.email}</Typography>
            <Divider />
            {user.is_public ? (
              <>
                <Typography component="address">{`Firstname:${
                  user.first_name ?? "unknown"
                }`}</Typography>
                <Typography component="address">{`Lastname:${
                  user.last_name ?? "unknown"
                }`}</Typography>
                <Divider />
                {user.friends.length > 0 ? (
                  <List>
                    {user.friends.map((friend, i) => (
                      <ListItem key={i}>
                        <ListItemText>{friend.nick_name}</ListItemText>
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography component="address">This user has no friends :c</Typography>
                )}
              </>
            ) : (
              <Typography component="address">This is a private user</Typography>
            )}
          </>
        ) : (
          <Grid xs={12} item>
            <Typography component="h1">User not found...</Typography>
          </Grid>
        )}
      </Container>
    </CustomModal>
  );
};

export default VisitModal;
