import {
  sanFranciscoTextFamily, wildSandColor, greyColor, accentColor
} from 'utils/styles';


export const textInputStyle = {
  height: '38px',
  backgroundColor: 'white',
  color: accentColor,
  fontFamily: sanFranciscoTextFamily,
  fontSize: '13px',
  border: 0,
  outline: 0,
  paddingLeft: '8px',
  paddingRight: 0,
  width: 'calc(100% - 8px)'
};

export const subscribeBtnStyle = {
  backgroundColor: wildSandColor,
  width: '79px',
  height: '26px',
  fontWeight: 500,
  fontSize: '13px',
  lineHeight: '20px',
  verticalAlign: 'middle',
  borderRadius: '3px',
  border: `1px solid ${greyColor}`
};

export const formActionBlockStyle = {
  marginTop: '16px'
};

export const subscribeButtonStyle = {
  float: 'right'
};
