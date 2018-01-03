import { whiteTwoColor, clayGray, softBlackColor, sugarCaneColor } from 'utils/styles';

const shareMenuHorizontalMargin = 16;

export const outerStyle = {
  backgroundColor: sugarCaneColor
};

export const navBarStyle = {
  height: '40px',
  lineHeight: '22px',
  color: clayGray,
  padding: '0 16px',
  fontSize: '14px',
  fontWeight: 400,
  position: 'relative',
};

export const leftLinkStyle = {
  float: 'left',
  color: 'inherit',
  textDecoration: 'none'
};

export const rightLinkStyle = (active) => ({
  float: 'right',
  color: active ? 'white' : clayGray,
  backgroundColor: active ? softBlackColor : 'inherit',
  cursor: 'pointer',
  lineHeight: '28px',
  borderRadius: '2px',
  padding: '0 8px',
  border: `solid 1px ${whiteTwoColor}`,
  position: 'relative',
  top: '50%',
  transform: 'translateY(-50%)'
});

export const shareMenuStyle = {
  position: 'absolute',
  right: '16px',
  top: '22px',
  border: '1px solid ' + whiteTwoColor,
  zIndex: 3,
  backgroundColor: 'white',
  width: '144px'
};

const shareMenuItemStyle = {
  margin: `0 ${shareMenuHorizontalMargin}px`,
  padding: '12px 0',
  display: 'block',
  borderBottom: '2px solid ' + whiteTwoColor,
};

export const menuItemImgStyle = {
  float: 'right',
  width: '16px',
  height: '16px'
};

export const shareMenuButtonItemStyle = {
  ...shareMenuItemStyle,
  width: `calc(100% - ${shareMenuHorizontalMargin * 2}px)`,
  borderColor: whiteTwoColor,
  borderStyle: 'solid',
  borderWidth: '0 0 2px 0',
  textAlign: 'left',
  color: 'inherit',
  fontWeight: 'inherit',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  backgroundColor: 'white'
};

export const shareMenuLinkItemStyle = {
  ...shareMenuItemStyle,
  color: 'inherit',
  textDecoration: 'none'
};

export const breadcrumbsStyle = {
  margin: 0,
  padding: 0,
};
