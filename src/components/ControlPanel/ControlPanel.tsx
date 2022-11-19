import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { ModalType } from '../../models/modal';
import { openModalState } from '../../store/atoms';
import { LanguageSwitch } from './LanguageSwitch';

const ControlPanelContainer = styled.div`
  display: flex;
  padding: 1rem;
`;

export const ControlPanel = () => {
  const { t } = useTranslation();

  const setOpenModalState = useSetRecoilState(openModalState);

  const handleAddButtonClick = () => {
    setOpenModalState({ modalType: ModalType.Add });
  };

  return (
    <ControlPanelContainer>
      {/* TODO: style */}
      <Fab
        color="primary"
        sx={{ color: 'white', backgroundColor: 'var(--primary-color)' }}
        onClick={handleAddButtonClick}
        title={t('addNode.title')}
      >
        <AddIcon />
      </Fab>

      <LanguageSwitch />
    </ControlPanelContainer>
  );
};

