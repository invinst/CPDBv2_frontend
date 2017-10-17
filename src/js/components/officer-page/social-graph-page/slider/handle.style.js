import {
  whiteTwoColor, wildSandColor, sanFranciscoTextFamily, mediumGrayColor
} from 'utils/styles.js';

export const handleStyle = {
  width: '20px',
  height: '20px',
  marginTop: '-10px',
  marginLeft: '-10px',
  borderRadius: '10px',
  backgroundColor: wildSandColor,
  border: `1px solid ${whiteTwoColor}`,
  padding: '4px 8px',
  boxSizing: 'border-box'
};

export const textStyle = {
  position: 'absolute',
  top: '-20px',
  left: '-50%',
  fontFamily: sanFranciscoTextFamily,
  fontSize: '14px',
  fontWeight: '400',
  color: mediumGrayColor
};
