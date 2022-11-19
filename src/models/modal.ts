export interface OpenModal {
  nodeId?: string;
  modalType: ModalType;
}

export enum ModalType {
  Detail = 'DETAIL',
  Data = 'DATA',
  Add = 'ADD',
}

