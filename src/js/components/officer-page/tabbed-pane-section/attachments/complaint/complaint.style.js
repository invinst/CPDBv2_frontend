import {
  accentColor,
  brightOrangeTwoColor,
  champagneColor,
  clayGray,
  scarletColor,
  snowColor,
  softBlackColor,
  whiteTwoColor,
} from 'utils/styles';


export const baseWrapperShowingStyle = {
  display: 'inline-block',
  width: 'calc(100% - 209px)',
  backgroundColor: snowColor,
};

export const baseShowingStyle = {
  width: 'calc(100% - 32px)',
  display: 'inline-block',
  margin: '0 16px',
  borderBottom: `solid 1px ${whiteTwoColor}`,
  boxSizing: 'border-box',
};

export const baseWrapperKindStyle = {
  width: '85px',
  display: 'inline-block',
  marginRight: '16px',
};

export const baseKindStyle = {
  lineHeight: '24px',
  display: 'inline-block',
  textAlign: 'center',
};

export const baseCategoryStyle = {
  lineHeight: '18px',
  color: softBlackColor,
};

export const baseDateStyle = {
  float: 'right',
  width: '44px',
  display: 'inline-block',
  textAlign: 'right',
};

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

export const attachmentWrapperStyle = {
  width: '51px',
  display: 'inline-block',
  margin: '0 8px 0 17px',
  verticalAlign: 'middle',
};

export const dateStyle = {
  fontSize: '12px',
  color: softBlackColor,
  fontWeight: 300,
  float: 'none',
};
