import { sanFranciscoTextFamily, lightBlackColor, softBlackColor, greyishColor } from 'utils/styles';


export const boxShadowStyle = {
  borderBottom: `1px solid ${lightBlackColor}`,
  position: 'relative'
};

export const headerStyle = {
  fontFamily: sanFranciscoTextFamily,
  color: softBlackColor,
  lineHeight: '32px',
  textAlign: 'center',
  padding: '0 16px',
  height: '64px',
  marginTop: '22px',
  boxSizing: 'border-box'
};

export const titleStyle = (displayCoaccusedDropdown) => ({
  fontSize: '26px',
  fontWeight: 500,
  display: 'inline-block',
  float: 'left',
  color: displayCoaccusedDropdown ? greyishColor : 'inherit',
  paddingTop: '16px'
});
