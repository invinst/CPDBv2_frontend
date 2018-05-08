import { softBlackColor, } from 'utils/styles';


const hasDataHeight = 64;
const noDataHeight = 32;

export const showingStyle = (hasData) => ({
  height: hasData ? `${hasDataHeight}px` : `${noDataHeight}px`,
  lineHeight: hasData ? `${hasDataHeight - 1}px` : `${noDataHeight - 1}px`,
});

export const dateStyle = (hasData) => ({
  fontSize: hasData ? '18px' : '14px',
  color: softBlackColor,
  fontWeight: 400,
  paddingTop: hasData ? '13px' : 0,
});

export const clearFloatStyle = {
  clear: 'both'
};
