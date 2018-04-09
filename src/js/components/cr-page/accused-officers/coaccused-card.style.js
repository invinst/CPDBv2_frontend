import {
  whiteTwoColor, sugarCaneColor, sanFranciscoTextFamily, softBlackColor, lightAltoColor, brightOrangeTwoColor,
  clayGray
} from 'utils/styles';

export const wrapperStyle = {
  fontFamily: sanFranciscoTextFamily,
  width: '232px',
  textDecoration: 'none',
  height: '264px',
  borderRadius: '2px',
  border: `1px solid ${whiteTwoColor}`,
  display: 'inline-block',
  marginRight: '8px',
  marginBottom: '8px'
};

export const topSectionWrapperStyle = {
  padding: '8px 16px 0 16px',
  backgroundColor: sugarCaneColor
};

export const bottomSectionWrapperStyle = {
  padding: '11px 16px 8px 16px',
  backgroundColor: 'white'
};

export const categoryTextStyle = {
  fontSize: '14px',
  fontWeight: 500,
  color: softBlackColor,
  borderBottom: `1px solid ${whiteTwoColor}`,
  height: '47px'
};

export const outcomeTextStyle = {
  height: '23px',
  boxSizing: 'border-box',
  fontSize: '14px',
  color: softBlackColor,
  fontWeight: 400,
  backgroundColor: lightAltoColor,
  padding: '4px 10px',
  marginTop: '8px',
  display: 'inline-block',
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
  height: '38px'
};

export const fullNameStyle = {
  fontSize: '14px',
  color: softBlackColor
};

export const titleWrapperStyle = {
  display: 'inline-block',
  width: '154px',
  marginLeft: '8px',
  verticalAlign: 'middle'
};

export const metricWrapperStyle = {
  marginTop: '18px'
};
