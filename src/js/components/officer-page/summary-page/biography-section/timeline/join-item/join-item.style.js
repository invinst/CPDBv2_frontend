import {
  softBlackColor,
  clayGray,
} from 'utils/styles';
import {
  baseWrapperShowingStyle,
  baseShowingStyle,
  baseDateStyle,
} from '../base-item/base-item.style';


const height = 24;

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

export const joinStyle = {
  display: 'inline-block',
  width: 'calc(100% - 44px)',
  textAlign: 'center',
  fontSize: '12px',
  color: clayGray,
};
