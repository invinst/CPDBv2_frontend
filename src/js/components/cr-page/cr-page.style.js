import { sanFranciscoTextFamily, softBlackColor, mediumGrayColor } from 'utils/styles';


export const wrapperStyle = {
  position: 'relative'
};

export const headerStyle = {
  backgroundColor: 'white',
  position: 'relative',
  zIndex: 900
};

export const pageWrapperStyle = {
  minHeight: `${window.innerHeight - 108}px`,
  scroll: 'auto',
  boxSizing: 'border-box',
  paddingLeft: '16px',
  paddingTop: '30px',
  paddingBottom: '74px'
};

export const titleStyle = {
  color: softBlackColor,
  fontSize: '30px',
  fontFamily: sanFranciscoTextFamily,
  fontWeight: 600
};

export const subtitleStyle = {
  color: mediumGrayColor,
  fontSize: '18px',
  fontFamily: sanFranciscoTextFamily,
  fontWeight: 500,
  paddingTop: '3px',
  paddingBottom: '36px'
};

export const overlayStyle = {
  width: '100%',
  minHeight: '100%',
  top: 0,
  backgroundColor: 'white',
  position: 'absolute',
  opacity: 0.5,
  zIndex: 200
};
