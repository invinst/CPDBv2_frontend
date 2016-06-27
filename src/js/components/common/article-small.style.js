import { accentColor, softBlackColor } from 'utils/styles';


export const wrapperStyle = {
  paddingRight: '16px',
  paddingLeft: '16px',
  boxSizing: 'border-box',
  height: '264.5px',
  position: 'relative',
  color: softBlackColor
};

export const wrapperHoverStyle = {
  cursor: 'pointer',
  ':hover': {
    color: accentColor
  }
};

export const contentStyle = {
  overflow: 'hidden',
  height: 'calc(100% - 17.5px)'
};

export const tabletWrapperStyle = {
  height: '128px'
};

export const extraWideWrapperStyle = {
  height: '320px'
};
