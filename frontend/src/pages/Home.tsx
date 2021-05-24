import { FC } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { UserDue } from "../redux/reducers/profileReducers/userDuesReducer";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { VictoryChart, VictoryTheme, VictoryBar, VictoryAxis } from "victory";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    home: {
      width: "100vw",
      height: "100vh",
    },
    paper: {
      position: "absolute",
      top: "15vh",
      width: "100%",
      height: "fit-content",
    },
    balance: {
      textAlign: "center",
      marginTop: "5%",
    },
    label: {
      fontSize: theme.typography.fontSize / 1.5,
      marginTop: "10%",
      marginLeft: "1%",
    },
  })
);

//Subcomponents
import Fab from "./home/Fab";
import Menu from "../components/display/Menu";

const Home: FC = () => {
  const classes = useStyles();

  const dues = useSelector<RootState>((state) => state.profile.userDues) as UserDue[];

  const reducedByUser = dues
    .reduce(
      (acc, curr) =>
        acc.some((due) => due.from === curr.from)
          ? acc.map((due) =>
              due.from === curr.from ? { ...due, balance: due.balance + curr.balance } : due
            )
          : [...acc, curr],
      [] as UserDue[]
    )
    .sort((a, b) => a.balance - b.balance)
    .slice(0, 5)
    .map((due) => ({ x: due.from, y: due.balance, label: `${due.balance} Ft` }));

  return (
    <>
      <div className={classes.home}>
        <Menu />
        <Fab />

        <Paper className={classes.paper}>
          <Typography className={classes.balance}>
            {`Your balance: ${dues.reduce((acc, curr) => acc + curr.balance, 0)} Ft`}
          </Typography>
          {dues ? (
            <>
              <Typography className={classes.label} component="p">
                Users who owe you the most:
              </Typography>
              <VictoryChart
                width={350}
                height={200}
                animate={{
                  duration: 500,
                  onLoad: { duration: 200 },
                }}
                domainPadding={{ x: 0 }}
                theme={VictoryTheme.material}
                scale={{ y: "linear" }}
              >
                <VictoryAxis />
                <VictoryBar
                  barRatio={1}
                  cornerRadius={0}
                  style={{ data: { fill: "#6DB65B" } }}
                  alignment="middle"
                  labels={(d) => d.y}
                  data={reducedByUser}
                />
              </VictoryChart>
            </>
          ) : (
            <Typography>You have no dues...</Typography>
          )}
        </Paper>
      </div>
    </>
  );
};

export default Home;
