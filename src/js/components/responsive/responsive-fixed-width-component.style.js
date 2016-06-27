import { MOBILE_BREAK_POINT, TABLET_BREAK_POINT, DESKTOP_BREAK_POINT } from 'utils/constants';


export const extraWideOuterWrapperStyle = {
  width: `${DESKTOP_BREAK_POINT}px`,
  margin: '0 auto'
};

export const desktopOuterWrapperStyle = {
  width: `${TABLET_BREAK_POINT}px`,
  margin: '0 auto'
};

export const tabletOuterWrapperStyle = {
  width: `${MOBILE_BREAK_POINT}px`,
  margin: '0 auto'
};
