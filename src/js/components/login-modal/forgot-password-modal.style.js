import * as loginModalStyle from './login-modal.style';
import {
  sanFranciscoTextFamily, softBlackColor, mediumGrayColor, greyColor,
} from 'utils/styles';

export const innerWrapperStyle = {
  position: 'fixed',
  boxSizing: 'border-box',
  top: '50%',
  left: '50%',
  width: '516px',
  height: '344px',
  marginLeft: '-258px',
  marginTop: '-172px',
  padding: '62px 32px',
  backgroundColor: 'white',
  boxShadow: '0 1px 4px 0 rgba(35, 31, 32, 0.2)',
  fontFamily: sanFranciscoTextFamily,
  fontSize: '14px',
  fontWeight: 300,
};

export const headerStyle = {
  textAlign: 'center',
  color: softBlackColor,
  fontSize: '26px',
  marginBottom: '6px',
};

export const subHeaderStyle = {
  textAlign: 'center',
  color: mediumGrayColor,
  marginBottom: '39px',
};

export const emailInputWrapperStyle = {
  borderBottom: `2px solid ${greyColor}`,
  paddingBottom: '8px',
  cursor: 'pointer',
  marginBottom: '11px',
};

export const labelStyle = loginModalStyle.labelStyle;

export const emailInputStyle = loginModalStyle.usernameInputStyle;

export const errorMessageStyle = loginModalStyle.errorMessageStyle;
