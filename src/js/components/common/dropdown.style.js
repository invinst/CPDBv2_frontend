import { imgUrl } from 'utils/static-assets';
import { accentColor, hawkesBlue, whiteTwoColor } from 'utils/styles';


const defaultHeight = 28;

export const wrapperStyle = {
  display: 'inline-block'
};

export const defaultButtonStyle = {
  fontSize: '14px',
  color: accentColor,
  backgroundColor: hawkesBlue,
  padding: '7px 8px',
  display: 'inline-block',
  boxSizing: 'border-box',
  width: '146px',
  cursor: 'pointer',
};

export const defaultMenuStyle = {
  position: 'absolute',
  width: '146px',
  border: `solid 1px ${whiteTwoColor}`,
  boxSizing: 'border-box',
};

export const defaultMenuItemStyle = {
  fontSize: '14px',
  color: accentColor,
  backgroundColor: 'white',
  height: `${defaultHeight}px`,
  lineHeight: `${defaultHeight}px`,
  cursor: 'pointer',
};

export const arrowStyle = (isUp) => {
  const imageName = isUp ? 'arrow-up-blue.svg' : 'arrow-down-blue.svg';

  return {
    marginLeft: '6px',
    background: `url("${imgUrl(imageName)}") 0px 0px no-repeat scroll`,
    width: '14px',
    height: '9px',
    display: 'inline-block',
  };
};
