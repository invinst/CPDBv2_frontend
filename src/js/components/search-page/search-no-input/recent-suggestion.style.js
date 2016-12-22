import {
  softBlackColor, whiteTwoColor, sanFranciscoTextFamily,
  mediumGrayColor, greyishColor
} from 'utils/styles';


export const suggestionColumnStyle = {
  display: 'inline-block',
  marginLeft: '31px',
  verticalAlign: 'top'
};

export const suggestionItemStyle = {
  padding: '12px 14px',
  borderBottom: `1px solid ${whiteTwoColor}`,
  width: '415px',
  display: 'block',
  textDecoration: 'none'
};

export const metaTextStyle = {
  fontSize: '14px',
  fontFamily: sanFranciscoTextFamily,
  color: greyishColor,
  width: '177px',
  display: 'inline-block'
};

export const suggestionTextStyle = {
  fontWeight: 500,
  fontSize: '14px',
  fontFamily: sanFranciscoTextFamily,
  color: softBlackColor,
  textDecoration: 'none'
};

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

