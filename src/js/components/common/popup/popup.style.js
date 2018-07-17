import { whiteTwoColor, boulderColor, softBlackColor } from 'utils/styles';
import { imgUrl } from 'utils/static-assets';


export const buttonStyle = {
  width: '18px',
  height: '18px',
  backgroundColor: 'inherit',
  border: `solid 1px ${whiteTwoColor}`,
  borderRadius: '9px',
  boxSizing: 'border-box',
  cursor: 'pointer',
  background: `url("${imgUrl('ic-info.svg')}") no-repeat scroll center transparent`,
};

export const titleStyle = {
  marginBottom: '8px',
  lineHeight: '18px',
};

export const titleTextStyle = {
  fontSize: '14px',
  fontWeight: 500,
  color: softBlackColor,
  verticalAlign: 'top',
};

export const titleCloseButtonStyle = {
  display: 'inline-block',
  width: '18px',
  height: '18px',
  background: `url("${imgUrl('ic-grey-close.svg')}") no-repeat scroll center transparent`,
  marginRight: '6px',
  cursor: 'pointer',
};

export const textStyle = {
  fontSize: '14px',
  fontWeight: 300,
  color: boulderColor,
  lineHeight: '18px',
  whiteSpace: 'pre-line',
};
