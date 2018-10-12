import {
  softBlackColor, whiteTwoColor, boulderColor, lighterAccentColor, accentColor
} from 'utils/styles';


export const wrapperStyle = (hovering) => ({
  display: 'inline-block',
  margin: '16px',
  boxSizing: 'border-box',
  textDecoration: 'none',
  verticalAlign: 'top',
  border: `solid 1px ${hovering ? accentColor : whiteTwoColor}`,
  borderRadius: '2px'
});

export const lightTextStyle = (hovering) => ({
  fontSize: '12px',
  lineHeight: 1.17,
  fontWeight: 300,
  color: hovering ? lighterAccentColor : boulderColor,
  marginTop: 0,
  marginBottom: 0,
  height: '14px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
});

export const boldTextStyle = (hovering) => ({
  lineHeight: '18px',
  fontSize: '14px',
  fontWeight: 300,
  color: hovering ? accentColor : softBlackColor,
  marginTop: 0,
  marginBottom: 0
});

export const extraInfoStyle = (hovering) => ({
  fontSize: '14px',
  lineHeight: '18px',
  margin: 0,
  color: hovering ? lighterAccentColor : boulderColor
});

export const sectionStyle = {
  margin: '0 16px',
  padding: '11px 0',
  borderBottom: `solid 1px ${whiteTwoColor}`,
  height: '54px',
  boxSizing: 'border-box',
};

export const noBorderSectionStyle = {
  ...sectionStyle,
  border: 'none'
};

export const sustainedStyle = (hovering) => ({
  color: hovering ? 'inherit' : boulderColor,
  whiteSpace: 'nowrap'
});
