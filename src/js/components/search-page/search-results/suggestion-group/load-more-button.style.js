import { sanFranciscoTextFamily, accentColor, greyishColor } from 'utils/styles';

export const loadMoreButtonHeight = 40;

export const loadMoreButtonStyle = {
  padding: '12px 0',
  height: `${loadMoreButtonHeight}px`,
  boxSizing: 'border-box',
  cursor: 'pointer',
};

export const loadMoreButtonTextStyle = (hovering) => ({
  fontWeight: 500,
  fontSize: '14px',
  fontFamily: sanFranciscoTextFamily,
  color: hovering ? accentColor : greyishColor
});
