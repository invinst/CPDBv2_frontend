import {
  softBlackColor,
  clayGray,
} from 'utils/styles';
import {
  baseStyle,
  baseRankStyle,
  baseUnitStyle,
  baseWrapperShowingStyle,
  baseShowingStyle,
  baseDateStyle,
} from '../base-item/base-item.style';


const height = 24;

export const style = baseStyle;

export const rankStyle = (height, isFirst, isLast) => ({
  ...baseRankStyle(height, isFirst, isLast),
  lineHeight: `${height}px`,
});

export const unitStyle = (height, isFirst, isLast) => ({
  ...baseUnitStyle(height, isFirst, isLast),
  color: clayGray,
  fontSize: '12px',
  backgroundColor: 'inherit',
  verticalAlign: 'top',
});

export const wrapperShowingStyle = {
  ...baseWrapperShowingStyle,
  backgroundColor: 'inherit',
};

export const showingStyle = {
  ...baseShowingStyle,
  height: `${height}px`,
  lineHeight: `${height}px`,
  display: 'inline-block',
};

export const dateStyle = {
  ...baseDateStyle,
  fontSize: '12px',
  color: softBlackColor,
  fontWeight: 300,
};

export const unitChangeStyle = {
  display: 'inline-block',
  width: 'calc(100% - 44px)',
  textAlign: 'center',
  fontSize: '12px',
};

export const oldUnitStyle = {
  color: clayGray,
};

export const newUnitStyle = {
  color: softBlackColor,
};
