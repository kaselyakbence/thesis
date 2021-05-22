import { FC, useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { UserDue } from "../redux/reducers/profileReducers/userDuesReducer";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import Modal from "@material-ui/core/Modal";
import Table from "@material-ui/core/Table";
import Divider from "@material-ui/core/Divider";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

import Menu from "../components/display/Menu";

import AddDueModal from "../components/modals/AddDueModal";
import VisitDueModal from "../components/modals/VisitDueModal";

import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";

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
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      backgroundColor: theme.palette.success.main,
    },
    add_icon: {
      color: theme.palette.common.white,
    },
    no_friends: {
      height: "100vh",
      marginTop: "5%",
      textAlign: "center",
    },
  })
);

const Dues: FC = () => {
  const classes = useStyles();

  const dues = useSelector<RootState>((state) => state.profile.userDues) as UserDue[];

  const [dueModalOpen, setDueModalOpen] = useState(false);

  const [visitDueModalOpen, setVisitDueModalOpen] = useState(false);
  const [visitedDue, setVisitedDue] = useState("");

  const [query, setQuery] = useState("");
  const [filteredDues, setFilteredDues] = useState(dues);

  useEffect(() => {
    setFilteredDues(dues.filter((due) => due.name.includes(query)));
  }, [query, dues]);

  const openVisitedDue = (pubId: string) => {
    setVisitedDue(pubId);
    setVisitDueModalOpen(true);
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
        {dues.length > 0 ? (
          <Table>
            {filteredDues.map((due, i) => (
              <TableRow key={i} onClick={() => openVisitedDue(due.pubId)}>
                <TableCell align="center">{due.name}</TableCell>
                <TableCell align="center">{due.from}</TableCell>
                <TableCell align="center">{`${due.balance} Ft`}</TableCell>
              </TableRow>
            ))}
          </Table>
        ) : null}
      </div>
      <IconButton className={classes.add_button} onClick={() => setDueModalOpen(true)}>
        <AddIcon className={classes.add_icon} />
      </IconButton>
      <Modal
        open={dueModalOpen}
        onClose={() => setDueModalOpen(false)}
        aria-labelledby="Choose user"
        aria-describedby="Choose user that receives the due"
      >
        <AddDueModal onClose={() => setDueModalOpen(false)} />
      </Modal>
      <Modal
        open={visitDueModalOpen}
        onClose={() => setVisitDueModalOpen(false)}
        aria-labelledby="Visit"
        aria-describedby="Visit a due modal"
      >
        <VisitDueModal pubId={visitedDue} onClose={() => setVisitDueModalOpen(false)} />
      </Modal>
    </>
  );
};

export default Dues;
