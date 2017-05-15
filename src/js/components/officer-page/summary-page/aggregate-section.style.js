import {
  sanFranciscoTextFamily, softBlackColor, mediumGrayColor, brightOrangeColor, dustyOrangeColor
} from 'utils/styles';


export const wrapperStyle = {
  padding: '0 16px',
  fontFamily: sanFranciscoTextFamily,
  letterSpacing: '.4px',
  fontSize: '14px'
};

export const titleStyle = {
  fontWeight: 600,
  color: softBlackColor,
  marginRight: '6px'
};

export const titleFadedStyle = {
  fontWeight: 300,
  color: mediumGrayColor
};

export const countStyle = {
  padding: '14px 0',
  fontSize: '26px',
  fontWeight: 600,
  display: 'inline-block'
};

export const sustainedCountStyle = {
  padding: '14px 0 14px 33px',
  fontSize: '26px',
  fontWeight: 600,
  color: dustyOrangeColor,
  display: 'inline-block'
};

const _baseCircleStyle = {
  display: 'inline-block',
  borderRadius: '50%',
  width: '11px',
  height: '11px',
  marginLeft: '8px',
  marginRight: '5px'
};

export const blackCircleStyle = {
  ..._baseCircleStyle,
  backgroundColor: softBlackColor
};

export const totalTextStyle = {
  fontSize: '12px',
  color: softBlackColor,
  fontWeight: 400
};

export const orangeCircleStyle = {
  ..._baseCircleStyle,
  backgroundColor: brightOrangeColor
};

export const sustainedTextStyle = {
  fontSize: '12px',
  color: brightOrangeColor,
  fontWeight: 400
};

