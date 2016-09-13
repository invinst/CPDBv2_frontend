import { softBlackColor, sanFranciscoTextFamily } from 'utils/styles';


export const contentWrapperStyle = {
  padding: '0 13px 5px'
};

export const paragraphStyle = {
  base: {
    color: softBlackColor,
    fontFamily: sanFranciscoTextFamily,
    fontSize: '26px',
    margin: '0 0 30px 0'
  },
  tablet: {
    fontSize: '20px'
  },

  extraWide: {
    fontSize: '36px'
  }
};

export const boldTextStyle = {
  fontWeight: 'bold'
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

export const contentStyle = {
  backgroundColor: 'white',
  paddingBottom: '16px'
};
