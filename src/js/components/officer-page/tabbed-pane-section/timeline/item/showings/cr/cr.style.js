import {
  accentColor,
  brightOrangeTwoColor,
  champagneColor,
  clayGray,
  scarletColor,
  snowColor,
  softBlackColor,
} from 'utils/styles';


const height = 58;

export const showingStyle = {
  height: `${height}px`,
  lineHeight: `${height - 1}px`,
};

export const wrapperShowingStyle = (hovering) => ({
  backgroundColor: hovering ? 'white' : snowColor,
  cursor: 'pointer',
});

export const kindStyle = (active) => ({
  width: '85px',
  border: `solid 1px ${champagneColor}`,
  color: active ? scarletColor : brightOrangeTwoColor,
  backgroundColor: active ? champagneColor : 'inherit',
});

export const detailStyle = {
  display: 'inline-block',
  verticalAlign: 'middle',
};

export const categoryStyle = (hovering) => ({
  color: hovering ? accentColor : softBlackColor,
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
  float: 'none',
};
