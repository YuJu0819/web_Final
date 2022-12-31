import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
// import HeadBar from "../components/HeadBar";
import Container from '@mui/material/Container';
// import MainButton from "../components/MainButton";
import { width } from '@mui/system';
import CssBaseline from '@mui/material/CssBaseline';
// import { SELECTING_CHARACTER_MUTATION } from "../../graphql";
// import Title from "../components/Title";
// import useSign from "./hooks/useSign";
import { useEffect } from 'react';
import useSign from '../hooks/useSign';
// import {useMutation} from ""
import SelectTitle from '../../components/SelectTitle';
import SelectButtom from '../../components/SelectButtom';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const Select = ({ account, setInSelect, changeSignUp = { changeSignUp } }) => {
  //   const [selectCharacter] = SELECTING_CHARACTER_MUTATION;
  const { selectCharacter } = useSign();
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline></CssBaseline>
      <main style={{ height: '100vh', width: '100vw' }}>
        <Container
          component='main'
          maxWidth='100vw'
          //   sx={{ bgcolor: "#3C3C3C", height: 1 }}
        >
          <SelectTitle></SelectTitle>
          <SelectButtom
            account={account}
            selectCharacter={selectCharacter}
            setInSelect={setInSelect}
            changeSignUp={changeSignUp}
          ></SelectButtom>
        </Container>
      </main>
    </ThemeProvider>
  );
};

export default Select;
