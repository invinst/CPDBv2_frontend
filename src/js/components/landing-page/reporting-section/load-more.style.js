import { sanFranciscoTextFamily, softBlackColor, wildSandColor, whiteTwoColor } from 'utils/styles';


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
