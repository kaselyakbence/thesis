import { FC } from "react";

import { Link } from "react-router-dom";

import { useFormik } from "formik";
import * as yup from "yup";

import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";

import MessageSnackbar from "../components/info/MessageSnackbar";

import { login } from "../redux/actions/jwt/loginAction";

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
    marginTop: "40%",
    fontSize: "1.2rem",

    [theme.breakpoints.up("md")]: {
      marginTop: "10%",
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

const loginValidationSchema = yup.object({
  nick_name: yup.string().required("Username is required"),
  password: yup
    .string()
    .min(4, "Password should be of minimum 4 characters length")
    .required("Password is required"),
});

const Login: FC = () => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      nick_name: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { setSubmitting, setValues, resetForm }) => {
      login(values);

      setSubmitting(false);
      setValues({
        nick_name: "",
        password: "",
      });
      resetForm();
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
            label="Username"
            className={classes.fields}
            inputProps={{ className: classes.inputs }}
            value={formik.values.nick_name}
            onChange={formik.handleChange}
            error={formik.touched.nick_name && Boolean(formik.errors.nick_name)}
            helperText={formik.touched.nick_name && formik.errors.nick_name}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            className={classes.fields}
            inputProps={{ className: classes.inputs }}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            color="primary"
            className={clsx(classes.submit, classes.inputs)}
            variant="contained"
            fullWidth
            type="submit"
          >
            Login
          </Button>
          <p className={classes.fields}>- or -</p>
          <Link to="/register" className={classes.link}>
            <Button
              color="secondary"
              className={clsx(classes.fields, classes.inputs)}
              variant="contained"
              fullWidth
            >
              Register
            </Button>
          </Link>
        </form>
      </Container>
      <MessageSnackbar />
    </>
  );
};

export default Login;
