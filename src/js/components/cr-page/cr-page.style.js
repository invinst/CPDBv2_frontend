import { sanFranciscoTextFamily, softBlackColor, mediumGrayColor, whiteTwoColor } from 'utils/styles';


export const wrapperStyle = {
  position: 'relative'
};

export const headerStyle = {
  backgroundColor: 'white'
};

export const headerWrapperStyle = {
  position: 'relative',
  zIndex: 900
};

export const summarySectionStyle = {
  paddingLeft: '16px'
};

export const pageWrapperStyle = {
  boxSizing: 'border-box',
  paddingTop: '30px',
  scroll: 'auto',
  minHeight: `${window.innerHeight - 108}px`,
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

export const leftColumnStyle = {
  width: '320px',
  display: 'inline-block',
  borderRight: `1px solid ${whiteTwoColor}`,
  verticalAlign: 'top'
};

export const rightColumnStyle = {
  width: 'calc(100% - 337px)',
  display: 'inline-block'
};
