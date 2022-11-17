import { useState, useEffect } from "react";
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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { width } from "@mui/system";
import useSign from "./hooks/useSign";
import { Alert } from "@mui/material";

const handleSignUp = () => {};

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const theme = createTheme();
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
const SignIn = ({ changeSignUp }) => {
  const {
    sendAccount,
    status,
    displayStatus,
    email,
    password,
    setEmail,
    setPassword,
    alerted,
    setAlerted,
  } = useSign();
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    sendAccount({ email: email, password: password });
  };

  const emailChange = (e) => {
    setEmail(e.target.value);
    setAlerted(false);
  };
  const passwordChange = (e) => {
    setPassword(e.target.value);
    setAlerted(false);
  };
  useEffect(() => {
    // console.log(status);
    // displayStatus(status);
    // setAlerted(false);
  }, [status]);
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main style={{ height: "100vh" }}>
        <Container
          component="main"
          maxWidth="xs"
          //   sx={{ bgcolor: "#3C3C3C", height: 1 }}
        >
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              // bgcolor: "#3C3C3C",
            }}
          >
            {/* {alerted ? (
              <Alert variant="outlined" severity="error">
                This is an error alert — check it out!
              </Alert>
            ) : (
              <></>
            )} */}
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
                error={alerted ? true : false}
                id="email"
                // label={alerted ? "Wrong account" : "Email Address"}
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={emailChange}
                helperText={alerted ? "Wrong email or password" : null}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                error={alerted ? true : false}
                name="password"
                // label={alerted ? "Wrong account" : "password"}
                label="password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={passwordChange}
                // sx={{ input: { color: "white" } }}
                // InputLabelProps={{
                //   style: { color: "#fff" },
                // }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                // onClick={sendAccount}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    href="#"
                    variant="body2"
                    onClick={changeSignUp}
                    component="button"
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </main>
    </ThemeProvider>
  );
};

export default SignIn;
