import {
  fashionPinkColor,
  pinkishWhiteColor
} from 'utils/styles';


export const resultWrapperStyle = {
  overflowX: 'auto',
  boxSizing: 'border-box',
  whiteSpace: 'nowrap'
};

export const plusWrapperStyle = {
  height: '74px',
  textAlign: 'center',
  fontSize: '36px',
  color: fashionPinkColor,
  fontWeight: '600',
  backgroundColor: pinkishWhiteColor,
  boxSizing: 'border-box',
  cursor: 'pointer',
  marginLeft: '16px',
  marginBottom: '20px',
  width: '40%',
  minWidth: '480px',
  margin: 'auto'
};

export const plusSignStyle = {
  // Reset <a> link styles:
  textDecoration: 'none',
  color: 'inherit',

  position: 'relative',
  display: 'block',
  top: '50%',
  transform: 'translateY(-50%)'
};
