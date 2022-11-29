import { styled } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { NodeState } from '../../../models/dataNode';

export interface NodeBoxProps {
  selected?: boolean;
}

export const NodeBox = styled('div')<NodeBoxProps>(
  ({ selected, theme }) => `
    font-size: 1.25rem;
    padding: 1.25rem 2rem;
    border-radius: 8px;
    border-style: solid;
    border-width: 1px;
    border-color: ${theme.palette.grey[500]};
    box-shadow: ${selected ? theme.shadows[5] : theme.shadows[2]};
    background-color: ${theme.palette.grey[200]};
  `,
);

export const MenuButton = styled(MoreVertIcon)`
  position: absolute;
  right: 1px;
  top: 3px;
  font-size: 1.25rem;
  cursor: pointer;
`;

interface StateLineProps {
  state: NodeState;
}

export const StateLine = styled('div')<StateLineProps>(
  ({ state, theme }) => `
  position: absolute;
  left: 0.35rem;
  right: 0.35rem;
  bottom: 0.35rem;
  height: 3px;
  border-radius: 2px;
  background-color: ${
    state === NodeState.Done
      ? theme.palette.success.main
      : state === NodeState.InvalidSettings
      ? theme.palette.warning.main
      : theme.palette.error.main
  };
`,
);

export const RowColumnCount = styled('div')`
  position: absolute;
  right: 0;
  margin-top: -0.3rem;
  margin-bottom: auto;
  margin-left: auto;
  width: fit-content;
  font-size: 0.5rem;
  white-space: nowrap;
`;

