import {
  brightOrangeTwoColor,
  champagneColor,
  clayGray,
  scarletColor,
  snowColor,
  softBlackColor,
  whiteTwoColor,
  accentColor,
} from 'utils/styles';


const height = 58;

export const showingStyle = {
  height: `${height}px`,
  lineHeight: `${height - 1}px`,
};

export const wrapperShowingStyle = (hovering) => ({
  backgroundColor: hovering ? 'white' : snowColor,
});

export const kindStyle = (active) => ({
  width: '85px',
  border: `solid 1px ${champagneColor}`,
  color: active ? scarletColor : brightOrangeTwoColor,
  backgroundColor: active ? champagneColor : 'inherit',
});

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

export const attachmentWrapperStyle = {
  width: '51px',
  display: 'inline-block',
  margin: '0 8px 0 17px',
  verticalAlign: 'middle',
};

export const attachmentImageStyle = {
  float: 'right',
  height: '32px',
  width: '24px',
  display: 'block-inline',
  border: `solid 1px ${whiteTwoColor}`,
  boxSizing: 'border-box',
};

export const moreAttachmentsStyle = {
  float: 'right',
  width: '24px',
  marginLeft: '3px',
  lineHeight: '32px',
  height: '32px',
  display: 'block-inline',
  border: `solid 1px ${whiteTwoColor}`,
  textAlign: 'center',
  boxSizing: 'border-box',
};

export const dateStyle = {
  fontSize: '12px',
  color: softBlackColor,
  fontWeight: 300,
  float: 'none',
};
