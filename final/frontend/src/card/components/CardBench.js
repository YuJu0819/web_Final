import { Box } from "@mui/material";
import { useCard } from "../containers/hooks/useCard";
import AddBlock from "./AddBlock";

const CardBench = () => {
  const { cards } = useCard();
  return (
    <Box
      sx={{
        width: "100%",
        height: "95%",
        display: "flex",
        flex: "flex-start",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      {cards.map((item, index) =>
        item === 0 ? <AddBlock key={index}></AddBlock> : null
      )}
    </Box>
  );
};

export default CardBench;
