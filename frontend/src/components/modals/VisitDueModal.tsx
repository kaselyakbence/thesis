import { FC, useState, useEffect, SetStateAction } from "react";

import { makeStyles, createStyles } from "@material-ui/core/styles";

import { useDispatch } from "react-redux";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import CustomModal from "../utils/CustomModal";

import { makeAuthorizedRequest, VisitedDue } from "../../utils/api";

const useStyles = makeStyles(() =>
  createStyles({
    modal: { width: "80vw", height: "80vh" },
    desc: {
      marginTop: "10%",
      width: "100%",
    },
    header: { width: "80%", display: "flex", justifyContent: "space-between" },
    values: { width: "100%", marginTop: "10%" },
    list: {
      marginTop: "5%",
      overflowY: "auto",
    },
  })
);

interface VisitDueModalProps {
  onClose: (value: SetStateAction<boolean>) => void;
  pubId: string;
}

const VisitDueModal: FC<VisitDueModalProps> = ({ onClose, pubId }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [visitedDue, setVisitedDue] = useState<VisitedDue | undefined>(undefined);

  useEffect(() => {
    makeAuthorizedRequest(`/dues/${pubId}/details`, "GET").then((res) =>
      res.json().then((json) => {
        if (res.status !== 200) {
          json.errors.forEach((e: any) => {
            dispatch({
              type: "ADD_MESSAGE",
              payload: { severity: "error", desciption: e.message },
            });
          });
          onClose(false);
        } else {
          setVisitedDue(json);
        }
      })
    );
  }, [pubId, onClose, dispatch]);

  const getDateString = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
  };

  return (
    <CustomModal onClose={onClose}>
      {visitedDue ? (
        <div className={classes.modal}>
          <div>
            <div className={classes.header}>
              <div>
                <Typography>{visitedDue.name}</Typography>
                <Typography>{getDateString(new Date(visitedDue.created_at))}</Typography>
              </div>
              <div>
                <Typography>{`From: ${visitedDue.owner}`}</Typography>
                <Typography>{`To:${visitedDue.receiver}`}</Typography>
              </div>
            </div>

            {visitedDue.desc ? (
              <>
                <TextField
                  className={classes.desc}
                  value={visitedDue.desc}
                  rows={4}
                  variant="standard"
                  name="desc"
                  multiline
                  disabled
                />
              </>
            ) : null}
            <div className={classes.values}>
              <Typography>{`Balance: ${visitedDue.items.reduce(
                (acc, curr) => curr.value + acc,
                0
              )} Ft`}</Typography>{" "}
            </div>
          </div>
          {visitedDue.items.length > 0 ? (
            <Table className={classes.list}>
              <TableBody>
                {visitedDue.items.map((item) => (
                  <>
                    <TableRow>
                      <TableCell align="center">{item.name}</TableCell>
                      <TableCell align="center">{`${item.value} Ft`}</TableCell>{" "}
                    </TableRow>
                  </>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Typography>This due has no items...</Typography>
          )}
        </div>
      ) : (
        <></>
      )}
    </CustomModal>
  );
};

export default VisitDueModal;
