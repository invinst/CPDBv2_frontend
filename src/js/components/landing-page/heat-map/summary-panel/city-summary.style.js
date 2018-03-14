import {
  sanFranciscoTextFamily, softBlackColor, whiteTwoColor, bostonRed, clayGray, sugarCaneColor
} from 'utils/styles';
import { imgUrl } from 'utils/static-assets';


export const wrapperStyle = isActive => ({
  padding: '0 16px',
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

export const allegationDisciplineCountStyle = {
  display: 'inline-block',
  width: 'calc(100% - 8px)',
  verticalAlign: 'middle'
};

export const allegationTextStyle = {
  color: softBlackColor,
  fontSize: '26px',
  fontWeight: 400,
  fontFamily: sanFranciscoTextFamily
};

export const disciplineTextStyle = {
  color: bostonRed,
  fontSize: '26px',
  fontWeight: 400,
  fontFamily: sanFranciscoTextFamily
};

export const mostCommonComplaintStyle = {
  padding: '20px 0 6px',
  fontFamily: sanFranciscoTextFamily,
  fontWeight: 500,
  fontSize: '14px',
  color: softBlackColor
};

export const categoryTextWrapper = {
  display: 'inline-block',
  verticalAlign: 'middle',
  width: 'calc(100% - 8px)'
};

export const categoryStyle = (isLast) => ({
  display: 'block',
  textDecoration: 'none',
  padding: '8px 0 14px',
  borderBottom: isLast ? 0 : `1px solid ${ whiteTwoColor }`,
  fontFamily: sanFranciscoTextFamily,
  fontWeight: 300,
  fontSize: '14px',
  color: clayGray
});

export const categoryNameStyle = {
  fontWeight: 400,
  color: softBlackColor
};

export const rightArrowStyle = {
  background: `url("${imgUrl('disclosure-indicator.svg')}") 0px 0px no-repeat scroll`,
  display: 'inline-block',
  verticalAlign: 'middle',
  width: '8px',
  height: '13px'
};

export const clickReceiver = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0
};
