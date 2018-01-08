import { clayGray, softBlackColor, accentColor } from 'utils/styles';
import { imgUrl } from 'utils/static-assets';

export const breadcrumbItemStyle = {
  display: 'inline-block',
  fontWeight: 500,
  lineHeight: '40px',
};

export const breadcrumbTextStyle = (position) => ({
  ...breadcrumbItemStyle,
  paddingRight: '8px',
  color: position === 'top' ? softBlackColor : clayGray
});

export const breadcrumbLinkStyle = (position) => ({
  ...breadcrumbItemStyle,
  color: position === 'bottom' ? accentColor : clayGray,
  textDecoration: 'none'
});

export const breadcrumbSeparatorStyle = {
  ...breadcrumbItemStyle,
  padding: '2px 8px 0 0',
  height: '12px',
  width: '7.4px',
  background: `url(${imgUrl('disclosure-indicator.svg')}) no-repeat scroll`,
  verticalAlign: 'middle',
};
