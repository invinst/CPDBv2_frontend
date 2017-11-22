import { wildSandColor, sidebarWidth } from 'utils/styles';

export const wrapperStyle = {
  backgroundColor: wildSandColor,
  width: `calc(100% - ${sidebarWidth}px)`,
  height: '100%',
  display: 'inline-block'
};

export const scrollerStyle = {
  height: '100%',
  paddingBottom: '16px',
  boxSizing: 'border-box',
};
