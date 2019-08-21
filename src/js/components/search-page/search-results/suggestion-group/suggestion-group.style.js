import { softBlackColor, sanFranciscoTextFamily } from 'utils/styles';


export const wrapperStyle = (singleContent) => ({
  overflow: 'hidden',
  height: singleContent ? '100%' : 'auto',
});

export const scrollerStyle = ({
  view: {
    overflowY: 'scroll',
    overflowX: 'hidden',
    marginBottom: 0,
  },
});

export const groupHeaderStyle = ({
  fontSize: '14px',
  fontWeight: '500',
  fontFamily: sanFranciscoTextFamily,
  color: softBlackColor,
  padding: '38px 16px 8px',
  height: '64px',
  boxSizing: 'border-box',
});
