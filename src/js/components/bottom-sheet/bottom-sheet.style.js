import { softBlackColor } from 'utils/styles';


export const overlayStyle = {
  backgroundColor: softBlackColor,
  position: 'fixed',
  left: '0',
  top: '0',
  width: '100%',
  height: '100%',
  zIndex: 100
};

export const sheetWrapperStyle = {
  position: 'fixed',
  left: 0,
  bottom: 0,
  width: '100%',
  overflowY: 'auto',
  height: `${window.innerHeight}px`,
  zIndex: 100
};

export const sheetStyle = {
  backgroundColor: 'white',
  pointerEvents: 'auto',
  width: '100%',
  zIndex: 100
};

export const closeBottomSheetTriggerStyle = {
  width: '100%',
  height: '44px'
};
