import AddIcon from '@mui/icons-material/Add';
import { Fab, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useModal } from '../../hooks/modal';
import { ModalType } from '../../models/modal';
import { LanguageSwitch } from './LanguageSwitch';

const ControlPanelContainer = styled('div')`
  display: flex;
  padding: 1rem;
`;

export const ControlPanel = () => {
  const { t } = useTranslation();

  const { openModal } = useModal();

  const handleAddButtonClick = () => {
    openModal(ModalType.Add);
  };

  return (
    <ControlPanelContainer>
      <Fab color="primary" onClick={handleAddButtonClick} title={t('addNode.title')}>
        <AddIcon />
      </Fab>

      <LanguageSwitch />
    </ControlPanelContainer>
  );
};

