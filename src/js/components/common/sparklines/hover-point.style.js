import { greyishColor } from 'utils/styles';

export const hoverPointStyle = (width, height, hovering) => ({
  width: `${width}px`,
  height: `${height}px`,
  display: 'inline-block',
  textAlign: 'center',
  position: 'relative',
  cursor: hovering ? 'pointer' : 'auto',
  backgroundColor: hovering ? 'rgba(0, 94, 244, 0.1)' : 'transparent'
});

export const sustainedLineStyle = hasSustainedCR => ({
  width: '1px',
  backgroundColor: hasSustainedCR ? '#ff6000' : 'transparent',
  height: '100%',
  display: 'inline-block',
  position: 'absolute',
});

export const tooltipStyle = {
  position: 'absolute',
  top: '-50px',
  transform: 'translateX(-50%)',
  width: '144px',
  height: '48px',
  boxSizing: 'border-box',
  textAlign: 'center',
  border: '1px solid #dbdbdb',
  color: greyishColor,
  backgroundColor: 'white',
  fontSize: '14px',
  padding: '4px 0 5px 0'
};


export const tooltipTextStyle = {
  height: '18px',
  lineHeight: '18px'
};

export const alignStyle = alignment => {
  let leftAlign = 0;
  if (alignment === 'middle') {
    leftAlign = '50%';
  } else if (alignment === 'right') {
    leftAlign = '100%';
  }

  return { left: leftAlign };
};
