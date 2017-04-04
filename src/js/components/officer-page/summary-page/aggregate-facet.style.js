import { mediumGrayColor, hardBlackColor, whiteTwoColor } from 'utils/styles';


export const wrapperStyle = {
  borderTop: `solid 1px ${whiteTwoColor}`,
  position: 'relative'
};

export const aggregateNameStyle = {
  fontWeight: 500,
  color: mediumGrayColor,
  padding: '11px 0'
};

export const whiteSleeveStyle = {
  height: '1px',
  top: '38px',
  zIndex: 1,
  width: '100%',
  position: 'absolute',
  backgroundColor: 'white'
};

export const entryStyle = {
  paddingTop: '12.5px',
  paddingBottom: '9.5px',
  letterSpacing: 'normal',
  fontWeight: 400,
  borderTop: `solid 1px ${whiteTwoColor}`
};

export const countStyle = {
  color: hardBlackColor,
  display: 'inline-block',
  width: '38px'
};

export const nameStyle = {
  color: mediumGrayColor,
  display: 'inline-block'
};
