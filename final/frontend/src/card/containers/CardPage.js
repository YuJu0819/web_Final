import CardBench from '../components/CardBench';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CachedIcon from '@mui/icons-material/Cached';
import CheckIcon from '@mui/icons-material/Check';
import { Box, Container, Fab } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';
import useSign from '../../sign/containers/hooks/useSign';

const CardPage = ({ changeInHome }) => {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          margin: '0px',
          width: '97vw',
          height: '96vh',
          display: 'flex',
          flexWrap: 'wrap',
          overflow: 'unset',
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Fab
            id='back'
            size='large'
            color='primary'
            aria-label='arrowBack'
            sx={{
              marginTop: '15px',
              left: '1%',
            }}
            onClick={changeInHome}
          >
            <ArrowBackIcon fontSize='large' />
          </Fab>
        </Box>
        <CardBench />
      </Box>
    </ThemeProvider>
  );
};

export default CardPage;
