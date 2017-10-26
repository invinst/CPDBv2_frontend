import { wildSandColor, sidebarWidth } from 'utils/styles';

export const wrapperStyle = {
  backgroundColor: wildSandColor,
  width: `calc(100% - ${sidebarWidth}px)`,
  height: '100%',
  boxSizing: 'border-box',
  paddingBottom: '16px',
  display: 'inline-block'
};
