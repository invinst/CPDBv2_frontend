import { sanFranciscoTextFamily, whiteTwoColor, softBlackColor, greyishColor } from 'utils/styles';


export const groupHeaderStyle = {
  color: greyishColor,
  marginTop: '38px',
  marginBottom: '18px',
  height: '8px',
  fontSize: '14px',
  fontFamily: sanFranciscoTextFamily,
  letterSpacing: '0.5px'
};

export const suggestionGroupStyle = {
  display: 'inline-block',
  verticalAlign: 'top',
  paddingLeft: '16px'
};

export const noResultItemStyle = {
  fontFamily: sanFranciscoTextFamily,
  fontSize: '14px',
  color: softBlackColor,
  padding: '6px 0',
  borderBottom: `1px solid ${whiteTwoColor}`,
  width: '415px',
  height: '32px'
};

export const aHrefStyle = {
  textDecoration: 'none'
};
