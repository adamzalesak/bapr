import { NodeState } from '../../../models/dataNode';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import TableViewIcon from '@mui/icons-material/TableView';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { MenuButton } from './styled';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface NodeBaseMenuProps {
  nodeState: NodeState;
  onOpenDetail: () => void;
  onOpenDataPreview: () => void;
  onSaveToFile: () => void;
  onDeleteNode: () => void;
}

export const NodeBaseMenu = ({
  nodeState,
  onOpenDetail,
  onOpenDataPreview,
  onSaveToFile,
  onDeleteNode,
}: NodeBaseMenuProps) => {
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = !!anchorEl;
  const handleClose = () => setAnchorEl(null);

  const handleOpenDetail = () => {
    onOpenDetail();
    handleClose();
  };
  const handleOpenDataPreview = () => {
    onOpenDataPreview();
    handleClose();
  };
  const handleSaveToFile = () => {
    onSaveToFile();
    handleClose();
  };
  const handleDeleteNode = () => {
    onDeleteNode();
    handleClose();
  };

  return (
    <>
      <MenuButton
        role="button"
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          event?.stopPropagation();
          setAnchorEl(event.currentTarget);
        }}
      />
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem key="detail" onClick={handleOpenDetail}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText>{t('nodes.base.menu.detail')}</ListItemText>
        </MenuItem>

        {nodeState === NodeState.Processed && [
          <MenuItem key="dataPreview" onClick={handleOpenDataPreview}>
            <ListItemIcon>
              <TableViewIcon />
            </ListItemIcon>
            <ListItemText>{t('nodes.base.menu.data')}</ListItemText>
          </MenuItem>,
          <MenuItem key="saveToFile" onClick={handleSaveToFile}>
            <ListItemIcon>
              <SaveAltIcon />
            </ListItemIcon>
            <ListItemText>{t('nodes.base.menu.save')}</ListItemText>
          </MenuItem>,
        ]}

        <MenuItem key="delete" onClick={handleDeleteNode}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText>{t('nodes.base.menu.delete')}</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};
