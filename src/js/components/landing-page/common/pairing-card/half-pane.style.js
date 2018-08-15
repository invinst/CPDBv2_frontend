export const wrapper = position => ({
  position: 'absolute',
  width: '50%',
  height: '100%',
  top: 0,
  left: position === 'left'? 0 : 'auto',
  right: position === 'right'? 0 : 'auto',
  cursor: 'pointer'
});
