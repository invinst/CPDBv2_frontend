import { whiteTwoColor, sanFranciscoTextFamily, eggPlantColor } from 'utils/styles';


export const suggestionColumnStyle = (first=false) => ({
  display: 'inline-block',
  marginLeft: first ? '0px' : '31px',
  verticalAlign: 'top'
});

export const suggestionItemStyle = {
  padding: '12px 14px',
  borderBottom: `1px solid ${whiteTwoColor}`,
  width: '415px',
  height: '32px'
};

export const metaTextStyle = {
  fontSize: '13px',
  fontWeight: 300,
  fontFamily: sanFranciscoTextFamily,
  color: eggPlantColor
};

export const suggestionTextStyle = {
  fontWeight: 500,
  fontSize: '14px',
  fontFamily: sanFranciscoTextFamily
};

