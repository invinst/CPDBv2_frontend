import {
  mediumGrayColor, clayGray, accentColor, sugarCaneColor, greyishColor, whiteTwoColor, lightBlue
} from 'utils/styles';


export const middleWrapperStyle = {
  boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.13)',
};

const middleSlimHeaderHeight = 64;
const topSlimHeaderHeight = 102;
const leftPadding = 16;
const rightLinkMargin = 46;

const slimHeaderStyle = {
  padding: `0 ${leftPadding}px`,
  boxSizing: 'border-box',
  width: 'inherit',
  fontSize: '14px',
  lineHeight: '18px'
};

export const topSlimHeaderStyle = {
  ...slimHeaderStyle,
  height: `${topSlimHeaderHeight}px`,
};

export const middleSlimHeaderStyle = {
  ...slimHeaderStyle,
  height: `${middleSlimHeaderHeight}px`,
};

export const bottomSlimHeaderStyle = {
  ...topSlimHeaderStyle,
  cursor: 'pointer',
};

const rightLinkStyle = {
  textDecoration: 'none',
  color: mediumGrayColor,
  fontWeight: 400,
  cursor: 'pointer',
  marginLeft: `${rightLinkMargin}px`
};

export const topRightLinkStyle = {
  ...rightLinkStyle,
  color: accentColor
};

export const middleRightLinkStyle = {
  ...rightLinkStyle,
  color: clayGray
};

export const bottomRightLinkStyle = {
  ...rightLinkStyle,
  color: 'white',
};

export const verticallyAlignedHeaderItemStyle = {
  float: 'right',
  position: 'relative',
  top: '50%',
  transform: 'translateY(-50%)'
};

export const logoWrapper = {
  float: 'left',
  position: 'relative',
  top: '50%',
  transform: 'translateY(-50%)'
};

const searchBoxStyle = {
  width: '274px',
  color: greyishColor,
  fontSize: '14px',
  lineHeight: '14px',
  boxSizing: 'border-box',
  cursor: 'text',
  display: 'block',
  textDecoration: 'none',
  textAlign: 'right',
  border: `solid 1px ${whiteTwoColor}`,
  padding: '0 13px',
};

export const topSearchBoxStyle = {
  ...searchBoxStyle,
  backgroundColor: sugarCaneColor,
  height: '40px',
  lineHeight: '40px',
  border: `solid 1px ${whiteTwoColor}`,
};

export const middleSearchBoxStyle = {
  ...searchBoxStyle,
  backgroundColor: 'white',
  height: '32px',
  lineHeight: '32px',
  border: `solid 1px ${whiteTwoColor}`,
};

export const bottomSearchBoxStyle = {
  ...searchBoxStyle,
  backgroundColor: lightBlue,
  height: '40px',
  lineHeight: '40px',
  border: 'solid 1px white',
  color: 'white'
};
