import { accentColor, clayGray, sugarCaneColor, whiteTwoColor } from 'utils/styles';
import { ATTACHMENT_TYPES } from 'utils/constants';


export const wrapperStyle = (hovering) => ({
  backgroundColor: hovering ? 'white': 'inherit',
  height: '132px',
  width: '120px',
  display: 'inline-block',
  textAlign: 'center',
  paddingTop: '14px',
  verticalAlign: 'bottom',
  overflow: 'hidden',
});

export const attachmentImageStyle = (hovering, imageUrl, fileType) => ({
  border: `solid 1px ${hovering ? accentColor : whiteTwoColor}`,
  height: '60px',
  width: '45px',
  boxSizing: 'border-box',
  display: 'block',
  margin: '0px auto 12px auto',
  background: `${sugarCaneColor} url(${imageUrl}) no-repeat center center`,
  backgroundSize: fileType === ATTACHMENT_TYPES.DOCUMENT ? 'cover' : 'auto',
});

export const attachmentTitleStyle = (hovering) => ({
  color: hovering ? accentColor : clayGray,
  width: '104px',
  height: '36px',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '18px',
});
