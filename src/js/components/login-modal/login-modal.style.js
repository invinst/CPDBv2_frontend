import {
  softBlackColor, sanFranciscoTextFamily, boulderColor,
  accentColor, greyColor, burntOrangeColor, trueGreenColor,
} from 'utils/styles';


export const outerWrapperStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'white',
  zIndex: 300,
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
  fontSize: '14px',
};

const baseInputStyle = {
  color: softBlackColor,
  border: 0,
  outline: 'none',
};

export const usernameInputStyle = {
  ...baseInputStyle,
  height: '20px',
  width: '369px',
};

export const passwordInputStyle = {
  ...baseInputStyle,
  width: '232px',
};

export const labelStyle = {
  display: 'inline-block',
  color: boulderColor,
  width: '81px',
};

export const signInButtonStyle = {
  base: {
    cursor: 'pointer',
    float: 'right',
    color: boulderColor,
  },
  hover: {
    cursor: 'pointer',
    float: 'right',
    color: accentColor,
  },
};

export const nameWrapperStyle = {
  borderBottom: `2px solid ${greyColor}`,
  cursor: 'pointer',
  paddingBottom: '11px',
};

export const passwordInputWrapperStyle = {
  paddingTop: '1px',
  cursor: 'pointer',
  paddingBottom: '10px',
  marginBottom: '4px',
};

const messageStyle = {
  width: '305px',
  display: 'inline-block',
};

export const errorMessageStyle = {
  ...messageStyle,
  color: burntOrangeColor,
};

export const successMessageStyle = {
  ...messageStyle,
  color: trueGreenColor,
};
