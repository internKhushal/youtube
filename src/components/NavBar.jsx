import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from "@mui/icons-material/Login";
import Videodialog from "./Videodialog";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import YouTube from "@mui/icons-material/YouTube";
import Menu from "./Menu";
import { Button } from "@mui/material";
import { useState } from "react";
import { useContext } from "react";
import { DarkModeContext } from "../App";


const drawerWidth = 200;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(0)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(0)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function NavBar(props) {

  const theme = useTheme();
  const currentuser = useSelector((state) => state.currentuser);
  console.log("current", currentuser);
  const [open, setOpen] = React.useState(false);
  const [openVideo, setOpenVideo] = React.useState(false);
  const [searchterm, setsearchterm] = useState('');
  const { darkMode } = useContext(DarkModeContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpenVideo(true);
  };

  async function searchvideos() {
  }

  const videoswithsearchterm = React.cloneElement(props.children, { search: searchterm, searchvideos: searchvideos });

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} color="transparent">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <YouTube />
            <Typography variant="h6" noWrap component="div">
              YouTube
            </Typography>
          </Link>
          <TextField
            size="small"
            onChange={(e) => { setsearchterm(e.target.value) }}
            id="outlined-basic"
            style={{
              color: "inherit",
              width: "65%",
              marginTop: "5px",
              // padding: "10px",
              marginLeft: "10px",
            }}
            label="Search..."
            variant="outlined"
          />
          <IconButton onClick={searchvideos}>
            <SearchIcon />
          </IconButton>
          {/* <Button onClick={searchvideos} >Search</Button> */}
          <IconButton onClick={handleClickOpen} style={{ margin: "0 15px" }} >
            <VideoCallIcon></VideoCallIcon>
          </IconButton>
          {currentuser ? (
            <div style={{
              display: "flex", justifyContent: "center",
              alignItems: "center",
            }}>
              <img alt="im"
                src={currentuser.user.img}
                style={{ height: "25px", width: "25px", borderRadius: "10px" }}></img>
              {currentuser.user.name}<Button>LogOut</Button>
            </div>
          ) : (
            <Link to="/login">
              <IconButton>
                <LoginIcon />
              </IconButton>
            </Link>
          )}
        </Toolbar>
        <Videodialog open={openVideo} setOpen={setOpenVideo}></Videodialog>
      </AppBar>
      <Drawer variant="permanent" open={open} >
        <DrawerHeader style={{ backgroundColor: `${darkMode ? '#242422' : ''}` }}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Menu />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {videoswithsearchterm}
        {console.log(props.children)}
      </Box>
    </Box>
  );
}

// -----------------------------------

// import React from "react";
// import SearchIcon from "@mui/icons-material/Search";
// import styled from "styled-components";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import VideoCallIcon from '@mui/icons-material/VideoCall';
// import { IconButton } from "@mui/material";
// import Videodialog from "./Videodialog";

// const Container = styled.div`
//   display: flex;
//   padding: 10px 20px;
//   gap: 30px;
//   justify-content: center;
//   position: sticky;
//   top: 0;
// `;
// const LoginButton = styled.button`
//   height: 30px;
//   background-color: ${({ theme }) => theme.bg};
//   color: ${({ theme }) => theme.text};
//   border: 3px solid black;
//   cursor: pointer;
//   flex: 1;
// `;
// const SearchBar = styled.input`
//   height: 25px;
//   border-radius: 4px;
//   flex: 4;
// `;
// const Item = styled.div`
//   display: flex;
//   gap: 10px;
//   cursor: pointer;
//   flex: 0.5;
// `;
// export default function NavBar() {
//   const currentuser = useSelector((state) => state.user.currentuser);
//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };
//   return (
//     <Container>
//       <SearchBar type="text" placeholder="Search......"></SearchBar>
//       <Item>
//         <SearchIcon></SearchIcon>
//       </Item>{" "}

//       <IconButton onClick={handleClickOpen}><VideoCallIcon></VideoCallIcon></IconButton>
//       {currentuser ? (
//        <div><img src={currentuser.user.img} style={{height:'25px',width:'25px',borderRadius:'10px'}}></img>{currentuser.user.name}</div>
//       ) : (
//         <Link to="/login">
//           <LoginButton>Login</LoginButton>
//         </Link>
//       )}

//       <Videodialog open={open} setOpen={setOpen}></Videodialog>
//     </Container>
//   );
// }