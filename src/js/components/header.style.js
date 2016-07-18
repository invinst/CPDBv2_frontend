import { imgUrl } from 'utils/static-assets';
import { wildSandColor } from 'utils/styles';


export const navStyle = {
  display: 'inline-block',
  marginLeft: '50px'
};

export const navWrapperStyle = {
  padding: '36px 36px 32px 0',
  height: '88px',
  boxSizing: 'border-box',
  textAlign: 'right'
};

export const navWrapperFixedStyle = {
  float: 'right',
  display: 'inline-block'
};

export const wrapperStyle = {
  backgroundColor: wildSandColor
};

export const fixedWrapperStyle = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  backgroundColor: 'white',
  zIndex: '2',
  height: '88px',
  boxSizing: 'border-box',
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.15)'
};

export const logoStyle = {
  height: '25px',
  width: '90px',
  background: `url("${imgUrl('CPDB-logo.svg')}") no-repeat scroll 0 0 transparent`,
  display: 'inline-block'
};

export const logoWrapperStyle = {
  height: '62px',
  paddingLeft: '36px',
  paddingTop: '18px',
  boxSizing: 'border-box'
};

export const logoWrapperFixedStyle = {
  float: 'left',
  paddingTop: '31px',
  display: 'inline-block'
};

export const spacerStyle = {
  height: '150px'
};

export const spacerSmallStyle = {
  height: '88px'
};
