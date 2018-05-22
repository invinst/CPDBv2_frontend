import { clayGray, whiteTwoColor } from 'utils/styles';


export const wrapperStyle = {
  height: '132px',
  width: '120px',
  display: 'inline-block',
  textAlign: 'center',
};

export const attachmentImageStyle = {
  height: '60px',
  width: '45px',
  display: 'block-inline',
  border: `solid 1px ${whiteTwoColor}`,
  boxSizing: 'border-box',
};

export const outboundLinkStyle = {
  display: 'block'
};

export const attachmentNameStyle = {
  width: '104px',
  height: '36px',
  fontWeight: 500,
  color: clayGray,
  fontSize: '14px',
  lineHeight: '26px',
};

export const insideStyle = {
  position: 'relative',
  top: '50%',
  transform: 'translateY(-50%)'
};
