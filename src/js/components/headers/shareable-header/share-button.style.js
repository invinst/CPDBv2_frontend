import { accentColor, clayGray, hawkesBlue, softBlackColor, sugarCaneColor, whiteTwoColor } from 'utils/styles';
import { shareableHeaderHeight } from 'components/headers/shareable-header/shareable-header.style';

const buttonHeight = 28;
const borderWidth = 1;

export const wrapperStyle = {
  position: 'relative',
  top: '50%',
  transform: 'translateY(-50%)',
};

const focusButtonStyle = {
  color: 'white',
  backgroundColor: softBlackColor,
};

const topButtonStyle = (hovering) => ({
  color: hovering ? 'white' : accentColor,
  backgroundColor: hovering ? accentColor : hawkesBlue,
});

const middleButtonStyle = (hovering) => ({
  color: hovering ? 'white' : clayGray,
  backgroundColor: hovering ? accentColor :sugarCaneColor,
});

const bottomButtonStyle = (hovering) => ({
  color: 'white',
  backgroundColor: hovering ? softBlackColor :accentColor,
});

const commonButtonStyle = {
  float: 'right',
  cursor: 'pointer',
  lineHeight: `${buttonHeight}px`,
  borderRadius: '2px',
  padding: '0 8px',
  border: `solid ${borderWidth}px ${whiteTwoColor}`,
  marginTop: `${(shareableHeaderHeight - buttonHeight - borderWidth * 2) / 2}px`,
};

export const buttonStyle = (focus, position, hovering) => {
  let particularStyle;
  if (focus) {
    particularStyle = focusButtonStyle;
  } else if (position === 'top') {
    particularStyle = topButtonStyle(hovering);
  } else if (position === 'middle') {
    particularStyle = middleButtonStyle(hovering);
  } else {
    particularStyle = bottomButtonStyle(hovering);
  }

  return {
    ...particularStyle,
    ...commonButtonStyle
  };
};

