import {
  sanFranciscoTextFamily, softBlackColor, mediumGrayColor, whiteTwoColor, sugarCaneColor
} from 'utils/styles';


export const wrapperStyle = {
  position: 'relative',
  backgroundColor: sugarCaneColor,
  borderBottom: `1px solid ${whiteTwoColor}`
};

export const headerStyle = {
  backgroundColor: 'white'
};

export const summarySectionStyle = {
  paddingLeft: '16px'
};

export const summarySectionWrapperStyle = {
  padding: '0 16px 16px 16px'
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
};

export const leftColumnStyle = {
  width: '320px',
  display: 'inline-block',
  verticalAlign: 'top',
  paddingBottom: '24px',
  paddingLeft: '16px'
};

export const rightColumnStyle = {
  width: 'calc(100% - 336px)',
  display: 'inline-block',
  paddingBottom: '24px',
  paddingLeft: '16px',
  boxSizing: 'border-box'
};

export const CRIDHeaderStyle = {
  fontFamily: sanFranciscoTextFamily,
  fontSize: '26px',
  fontWeight: 400,
  color: softBlackColor,
  paddingTop: '16px',
  paddingBottom: '16px',
  margin: '0 16px',
  borderBottom: `solid 1px ${whiteTwoColor}`
};
