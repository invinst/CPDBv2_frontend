
export const arrowWrapperWidth = 40;

export const arrowWrapperStyle = (side) => ({
  width: `${arrowWrapperWidth}px`,
  height: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  display: 'block',
  zIndex: 10,
  cursor: 'pointer',
  top: 0,
  left: side === 'left' ? 0 : 'auto',
  position: 'absolute',
  right: side === 'right' ? 0 : 'auto',

});

export const arrowStyle = (side) => ({
  width: '15px',
  height: '24px',
  objectFit: 'contain',
  transform: side === 'left' ? 'rotate(180deg)' : 'none',
  position: 'relative',
  top: '140px',
  left: '17px'
});
