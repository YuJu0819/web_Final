import { Box } from '@mui/material';

const AddBlock = ({ card }) => {
  const link = require(`../img/card${card}.png`);
  return (
    <Box
      sx={{
        width: '210px',
        height: '270px',
        margin: '30px',
        background: 'grey',
        opacity: 0.8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '8%',
        position: 'relative',
      }}
    >
      <img
        src={link}
        style={{ width: '100%', height: '100%', borderRadius: '6%' }}
      />
    </Box>
  );
};

export default AddBlock;
