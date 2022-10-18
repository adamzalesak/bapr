import { useEffect, useMemo } from 'react';
import { Handle, NodeProps, Position } from 'react-flow-renderer';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNode } from '../../hooks/nodes';
import { JoinNode as JoinNodeModel, NodeState } from '../../models/node';
import { edgesState, nodesState } from '../../store/atoms';
import * as _ from 'lodash';
import { NodeBase } from './NodeBase';
import { useTranslation } from 'react-i18next';

export const JoinNode = ({ id }: NodeProps) => {
  const { t } = useTranslation();

  const node = useNode(id) as JoinNodeModel;

  const edges = useRecoilValue(edgesState);
  const [nodes, setNodes] = useRecoilState(nodesState);

  const sourceDataA = useMemo(() => {
    const edge = edges.find((edge) => edge.target === id && edge.targetHandle == 'a');
    const sourceNodeId = edge?.source;
    const sourceNode = nodes.find((node) => node.id === sourceNodeId);

    return sourceNode?.data;
  }, [edges, id, nodes]);

  const sourceDataB = useMemo(() => {
    const edge = edges.find((edge) => edge.target === id && edge.targetHandle == 'b');
    const sourceNodeId = edge?.source;
    const sourceNode = nodes.find((node) => node.id === sourceNodeId);

    return sourceNode?.data;
  }, [edges, id, nodes]);

  useEffect(() => {
    if (!sourceDataA || !sourceDataB || !node.settings?.columnA || !node.settings?.columnB) {
      setNodes(
        (nodes) =>
          [...nodes.filter((n) => n.id !== id), { ...node, data: undefined }] as JoinNodeModel[],
      );

      return;
    }

    // let fun = sourceDataA.join;

    // switch (node.settings.type) {
    //   case 'join':
    //     fun = sourceDataA.join;
    //     break;
    //   case 'joinOuter':
    //     fun = sourceDataB.joinOuter;
    //     break;
    //   case 'joinOuterLeft':
    //     fun = sourceDataA.joinOuterLeft;
    //     break;
    //   case 'joinOuterRight':
    //     fun = sourceDataA.joinOuterRight;
    //     break;
    // }

    // const args: [any, any, any, any] = [
    //   sourceDataB,
    //   (a: any) => a[node.settings.columnA],
    //   (b: any) => b[node.settings.columnB],
    //   (a: any, b: any) => ({ ...a, ...b }),
    // ];

    const nodeData = sourceDataA.join(sourceDataB, node.settings.columnA, node.settings.columnB);

    // switch (node.settings.type) {
    //   case 'join':
    //     nodeData = sourceDataA.join(sourceDataB, [node.settings.columnA, node.settings.columnB]);
    //     break;
    //   case 'joinOuter':
    //     nodeData = sourceDataB.join(
    //       sourceDataB,
    //       [node.settings.columnA, node.settings.columnB],
    //       'outer',
    //     );
    //     break;
    //   case 'joinOuterLeft':
    //     nodeData = sourceDataA.join(
    //       sourceDataB,
    //       [node.settings.columnA, node.settings.columnB],
    //       'left',
    //     );
    //     break;
    //   case 'joinOuterRight':
    //     nodeData = sourceDataA.join(
    //       sourceDataB,
    //       [node.settings.columnA, node.settings.columnB],
    //       'right',
    //     );
    //     break;
    // }

    setNodes(
      (nodes) =>
        [...nodes.filter((n) => n.id !== id), { ...node, data: nodeData }] as JoinNodeModel[],
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceDataA, sourceDataB, node.settings]);

  return (
    <NodeBase
      nodeId={id}
      nodeTypeName={t('nodes.join.title')}
      state={
        node.data
          ? NodeState.Done
          : sourceDataA && sourceDataB
          ? NodeState.InvalidSettings
          : NodeState.NoSource
      }
    >
      <Handle type="target" id="a" position={Position.Left} style={{ marginTop: '-0.5rem' }} />
      <Handle type="target" id="b" position={Position.Left} style={{ marginTop: '0.5rem' }} />
      <Handle type="source" position={Position.Right} />
    </NodeBase>
  );
};

