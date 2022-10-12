import { useEffect, useMemo } from 'react';
import { Handle, NodeProps, Position } from 'react-flow-renderer';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useSourceData } from '../../hooks/nodes';
import { ModalType } from '../../models/modal';
import { JoinNode as JoinNodeModel } from '../../models/node';
import { edgesState, nodesState, openModalState } from '../../store/atoms';
import * as _ from 'lodash';

export const JoinNode = ({ id, data }: NodeProps) => {
  const setOpenModal = useSetRecoilState(openModalState);

  const edges = useRecoilValue(edgesState);
  const [nodes, setNodes] = useRecoilState(nodesState);

  const sourceDataA = useMemo(() => {
    const edge = edges.find((edge) => edge.target === id && edge.targetHandle == 'a');
    const sourceNodeId = edge?.source;
    const sourceNode = nodes.find((node) => node.id === sourceNodeId);

    return sourceNode?.data;
  }, [edges, nodes]);

  const sourceDataB = useMemo(() => {
    const edge = edges.find((edge) => edge.target === id && edge.targetHandle == 'b');
    const sourceNodeId = edge?.source;
    const sourceNode = nodes.find((node) => node.id === sourceNodeId);

    return sourceNode?.data;
  }, [edges, nodes]);

  const node = useMemo(() => nodes.find((n) => n.id === id) as JoinNodeModel, [nodes]);

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

    console.log(node.settings.columnA);
    console.log(node.settings.columnB);

    const args: [any, any, any, any] = [
      sourceDataB,
      (a: any) => a[node.settings.columnA],
      (b: any) => b[node.settings.columnB],
      (a: any, b: any) => ({ ...a, ...b }),
    ];

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

    // fixes this:
    /*
      Uncaught TypeError: Cannot assign to read only property 'content' of object '[object Object]'
      at DataFrame2.lazyInit (index.esm.js:1906:18)
      at DataFrame2.getContent (index.esm.js:1913:14)
      at DataFrame2.toArray (index.esm.js:3031:41)
      at DataGrid.tsx:26:17
      at mountMemo (react-dom.development.js:17225:19)
      at Object.useMemo (react-dom.development.js:17670:16)
      at useMemo (react.development.js:1650:21)
      at DataGrid.tsx:25:14
      at renderWithHooks (react-dom.development.js:16305:18)
      at updateFunctionComponent (react-dom.development.js:19588:20)
    */
    // nodeData?.toArray();

    setNodes(
      (nodes) =>
        [...nodes.filter((n) => n.id !== id), { ...node, data: nodeData }] as JoinNodeModel[],
    );
  }, [sourceDataA, sourceDataB, node.settings]);

  return (
    <div
      style={{ padding: '1rem', border: '1px solid var(--primary-color)', borderRadius: '3px' }}
      onClick={() => {
        setOpenModal({ modalType: ModalType.Detail, nodeId: id });
      }}
      onContextMenu={(event) => {
        event.preventDefault();
        setOpenModal({ modalType: ModalType.Data, nodeId: id });
      }}
    >
      <div>Join</div>
      <Handle type="target" id="a" position={Position.Left} style={{ marginTop: '-0.5rem' }} />
      <Handle type="target" id="b" position={Position.Left} style={{ marginTop: '0.5rem' }} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

