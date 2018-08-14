import {
  softBlackColor, bostonRed, sanFranciscoTextFamily,
  whiteTwoColor, accentColor, hawkesBlue
} from 'utils/styles';
import { imgUrl } from 'utils/static-assets';


export const communityWrapperStyle = {
  padding: '16px 16px 0 16px',
  backgroundColor: 'white'
};

export const headerStyle = {
  color: softBlackColor,
  fontFamily: sanFranciscoTextFamily,
  fontWeight: 400,
  fontSize: '14px',
  textTransform: 'uppercase'
};

export const allegationDisciplineStyle = {
  padding: '13px 0',
  borderBottom: `1px solid ${ whiteTwoColor }`,
};

export const allegationTextStyle = {
  color: softBlackColor,
  fontFamily: sanFranciscoTextFamily,
  fontWeight: 400,
  fontSize: '14px'
};

export const disciplineTextStyle = {
  color: bostonRed,
  fontFamily: sanFranciscoTextFamily,
  fontWeight: 400,
  fontSize: '14px'
};

export const learnMoreStyle = {
  margin: '0 -16px',
  color: accentColor,
  padding: '11px 16px',
  fontFamily: sanFranciscoTextFamily,
  fontSize: '14px',
  fontWeight: 400,
  backgroundColor: hawkesBlue,
  display: 'block'
};

export const learnMoreTextStyle = {
  width: 'calc(100% - 8px)',
  display: 'inline-block',
  verticalAlign: 'middle'
};

export const rightArrowBlueStyle = {
  background: `url("${imgUrl('disclosure-indicator-blue.svg')}") 0px 0px no-repeat scroll`,
  display: 'inline-block',
  verticalAlign: 'middle',
  width: '8px',
  height: '13px'
};

export const closeButtonStyle = {
  background: `url("${imgUrl('clear.svg')}") 0px 0px no-repeat scroll`,
  display: 'inline-block',
  verticalAlign: 'middle',
  width: '14px',
  height: '14px',
  cursor: 'pointer'
};

export const headerTextStyle = {
  display: 'inline-block',
  verticalAlign: 'middle',
  width: 'calc(100% - 14px)'
};
