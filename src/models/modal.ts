export interface OpenModal {
  modalType: ModalType;
  nodeId?: string;
}

export enum ModalType {
  Detail = 'DETAIL',
  Data = 'DATA',
  Add = 'ADD',
}

