import { sanFranciscoTextFamily, softBlackColor, accentColor } from 'utils/styles';
import { imgUrl } from 'utils/static-assets';

export const moreCoaccusedStyle = (showDropDown, hovering, scrollPosition) => {
  let color;
  if (showDropDown)
    color = softBlackColor;
  else if (scrollPosition === 'bottom')
    color = hovering ? accentColor: 'white';
  else
    color = hovering ? softBlackColor: accentColor;

  return {
    fontSize: '14px',
    fontWeight: 400,
    display: 'inline-block',
    float: 'right',
    color: color,
    cursor: 'pointer',
    fontFamily: sanFranciscoTextFamily,
    paddingTop: '16px'
  };
};

export const arrowStyle = (showDropDown, hovering, scrollPosition) => {
  let imgName;
  if (showDropDown)
    imgName = 'arrow-up-soft-black.svg';
  else if (scrollPosition === 'bottom')
    imgName = hovering ? 'arrow-down-blue.svg' : 'arrow-down-white.svg';
  else
    imgName = hovering ? 'arrow-down-grey.svg' : 'arrow-down-blue.svg';

  return {
    background: `url("${imgUrl(imgName)}") 0px 0px no-repeat scroll`,
    display: 'inline-block',
    marginLeft: '10px',
    width: '14px',
    height: '9px'
  };
};
