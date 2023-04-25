import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
// import { useUser } from "../contexts/UserContext";
import { useContext } from "react";
import { TestContext } from "../contexts/TestContext";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Capstone I — financial-fraud-detection — 2023"}
      {/* <Link color="inherit" href="https://mui.com/"> */}

      {/* </Link>{" - "} */}
    </Typography>
  );
}

// var emailError = "Default Email Error";
// var passwordError = "Default Password Error";

const theme = createTheme();

export default function SignUp() {
  const { user, setUser } = useContext(TestContext);
  const [emailError, setEmailError] = useState({ show: false, error: "" });
  const [passwordError, setPasswordError] = useState({
    show: false,
    error: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    console.log("SignUp useEffect new context called");
    console.log(user);
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var dataJSON = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    };
    // console.log(dataJSON);
    const res = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      body: JSON.stringify(dataJSON),
      headers: { "Content-Type": "application/json" },
    })
      // .then((res) => {
      //   // console.log("boba", res);
      //   return res;
      // })
      .then((res) => {
        res.json().then((data) => {
          // console.log(data);
          if (data.errors) {
            if (data.errors.email !== "") {
              // console.log(data.errors.email);
              // emailError = data.errors.email;
              setEmailError({ show: true, error: data.errors.email });
            }
            if (data.errors.password !== "") {
              passwordError = data.errors.password;
              setPasswordError({ show: true, error: data.errors.email });
            }
          } else if (data._id) {
            setEmailError({ show: false, error: "" });
            setPasswordError({ show: false, error: "" });
            console.log("HAWWWWWWWWW", data);
            navigate("/dashboard");
          }
        });
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              {/* <h5 id="email-error">error</h5> */}
              {emailError.show && (
                <Grid item xs={12}>
                  <small
                    id="emailError"
                    className="form-text text-muted ml-auto"
                  >
                    {emailError.error}
                  </small>
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              {passwordError.show && (
                <Grid item xs={12}>
                  <small
                    id="passwordError"
                    className="form-text text-muted ml-auto"
                  >
                    {passwordError.error}
                  </small>
                </Grid>
              )}
              <Grid item xs={12}>
                {/* <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                /> */}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
