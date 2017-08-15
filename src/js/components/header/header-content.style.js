import { softBlackColor, accentColor, sanFranciscoTextFamily } from 'utils/styles';


export const navStyle = {
  display: 'inline-block',
  marginLeft: '50px',
  fontWeight: 300
};

const _hoverableLinkStyle = {
  color: softBlackColor,
  fontFamily: sanFranciscoTextFamily,
  fontSize: '15px',
  textDecoration: 'none',
  display: 'inline-block',
  fontWeight: 300
};

export const hoverableLinkStyle = {
  base: _hoverableLinkStyle,
  hover: {
    ..._hoverableLinkStyle,
    color: accentColor
  }
};

export const navWrapperStyle = {
  padding: '36px 32px 32px 0',
  height: '88px',
  boxSizing: 'border-box',
  textAlign: 'right'
};

export const navWrapperCompactHeight = 83;

export const navWrapperCompactStyle = {
  padding: '31px 32px 32px 0',
  height: `${navWrapperCompactHeight}px`,
  boxSizing: 'border-box',
  textAlign: 'right',
  float: 'right',
  display: 'inline-block'
};

const _logoStyle = {
  height: '17px',
  width: '77px',
  fontWeight: 600,
  fontSize: '36px',
  color: softBlackColor,
  fontFamily: '"San Francisco Text", sans-serif',
  display: 'inline-block',
  textDecoration: 'none'
};

export const logoStyle = {
  base: _logoStyle,
  hover: {
    ..._logoStyle,
    color: accentColor
  }
};

export const logoWrapperStyle = {
  height: '62px',
  paddingLeft: '32px',
  paddingTop: '9px',
  boxSizing: 'border-box'
};

export const logoWrapperCompactStyle = {
  height: '62px',
  paddingLeft: '32px',
  boxSizing: 'border-box',
  float: 'left',
  paddingTop: '25px',
  display: 'inline-block'
};
