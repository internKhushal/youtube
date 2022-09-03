import React from "react";
import VideoUrl from "../public/samplevideo.mp4";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ShareIcon from "@mui/icons-material/Share";
import styled from "styled-components";


import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Button, IconButton, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import UserImg from "../components/UserImg";
import { useSelector } from "react-redux";
import Subscribebutton from "../components/Subscribebutton";
import Gesture from "../gesture/Gesture";



const ViewandTime = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 15px;
`;
const ViewsCount = styled.div``;
const UploadTime = styled.div``;


export default function VideoViewPage(props) {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);

  let [videodata, setvideodata] = useState({});
  let { videoid } = useParams();
  let [inputcomment, setinputcomment] = useState("");
  let [allcomments, setallcomments] = useState([]);
  console.log("video", videoid);
  let [checksubscibe, setsubscribe] = useState(false);
  console.log("jhgjhghkjgyguyguyguyg", videodata.userId);
  const currentuser = useSelector((state) => state.currentuser);
  console.log("userr", currentuser);
  let navigate = useNavigate();
  // if (currentuser != null) {
  //   // const checksub=currentuser.user.subscribeduser.find()
  //   if (
  //     !currentuser.user.subscribedusers.find(
  //       (elem) => elem === videodata.userId
  //     )
  //   ) {
  //     setsubscribe(true);
  //   } else {
  //     setsubscribe(false);
  //   }
  // } else {
  //   setsubscribe(false);
  // }
  let videoplayeref = useRef(null);
  function gesturecontrol(type) {
    if (type !== "") {
      console.log(videoplayeref);
      switch (type) {
        case "full_hand_open":
          videoplayeref.current.play();
          break;
        case "victory":
          videoplayeref.current.pause();
          break;
      }
    }
  }

  useEffect(() => {
    axios
      .get("http://localhost:8001/api/video/video/" + videoid, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("sfsffasffewfew", res);

        setvideodata(res.data);
        console.log("sadsd", res.data.videourl);

        var video = document.getElementById("videoplayer");
        var source = document.createElement("source");

        source.setAttribute("src", res.data.videourl);
        source.setAttribute("type", "video/mp4");

        video.appendChild(source);
        axios
          .put("http://localhost:8001/api/video/video/view/" + videoid)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    //comments
    axios
      .get("http://localhost:8001/api/comment/getcomments/" + videoid)
      .then((res) => {
        console.log(res.data);
        setallcomments(res.data);
      });
  }, [videoid]);

  const handleLike = () => {
    if (dislike) {
      setLike(!like)
      setDislike(!dislike)
    }
    setLike(!like);
  }

  const handleDislike = () => {
    if (like) {
      setDislike(!dislike)
      setLike(!like)
    }
    setDislike(!dislike);
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div>
          <video onPlay={(e) => { }} id="videoplayer" controls width="720">
            Sorry, your browser doesn't support embedded videos.
          </video>

          <div style={{ display: "flex", gap: "70%" }}>
            <span style={{ fontSize: "30px" }}>{videodata.title}</span>

            <Subscribebutton
              currentuser={currentuser}
              userId={videodata.userId}
            ></Subscribebutton>
            {/* 
{()=>{

}} */}

            {/* {checksubscibe ? (
              <Button
                variant="contained"
                style={{ backgroundColor: "grey" }}
                onClick={(e) => {
                  e.target.style["background-color"] = "red";
                  e.target.innerText = "subscribe";
                  setsubscribe(false);

                  axios
                    .put(
                      "http://localhost:8001/api/user/unsub/" +
                        videodata.userId,
                      {},
                      { withCredentials: true }
                    )
                    .then((res) => {
                      console.log(res.data);
                    });
                    setsubscribe(false);
                }}
              >
                Unsubscibe
              </Button>
            ) : (
              <Button
                variant="contained"
                style={{ backgroundColor: "red" }}
                onClick={(e) => {

                  axios
                    .put(
                      "http://localhost:8001/api/user/sub/" +
                        videodata.userId,
                      {},
                      { withCredentials: true }
                    )
                    .then((res) => {
                      console.log(res.data);
                    });

                    setsubscribe(true);

                }}
              >
                Subscribe
              </Button>
            )} */}
          </div>

          {/**gestureeee componenet */}

          <Gesture gesturefunc={gesturecontrol}></Gesture>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <ViewandTime>
              <ViewsCount>{videodata.views} views</ViewsCount> •
              <UploadTime>{format(videodata.createdAt)}</UploadTime>
            </ViewandTime>

            <div>
              {" "}
              <IconButton onClick={handleLike}>
                {like ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
              </IconButton>
              {videodata.likes ? videodata.likes.length : 0}

              <IconButton onClick={handleDislike}>
                {dislike ? <ThumbDownAltIcon /> : <ThumbDownOffAltIcon />}
              </IconButton>
              {videodata.dislikes ? videodata.dislikes.length : 0}
              <ShareIcon></ShareIcon>
            </div>
          </div>

          <div>{videodata.desc}</div>
          <h3>Comments</h3>
          <div>
            {" "}
            <TextField
              onChange={(e) => {
                setinputcomment(e.target.value);
              }}
              value={inputcomment}
              style={{ width: "70%" }}
              id="input-with-icon-textfield"
              label=" Add Comment"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
            <Button
              variant="outlined"
              onClick={(ev) => {
                console.log(inputcomment);
                axios
                  .post(
                    "http://localhost:8001/api/comment/addcomment",
                    { videoId: videoid, desc: inputcomment },
                    { withCredentials: true }
                  )
                  .then((res) => console.log(res.data))
                  .catch((err) => {
                    console.log(err);
                    navigate('/login');

                  });
                setinputcomment("");
              }}
            >
              Add Comment
            </Button>
          </div>
          <br></br>
          <br></br>
          <div>
            {allcomments.map((elem) => {
              return (
                <div key={elem._id}>
                  <p>
                    <UserImg id={elem.userId} /> {elem.desc}
                  </p>
                  <br></br>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}