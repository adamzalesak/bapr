import { NodeState } from '../../../models/dataNode';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import TableViewIcon from '@mui/icons-material/TableView';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import { Menu, MenuItem } from '@mui/material';
import { MenuButton } from './styled';
import { useState } from 'react';

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
  const [anchorEl, setAnchorEl] = useState<null | SVGSVGElement>(null);
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
        onClick={(event) => {
          event?.stopPropagation();
          setAnchorEl(event.currentTarget);
        }}
      />
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MenuItem onClick={handleOpenDetail}>
          <SettingsIcon />
        </MenuItem>

        {nodeState === NodeState.Done && (
          <>
            <MenuItem onClick={handleOpenDataPreview}>
              <TableViewIcon />
            </MenuItem>

            <MenuItem onClick={handleSaveToFile}>
              <SaveAltIcon />
            </MenuItem>
          </>
        )}

        <MenuItem onClick={handleDeleteNode}>
          <DeleteIcon />
        </MenuItem>
      </Menu>
    </>
  );
};

