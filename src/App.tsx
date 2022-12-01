import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { RecoilRoot } from 'recoil';
import { Main } from './components/Main';

import './i18n/i18n';

const AppWrapper = styled('div')`
  height: 100vh;
  width: 100vw;
`;

const theme = createTheme({
  typography: { fontFamily: 'Roboto, Inter, Avenir, Helvetica, Arial, sans-serif' },
  palette: {
    primary: {
      main: '#166fd5',
    },
    success: {
      main: '#82cc88',
    },
    error: {
      main: '#c7677d',
    },
    warning: {
      main: '#eee275',
    },
  },
});

export const App = () => {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <AppWrapper>
          <Main />
        </AppWrapper>
      </ThemeProvider>
    </RecoilRoot>
  );
};

export default App;

