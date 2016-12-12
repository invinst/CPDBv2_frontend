import { whiteTwoColor, mediumGrayColor, sanFranciscoTextFamily } from 'utils/styles';


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

export const loadMoreButtonStyle = {
  padding: '12px 14px',
  width: '415px',
  cursor: 'pointer'
};

export const suggestionTextStyle = {
  fontWeight: 500,
  fontSize: '14px',
  fontFamily: sanFranciscoTextFamily
};

