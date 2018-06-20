import { imgUrl } from 'utils/static-assets';
import { accentColor, hawkesBlue, softBlackColor } from 'utils/styles';


export const wrapperStyle = {
  display: 'inline-block',
  textAlign: 'center',
  margin: '0 4px 0 6px',
};

export const defaultButtonStyle = (width, hovering) => ({
  fontSize: '14px',
  color: hovering ? softBlackColor : accentColor,
  backgroundColor: hawkesBlue,
  padding: '6px 8px',
  display: 'inline-block',
  boxSizing: 'border-box',
  width: `${width}px`,
  cursor: 'pointer',
  borderRadius: '2px',
  position: 'relative',
});

export const arrowStyle = (isUp) => {
  const imageName = isUp ? 'arrow-up-blue.svg' : 'arrow-down-blue.svg';

  return {
    background: `url("${imgUrl(imageName)}") 0px 0px no-repeat scroll`,
    width: '14px',
    height: '9px',
    display: 'inline-block',
  };
};

export const defaultButtonTextStyle = (width) => ({
  display: 'inline-block',
  width: width,
});
