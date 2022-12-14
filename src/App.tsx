import { createTheme, ThemeProvider } from '@mui/material/styles';
import { I18nextProvider } from 'react-i18next';
import { ReactFlowProvider } from 'reactflow';
import { RecoilRoot } from 'recoil';
import { Main } from './components/Main';
import i18n from './i18n/i18n';

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
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>
          <ReactFlowProvider>
            <Main />
          </ReactFlowProvider>
        </ThemeProvider>
      </I18nextProvider>
    </RecoilRoot>
  );
};

export default App;

