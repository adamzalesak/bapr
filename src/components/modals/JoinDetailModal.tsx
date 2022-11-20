import { Button, MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { useOpenModalNode, useSourceDataFrame, useUpdateNodeData } from '../../hooks/node';
import { ModalType } from '../../models/modal';
import { JoinNode, JoinNodeHandle, JoinNodeSetting, JoinType } from '../../models/joinNode';
import { openModalState } from '../../store/atoms';
import { Form } from '../common/Form';
import { Modal } from '../common/Modal';
import { Select } from '../form/Select';

export const JoinDetailModal = () => {
  const { t } = useTranslation();

  const [openModal, setOpenModal] = useRecoilState(openModalState);
  const updateNodeData = useUpdateNodeData<JoinNode>(openModal?.nodeId);

  const node = useOpenModalNode() as JoinNode;

  const sourceDataFrameA = useSourceDataFrame(node.id, JoinNodeHandle.A);
  const sourceDataFrameB = useSourceDataFrame(node.id, JoinNodeHandle.B);

  const { control, handleSubmit } = useForm<JoinNodeSetting>({
    defaultValues: node.data.settings,
  });

  const onSubmit = (settings: JoinNodeSetting) => {
    updateNodeData('settings', settings);
    setOpenModal(null);
  };

  return (
    <Modal
      title={t('nodes.join.title')}
      open={openModal?.modalType === ModalType.Detail}
      onClose={() => setOpenModal(null)}
    >
      {sourceDataFrameA && sourceDataFrameB ? (
        <Form>
          <Select name="columnA" control={control} label={t('nodes.join.columnA')}>
            {sourceDataFrameA?.columns.map((column, index) => (
              <MenuItem key={index} value={column.name}>
                {column.name}
              </MenuItem>
            ))}
          </Select>
          <Select name="columnB" control={control} label={t('nodes.join.columnB')}>
            {sourceDataFrameB?.columns.map((column, index) => (
              <MenuItem key={index} value={column.name}>
                {column.name}
              </MenuItem>
            ))}
          </Select>
          <Select name="type" control={control} label={t('nodes.join.type')}>
            <MenuItem value={JoinType.innerJoin}>{t('nodes.join.types.innerJoin')}</MenuItem>
            <MenuItem value={JoinType.leftOuterJoin}>
              {t('nodes.join.types.leftOuterJoin')}
            </MenuItem>
            <MenuItem value={JoinType.rightOuterJoin}>
              {t('nodes.join.types.rightOuterJoin')}
            </MenuItem>
            <MenuItem value={JoinType.fullOuterJoin}>
              {t('nodes.join.types.fullOuterJoin')}
            </MenuItem>
          </Select>

          <Button variant="outlined" onClick={handleSubmit(onSubmit)}>
            {t('common.save')}
          </Button>
        </Form>
      ) : (
        t('detailModal.selectDataSource')
      )}
    </Modal>
  );
};
