import { softBlackColor, whiteTwoColor } from 'utils/styles';
import scrollBarWidth from 'utils/scrollbar-width';

export const previewPaneWidth = 320;

export const wrapperStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  borderLeft: `1px ${whiteTwoColor} solid`,
  backgroundColor: 'white',
  height: `calc(100% - ${scrollBarWidth}px`,
};

export const titleStyle = {
  lineHeight: '32px',
  fontSize: '26px',
  fontWeight: 500,
  color: `${softBlackColor}`,
  margin: '48px 16px 16px 16px'
};

export const visualTokenStyle = {
  width: `${previewPaneWidth}px`,
  height: `${previewPaneWidth}px`
};
