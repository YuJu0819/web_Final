// import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import battle from "./static/battle.png";
import card from "./static/test-remove.png";
import rule from "./static/rule.png";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { TextField, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useGame } from "../containers/hooks/useGame";
import useSign from "../containers/hooks/useSign";
import { useRef } from "react";
import { GAME_SUBSCRIPTION } from "../../graphql";
const images = [
  //   {
  //     url: battle,
  //     title: "Battle",
  //     width: "30%",
  //   },
  {
    url: card,
    title: "Cards",
    width: "30%",
  },
  {
    url: rule,
    title: "Rules",
    width: "30%",
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "space-around",
  height: 200,
  top: "20vh",
  [theme.breakpoints.down("sm")]: {
    width: "100% !important", // Overrides inline-style
    height: 100,
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    "& .MuiTypography-root": {
      border: "4px solid currentColor",
    },
  },
}));

const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
});

const Image = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.white,
  opacity: 0.4,
  transition: theme.transitions.create("opacity"),
}));

const ImageMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
}));
const ariaLabel = { "aria-label": "description" };

const MainButton = ({ set_Card, set_Room, set_Rule, set_Account }) => {
  const {
    gameMode,
    setGameMode,
    roomNum,
    setRoomNum,
    createRoom,
    user,
    getRoom,
    data,
    addRoomToUser,
    addUserToRoom,
    subscribeToMore,
  } = useGame();

  const { inCard, setInCard, inHome, setInHome, inRule, setInRule } = useSign();
  const [anchorEl, setAnchorEl] = useState(null);
  const numRef = useRef();
  const [alerted, setAlerted] = useState(false);
  let open = Boolean(anchorEl);

  const handleClick = (event) => {
    if (!anchorEl) {
      setAnchorEl(event.currentTarget);
    }
    // else setAnchorEl(null);
    console.log(numRef);
    if (numRef.current) numRef.current.focus();
  };
  const handleClose = () => {
    setAnchorEl(null);
    open = false;
  };
  const handleCard = () => {
    console.log("handleCard");
    // setInCard(true);
    // setInHome(false);
    // setInRule(false);
    set_Card();
  };
  const handleRule = () => {
    console.log("handleRule");
    set_Rule();
  };
  const handlePVE = () => {
    handleClose();
    setGameMode("PVE");
    set_Room();
  };
  const handlePVP = () => {
    const num = (Math.floor(Math.random() * 9000) + 1000).toString();
    setRoomNum(num);
    handleClose();
    setGameMode("PVP");
    set_Room();
    // console.log(user);
    // subscribeToMore({
    //   document: GAME_SUBSCRIPTION,
    //   variables: { roomID: roomNum, user1: user.account },

    //   updateQuery: (prev, { subscriptionData }) => {
    //     console.log(subscriptionData.data);
    //     if (!subscriptionData.data) return prev;
    //     // if (subscriptionData.data.room.users.length === 2) {
    //     //   start();
    //     // }
    //     return subscriptionData.data.room;
    //   },
    // });
    createRoom({
      variables: {
        id: num,
        user: { account: user.account, character: user.character, score: 0 },
      },
    });
    addRoomToUser({
      variables: {
        roomID: num,
        userAccount: user.account,
      },
    });
  };
  const handleOpen = (e) => {
    // setAnchorEl(e.currentTarget);
    open = true;
  };
  const handleRoomnum = (e) => {
    setRoomNum(e.target.value.toString());
  };
  const searchRoom = async () => {
    const tmp = await getRoom({
      variables: {
        id: roomNum,
      },
    });
    console.log(tmp.data);
    if (tmp.data.room !== null) {
      //   subscribeToMore({
      //     document: GAME_SUBSCRIPTION,
      //     variables: { roomID: roomNum, user1: user.account },

      //     updateQuery: (prev, { subscriptionData }) => {
      //       console.log(subscriptionData.data);
      //       if (!subscriptionData.data) return prev;
      //       // if (subscriptionData.data.room.users.length === 2) {
      //       //   start();
      //       // }
      //       return subscriptionData.data.room;
      //     },
      //   });
      addRoomToUser({
        variables: {
          roomID: roomNum,
          userAccount: user.account,
        },
      });
      addUserToRoom({
        variables: {
          roomID: roomNum,
          userAccount: user.account,
        },
      });
      set_Room();
      setAlerted(false);
    } else {
      setAlerted(true);
    }
  };

  const func_array = [handleCard, handleRule];

  return (
    <Box
      sx={{ display: "flex", flexWrap: "wrap", minWidth: 300, width: "100%" }}
    >
      <ImageButton
        focusRipple
        key={"Battle"}
        style={{
          width: "30%",
          margin: "1.5vw",
        }}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <ImageSrc style={{ backgroundImage: `url(${battle})` }} />
        <ImageBackdrop className="MuiImageBackdrop-root" />
        <Image>
          <Typography
            component="span"
            variant="subtitle1"
            color="inherit"
            sx={{
              position: "relative",
              p: 4,
              pt: 2,
              pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              fontSize: "2.3vw",
            }}
          >
            {"Battle"}
            <ImageMarked className="MuiImageMarked-root" />
          </Typography>
        </Image>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {/* <Input placeholder="Placeholder" inputProps={ariaLabel} /> */}

          <MenuItem sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              helperText=" "
              id="demo-helper-text-aligned-no-helper"
              label="Room number"
              onClick={handleOpen}
              inputRef={(input) => input?.focus()}
              ref={numRef}
              //   inputRef={(input) => input && input.focus()}
              autoFocus
              sx={{ top: 10 }}
              onChange={handleRoomnum}
              error={alerted}
            />
            <IconButton
              type="button"
              sx={{ p: "1.5vw" }}
              aria-label="search"
              onClick={searchRoom}
            >
              <SearchIcon />
            </IconButton>
          </MenuItem>
          <MenuItem onClick={handlePVP}>P.V.P</MenuItem>
          <MenuItem onClick={handlePVE}>P.V.E</MenuItem>
        </Menu>
      </ImageButton>

      {images.map((image, index) => (
        <ImageButton
          focusRipple
          onClick={func_array[index]}
          key={image.title}
          style={{
            width: image.width,
            margin: "1.5vw",
          }}
        >
          <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: "relative",
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                fontSize: "2.3vw",
              }}
            >
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      ))}
    </Box>
  );
};

export default MainButton;
