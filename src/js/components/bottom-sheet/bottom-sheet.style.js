import { softBlackColor } from 'utils/styles';


export const overlayStyle = {
  backgroundColor: softBlackColor,
  position: 'fixed',
  left: '0',
  top: '0',
  width: '100%',
  height: '100%',
  zIndex: '3'
};

export const sheetStyle = {
  backgroundColor: 'white',
  position: 'fixed',
  left: '0',
  width: '100%',
  zIndex: '3'
};

export const bodyStyle = {
  maxWidth: '992px',
  margin: '0 auto'
};

export const contentStyle = {
  margin: '0 auto',
  maxWidth: `${4/5*992}px`
};

export const scrollStyle = {
  height: '500px',
  overflowY: 'auto',
  overflowX: 'hidden'
};
