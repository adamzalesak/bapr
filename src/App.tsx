import { createTheme, ThemeProvider } from '@mui/material/styles';
import { RecoilRoot } from 'recoil';
import { Main } from './components/Main';

import './i18n/i18n';

const theme = createTheme({
  typography: { fontFamily: 'Roboto, Inter, Avenir, Helvetica, Arial, sans-serif' },
  palette: {
    primary: {
      main: '#166fd5',
    },
    success: {
      main: '#82cc88',
    },
    warning: {
      main: '#eee275',
    },
    error: {
      main: '#c7677d',
    },
  },
});

export const App = () => {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Main />
      </ThemeProvider>
    </RecoilRoot>
  );
};

export default App;

