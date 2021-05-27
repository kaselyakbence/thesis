import { FC } from "react";

import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

import { useFormik } from "formik";
import * as yup from "yup";

import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";

import MessageSnackbar from "../components/display/MessageSnackbar";

import { register } from "../redux/actions/jwt/registerAction";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "80vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "0",
    fontSize: "1.2rem",

    [theme.breakpoints.up("md")]: {
      width: "40%",
    },
  },
  link: {
    width: "100%",
  },
  fields: {
    marginTop: "5%",
  },
  submit: {
    marginTop: "15%",
  },
  inputs: {
    fontSize: "1.25rem",
    [theme.breakpoints.up("md")]: {
      fontSize: "1.75rem",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "1.2rem",
    },
  },
}));

const registerValidationSchema = yup.object({
  nick_name: yup.string().required("Username is required"),
  email: yup.string().email("Email must be valid").required("Email is required"),
  first_name: yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets characters are allowed"),
  ast_name: yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets characters are allowed"),
  password: yup
    .string()
    .min(4, "Password must be minimum 4 characters")
    .required("Password is required"),
  password2: yup
    .string()
    .min(4, "Password must be minimum 4 characters")
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password is required"),
});

const Register: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      nick_name: "",
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      password2: "",
    },
    validationSchema: registerValidationSchema,
    onSubmit: async (values) => {
      await register(values);
    },
  });

  return (
    <>
      <Container className={classes.container}>
        <form onSubmit={formik.handleSubmit} className={classes.form}>
          <TextField
            fullWidth
            id="nick_name"
            name="nick_name"
            label="Username*"
            className={classes.fields}
            inputProps={{ className: classes.inputs }}
            value={formik.values.nick_name}
            onChange={formik.handleChange}
            error={formik.touched.nick_name && Boolean(formik.errors.nick_name)}
            helperText={formik.touched.nick_name && formik.errors.nick_name}
          />
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email*"
            className={classes.fields}
            inputProps={{ className: classes.inputs }}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            id="first_name"
            name="first_name"
            label="First name"
            className={classes.fields}
            inputProps={{ className: classes.inputs }}
            value={formik.values.first_name}
            onChange={formik.handleChange}
            error={formik.touched.first_name && Boolean(formik.errors.first_name)}
            helperText={formik.touched.first_name && formik.errors.first_name}
          />
          <TextField
            fullWidth
            id="last_name"
            name="last_name"
            label="Last name"
            className={classes.fields}
            inputProps={{ className: classes.inputs }}
            value={formik.values.last_name}
            onChange={formik.handleChange}
            error={formik.touched.last_name && Boolean(formik.errors.last_name)}
            helperText={formik.touched.last_name && formik.errors.last_name}
          />

          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password*"
            type="password"
            className={classes.fields}
            inputProps={{ className: classes.inputs }}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            fullWidth
            id="password2"
            name="password2"
            label="Password again*"
            type="password"
            className={classes.fields}
            inputProps={{ className: classes.inputs }}
            value={formik.values.password2}
            onChange={formik.handleChange}
            error={formik.touched.password2 && Boolean(formik.errors.password2)}
            helperText={formik.touched.password2 && formik.errors.password2}
          />
          <Button
            color="secondary"
            className={clsx(classes.submit, classes.inputs)}
            variant="contained"
            fullWidth
            type="submit"
          >
            Register
          </Button>
          <p className={classes.fields}>- or -</p>

          <Button
            color="primary"
            className={clsx(classes.fields, classes.inputs)}
            variant="contained"
            fullWidth
            onClick={() => dispatch(push("/login"))}
          >
            Login
          </Button>
        </form>
      </Container>
      <MessageSnackbar />
    </>
  );
};

export default Register;
