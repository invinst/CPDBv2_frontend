import {
  whiteTwoColor, sanFranciscoTextFamily, clayGray, softBlackColor, brightOrangeTwoColor,
  greyishColor, accentColor
} from 'utils/styles';
import { imgUrl } from 'utils/static-assets';


export const neighborhoodStyle = {
  padding: '0 16px'
};

export const neighborhoodBodyStyle = {
  paddingBottom: '20px'
};

export const neighborhoodHeaderStyle = {
  padding: '20px 0 8px',
  fontFamily: sanFranciscoTextFamily,
  fontSize: '14px',
  fontWeight: '500',
  color: softBlackColor,
  textTransform: 'uppercase'
};

export const complaintsCountStyle = {
  fontSize: '14px',
  fontWeight: '500',
  color: softBlackColor
};

export const sustainedCountStyle = {
  fontSize: '14px',
  fontWeight: '500',
  color: brightOrangeTwoColor
};

export const comparisonTextStyle = {
  fontSize: '12px',
  fontWeight: '500',
  color: clayGray
};

export const neighborhoodItemStyle = {
  padding: '10px 0',
  borderBottom: `1px solid ${whiteTwoColor}`
};

export const neighborhoodLastItemStyle = {
  padding: '10px 0'
};

export const neighborhoodTitleStyle = {
  fontSize: '14px',
  fontWeight: '500',
  color: greyishColor,
  width: '96.2px',
  display: 'inline-block',
  verticalAlign: 'top',
  marginRight: '16px'
};

export const neighborhoodCategoryStyle = {
  fontSize: '14px',
  fontWeight: '500',
  color: softBlackColor,
  display: 'inline-block',
  verticalAlign: 'top'
};

export const seeMoreButtonStyle = {
  backgroundColor: accentColor,
  color: 'white',
  display: 'block',
  padding: '12px 0',
  textAlign: 'center',
  fontSize: '14px',
  fontWeight: '300',
  borderBottomLeftRadius: '2px',
  borderBottomRightRadius: '2px',
  margin: '0 -1px',
  position: 'relative',
  textDecoration: 'none'
};

export const indicatorStyle = {
  background: `url(${imgUrl('disclosure-indicator.svg')}) no-repeat scroll`,
  position: 'absolute',
  width: '8px',
  height: '12px',
  top: '14px',
  right: '15px'
};
