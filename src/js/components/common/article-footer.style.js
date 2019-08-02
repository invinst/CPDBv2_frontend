import { accentColor, softBlackColor, sanFranciscoTextFamily } from 'utils/styles';


export const linkStyle = {
  color: accentColor,
  fontSize: '13px',
  fontFamily: sanFranciscoTextFamily,
  fontWeight: '600',
  textDecoration: 'none',
  cursor: 'pointer',
  ':hover': {
    color: softBlackColor,
  },
};

export const footerStyle = {
  textAlign: 'right',
  padding: '36px 36px',
  height: '88px',
  boxSizing: 'border-box',
};
