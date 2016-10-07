import {
  softBlackColor, mistyRoseColor, fashionPinkColor, pinkishWhiteColor, softGreenColor
} from 'utils/styles';


export const wrapperStyle = {
  position: 'relative',
  display: 'inline-block'
};

export const linkButtonStyle = {
  width: '26px',
  height: '26px',
  backgroundColor: mistyRoseColor,
  marginLeft: '8px',
  cursor: 'pointer'
};

export const popupWrapperStyle = {
  position: 'absolute',
  padding: '16px',
  backgroundColor: pinkishWhiteColor,
  boxShadow: `0 2px 4px 0 ${softGreenColor}`,
  zIndex: 1,
  top: '27px',
  right: '-190px'
};

export const linkInputStyle = {
  border: `1px solid ${fashionPinkColor}`,
  color: softBlackColor,
  width: '334px',
  height: '26px'
};
