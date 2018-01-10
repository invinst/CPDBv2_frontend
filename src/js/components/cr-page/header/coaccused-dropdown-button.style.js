import { sanFranciscoTextFamily, softBlackColor, greyishColor, accentColor } from 'utils/styles';
import { imgUrl } from 'utils/static-assets';

export const moreCoaccusedStyle = (showDropDown, hovering, scrollPosition) => {
  let color;
  if (showDropDown)
    color = softBlackColor;
  else if (scrollPosition === 'bottom')
    color = 'white';
  else if (hovering)
    color = accentColor;
  else
    color = greyishColor;

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
    imgName = 'arrow-down-white.svg';
  else if (hovering)
    imgName = 'arrow-down-blue.svg';
  else
    imgName = 'arrow-down-grey.svg';

  return {
    background: `url("${imgUrl(imgName)}") 0px 0px no-repeat scroll`,
    display: 'inline-block',
    marginLeft: '10px',
    width: '14px',
    height: '9px'
  };
};
