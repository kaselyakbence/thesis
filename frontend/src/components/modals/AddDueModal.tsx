import { FC, useState, SetStateAction } from "react";

import { useFormik } from "formik";
import * as yup from "yup";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import ChooseUserModal from "./ChooseUserModal";

import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import Divider from "@material-ui/core/Divider";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import CustomModal from "../utils/CustomModal";

import { addDue } from "../../redux/actions/dues/addDueAction";
import { loadDues } from "../../redux/actions/profile/loadDues";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      width: "80vw",
      height: "90vh",
    },
    nick_name: { marginTop: "10%" },
    button: { padding: "0" },
    save: { position: "absolute", top: "5px", left: "5px" },
    name: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
    },
    desc: {
      marginTop: "5%",
      width: "100%",
    },
    add_item: {
      marginTop: "10%",

      width: "100%",
      display: "flex",
    },
    list: {
      overflowY: "auto",
    },
    success: {
      color: theme.palette.success.main,
    },
    error: {
      color: theme.palette.error.main,
    },
    edit: {
      color: theme.palette.warning.main,
    },
  })
);

const dueValidationSchema = yup.object({
  nick_name: yup.string().required("User is required"),
  name: yup
    .string()
    .min(3, "Name must be atleast 3 character")
    .max(15, "Name must be max 15 character")
    .required("Name is required"),
  desc: yup
    .string()
    .min(5, "Description must be atleast 5 character")
    .max(50, "Description must be max 50 character"),
});

const itemValidationSchema = yup.object({
  name: yup.string().required("Name must be a string"),
  value: yup.number().required("Value is required"),
});

interface EventsModalProps {
  onClose: (value: SetStateAction<boolean>) => void;
}

const EventModal: FC<EventsModalProps> = ({ onClose }) => {
  const classes = useStyles();

  const [descOpen, setDescOpen] = useState(false);

  const [chooseUserModalOpen, setChooseUserModalOpen] = useState(false);

  const [items, setItems] = useState<{ id: number; value: number; name: string }[]>([]);

  const formik = useFormik({
    initialValues: {
      name: "",
      nick_name: "",
      desc: undefined,
    },
    validationSchema: dueValidationSchema,
    onSubmit: async (values) => {
      addDue({ ...values, items });
      onClose(false);
      loadDues();
    },
  });

  const subFormik = useFormik({
    initialValues: {
      name: "",
      value: 0,
    },
    validationSchema: itemValidationSchema,
    onSubmit: async (values, { setValues, setErrors }) => {
      setItems([...items, { ...values, id: items.length }]);
      setValues({ name: "", value: 0 });
      setErrors({});
    },
  });

  const chooseUser = (user: string) => {
    formik.setFieldValue("nick_name", user);
    setChooseUserModalOpen(false);
  };

  return (
    <>
      <CustomModal onClose={onClose}>
        <div className={classes.form}>
          <form onSubmit={formik.handleSubmit}>
            <IconButton className={classes.save} onClick={formik.submitForm}>
              <SaveIcon />
            </IconButton>
            <TextField
              name="nick_name"
              placeholder="User"
              className={classes.nick_name}
              value={formik.values.nick_name}
              onChange={formik.handleChange}
              error={formik.touched.nick_name && Boolean(formik.errors.nick_name)}
              helperText={formik.touched.nick_name && formik.errors.nick_name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      className={classes.button}
                      onClick={() => setChooseUserModalOpen(true)}
                    >
                      <EditIcon className={classes.edit} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              disabled
            />

            <div className={classes.name}>
              <TextField
                label="Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              {descOpen ? (
                <>
                  <IconButton onClick={() => setDescOpen(false)}>
                    <ArrowDropUpIcon />
                  </IconButton>
                </>
              ) : (
                <IconButton onClick={() => setDescOpen(true)}>
                  <ArrowDropDownIcon />
                </IconButton>
              )}
            </div>
            {descOpen ? (
              <>
                <Divider />
                <TextField
                  label="Description"
                  className={classes.desc}
                  value={formik.values.desc}
                  onChange={formik.handleChange}
                  error={formik.touched.desc && Boolean(formik.errors.desc)}
                  helperText={formik.touched.desc && formik.errors.desc}
                  rows={4}
                  variant="outlined"
                  name="desc"
                  multiline
                />
              </>
            ) : null}
          </form>
          <form className={classes.add_item} onSubmit={subFormik.handleSubmit}>
            <TextField
              label="Name"
              name="name"
              value={subFormik.values.name}
              onChange={subFormik.handleChange}
              error={subFormik.touched.name && Boolean(subFormik.errors.name)}
            />
            <TextField
              label="Value"
              name="value"
              type="number"
              value={subFormik.values.value}
              onChange={subFormik.handleChange}
              error={subFormik.touched.value && Boolean(subFormik.errors.value)}
            />
            <IconButton onClick={subFormik.submitForm}>
              <AddIcon className={classes.success} />
            </IconButton>
          </form>
          <Table className={classes.list}>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell align="right">{item.name}</TableCell>
                  <TableCell align="right">{`${item.value} Ft`}</TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <DeleteIcon className={classes.error} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CustomModal>
      <Modal
        open={chooseUserModalOpen}
        onClose={() => setChooseUserModalOpen(false)}
        aria-labelledby="Choose user"
        aria-describedby="Choose user that receives the due"
      >
        <ChooseUserModal chooseUser={chooseUser} onClose={() => setChooseUserModalOpen(false)} />
      </Modal>
    </>
  );
};

export default EventModal;
