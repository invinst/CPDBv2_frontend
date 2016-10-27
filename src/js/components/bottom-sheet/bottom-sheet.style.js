import { softBlackColor, black32Color, sanFranciscoTextFamily } from 'utils/styles';


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

export const headerWrapperStyle = {
  boxShadow: `0 1px 2px 0 ${black32Color}`,
  height: '44px'
};

export const editWrapperLinkStyle = {
  fontSize: '13px',
  fontFamily: sanFranciscoTextFamily,
  width: '100%',
  paddingTop: '14px'
};
