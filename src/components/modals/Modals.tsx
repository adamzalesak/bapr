import { useOpenModalNode } from '../../hooks/nodes';
import { NodeType } from '../../models/nodeTypes';
import { DataModal } from './DataModal';
import { FilterDetailModal } from './FilterDetailModal';
import { InputFileDetailModal } from './InputFileDetailModal';
import { JoinDetailModal } from './JoinDetailModal';
import { SortDetailModal } from './SortDetailModal';

export const Modals = () => {
  const openNode = useOpenModalNode();

  return (
    <>
      {openNode?.type === NodeType.InputFile && <InputFileDetailModal />}
      {openNode?.type === NodeType.Sort && <SortDetailModal />}
      {openNode?.type === NodeType.Filter && <FilterDetailModal />}
      {openNode?.type === NodeType.Join && <JoinDetailModal />}
      <DataModal />
    </>
  );
};

