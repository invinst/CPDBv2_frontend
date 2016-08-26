import { softBlackColor, sanFranciscoTextFamily } from 'utils/styles';


export const contentStyle = {
  paddingBottom: '39px',
  paddingLeft: '12px'
};

export const paragraphStyle = {
  base: {
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
  fontWeight: 400
};

export const paragraphWrapperStyle = {
  tablet: {
    color: softBlackColor,
    width: '620px'
  },
  desktop: {
    color: softBlackColor,
    width: '736px'
  },
  extraWide: {
    color: softBlackColor,
    width: '902px'
  }
};
