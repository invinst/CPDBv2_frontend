import {
  coralRedColor, rajahColor, goldenrodColor, swampGreenColor, hippieGreenColor,
  softBlackColor, whiteTwoColor, sanFranciscoTextFamily
} from 'utils/styles';
import { imgUrl } from 'utils/static-assets';


export const wrapperStyle = {
  paddingTop: '16px',
  paddingBottom: '17px',
  borderBottom: `1px solid ${whiteTwoColor}`,
  position: 'relative'
};

const OFFICER_COMPLAINT_COUNT_RANGE = [
  [20, 0, coralRedColor],
  [9, 20, rajahColor],
  [3, 9, goldenrodColor],
  [2, 3, swampGreenColor],
  [0, 2, hippieGreenColor]
];

const allegationCountToColor = allegationCount => {
  for (let i = 0; i < OFFICER_COMPLAINT_COUNT_RANGE.length; i++) {
    if (allegationCount >= OFFICER_COMPLAINT_COUNT_RANGE[i][0]) {
      return OFFICER_COMPLAINT_COUNT_RANGE[i][2];
    }
  }
};

export const circleStyle = allegationCount => ({
  backgroundColor: allegationCountToColor(allegationCount),
  position: 'absolute',
  top: '19px',
  width: '11px',
  height: '11px',
  display: 'inline-block',
  marginRight: '17px',
  borderRadius: '5.5px',
  border: '0px'
});

export const officerContentWrapperStyle = {
  paddingLeft: '28px',
  fontFamily: sanFranciscoTextFamily,
  display: 'inline-block',
  width: 'calc(100% - 66px)',
  color: softBlackColor,
  verticalAlign: 'middle'
};

export const officerNameStyle = {
  fontSize: '14px',
  fontWeight: 400
};

export const officerSubInfoStyle = {
  fontSize: '12px',
  fontWeight: 300
};

export const removeOfficerWrapperStyle = {
  display: 'inline-block'
};

const _removeOfficerStyle = {
  background: `url("${imgUrl('ic-delete-officer-card.svg')}") 6px 3px no-repeat scroll`,
  width: '24px',
  height: '24px',
  cursor: 'pointer',
  verticalAlign: 'middle',
  paddingRight: '14px',
  display: 'inline-block'
};

export const removeOfficerStyle = {
  base: _removeOfficerStyle,
  hover: {
    ..._removeOfficerStyle,
    background: `url("${imgUrl('ic-delete-officer-card-hover.svg')}") 6px 3px no-repeat scroll`
  }
};
