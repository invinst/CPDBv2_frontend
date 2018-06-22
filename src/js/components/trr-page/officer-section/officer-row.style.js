import { whiteTwoColor, softBlackColor, clayGray, accentColor } from 'utils/styles';


export const officerRowStyle = {
  padding: '7px 0',
  borderBottom: `1px solid ${whiteTwoColor}`,
  display: 'block',
};

export const officerNameStyle = (hovering) => ({
  display: 'inline-block',
  fontSize: '14px',
  color: hovering ? accentColor : softBlackColor,
  marginLeft: '8px',
  verticalAlign: 'middle',
});

export const visualTokenStyle = {
  borderRadius: '2px',
  display: 'inline-block',
  verticalAlign: 'middle',
  width: '38px',
  height: '38px',
  overflow: 'hidden',
  padding: '1px 0',
};

export const rankStyle = {
  fontSize: '12px',
  color: clayGray,
  lineHeight: 1.17,
  fontWeight: 300,
};

