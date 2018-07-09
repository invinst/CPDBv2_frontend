import {
  whiteTwoColor, sugarCaneColor, sanFranciscoTextFamily, softBlackColor, azaleaColor, brightOrangeTwoColor,
  clayGray, accentColor, champagneColor
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
  padding: '11px 16px 4px',
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

export const outcomeTextWrapperStyle = (finding, disciplined) => {
  const borderColor = (finding == 'Sustained' && disciplined) ? azaleaColor : champagneColor;
  const backgroundColor = finding !== 'Sustained' ? 'transparent' : borderColor;

  return {
    backgroundColor,
    display: 'inline-block',
    border: `1px solid ${borderColor}`,
    overflow: 'hidden',
    height: '21px',
    marginTop: '8px',
    maxWidth: '100%',
    borderRadius: '2px'
  };
};

export const findingOutcomeMixStyle = {
  height: '21px',
  fontSize: '14px',
  color: softBlackColor,
  fontWeight: 400,
  padding: '0px 10px 16px',
  lineHeight: '21px',
  display: 'inline-block',
  overflowX: 'scroll',
  overflowY: 'hidden',
  whiteSpace: 'nowrap',
  boxSizing: 'content-box',
  maxWidth: 'calc(100% - 20px)'
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
