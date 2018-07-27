import { boulderColor, softBlackColor } from 'utils/styles';
import { imgUrl } from 'utils/static-assets';


export const tooltipCloseButtonStyle = {
  display: 'inline-block',
  width: '18px',
  height: '18px',
  background: `url("${imgUrl('ic-grey-close.svg')}") no-repeat scroll center transparent`,
  cursor: 'pointer',
  position: 'absolute',
  top: '11px',
  right: '11px',
};

export const tooltipTitleStyle = {
  marginBottom: '8px',
  lineHeight: '18px',
  fontSize: '14px',
  fontWeight: 500,
  color: softBlackColor,
  verticalAlign: 'top',
};

export const tooltipTextStyle = {
  fontSize: '14px',
  fontWeight: 300,
  color: boulderColor,
  lineHeight: '18px',
  whiteSpace: 'pre-line',
};

export const buttonStyle = position => ({
  width: '18px',
  height: '18px',
  cursor: 'pointer',
  background: `url("${imgUrl('ic-info.svg')}") no-repeat scroll center transparent`,
  display: 'inline-block',
  position: position,
  padding: '13px',
  margin: position === 'absolute' ? '-13px -13px -13px -13px' : '0 -26px 0 -4px',
  top: position === 'absolute' ? '16px' : null,
  right: position === 'absolute' ? 0 : null,
  verticalAlign: position === 'relative' ? 'middle' : null,
});
