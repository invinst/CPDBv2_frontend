import { sanFranciscoTextFamily, softBlackColor, lightBlackColor } from 'utils/styles';


export const coaccusedListWrapperStyle = {
  backgroundColor: 'white',
  fontFamily: sanFranciscoTextFamily,
  position: 'absolute',
  top: '65px',
  boxShadow: `0 2px 1px 0 ${lightBlackColor}`,
  zIndex: 900,
  overflow: 'hidden',
  width: '100%',
};

export const coaccusedTextStyle = {
  padding: '48px 0 16px 16px',
  fontSize: '26px',
  fontWeight: 500,
  color: softBlackColor,
  boxSizing: 'border-box'
};

export const breakSectionStyle = {
  height: '133px'
};
