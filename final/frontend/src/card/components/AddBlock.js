import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/material";
import { useCard } from "../containers/hooks/useCard";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
const AddBlock = () => {
  const { setDrawer, removeStatus } = useCard();
  return (
    <Box
      sx={{
        width: "12%",
        height: "28%",
        marginLeft: "40px",
        marginRight: "40px",
        background: "grey",
        opacity: 0.8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "8%",
        position: "relative",
      }}
    >
      <Fab
        size="small"
        color="error"
        aria-label="remove"
        sx={{
          position: "relative",
          top: "-44%",
          left: "-28%",
          visibility: removeStatus ? "visible" : "hidden",
        }}
      >
        <RemoveCircleOutlineIcon fontSize="small" />
      </Fab>
      <Fab
        size="50px"
        color="default"
        aria-label="add"
        onClick={setDrawer}
        sx={{
          position: "relative",
          left: "-12%",
        }}
      >
        <AddIcon fontSize="large"></AddIcon>
      </Fab>
    </Box>
  );
};

export default AddBlock;
