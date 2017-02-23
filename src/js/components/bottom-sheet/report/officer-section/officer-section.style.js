import { monzaColor, accentColor, mediumGrayColor, sanFranciscoTextFamily } from 'utils/styles';
import { imgUrl } from 'utils/static-assets';


export const addOfficerButtonStyle = {
  marginTop: '14px',
  height: '44px',
  textAlign: 'center',
  verticalAlign: 'middle',
  lineHeight: '44px',
  backgroundColor: monzaColor,
  color: accentColor,
  fontFamily: sanFranciscoTextFamily,
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 400
};

export const addOfficerCircleWrapperStyle = {
  display: 'inline-block',
  marginTop: '-2px'
};

const _addOfficerCircleStyle = {
  background: `url("${imgUrl('contact-add.svg')}") 0 0 no-repeat scroll`,
  width: '22px',
  height: '22px',
  cursor: 'pointer',
  verticalAlign: 'middle',
  paddingRight: '14px',
  display: 'inline-block'
};

export const addOfficerCircleStyle = {
  base: _addOfficerCircleStyle,
  hover: {
    ..._addOfficerCircleStyle,
    background: `url("${imgUrl('contact-add-hover.svg')}") 0 0 no-repeat scroll`
  }
};

export const officerInvolvedTextStyle = {
  display: 'inline-block',
  fontFamily: sanFranciscoTextFamily,
  fontSize: '14px',
  verticalAlign: 'middle',
  fontWeight: 400,
  color: mediumGrayColor,
  width: 'calc(100% - 36px)'
};

export const officerInvolvedStyle = {
  paddingTop: '11px',
  width: '100%'
};

export const officerCardsWrapperStyle = {
  paddingTop: '6px'
};

export const lastOfficerCardStyle = {
  borderBottom: 'none'
};
