import { sanFranciscoTextFamily, softBlackColor, wildSandColor, whiteTwoColor } from 'utils/styles';


const loadMoreCommonStyle = {
  float: 'right',
  fontSize: '16px',
  fontFamily: sanFranciscoTextFamily,
  fontWeight: 500,
  color: softBlackColor,
  height: '86px',
  textDecoration: 'none',
  marginTop: '16px',
  padding: '33px 16px',
  boxSizing: 'border-box'
};

const loadMoreStyle = {
  ...loadMoreCommonStyle,
  background: wildSandColor
};

export const loadMoreHoverStyle = {
  background: whiteTwoColor
};

export const loadMoreResponsiveStyle = {
  tablet: {
    ...loadMoreStyle,
    width: '172px'
  },
  desktop: {
    ...loadMoreStyle,
    width: '228px'
  },
  extraWide: {
    ...loadMoreStyle,
    width: '274px'
  }
};
