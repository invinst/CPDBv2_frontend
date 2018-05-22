import {
  accentColor,
  brightOrangeTwoColor,
  champagneColor,
  clayGray,
  scarletColor,
  softBlackColor,
  whiteTwoColor,
} from 'utils/styles';

export const wrapperKindStyle = {
  width: '85px',
  display: 'inline-block',
  marginRight: '16px',
};

const height = 58;

export const wrapperStyle = (hovering) => ({
  backgroundColor: hovering ? 'white' : 'inherit',
  height: `${height}px`,
  lineHeight: `${height - 1}px`,
  cursor: 'pointer',
  width: 'calc(100% - 32px)',
  display: 'inline-block',
  margin: '0 16px',
  borderBottom: `solid 1px ${whiteTwoColor}`,
  boxSizing: 'border-box',
});

export const kindStyle = (active) => ({
  width: '85px',
  border: `solid 1px ${champagneColor}`,
  color: active ? scarletColor : brightOrangeTwoColor,
  backgroundColor: active ? champagneColor : 'inherit',
  lineHeight: '24px',
  display: 'inline-block',
  textAlign: 'center',
});

export const detailStyle = {
  display: 'inline-block',
  verticalAlign: 'middle',
};

export const categoryStyle = (hovering) => ({
  color: hovering ? accentColor : softBlackColor,
  lineHeight: '18px',
});

export const findingStyle = {
  fontWeight: 300,
  lineHeight: '14px',
  fontSize: '12px',
  color: clayGray,
};

export const rightStyle = {
  display: 'inline-block',
  float: 'right',
};

export const coaccusedStyle = {
  fontSize: '14px',
  fontWeight: 300,
  color: clayGray,
  display: 'inline-block',
};

export const dateStyle = {
  fontSize: '12px',
  color: softBlackColor,
  fontWeight: 300,
  float: 'right',
  width: '120px',
  display: 'inline-block',
  textAlign: 'right',
};
