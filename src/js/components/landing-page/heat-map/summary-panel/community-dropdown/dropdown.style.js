import { accentColor, whiteTwoColor, sanFranciscoTextFamily, greyishColor } from 'utils/styles';
import { imgUrl } from 'utils/static-assets';


export const wrapperStyle = {
};

export const inputWrapperStyle = {
  position: 'relative',

};

export const arrowUpStyle = {
  position: 'absolute',
  top: '26px',
  right: '14px',
  width: '13px',
  height: '8px',
  background: `url("${imgUrl('arrow-up-blue.svg')}") 0px 0px no-repeat scroll`,
  cursor: 'pointer'
};

export const inputStyle = {
  wrapper: {
    border: `1px solid ${accentColor}`,
    height: '64px',
    width: '100%',
    color: accentColor,
    fontSize: '14px',
    fontWeight: 400,
    fontFamily: sanFranciscoTextFamily,
    background: 'white'
  }
};

export const dropdownStyle = {
  padding: '0 16px',
  maxHeight: '479px',
  backgroundColor: 'white',
  position: 'relative',
  zIndex: 3,
  overflow: 'auto'
};

export const dropdownItemStyle = isLast => ({
  borderBottom: isLast ? 0 : `1px solid ${whiteTwoColor}`,
  color: greyishColor,
  fontSize: '14px',
  fontWeight: 400,
  fontFamily: sanFranciscoTextFamily,
  height: '40px',
  cursor: 'pointer',
  boxSizing: 'border-box',
  paddingTop: '11px'
});
