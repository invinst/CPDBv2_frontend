import { sugarCaneColor, whiteTwoColor, softBlackColor, altoColor } from 'utils/styles';


export const coaccusalsStyle = {
  backgroundColor: sugarCaneColor,
  margin: '0 16px 128px 16px',
  padding: '0 15px 120px 16px',
  border: `1px solid ${altoColor}`,
};

export const groupedCoaccusalsStyle = {
  color: softBlackColor,
  fontSize: '14px',
};

export const groupTitleWrapperStyle = {
  position: 'relative',
  height: '64px',
};

export const groupTitleStyle = {
  bottom: '8px',
  position: 'absolute',
};

export const coaccusedCardsWrapperStyle = (isLast) => ({
  padding: isLast ? '8px 0 0' : '8px 0',
  borderBottom: isLast ? 'none' : `1px solid ${whiteTwoColor}`
});

export const extraCoaccusalCardStyle = {
  display: 'inline-block',
  margin: '0 8px 8px 0',
};
