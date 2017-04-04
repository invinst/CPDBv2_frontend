import { sanFranciscoTextFamily, softBlackColor, monzaColor } from 'utils/styles';


export const headerStyle = {
  paddingRight: '14px',
  height: '26px'
};

export const wrapperStyle = {
  paddingTop: '10px',
  borderTop: `1px solid ${softBlackColor}`,
  borderBottom: `1px solid ${softBlackColor}`
};

export const officerTextStyle = {
  fontSize: '14px',
  fontFamily: sanFranciscoTextFamily,
  fontWeight: 400,
  color: softBlackColor,
  padding: '4px 0',
  display: 'inline-block',
  float: 'left'
};

const _baseButtonStyle = {
  fontSize: '13px',
  fontFamily: sanFranciscoTextFamily,
  color: softBlackColor,
  backgroundColor: monzaColor,
  fontWeight: 400,
  height: '26px',
  width: '59px',
  borderRadius: '2px',
  textAlign: 'center',
  verticalAlign: 'middle',
  lineHeight: '26px',
  display: 'inline-block',
  float: 'right',
  marginLeft: '8px'
};

export const buttonStyle = {
  ..._baseButtonStyle,
  cursor: 'pointer'
};

export const disabledButtonStyle = {
  ..._baseButtonStyle,
  opacity: .5
};
