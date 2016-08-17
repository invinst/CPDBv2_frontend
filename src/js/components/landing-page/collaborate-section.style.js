import { softBlackColor, sanFranciscoTextFamily } from 'utils/styles';


export const paragraphStyle = {
  base: {
    color: softBlackColor,
    fontFamily: sanFranciscoTextFamily,
    fontSize: '36px',
    margin: '0 0 30px 0'
  },

  tablet: {
    fontSize: '26px'
  },

  extraWide: {
    fontSize: '48px'
  }
};

export const underlinedLinkStyle = {
  textDecoration: 'none',
  borderBottom: '4px solid rgba(35, 31, 32, 0.2)'
};
