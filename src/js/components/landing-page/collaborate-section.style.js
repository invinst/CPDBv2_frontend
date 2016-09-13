import { softBlackColor, sanFranciscoTextFamily } from 'utils/styles';


export const contentStyle = {
  paddingBottom: '39px',
  paddingLeft: '12px',
  backgroundColor: 'white'
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

export const wrapperStyle = {
  margin: '16px',
  boxSizing: 'border-box',
  backgroundColor: 'white',
  paddingBottom: '16px',
  borderBottom: 0
};

export const headerStyle = {
  backgroundColor: 'white',
  height: '26px',
  lineHeight: '26px',
  fontFamily: sanFranciscoTextFamily,
  fontSize: '13px',
  color: softBlackColor,
  letterSpacing: '-0.2px',
  borderLeft: `8px solid ${softBlackColor}`,
  paddingLeft: '8px',
  marginBottom: '66px'
};
