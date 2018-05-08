import { whiteTwoColor, softBlackColor, snowColor } from 'utils/styles';


export const baseWrapperShowingStyle = {
  display: 'inline-block',
  width: 'calc(100% - 209px)',
  backgroundColor: snowColor,
};

export const baseShowingStyle = (hasBorderBottom) => ({
  width: 'calc(100% - 32px)',
  display: 'inline-block',
  margin: '0 16px',
  borderBottom: hasBorderBottom ? `solid 1px ${whiteTwoColor}`: 'none',
  boxSizing: 'border-box',
});

export const baseWrapperKindStyle = {
  width: '85px',
  display: 'inline-block',
  marginRight: '16px',
};

export const baseKindStyle = {
  lineHeight: '24px',
  display: 'inline-block',
  textAlign: 'center',
};

export const baseCategoryStyle = {
  lineHeight: '18px',
  color: softBlackColor,
};

export const baseDateStyle = {
  float: 'right',
  width: '44px',
  display: 'inline-block',
  textAlign: 'right',
};
