import { whiteTwoColor, sugarCaneColor, softBlackColor, clayGray } from 'utils/styles';
import { imgUrl } from 'utils/static-assets';


const radius = 4;

export const wrapperStyle = (height) => ({
  fontSize: '14px',
  height: `${height}px`,
});

const smallBoxStyle = (height) => ({
  width: '104px',
  display: 'inline-block',
  textAlign: 'center',
  boxSizing: 'border-box',
  height: `${height}px`,
  lineHeight: `${height}px`,
  verticalAlign: 'top',
  whiteSpace: 'word-wrap',
});

const borderRadiusStyle = (isFirst, isLast) => ({
  borderTopLeftRadius: isFirst ? `${radius}px`: 0,
  borderTopRightRadius: isFirst ? `${radius}px`: 0,
  borderBottomLeftRadius: isLast ? `${radius}px`: 0,
  borderBottomRightRadius: isLast ? `${radius}px`: 0,
});

export const rankStyle = (height, isFirst, isLast) => ({
  ...smallBoxStyle(height),
  borderRight: `solid 1px ${sugarCaneColor}`,
  backgroundColor: whiteTwoColor,
  ...borderRadiusStyle(isFirst, isLast),
});

export const unitStyle = (height, isFirst, isLast) => ({
  ...smallBoxStyle(height),
  backgroundImage: `url("${imgUrl('unit-background-pattern.png')}")`,
  backgroundPosition: 'center',
  backgroundSize: '100%',
  ...borderRadiusStyle(isFirst, isLast),
});

export const changeStyle = (height, isFirst, isLast) => ({
  ...unitStyle(height, isFirst, isLast),
  color: clayGray,
  fontSize: '12px',
  backgroundColor: 'inherit',
  background: 'none',
});

export const textStyle = current => ({
  height: '32px',
  lineHeight: '32px',
  color: current ? softBlackColor : clayGray,
});
