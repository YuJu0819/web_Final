import { Box } from '@mui/material';
import AddBlock from './AddBlock';

const CardBench = ({ cards }) => {
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
      {cards.map((item, index) => (
        <AddBlock key={index} card={item}></AddBlock>
      ))}
    </Box>
  );
};

export default CardBench;
