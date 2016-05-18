import { MOBILE_BREAK_POINT, TABLET_BREAK_POINT, DESKTOP_BREAK_POINT } from 'utils/constants';


export const extraWideInnerWrapperStyle = {
  width: `${DESKTOP_BREAK_POINT}px`,
  margin: '0 auto'
};

export const desktopInnerWrapperStyle = {
  width: `${TABLET_BREAK_POINT}px`,
  margin: '0 auto'
};

export const tabletInnerWrapperStyle = {
  width: `${MOBILE_BREAK_POINT}px`,
  margin: '0 auto'
};
