import React from 'react';
import { useSelector } from 'react-redux';
import { IModalState } from './modalReducer';
import { IRootState } from '~/src/app/store/rootReducer';
import SortModal from '~/src/features/bathes/components/SortModal';
import ScheduleModal from '~/src/features/bathes/components/ScheduleModal/ScheduleModal';
import OrderCallModal from '~/src/features/bathes/components/OrderCallModal/OrderCallModal';

export default function ModalManager<T>() {
  const modalLookup = {
    SortModal,
    ScheduleModal,
    OrderCallModal,
  };
  const currentModal = useSelector<IRootState>((state) => state.modal) as IModalState;
  let renderModal = <></>;

  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookup[modalType! as keyof typeof modalLookup] as React.ElementType;

    renderModal = <ModalComponent {...modalProps} />;
  }

  return renderModal;
}
