import { accentColor, softBlackColor } from 'utils/styles';


export const navStyle = {
  base: {
    color: softBlackColor,
    fontFamily: '"San Francisco Text Web", sans-serif',
    fontSize: '15px',
    textDecoration: 'none',
    ':hover': {
      color: accentColor
    }
  },

  active: {
    fontWeight: 'bold'
  }
};
