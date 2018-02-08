import {
  glitterColor, sanFranciscoTextFamily, clayGray, softBlackColor, accentColor, whiteTwoColor,
  ultraGirlyPink
} from 'utils/styles';


export const suggestionItemStyle = (hovering, active) => ({
  display: 'block',
  textDecoration: 'none',
  backgroundColor: active ?
    glitterColor :
    hovering ?
      'white' :
      'transparent',
  fontFamily: sanFranciscoTextFamily,
  height: '54px',
  boxSizing: 'border-box',
  padding: '0 16px'
});

export const grayTextStyle = {
  color: clayGray,
  fontSize: '12px',
  fontWeight: '300'
};

export const blackTextStyle = (hovering, active) => ({
  color: hovering || active ? accentColor : softBlackColor,
  fontSize: '14px',
  fontWeight: '300'
});

export const innerWrapperStyle = {
  height: '100%',
  borderBottom: `1px solid ${whiteTwoColor}`,
  padding: '11px 0',
  boxSizing: 'border-box'
};

export const aliasLinkStyle = {
  color: ultraGirlyPink,
  textDecoration: 'none',
  marginLeft: '14px'
};
