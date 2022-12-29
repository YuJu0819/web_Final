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
import Button from "@mui/material/Button";
import { useState } from "react";
import useGame from "../containers/hooks/useGame";
import useSign from "../containers/hooks/useSign";
const images = [
  {
    url: battle,
    title: "role 1",
    width: "25%",
    // left: "10%",
  },
  {
    url: card,
    title: "role 2",
    width: "25%",
  },
  {
    url: rule,
    title: "role 3",
    width: "25%",
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "space-around",
  height: 350,
  left: "6vw",
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

const SelectButtom = ({
  account,
  selectCharacter,
  setInSelect,
  changeSignUp,
}) => {
  //   const { gameMode, setGameMode } = useGame();
  const { inCard, setInCard, inHome, setInHome, inRule, setInRule } = useSign();
  const [anchorEl, setAnchorEl] = useState(null);
  let open = Boolean(anchorEl);
  const selecting = (index) => {
    // console.log(index);
    selectCharacter({
      variables: {
        character: index.toString(),
        account: account,
      },
    });
    changeSignUp();
  };

  //   const func_array = [select_A, select_B, select_C];
  const handleClick = (event) => {
    if (!anchorEl) setAnchorEl(event.currentTarget);
    else setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
    open = false;
  };

  return (
    <Box
      sx={{ display: "flex", flexWrap: "wrap", minWidth: 300, width: "100%" }}
    >
      {images.map((image, index) => (
        <ImageButton
          focusRipple
          onClick={() => selecting(index)}
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

export default SelectButtom;
