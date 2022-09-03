import React, { useState } from "react";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import HistoryIcon from "@mui/icons-material/History";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from "@mui/icons-material/Settings";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { DarkModeContext } from "../App";

const Container = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  height: 100vh;
  position: sticky;
  top: 0;
  border-right: 1px solid black;
`;
const Wrapper = styled.div`
  padding: 25px 25px;
`;

const Logo = styled.div`
  font-size: 18px;
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
`;

const Item = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;
  cursor: pointer;
`;
const ItemText = styled.div``;
const Hr = styled.hr``;
const LoginButton = styled.button`
  margin-top: 20px;
  height: 40px;
  background-color: grey;
  color: white;
  border: 3px solid black;
  width: 100px;
  cursor: pointer;
`;

export default function Menu() {
  let currentuser = useSelector((state) => state.currentuser);
  // const [videoadddialog, setvideoadddialog] = useState(false);
  const { darkMode, setdarkMode } = useContext(DarkModeContext);
  console.log("-----" + darkMode);


  return (
    <Container>
      <Wrapper>
        {/* <Link  to="/" style={{ textDecoration: 'none',color:'inherit'}}>
          <Logo >
            <YouTubeIcon ></YouTubeIcon>
            SunilTube
          </Logo>
        </Link> */}
        {/* <Hr></Hr> */}
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }} >
          <Item>
            <HomeIcon></HomeIcon>
            <ItemText>Home</ItemText>
          </Item>
        </Link>
        <Link
          to="/trending"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <WhatshotIcon></WhatshotIcon>
            <ItemText>Trending</ItemText>
          </Item>
        </Link>

        <Link
          to="/subscribed"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <SubscriptionsIcon></SubscriptionsIcon>
            <ItemText>Subscriptions</ItemText>
          </Item>
        </Link>
        <Link
          to="/history"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <HistoryIcon></HistoryIcon>
            <ItemText>History </ItemText>
          </Item>
        </Link>
        <Item
          style={{ fontSize: "13px" }}
          onClick={() => {
            setdarkMode(!darkMode);
          }}
        >
          <DarkModeIcon></DarkModeIcon>
          Dark Mode
        </Item>

        {/* {currentuser ? (
          currentuser.user.name
        ) : (
          <Link
            to="/login"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <LoginButton>Login</LoginButton>
          </Link>
        )} */}

        {/* <Link
          to="/settings"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <SettingsIcon></SettingsIcon>
            <ItemText>Settings</ItemText>
          </Item>
        </Link> */}

        <Link to="/globalChat" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <ChatIcon></ChatIcon>
            <ItemText>Global Chat</ItemText>
          </Item>
        </Link>
      </Wrapper>
    </Container>
  );
}
