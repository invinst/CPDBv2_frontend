import {
  softBlackColor, codGrayColor, lightMineShaftColor, altoColor, accentColor, sanFranciscoTextFamily
} from 'utils/styles';


export const hoverColorStyle = {
  color: accentColor
};

export const storyWrapperStyle = {
  backgroundColor: 'white',
  width: '100%',
  cursor: 'pointer'
};

export const sourceWrapperStyle = {
  height: '16px',
  fontFamily: sanFranciscoTextFamily,
  fontSize: '13px',
  paddingLeft: '13px',
  marginTop: '16px',
  marginBottom: '30px'
};

export const sourceStyle = {
  color: codGrayColor,
  fontWeight: 600
};

export const postDateStyle = {
  marginLeft: '8px',
  color: lightMineShaftColor,
  fontWeight: 'normal'
};

export const titleStyle = {
  base: {
    color: softBlackColor,
    fontFamily: sanFranciscoTextFamily,
    padding: '0 16px 20px 13px'
  },

  small: {
    fontSize: '16px'
  },
  normal: {
    fontSize: '20px'
  },
  big: {
    fontSize: '26px'
  },
  extraBig: {
    fontSize: '36px'
  },

  underline: {
    borderBottom: `1px solid ${altoColor}`
  }
};
