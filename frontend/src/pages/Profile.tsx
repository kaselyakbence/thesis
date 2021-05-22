import { FC } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import Menu from "../components/display/Menu";

import { User } from "../redux/reducers/profileReducers/userReducer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    padding: { marginLeft: theme.spacing(2), marginTop: theme.spacing(2) },
    page: {
      height: "100vh",
      overflowY: "auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      height: "75vh",
      width: "80vw",
    },
    balance: {
      marginTop: "25%",
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
    balance_text: {
      fontSize: "1.4rem",
    },
  })
);

const Profile: FC = () => {
  const classes = useStyles();

  const profile = useSelector<RootState>((state) => state.profile.user) as User;

  return (
    <>
      <Menu />
      <div className={classes.page}>
        <Paper className={classes.paper}>
          <Typography className={classes.padding}>{`Nick name: ${profile.nick_name}`}</Typography>
          <Typography className={classes.padding}>{`Email: ${profile.email}`}</Typography>
          <Typography className={classes.padding}>{`First name: ${
            profile.first_name ?? "unknown"
          }`}</Typography>
          <Typography className={classes.padding}>{`Last name: ${
            profile.last_name ?? "unknown"
          }`}</Typography>
          <div className={classes.balance}>
            <Typography
              className={classes.balance_text}
            >{`Your balance: ${profile.balance} Ft`}</Typography>
          </div>
        </Paper>
      </div>
    </>
  );
};

export default Profile;