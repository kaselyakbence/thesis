import { FC } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { loadUser } from "../redux/actions/profile/loadUser";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";

import Menu from "../components/display/Menu";

import { User } from "../redux/reducers/profileReducers/userReducer";

import { makeAuthorizedRequest } from "../utils/api";

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
      height: "60vh",
      width: "80vw",
    },
  })
);

const Profile: FC = () => {
  const classes = useStyles();

  const profile = useSelector<RootState>((state) => state.profile.user) as User;

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    await makeAuthorizedRequest("/profile/public/change", "PUT", {
      is_public: event.target.checked,
    });
    loadUser();
  };

  return (
    <>
      <Menu />
      <div className={classes.page}>
        <Paper className={classes.paper}>
          <Typography className={classes.padding}>{`Username: ${profile.nick_name}`}</Typography>
          <Typography className={classes.padding}>{`Email: ${profile.email}`}</Typography>
          <Typography className={classes.padding}>{`First name: ${
            profile.first_name ?? "unknown"
          }`}</Typography>
          <Typography className={classes.padding}>{`Last name: ${
            profile.last_name ?? "unknown"
          }`}</Typography>
          <Checkbox
            checked={profile.is_public ?? true}
            onChange={handleChange}
            name="public"
            color="primary"
          />
        </Paper>
      </div>
    </>
  );
};

export default Profile;
