import { whiteTwoColor, sugarCaneColor, softBlackColor, clayGray } from 'utils/styles';


const radius = 4;

export const baseWrapperStyle = (height) => ({
  fontSize: '14px',
  height: `${height}px`,
});

const smallBoxStyle = {
  width: '104px',
  display: 'inline-block',
  textAlign: 'center',
};

const borderRadiusStyle = (isFirst, isLast) => ({
  borderTopLeftRadius: isFirst ? `${radius}px`: 0,
  borderTopRightRadius: isFirst ? `${radius}px`: 0,
  borderBottomLeftRadius: isLast ? `${radius}px`: 0,
  borderBottomRightRadius: isLast ? `${radius}px`: 0,
});

export const baseRankStyle = (height, isFirst, isLast) => ({
  ...smallBoxStyle,
  borderRight: `solid 1px ${sugarCaneColor}`,
  backgroundColor: whiteTwoColor,
  whiteSpace: 'pre',
  lineHeight: `${height}px`,
  verticalAlign: 'top',
  ...borderRadiusStyle(isFirst, isLast),
});

export const baseUnitStyle = (height, isFirst, isLast) => ({
  ...smallBoxStyle,
  whiteSpace: 'pre',
  backgroundColor: '#E8E7E7',
  lineHeight: `${height}px`,
  color: clayGray,
  verticalAlign: 'top',
  ...borderRadiusStyle(isFirst, isLast),
});

export const unitChangeStyle = (height, isFirst, isLast) => ({
  ...baseUnitStyle(height, isFirst, isLast),
  color: clayGray,
  fontSize: '12px',
  backgroundColor: 'inherit',
});

export const baseWrapperShowingStyle = {
  display: 'inline-block',
  width: 'calc(100% - 209px)',
};

export const baseShowingStyle = (hasBorderBottom) => ({
  width: 'calc(100% - 32px)',
  display: 'inline-block',
  margin: '0 16px',
  borderBottom: hasBorderBottom ? `solid 2px ${whiteTwoColor}`: 'none',
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

export const baseDetailStyle = {
  width: '297px',
  display: 'inline-block',
  verticalAlign: 'middle',
};

export const baseDateStyle = {
  float: 'right',
  width: '44px',
  display: 'inline-block',
  textAlign: 'right',
};

