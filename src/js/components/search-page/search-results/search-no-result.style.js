import { sanFranciscoTextFamily, whiteTwoColor, mediumGrayColor, softBlackColor } from 'utils/styles';


export const groupHeaderStyle = {
  borderLeft: `8px solid ${mediumGrayColor}`,
  color: mediumGrayColor,
  marginBottom: '26px',
  paddingLeft: '8px',
  fontSize: '14px',
  fontFamily: sanFranciscoTextFamily,
  letterSpacing: '0.5px'
};

export const suggestionGroupStyle = {
  display: 'inline-block',
  verticalAlign: 'top',
  marginLeft: '31px',
  borderLeft: `1px solid ${whiteTwoColor}`
};

export const noResultItemStyle = {
  fontFamily: sanFranciscoTextFamily,
  fontSize: '14px',
  color: softBlackColor,
  padding: '12px 14px',
  borderBottom: `1px solid ${whiteTwoColor}`,
  width: '415px',
  height: '32px'
};

export const aHrefStyle = {
  textDecoration: 'none'
};
