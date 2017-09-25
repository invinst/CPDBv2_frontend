import {
  softBlackColor,
  greyishColor,
  accentColor,
  whiteTwoColor,
  sanFranciscoTextFamily
} from 'utils/styles';
import { imgUrl } from 'utils/static-assets';


export const wrapperStyle = (viewing, hovering, showBottomBorder) => ({
  padding: '9px 0',
  fontFamily: sanFranciscoTextFamily,
  fontSize: '14px',
  borderBottom: showBottomBorder ? `solid 1px ${whiteTwoColor}` : 'none',
  marginLeft: '16px',
  cursor: viewing ? 'default' : 'pointer'
});

export const officerInfoStyle = {
  width: '50%',
  display: 'inline-block'
};

export const viewingStyle = {
  float: 'right',
  width: '72px',
  display: 'inline-block',
  color: softBlackColor,
  textalign: 'right'
};

export const viewStyle = hovering => ({
  color: hovering ? accentColor : greyishColor
});

export const arrowStyle = hovering => ({
  width: '14px',
  display: 'inline-block',
  background: hovering ?
    `url("${imgUrl('arrow-down-blue.svg')}") 0px 0px no-repeat scroll` :
    `url("${imgUrl('arrow-down-grey.svg')}") 0px 0px no-repeat scroll`,
  marginLeft: '6px',
  height: '9px'
});
