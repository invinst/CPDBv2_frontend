import { softBlackColor, sanFranciscoTextFamily } from 'utils/styles';


export const wrapperStyle = {
  base: {
    width: '762px',
    padding: '45px 13px'
  },

  tablet: {
    width: '676px',
    padding: '45px 13px'
  }
};

export const paragraphStyle = {
  base: {
    color: softBlackColor,
    fontFamily: sanFranciscoTextFamily,
    fontSize: '36px',
    margin: '0 0 30px 0'
  },

  tablet: {
    fontSize: '26px'
  }
};

export const underlinedLinkStyle = {
  textDecoration: 'none',
  borderBottom: '4px solid rgba(35, 31, 32, 0.2)'
};
