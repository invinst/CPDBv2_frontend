import {
  brightOrangeTwoColor,
  champagneColor,
  clayGray,
  greyishColor,
  softBlackColor,
  whiteTwoColor
} from 'utils/styles';


export const wrapperStyle = {
  width: '320px',
  height: '147px',
  borderRadius: '2px',
  border: `solid 1px ${ whiteTwoColor }`,
  backgroundColor: 'white',
  padding: '20px 16px 16px 16px',
  boxSizing: 'border-box',
  display: 'inline-block',
  position: 'absolute',
  top: '32px',
  right: '32px',
};

export const titleStyle = {
  fontSize: '14px',
  fontWeight: 500,
  textAlign: 'left',
  color: softBlackColor,
};

export const contentStyle = {
  marginTop: '12px',
  fontSize: '14px',
  fontWeight: 300,
};

const ovalStyle = {
  width: '11px',
  height: '11px',
  borderRadius: '50%',
  display: 'inline-block',
  marginRight: '18px',
  verticalAlign: 'middle',
  marginBottom: '2px',
};

export const unsustainedOvalStyle = {
  ...ovalStyle,
  backgroundColor: 'white',
  border: `solid 1px ${ brightOrangeTwoColor }`,
};

export const sustainedOvalStyle = {
  ...ovalStyle,
  backgroundColor: champagneColor,
  border: `solid 1px ${ brightOrangeTwoColor }`,
};

export const useOfForceOvalStyle = {
  ...ovalStyle,
  backgroundColor: greyishColor,
  border: `solid 1px ${ clayGray }`,
};

export const legendTextStyle = {
  textAlign: 'left',
  color: clayGray,
};

export const legendCountStyle = {
  color: softBlackColor,
  float: 'right',
};

export const rowStyle = {
  marginBottom: '16px',
};
