import { clayGray, softBlackColor } from 'utils/styles';
import { imgUrl } from 'utils/static-assets';

export const breadcrumbItemStyle = {
  display: 'inline-block',
  fontWeight: 500,
  lineHeight: '40px',
};

export const breadcrumbTextStyle = {
  ...breadcrumbItemStyle,
  paddingRight: '8px',
  color: softBlackColor
};

export const breadcrumbLinkStyle = {
  ...breadcrumbItemStyle,
  color: clayGray,
  textDecoration: 'none'
};

export const breadcrumbSeparatorStyle = {
  ...breadcrumbItemStyle,
  padding: '2px 8px 0 0',
  height: '12px',
  width: '7.4px',
  background: `url(${imgUrl('disclosure-indicator.svg')}) no-repeat scroll`,
  verticalAlign: 'middle',
};
