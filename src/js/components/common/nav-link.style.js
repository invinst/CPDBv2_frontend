import { accentColor, softBlackColor, sanFranciscoTextFamily } from 'utils/styles';


export const navStyle = {
  base: {
    color: softBlackColor,
    fontFamily: sanFranciscoTextFamily,
    fontSize: '15px',
    textDecoration: 'none',
    ':hover': {
      color: accentColor,
    },
  },

  active: {
    fontWeight: 'bold',
  },
};
