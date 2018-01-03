import { softBlackColor, clayGray } from 'utils/styles';

export const breadcrumbItemStyle = {
  display: 'inline-block',
  fontSize: '14px',
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
  paddingRight: '8px',
};
