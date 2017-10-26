import { whiteTwoColor, clayGray, softBlackColor } from 'utils/styles';

const shareMenuHorizontalMargin = 16;

export const navBarStyle = {
  height: '22px',
  lineHeight: '22px',
  borderBottom: '1px solid ' + whiteTwoColor,
  color: clayGray,
  padding: '0 8px',
  fontSize: '12px',
  fontWeight: 400
};

export const leftLinkStyle = {
  float: 'left',
  color: 'inherit',
  textDecoration: 'none'
};

export const rightLinkStyle = (active) => ({
  float: 'right',
  color: active ? softBlackColor : 'inherit',
  cursor: 'pointer'
});

export const shareMenuStyle = {
  position: 'fixed',
  right: '8px',
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
