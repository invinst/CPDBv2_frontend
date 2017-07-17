import { sanFranciscoTextFamily, mediumGrayColor, lightBlackColor, sugarCaneColor } from 'utils/styles';


export const coaccusedListWrapperStyle = {
  backgroundColor: 'white',
  fontFamily: sanFranciscoTextFamily,
  position: 'absolute',
  top: '64px',
  boxShadow: `0 2px 1px 0 ${lightBlackColor}`,
  zIndex: 900,
  overflow: 'hidden',
  width: '100%'
};

export const coaccusedTextStyle = {
  paddingLeft: '16px',
  fontSize: '14px',
  fontWeight: 500,
  color: mediumGrayColor,
  paddingTop: '11px',
  boxSizing: 'border-box'
};

export const breakSectionStyle = {
  height: '133px',
  backgroundColor: sugarCaneColor
};
