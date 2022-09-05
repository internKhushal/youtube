import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { loginStart, loginFail, logout, loginSucces } from "../redux/userSlice";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { SignupForm } from "../components/SignupForm";
import { Link } from "react-router-dom";





// const Container = styled.div`
//   height: 500px;
//   width: 350px;
//   background-color: #f3ffe3;
//   color: black;
//   margin: auto;
//   text-align: center;
//   margin: 50px;
//   border-radius: 30px;
// `;

import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';



const theme = createTheme();

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [isloading, setloading] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function login() {
    dispatch(loginStart());

    setloading(true);
    console.log(email, password);

    const loginendpoint = "http://localhost:8001/api/auth/signin";
    axios
      .post(
        loginendpoint,
        { email: email, password: password },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        if (res.data === "no user") {
          dispatch(loginFail());
        } else {
          dispatch(loginSucces(res.data));
          navigate('/')
        }
        setloading(false);
      })
      .catch((err) => {
        dispatch(loginFail());
        console.log(err);
      });
  }

  async function googlesignin() {
    dispatch(loginStart())
    signInWithPopup(auth, provider).then((result) => {
      console.log(result);

      axios.post('http://localhost:8001/api/auth/google', result, { withCredentials: true }).then((res) => {
        console.log(res.data)
        dispatch(loginSucces(res.data))
        navigate('/')
      })
    })
      .catch((err) => {
        dispatch(loginFail())
        console.log(err);
      })
  }








  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={login}
              >
                Sign In
              </Button>
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={googlesignin}
              >
                Sign In with Google
              </Button>
              <Grid container>
                <Grid item xs>

                </Grid>
                <Grid item>
                  <Link to="/signup" >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>

            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}





// export default function LoginPage() {
//   const [email, setemail] = useState("");
//   const [password, setpassword] = useState("");
//   const [isloading, setloading] = useState(false);
//   const user = useSelector((state) => state.user);
//   const dispatch = useDispatch();

//   function login(e) {
//     dispatch(loginStart());
//     e.preventDefault();
//     setloading(true);
//     console.log(email, password);

//     const loginendpoint = "http://localhost:8001/api/auth/signin";
//     axios
//       .post(
//         loginendpoint,
//         { email: email, password: password },
//         { withCredentials: true }
//       )
//       .then((res) => {
//         console.log(res);
//         if (res.data === "no user") {
//           dispatch(loginFail());
//         } else {
//           dispatch(loginSucces(res.data));
//         }
//         setloading(false);
//       })
//       .catch((err) => {
//         dispatch(loginFail());
//         console.log(err);
//       });
//   }

//   async function googlesignin() {
// dispatch(loginStart())
//     signInWithPopup(auth, provider).then((result) => {
//       console.log(result);

//       axios.post('http://localhost:8001/api/auth/google',result,{withCredentials:true}).then((res)=>{
//         console.log(res.data)
//         dispatch(loginSucces(res.data))
//       })
//     })
//     .catch((err)=>{
//       dispatch(loginFail())
//       console.log(err);
//     })
//   }

//   return (
//     <div style={{display:'flex'}}>
//       <Container>
//         {isloading ? (
//           <>loading....</>
//         ) : (
//           <div>
//             <form>
//               Email:{" "}
//               <input
//                 type="email"
//                 onChange={(e) => {
//                   setemail(e.target.value);
//                 }}
//               ></input>
//               <br></br>
//               Password:
//               <input
//                 type="password"
//                 onChange={(e) => {
//                   setpassword(e.target.value);
//                 }}
//               ></input>
//               <br></br>
//               <input value='Login'
//                 type="submit"
//                 onClick={(e) => {
//                   login(e);
//                 }}
//               ></input>
//             </form>
//             <div>
//               <button onClick={googlesignin}>Signin with google</button>
//             </div>
//           </div>
//         )}
//       </Container>

//       <SignupForm></SignupForm>
//     </div>
//   );
// }