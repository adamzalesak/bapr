import { Button, Modal as MuiModal } from '@mui/material';
import { ReactNode } from 'react';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  min-width: 15rem;
  min-height: 5rem;
  max-width: 85vw;
  max-height: 85vh;
  border-radius: 5px;
  :focus-visible {
    outline: none;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 2.5rem;
  padding: 0 0 0 1rem;
  border-radius: 5px 5px 0 0;
  background-color: var(--primary-color);
`;

const ModalTitle = styled.h1`
  font-size: 1.5rem;
  color: #fff;
`;

const ModalContent = styled.div`
  padding: 1rem;
  max-height: 100%;
`;

const StyledButton = styled(Button)`
  min-width: 0 !important;
`;

const StyledCloseIcon = styled(CloseIcon)`
  color: #fff;
`;

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

