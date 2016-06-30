import { accentColor, softBlackColor } from 'utils/styles';


export const linkStyle = {
  color: accentColor,
  fontSize: '13px',
  fontFamily: '"San Francisco Text Web", sans-serif',
  fontWeight: '600',
  textDecoration: 'none',
  cursor: 'pointer',
  ':hover': {
    color: softBlackColor
  }
};

export const footerStyle = {
  textAlign: 'right',
  padding: '36px 36px',
  height: '88px',
  boxSizing: 'border-box'
};
