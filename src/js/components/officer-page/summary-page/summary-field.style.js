import { sanFranciscoTextFamily, mediumGrayColor, hardBlackColor, whiteTwoColor } from 'utils/styles';


export const wrapperStyle = {
  padding: '11px 0',
  margin: '0 16px',
  width: 'calc(50% - 32px)',
  fontFamily: sanFranciscoTextFamily,
  fontSize: '14px',
  height: '18px',
  fontWeight: 500,
  borderBottom: `solid 1px ${whiteTwoColor}`,
  overflow: 'auto',
  WebkitOverflowScrolling: 'touch',
  display: 'inline-block'
};

export const labelStyle = {
  display: 'inline-block',
  color: mediumGrayColor,
  fontWeight: 300,
  width: '117px'
};

export const valueStyle = {
  display: 'inline-block',
  color: hardBlackColor
};

export const descriptionStyle = {
  display: 'inline-block',
  color: mediumGrayColor,
  fontWeight: 300,
  marginLeft: '8px'
};
