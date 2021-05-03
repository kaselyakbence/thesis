import { FC } from "react";

import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    home: {
      width: "100vw",
      height: "100vh",
    },
  })
);

//Subcomponents
import Fab from "./home/Fab";
import Menu from "../components/display/Menu";

const Home: FC = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.home}>
        <Menu />
        <Fab />
      </div>
    </>
  );
};

export default Home;
