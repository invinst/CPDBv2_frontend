import {
  softBlackColor, clayGray, bostonRed, sanFranciscoTextFamily, sugarCaneColor,
  whiteTwoColor, accentColor, hawkesBlue
} from 'utils/styles';
import { imgUrl } from 'utils/static-assets';


export const communityWrapperStyle = {
  padding: '0 16px',
  backgroundColor: 'white'
};

export const headerStyle = {
  color: softBlackColor,
  fontFamily: sanFranciscoTextFamily,
  fontWeight: 400,
  fontSize: '14px',
  borderBottom: `1px solid ${ whiteTwoColor }`,
  padding: '23px 0',
  textTransform: 'uppercase'
};

export const allegationDisciplineStyle = {
  padding: '13px 0'
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

export const racePopulationStyle = {
  backgroundColor: sugarCaneColor,
  margin: '0 -16px',
  padding: '11px 0',
  fontFamily: sanFranciscoTextFamily,
  fontWeight: 400,
  fontSize: '14px'
};

export const columnStyle = {
  boxSizing: 'border-box',
  display: 'inline-block',
  width: '50%',
  verticalAlign: 'top',
  padding: '0 16px'
};

export const labelTextStyle = {
  color: clayGray,
  paddingBottom: '3px'
};

export const raceTextStyle = {
  display: 'inline-block',
  width: '50%',
  color: clayGray,
  fontWeight: 300
};

export const raceCountStyle = {
  display: 'inline-block',
  width: '50%',
  textAlign: 'right'
};

export const raceItemStyle = {
  padding: '3px 0'
};

export const populationCountStyle = {
  paddingBottom: '11px',
  paddingTop: '3px'
};

export const medianIncomeStyle = {
  paddingTop: '3px'
};

export const officersHeaderStyle = {
  padding: '18px 0 8px',
  fontFamily: sanFranciscoTextFamily,
  fontSize: '14px',
  fontWeight: 500
};

export const officersWrapperStyle = {
  backgroundColor: 'white'
};

export const officerItemStyle = isLast => ({
  textDecoration: 'none',
  borderBottom: isLast ? 0 : `1px solid ${ whiteTwoColor }`,
  padding: '12px 0',
  display: 'block',
  fontFamily: sanFranciscoTextFamily,
  fontSize: '14px'
});

export const officerTextStyle = {
  display: 'inline-block',
  width: 'calc(100% - 8px)',
  verticalAlign: 'middle'
};

export const officerNameTextStyle = {
  color: softBlackColor,
  fontWeight: 400
};

export const complaintsCountStyle = {
  color: clayGray,
  fontWeight: 300
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

export const rightArrowStyle = {
  background: `url("${imgUrl('disclosure-indicator.svg')}") 0px 0px no-repeat scroll`,
  display: 'inline-block',
  verticalAlign: 'middle',
  width: '8px',
  height: '13px'
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
