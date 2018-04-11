import {
  snowColor,
  softBlackColor,
} from 'utils/styles';


const hasDataHeight = 64;
const noDataHeight = 32;

export const wrapperShowingStyle = {
  backgroundColor: snowColor,
};

export const showingStyle = (hasData) => ({
  backgroundColor: snowColor,
  height: hasData ? `${hasDataHeight}px` : `${noDataHeight}px`,
  lineHeight: hasData ? `${hasDataHeight}px` : `${noDataHeight}px`,
});

export const dateStyle = (hasData) => ({
  fontSize: hasData ? '18px' : '14px',
  color: softBlackColor,
  fontWeight: 300,
  paddingTop: hasData ? '12px' : 0,
});

export const clearFloatStyle = {
  clear: 'both'
};
