import {
  MODAL_SHOW,
  MODAL_HIDE,
  SETTINGS,
} from './constants';

function showDefaultModal(modalType, modalProps) {
  return {
    type: MODAL_SHOW,
    extraProps: {},
    modalType,
    modalProps,
  };
}

export function hideModal() {
  return {
    type: MODAL_HIDE,
  };
}

export function showSettingsModal(modalProps) {
  return showDefaultModal(SETTINGS, modalProps);
}
