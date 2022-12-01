import { Button, Menu, MenuItem, styled } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { US, CZ } from 'country-flag-icons/react/3x2';

const LanguageSwitchWrapper = styled('div')`
  margin-left: auto;
  z-index: 4;
`;

const CzFlag = styled(CZ)(
  ({ theme }) => `
  width: 2rem;
  border: 1px solid ${theme.palette.primary.dark};
`,
);

const UsFlag = styled(US)(
  ({ theme }) => `
  width: 2rem;
  border: 1px solid ${theme.palette.primary.dark};
`,
);

export const LanguageSwitch = () => {
  const { i18n } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = !!anchorEl;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <LanguageSwitchWrapper>
      <Button onClick={handleClick}>{i18n.language === 'en' ? <UsFlag /> : <CzFlag />}</Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            i18n.changeLanguage('en');
            handleClose();
          }}
        >
          <UsFlag />
        </MenuItem>
        <MenuItem
          onClick={() => {
            i18n.changeLanguage('cs');
            handleClose();
          }}
        >
          <CzFlag />
        </MenuItem>
      </Menu>
    </LanguageSwitchWrapper>
  );
};

