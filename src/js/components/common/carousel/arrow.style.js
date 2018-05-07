import { imgUrl } from 'utils/static-assets';


export const arrowWidth = 40;

export const buttonStyle = (direction, hovering) => ({
  width: `${arrowWidth}px`,
  backgroundImage: hovering
    ? `url(${ imgUrl('disclosure-indicator-blue.svg') })`
    : `url(${ imgUrl('disclosure-indicator.svg') })`,
  transform: direction === 'left' ? 'scaleX(-1)' : 'none',
  left: direction === 'left' ? 0 : 'auto',
  right: direction === 'right' ? 0 : 'auto',
  height: '100%',
  position: 'absolute',
  top: 0,
  marginTop: 0,
  border: 0,
  outline: 0,
  zIndex: 10,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: '15px 24px'
});
