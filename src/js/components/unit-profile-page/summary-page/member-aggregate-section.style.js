import { sanFranciscoTextFamily, softBlackColor, greyishColor, whiteTwoColor, mediumGrayColor } from 'utils/styles';


export const wrapperStyle = {
  padding: '40px 16px',
  fontSize: '14px',
  fontFamily: sanFranciscoTextFamily,
  fontWeight: 400
};

const _statusStyle = {
  fontSize: '26px'
};

export const activeStatusStyle = {
  ..._statusStyle,
  color: softBlackColor
};

export const totalStatusStyle = {
  ..._statusStyle,
  color: greyishColor
};

export const memberWrapperStyle = {
  marginTop: '11px',
  borderTop: `1px solid ${whiteTwoColor}`,
  borderBottom: `1px solid ${whiteTwoColor}`,
  display: 'inline-block',
  width: '100%'
};

export const facetStyle = {
  display: 'block',
  paddingTop: '11px',
  paddingBottom: '12px',
  fontSize: '14px',
  color: mediumGrayColor
};

export const columnWrapperStyle = orientation => ({
  paddingTop: '11px',
  display: 'inline-block',
  width: 'calc(50% - 16px)',
  float: orientation
});

const _cellStyle = {
  paddingBottom: '12px',
  paddingTop: '12px'
};

export const cellStyle = isLastItem => ({
  ..._cellStyle,
  borderBottom: isLastItem ? '0' : `1px solid ${whiteTwoColor}`
});

export const countStyle = {
  color: softBlackColor,
  display: 'inline-block',
  width: '45px'
};

export const nameStyle = {
  color: mediumGrayColor
};

export const genderWrapperStyle = {
  paddingTop: '13px'
};

export const genderCellStyle = (isBorderBottomHidden, isLeftEntry) => ({
  ..._cellStyle,
  borderBottom: isBorderBottomHidden ? '0' : `1px solid ${whiteTwoColor}`,
  display: 'inline-block',
  width: isLeftEntry ? 'calc(50% + 16px)' : 'calc(50% - 16px)'
});
