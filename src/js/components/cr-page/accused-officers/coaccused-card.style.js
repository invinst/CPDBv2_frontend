import {
  whiteTwoColor, sugarCaneColor, sanFranciscoTextFamily, softBlackColor, lightAltoColor, brightOrangeTwoColor,
  clayGray, accentColor
} from 'utils/styles';

export const wrapperStyle = hovering => ({
  fontFamily: sanFranciscoTextFamily,
  width: '232px',
  textDecoration: 'none',
  height: '264px',
  borderRadius: '2px',
  border: `1px solid ${hovering ? accentColor : whiteTwoColor}`,
  display: 'inline-block',
  marginRight: '8px',
  marginBottom: '8px',
  fontWeight: 300
});

export const topSectionWrapperStyle = {
  padding: '8px 16px 0 16px',
  backgroundColor: sugarCaneColor,
  boxSizing: 'border-box',
  height: '166px',
  overflow: 'hidden'
};

export const bottomSectionWrapperStyle = {
  padding: '11px 16px 8px 16px',
  backgroundColor: 'white'
};

export const categoryTextStyle = hovering => ({
  fontSize: '14px',
  fontWeight: 500,
  color: hovering ? accentColor : softBlackColor,
  borderBottom: `1px solid ${whiteTwoColor}`,
  height: '47px',
  overflow: 'hidden'
});

export const outcomeTextWrapperStyle = {
  width: '100%',
  overflow: 'hidden',
  height: '23px',
  marginTop: '8px'
};

export const outcomeTextStyle = {
  height: '23px',
  fontSize: '14px',
  color: softBlackColor,
  fontWeight: 400,
  backgroundColor: lightAltoColor,
  padding: '4px 10px 10px 10px',
  display: 'inline-block',
  overflowY: 'scroll',
  whiteSpace: 'nowrap',
  boxSizing: 'content-box',
  maxWidth: 'calc(100% - 20px)',
  borderRadius: '2px'
};

export const allegationTextStyle = {
  fontSize: '14px',
  color: softBlackColor,
  fontWeight: 400
};

export const sustainedTextStyle = sustainedCount => ({
  color: sustainedCount == 0 ? clayGray : brightOrangeTwoColor,
  fontWeight: 400,
  fontSize: '14px',
  marginLeft: '4px'
});

export const percentileTextStyle = {
  fontSize: '12px',
  color: clayGray,
  marginBottom: '11px',
};

export const officerInfoTextStyle = {
  fontSize: '14px',
  color: clayGray,
  paddingTop: '10px',
  borderTop: `1px solid ${whiteTwoColor}`,
  height: '58px',
  boxSizing: 'border-box'
};

export const rankStyle = {
  fontSize: '12px',
  color: clayGray
};

export const chartWrapperStyle = {
  verticalAlign: 'middle',
  display: 'inline-block',
  width: '38px',
  height: '38px',
  borderRadius: '2px',
  overflow: 'hidden'
};

export const fullNameStyle = hovering => ({
  fontSize: '14px',
  color: hovering ? accentColor : softBlackColor,
  fontWeight: 400
});

export const titleWrapperStyle = {
  display: 'inline-block',
  width: '154px',
  marginLeft: '8px',
  verticalAlign: 'middle'
};

export const metricWrapperStyle = {
  marginTop: '18px'
};
