import {
  softBlackColor, sanFranciscoTextFamily, mediumGrayColor,
  accentColor, greyColor, peruColor
} from 'utils/styles';


export const outerWrapperStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'white',
  zIndex: 2
};

export const innerWrapperStyle = {
  position: 'fixed',
  width: '452px',
  top: '50%',
  left: '50%',
  marginLeft: '-226px',
  marginTop: '-52px',
  fontFamily: sanFranciscoTextFamily,
  fontWeight: 300,
  fontSize: '14px'
};

const baseInputStyle = {
  color: softBlackColor,
  border: 0,
  outline: 'none'
};

export const usernameInputStyle = {
  ...baseInputStyle,
  height: '20px',
  width: '369px'
};

export const passwordInputStyle = {
  ...baseInputStyle,
  width: '236px'
};

export const labelStyle = {
  display: 'inline-block',
  color: mediumGrayColor,
  width: '81px'
};

export const forgotPasswordLinkStyle = {
  base: {
    cursor: 'pointer',
    color: mediumGrayColor,
    marginLeft: '20px'
  },
  hover: {
    cursor: 'pointer',
    color: accentColor,
    marginLeft: '20px'
  }
};

export const signInButtonStyle = {
  base: {
    cursor: 'pointer',
    float: 'right',
    color: mediumGrayColor
  },
  hover: {
    cursor: 'pointer',
    float: 'right',
    color: accentColor
  }
};

export const nameWrapperStyle = {
  borderBottom: `2px solid ${greyColor}`,
  paddingBottom: '11px'
};

export const passwordInputWrapperStyle = {
  paddingTop: '11px',
  paddingBottom: '24px'
};

export const errorMessageStyle = {
  color: peruColor
};
