import { sanFranciscoTextFamily, softBlackColor, greyishColor, accentColor } from 'utils/styles';
import { imgUrl } from 'utils/static-assets';

export const moreCoaccusedStyle = (showDropDown, hovering) => ({
  fontSize: '14px',
  fontWeight: 400,
  display: 'inline-block',
  float: 'right',
  color: showDropDown ? softBlackColor : (hovering ? accentColor : greyishColor),
  cursor: 'pointer',
  fontFamily: sanFranciscoTextFamily,
  paddingTop: '16px'
});

export const arrowStyle = (showDropDown, hovering) => ({
  background: showDropDown ?
    `url("${imgUrl('arrow-up-soft-black.svg')}") 0px 0px no-repeat scroll` :
    (hovering ? `url("${imgUrl('arrow-down-blue.svg')}") 0px 0px no-repeat scroll`
      : `url("${imgUrl('arrow-down-grey.svg')}") 0px 0px no-repeat scroll`),
  display: 'inline-block',
  marginLeft: '10px',
  width: '14px',
  height: '9px'
});
