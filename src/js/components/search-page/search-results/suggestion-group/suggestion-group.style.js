import { softBlackColor, sanFranciscoTextFamily } from 'utils/styles';


export const suggestionGroupStyle = {
  height: '100%'
};

export const scrollerStyle = (singleContent) => ({
  overflow: 'auto',
  height: singleContent ? '100%' : 'auto'
});

export const groupHeaderStyle = {
  fontSize: '14px',
  fontWeight: '500',
  fontFamily: sanFranciscoTextFamily,
  color: softBlackColor,
  padding: '38px 16px 8px',
  height: '64px',
  boxSizing: 'border-box'
};
