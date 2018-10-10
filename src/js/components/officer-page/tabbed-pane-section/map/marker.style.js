import { clayGray, greyishColor, brightOrangeTwoColor, champagneColor, accentColor } from 'utils/styles';
import { MAP_ITEMS } from 'utils/constants';


export const wrapperStyle = (kind, finding, hovering) => {
  let backgroundColor, border;

  if (kind === MAP_ITEMS.FORCE) {
    backgroundColor = greyishColor;
    border = `solid 1px ${ hovering ? accentColor : clayGray }`;
  } else if (kind === MAP_ITEMS.CR) {
    border = `solid 1px ${ hovering ? accentColor : brightOrangeTwoColor }`;
    if (finding === 'Sustained') {
      backgroundColor = champagneColor;
    } else {
      backgroundColor = 'white';
    }
  }

  return {
    backgroundSize: 'cover',
    width: '14px',
    height: '14.2px',
    borderRadius: '50%',
    boxSizing: 'border-box',
    cursor: 'pointer',
    backgroundColor: backgroundColor,
    border: border,
    position: 'relative',
  };
};
