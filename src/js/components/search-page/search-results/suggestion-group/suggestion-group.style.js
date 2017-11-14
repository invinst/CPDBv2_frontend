import { greyishColor, sanFranciscoTextFamily } from 'utils/styles';


const headerInnerHeight = 18;
const headerMarginBottom = 8;
export const headerHeight = headerInnerHeight + headerMarginBottom;

export const groupHeaderStyle = {
  color: greyishColor,
  marginTop: '38px',
  marginBottom: `${headerMarginBottom}px`,
  height: `${headerInnerHeight}px`,
  fontSize: '14px',
  fontFamily: sanFranciscoTextFamily,
  letterSpacing: '0.5px'
};

export const suggestionGroupStyle = {
  display: 'inline-block',
  verticalAlign: 'top'
};
