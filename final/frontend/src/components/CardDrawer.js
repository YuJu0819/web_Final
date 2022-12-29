import { Drawer } from "@mui/material";
import picture from "./static/card.png";
const CardDrawer = ({ open, setDrawer }) => {
  return (
    <Drawer anchor="bottom" open={open} onClose={setDrawer}>
      <div>
        <img src={picture} />
      </div>
    </Drawer>
  );
};
export default CardDrawer;
