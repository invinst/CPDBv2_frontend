import { sugarCaneColor, greyishColor, whiteTwoColor, lightBlue } from 'utils/styles';

export const searchSectionStyle = {
  position: 'relative',
  top: '50%',
  transform: 'translateY(-50%)',
  float: 'right',
  zIndex: 1, // make sure its clickable area doesn't get covered up by CPDP logo
};

export const searchTermsLinkStyle = {
  cursor: 'pointer'
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
  height: '24px',
  lineHeight: '24px',
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
