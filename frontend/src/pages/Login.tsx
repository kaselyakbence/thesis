import { FC } from "react";

import { Link } from "react-router-dom";

import { useFormik } from "formik";
import * as yup from "yup";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { login } from "../redux/actions/loginAction";

const loginValidationSchema = yup.object({
  nick_name: yup.string().required("Username is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 4 characters length")
    .required("Password is required"),
});

const Login: FC = () => {
  const formik = useFormik({
    initialValues: {
      nick_name: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      login(values);
      setSubmitting(false);
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="nick_name"
          name="nick_name"
          label="Username"
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
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
      <p>- or -</p>
      <Link to="/register">
        <Button color="secondary" variant="contained" fullWidth>
          Register
        </Button>
      </Link>
    </div>
  );
};

export default Login;
