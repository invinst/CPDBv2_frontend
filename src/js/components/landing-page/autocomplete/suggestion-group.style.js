import { whiteTwoColor, warmGreyColor, sanFranciscoTextFamily } from 'utils/styles';


export const groupHeaderStyle = {
  borderLeft: `8px solid ${warmGreyColor}`,
  color: warmGreyColor,
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

export const suggestionItemStyle = {
  padding: '12px 14px',
  borderBottom: `1px solid ${whiteTwoColor}`,
  width: '415px'
};

export const metaTextStyle = {
  fontSize: '13px',
  fontWeight: 300,
  fontFamily: sanFranciscoTextFamily
};

export const suggestionTextStyle = {
  fontWeight: 500,
  fontSize: '14px',
  fontFamily: sanFranciscoTextFamily
};

export const loadMoreButtonStyle = {
  padding: '12px 14px',
  width: '415px',
  cursor: 'pointer'
};
