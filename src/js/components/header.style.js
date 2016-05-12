import { imgUrl } from 'utils/static-assets';
import { darkGreyColor } from 'utils/styles';


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

export const fixedWrapperStyle = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  background: 'white',
  zIndex: '2',
  height: '88px',
  boxSizing: 'border-box',
  borderBottom: `1px solid ${darkGreyColor}`
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

export const spaceHolderStyle = {
  height: '150px'
};
