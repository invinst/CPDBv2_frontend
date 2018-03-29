import {
  brightOrangeTwoColor,
  champagneColor,
  clayGray,
  scarletColor,
  snowColor,
  softBlackColor,
  whiteTwoColor,
} from 'utils/styles';
import {
  baseRankStyle,
  baseShowingStyle,
  baseUnitStyle,
  baseWrapperKindStyle,
  baseWrapperShowingStyle,
  baseKindStyle,
  baseCategoryStyle,
  baseDetailStyle,
  baseDateStyle,
} from '../base-item/base-item.style';


const height = 58;

export const rankStyle = {
  ...baseRankStyle,
  lineHeight: `${height}px`,
};

export const unitStyle = {
  ...baseUnitStyle,
  lineHeight: `${height}px`,
};

export const wrapperShowingStyle = {
  ...baseWrapperShowingStyle,
  backgroundColor: snowColor,
};

export const showingStyle = (hasBorderBottom) => ({
  ...baseShowingStyle(hasBorderBottom),
  height: `${height}px`,
  lineHeight: `${height}px`,
});

export const kindWrapperStyle = baseWrapperKindStyle;

export const kindStyle = (active) => ({
  ...baseKindStyle,
  width: '85px',
  border: `solid 1px ${champagneColor}`,
  color: active ? scarletColor : brightOrangeTwoColor,
  backgroundColor: active ? champagneColor : 'inherit',
});

export const detailStyle = baseDetailStyle;

export const categoryStyle = baseCategoryStyle;

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
  ...baseDateStyle,
  fontSize: '12px',
  color: softBlackColor,
  fontWeight: 300,
  float: 'none',
};
