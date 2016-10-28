import {
  EXTRA_WIDE, DESKTOP, TABLET
} from 'components/responsive/responsive-style-component';
import { fashionPinkColor, pinkishWhiteColor } from 'utils/styles';


const buttonBaseStyle = {
  textAlign: 'center',
  height: '153px',
  fontSize: '36px',
  color: fashionPinkColor,
  fontWeight: '600',
  backgroundColor: pinkishWhiteColor,
  padding: '55px 0',
  position: 'relative',
  boxSizing: 'border-box',
  cursor: 'pointer'
};

export const buttonStyle = {
  [EXTRA_WIDE]: {
    ...buttonBaseStyle,
    height: '137px',
    width: '280px'
  },
  [DESKTOP]: {
    ...buttonBaseStyle,
    height: '137px',
    width: '228px'
  },
  [TABLET]: {
    ...buttonBaseStyle,
    height: '138px',
    width: '172px'
  }
};

const baseHiderStyle = {
  position: 'absolute',
  backgroundColor: pinkishWhiteColor,
  width: '100%',
  zIndex: 1
};

export const hiderStyle = {
  [EXTRA_WIDE]: {
    ...baseHiderStyle,
    height: '17px',
    bottom: '-17px'
  },
  [DESKTOP]: {
    ...baseHiderStyle,
    height: '17px',
    bottom: '-17px'
  },
  [TABLET]: {
    ...baseHiderStyle,
    height: '16px',
    bottom: '-16px'
  }
};

export const responsiveWrapperStyle = {
  display: 'inline-block'
};
