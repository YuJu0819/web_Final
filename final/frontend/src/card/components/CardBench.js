import { Box } from '@mui/material';
import AddBlock from './AddBlock';

const CardBench = () => {
  const cards = Array(15).fill(0);
  console.log(cards);
  return (
    <Box
      sx={{
        width: '100%',
        height: '95%',
        display: 'flex',
        flex: 'flex-start',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      {cards.map((item, index) =>
        item === 0 ? <AddBlock key={index} card={index}></AddBlock> : null
      )}
    </Box>
  );
};

export default CardBench;
