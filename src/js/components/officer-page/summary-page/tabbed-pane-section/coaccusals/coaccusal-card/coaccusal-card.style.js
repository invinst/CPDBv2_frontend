import { whiteTwoColor, softBlackColor, clayGray, brightOrangeTwoColor, accentColor } from 'utils/styles';


export const coaccusalCardStyle = (hovering) => ({
  width: '232px',
  border: `solid 1px ${hovering ?accentColor : whiteTwoColor}`,
  color: clayGray,
  fontSize: '12px',
  fontWeight: 300,
  cursor: 'pointer',
});

export const officerNameStyle = (hovering) => ({
  color: hovering ? accentColor : softBlackColor,
  fontSize: '14px',
  fontWeight: 400,
  width: '150px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const headerStyle = {
  padding: '8px 16px',
};

export const thumbnailStyle = {
  width: '38px',
  display: 'inline',
  verticalAlign: 'middle',
};

export const headerTitleStyle = {
  display: 'inline-block',
  paddingLeft: '8px',
  verticalAlign: 'middle',
};

export const allegationStyle = {
  padding: '11px 0',
  margin: '0 16px',
  borderBottom: `1px solid ${whiteTwoColor}`,
  boxSizing: 'border-box',
};

export const allegationCountStyle = {
  color: softBlackColor,
  fontSize: '14px',
  fontWeight: 400,
};

export const sustainedCountStyle = (sustainedCount) => ({
  color: (sustainedCount > 0) ? brightOrangeTwoColor : clayGray,
  fontSize: '14px',
});

export const officerInfoStyle = {
  padding: '0 16px',
  height: '58px',
  fontSize: '14px',
  paddingTop: '12px',
  boxSizing: 'border-box',
};

export const footerStyle = {
  color: softBlackColor,
  fontSize: '14px',
  fontWeight: 500,
  height: '40px',
  lineHeight: '40px',
  backgroundColor: 'white',
  padding: '0 16px',
};
