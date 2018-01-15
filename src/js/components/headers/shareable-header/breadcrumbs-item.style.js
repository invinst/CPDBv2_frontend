import { clayGray, softBlackColor, accentColor } from 'utils/styles';

export const breadcrumbItemStyle = {
  display: 'inline-block',
  fontWeight: 500,
  lineHeight: '40px',
};

export const breadcrumbTextStyle = (position) => ({
  ...breadcrumbItemStyle,
  paddingRight: '8px',
  color: position === 'bottom' ? clayGray : softBlackColor
});

export const breadcrumbLinkStyle = (position, hovering) => {
  let color;
  if (position === 'bottom')
    color = hovering ? softBlackColor : accentColor;
  else
    color = hovering ? accentColor : clayGray;
  return {
    ...breadcrumbItemStyle,
    color: color,
    textDecoration: 'none'
  };
};
