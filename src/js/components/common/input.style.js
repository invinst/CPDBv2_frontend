export const inputStyle = (paddingVertical, paddingHorizontal) => ({
  paddingTop: `${paddingVertical}px`,
  paddingBottom: `${paddingVertical}px`,
  paddingLeft: `${paddingHorizontal}px`,
  paddingRight: `${paddingHorizontal}px`,
  boxSizing: 'border-box',
  border: 'none',
  width: '100%',
  height: '100%',
});

export const wrapperStyle = (width, height) => ({
  display: 'inline-block',
  height: `${height}px`,
  width: `${width}px`,
  position: 'relative',
});

export const placeholderStyle = (height, paddingVertical, paddingHorizontal) => ({
  display: 'inline-block',
  position: 'absolute',
  pointerEvents: 'none',
  top: `${paddingVertical}px`,
  left: `${paddingHorizontal}px`,
  height: `${height - paddingVertical * 2}px`,
});
