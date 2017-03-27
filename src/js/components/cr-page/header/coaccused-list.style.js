import { sanFranciscoTextFamily, mediumGrayColor, lightBlackColor } from 'utils/styles';


export const coaccusedListWrapperStyle = {
  backgroundColor: 'white',
  paddingTop: '11px',
  fontFamily: sanFranciscoTextFamily,
  position: 'absolute',
  top: '64px',
  boxShadow: `0 2px 1px 0 ${lightBlackColor}`,
  marginBottom: '-1px',
  zIndex: 300,
  width: '100%'
};

export const coaccusedTextStyle = {
  paddingLeft: '16px',
  fontSize: '14px',
  fontWeight: 500,
  color: mediumGrayColor
};

export const contentWrapperStyle = {
  marginBottom: '-1px'
};
