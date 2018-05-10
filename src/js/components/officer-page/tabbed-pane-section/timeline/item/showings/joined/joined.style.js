import {
  softBlackColor,
  clayGray,
} from 'utils/styles';


const height = 24;

export const wrapperShowingStyle = {
  backgroundColor: 'inherit',
};

export const showingStyle = {
  height: `${height}px`,
  lineHeight: `${height - 1}px`,
  display: 'inline-block',
};

export const dateStyle = {
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
