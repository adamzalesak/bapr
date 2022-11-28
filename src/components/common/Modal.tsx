import { Button, Modal as MuiModal, styled } from '@mui/material';
import { ReactNode } from 'react';
import CloseIcon from '@mui/icons-material/Close';

const ModalContainer = styled('div')(
  ({ theme }) => `
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${theme.palette.background.paper};
  min-width: 15rem;
  min-height: 5rem;
  max-width: 85vw;
  max-height: calc(100vh - 1rem);
  border-radius: 5px;

  :focus-visible {
    outline: none;
  }
`,
);

const ModalHeader = styled('div')(
  ({ theme }) => `
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 2.5rem;
  padding: 0 0 0 1rem;
  border-radius: 5px 5px 0 0;
  background-color: ${theme.palette.primary.main};
`,
);

const ModalTitle = styled('div')(
  ({ theme }) => `
  font-size: 1.5rem;
  color: ${theme.palette.background.paper};
`,
);

const ModalContent = styled('div')`
  padding: 1rem;
  max-height: calc(100vh - 6.5rem);
  overflow-y: auto;
`;

const StyledButton = styled(Button)`
  min-width: 0 !important;
`;

const StyledCloseIcon = styled(CloseIcon)(
  ({ theme }) => `
  color: ${theme.palette.background.paper};
`,
);

interface Props {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ title, open, onClose, children }: Props) => (
  <MuiModal open={open} onClose={onClose}>
    <ModalContainer>
      <ModalHeader>
        <ModalTitle>{title}</ModalTitle>
        <StyledButton onClick={onClose}>
          <StyledCloseIcon />
        </StyledButton>
      </ModalHeader>
      <ModalContent>{children}</ModalContent>
    </ModalContainer>
  </MuiModal>
);

