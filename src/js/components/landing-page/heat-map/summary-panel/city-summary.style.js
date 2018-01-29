import {
  sanFranciscoTextFamily, softBlackColor, whiteTwoColor, bostonRed, clayGray, sugarCaneColor
} from 'utils/styles';


export const wrapperStyle = isActive => ({
  padding: '0 16px 8px',
  border: `1px solid ${whiteTwoColor}`,
  background: isActive ? 'white' : sugarCaneColor,
  cursor: !isActive ? 'pointer' : 'default'
});

export const headerStyle = {
  padding: '23px 0',
  fontWeight: 400,
  fontFamily: sanFranciscoTextFamily,
  fontSize: '14px',
  color: softBlackColor,
  borderBottom: `1px solid ${ whiteTwoColor }`
};

export const allegationDisciplineStyle = {
  padding: '20px 0',
  borderBottom: `1px solid ${ whiteTwoColor }`
};

export const allegationTextStyle = {
  color: softBlackColor,
  fontSize: '26px',
  fontWeight: 300,
  fontFamily: sanFranciscoTextFamily
};

export const disciplineTextStyle = {
  color: bostonRed,
  fontSize: '26px',
  fontWeight: 300,
  fontFamily: sanFranciscoTextFamily
};

export const mostCommonComplaintStyle = {
  padding: '20px 0 6px',
  fontFamily: sanFranciscoTextFamily,
  fontWeight: 500,
  fontSize: '14px',
  color: softBlackColor
};

export const categoryStyle = (isLast) => ({
  padding: '11px 0',
  borderBottom: isLast ? 0 : `1px solid ${ whiteTwoColor }`,
  fontFamily: sanFranciscoTextFamily,
  fontWeight: 300,
  fontSize: '14px',
  color: clayGray
});
