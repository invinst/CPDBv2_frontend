import { softBlackColor, sanFranciscoTextFamily } from 'utils/styles';


export const scrollerStyle = (singleContent) => ({
  overflow: 'scroll',
  height: singleContent ? '100%' : 'auto'
});

export const groupHeaderStyle = height => ({
  fontSize: '14px',
  fontWeight: '500',
  fontFamily: sanFranciscoTextFamily,
  color: softBlackColor,
  padding: '38px 16px 8px',
  height: `${height}px`,
  boxSizing: 'border-box'
});
