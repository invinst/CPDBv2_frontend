import { whiteTwoColor, mediumGrayColor, sanFranciscoTextFamily } from 'utils/styles';


const headerInnerHeight = 16;
const headerMarginBottom = 26;
export const headerHeight = headerInnerHeight + headerMarginBottom;

export const groupHeaderStyle = {
  borderLeft: `8px solid ${mediumGrayColor}`,
  color: mediumGrayColor,
  marginBottom: `${headerMarginBottom}px`,
  height: `${headerInnerHeight}px`,
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
