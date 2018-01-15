import { clayGray, softBlackColor } from 'utils/styles';

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
