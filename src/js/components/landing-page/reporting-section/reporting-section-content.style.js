import { sanFranciscoTextFamily, softBlackColor, wildSandColor, whiteTwoColor } from 'utils/styles';


export const wrapperStyle = {
  paddingLeft: 0,
  paddingBottom: '100px',
  position: 'relative',
  top: '-1px'
};

export const borderSleeveStyle = {
  height: '1px',
  width: '100%',
  zIndex: 50,
  top: '1px',
  position: 'relative',
  background: 'white'
};

const _loadMoreStyle = {
  float: 'right',
  fontSize: '16px',
  fontFamily: sanFranciscoTextFamily,
  fontWeight: 500,
  color: softBlackColor,
  height: '86px',
  width: '228px',
  textDecoration: 'none',
  marginTop: '16px',
  padding: '33px 16px',
  boxSizing: 'border-box'
};

export const loadMoreStyle = {
  ..._loadMoreStyle,
  background: wildSandColor
};

export const loadMoreHoverStyle = {
  ..._loadMoreStyle,
  background: whiteTwoColor
};
