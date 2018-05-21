import { imgUrl } from 'utils/static-assets';
import { accentColor, softBlackColor } from 'utils/styles';


export const leftNavigationStyle = (hovering) => ({
  cursor: 'pointer',
  color: hovering ? softBlackColor : accentColor,
});

export const leftArrowStyle = (hovering) => {
  const imgName = hovering ? 'disclosure-indicator-black.svg' : 'disclosure-indicator-blue.svg';

  return {
    background: `url("${imgUrl(imgName)}") 10px 0 no-repeat scroll`,
    width: '7px',
    height: '13px',
    paddingLeft: '26px',
    display: 'inline-block',
    transform: 'rotate(180deg)',
  };
};
