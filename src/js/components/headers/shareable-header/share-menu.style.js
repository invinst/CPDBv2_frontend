import { whiteTwoColor } from 'utils/styles';
import { shareableHeaderHeight } from 'components/headers/shareable-header/shareable-header.style';

const shareMenuHorizontalMargin = 16;

export const wrapperStyle = {
  position: 'absolute',
  right: 0,
  top: `${shareableHeaderHeight}px`,
  border: '1px solid ' + whiteTwoColor,
  zIndex: 3,
  backgroundColor: 'white',
  width: '144px'
};

const itemStyle = {
  margin: `0 ${shareMenuHorizontalMargin}px`,
  padding: '12px 0',
  display: 'block',
  borderBottom: '2px solid ' + whiteTwoColor,
};

export const imgStyle = {
  float: 'right',
  width: '16px',
  height: '16px',
  paddingTop: '3px',
};

export const buttonItemStyle = {
  ...itemStyle,
  width: `calc(100% - ${shareMenuHorizontalMargin * 2}px)`,
  borderColor: whiteTwoColor,
  borderStyle: 'solid',
  borderWidth: '0 0 2px 0',
  textAlign: 'left',
  color: 'inherit',
  fontWeight: 'inherit',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  backgroundColor: 'white'
};

export const linkItemStyle = {
  ...itemStyle,
  color: 'inherit',
  textDecoration: 'none'
};
