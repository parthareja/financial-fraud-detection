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
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";
// import { useUser } from "../contexts/UserContext";
import { useContext } from "react";
import { TestContext } from "../contexts/TestContext";

import Cookies from "js-cookie";

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

const theme = createTheme();

export default function SignIn() {
  const { user, setUser } = useContext(TestContext);

  // const { setUser, user } = useUser();
  const [emailError, setEmailError] = useState({ show: false, error: "" });
  const [passwordError, setPasswordError] = useState({
    show: false,
    error: "",
  });
  // console.log("before useEffect", user);

  const navigate = useNavigate();

  useEffect(() => {
    // console.log("Sign in useEffect called");
    // console.log(user);
    // console.log("VALUE OF NEW CONTEXT", user);
    if (user) {
      console.log("signin user value", user);
      // navigate("/dashboard");
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var dataJSON = {
      email: data.get("email"),
      password: data.get("password"),
    };
    // console.log(dataJSON);
    const res = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      body: JSON.stringify(dataJSON),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      // .then((res) => {
      //   console.log("boba", res);
      //   return res;
      // })
      .then((res) => {
        res.json().then((data) => {
          // console.log("data for setUser", data.firstName);
          // console.log("cookedar", document.cookie)
          console.log("kukky", Cookies.get("jwtLogin"));
          if (data.msg) {
            if (data.msg !== "") {
              console.log(data.msg);
              // emailError = data.errors.email;
              if (data.msg == "User does not exist.") {
                setEmailError({ show: true, error: "User does not exist." });
                setPasswordError({ show: false, error: "" });
              }
              if (data.msg === "Invalid password.") {
                setPasswordError({ show: true, error: "Invalid password." });
                setEmailError({ show: false, error: "" });
              }
            }
          } else if (data._id) {
            setEmailError({ show: false, error: "" });
            setPasswordError({ show: false, error: "" });
            setUser(data);
            navigate("/dashboard");
            console.log("YEH", user);
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            {emailError.show && (
              <Grid item xs={12}>
                <small id="emailError" className="form-text text-muted ml-auto">
                  {emailError.error}
                </small>
              </Grid>
            )}
            <TextField
              margin="nor\docs\forms\select\mal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {passwordError.show && (
              <Grid item xs={12}>
                <small
                  id="passwordError"
                  className="form-text text-muted ml-auto"
                >
                  {passwordError.error}
                  {/* password error */}
                </small>
              </Grid>
            )}
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
