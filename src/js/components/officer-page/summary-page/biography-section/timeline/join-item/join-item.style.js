import {
  softBlackColor,
  clayGray,
} from 'utils/styles';
import {
  commonStyle,
  commonRankStyle,
  commonUnitStyle,
  commonWrapperShowingStyle,
  commonShowingStyle,
  commonDateStyle,
} from '../common.style';


const height = 24;

export const style = commonStyle;

export const rankStyle = {
  ...commonRankStyle,
  lineHeight: `${height}px`,
};

export const unitStyle = {
  ...commonUnitStyle,
  color: clayGray,
  height: `${height}px`,
  lineHeight: `${height}px`,
};

export const wrapperShowingStyle = {
  ...commonWrapperShowingStyle,
  backgroundColor: 'inherit',
};

export const showingStyle = {
  ...commonShowingStyle,
  height: `${height}px`,
  lineHeight: `${height}px`,
  display: 'inline-block',
};

export const dateStyle = {
  ...commonDateStyle,
  fontSize: '12px',
  color: softBlackColor,
  fontWeight: 300,
};

export const joinStyle = {
  display: 'inline-block',
  width: 'calc(100% - 44px)',
  textAlign: 'center',
  fontSize: '12px',
  color: clayGray,
};
