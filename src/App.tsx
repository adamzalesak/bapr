import { RecoilRoot } from 'recoil';
import styled from 'styled-components';
import { Main } from './components/Main';

import './utils/i18n';

const AppWrapper = styled.div`
  height: 100vh;
  width: 100vw;
`;

export const App = () => {
  return (
    <RecoilRoot>
      <AppWrapper>
        <Main />
      </AppWrapper>
    </RecoilRoot>
  );
};

export default App;

