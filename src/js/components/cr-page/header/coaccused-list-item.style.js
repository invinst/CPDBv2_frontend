import { softBlackColor, mediumGrayColor, accentColor, whiteTwoColor, sanFranciscoTextFamily } from 'utils/styles';
import { imgUrl } from 'utils/static-assets';


export const wrapperStyle = (viewing, hovering, showBottomBorder) => ({
  padding: '13px 0',
  fontFamily: sanFranciscoTextFamily,
  fontSize: '14px',
  borderBottom: showBottomBorder ? `solid 1px ${whiteTwoColor}` : 'none',
  marginLeft: '16px',
  cursor: viewing ? 'default' : 'pointer'
});

export const officerInfoStyle = {
  width: '50%',
  display: 'inline-block'
};

export const fullNameStyle = (viewing, hovering) => ({
  fontWeight: 500,
  paddingRight: '18px',
  color: viewing ? mediumGrayColor : (hovering ? accentColor : softBlackColor)
});

export const extraInfoStyle = (viewing, hovering) => ({
  fontWeight: 400,
  color: viewing ? mediumGrayColor : (hovering ? accentColor : mediumGrayColor),
  opacity: hovering && !viewing ? 0.5 : 1
});

export const categoryStyle = (viewing, hovering) => ({
  display: 'inline-block',
  fontWeight: 500,
  width: 'calc(50% - 88px)',
  color: viewing ? mediumGrayColor : (hovering ? accentColor : softBlackColor)
});

export const viewingStyle = {
  width: '72px',
  display: 'inline-block',
  color: mediumGrayColor,
  padding: '2px 0',
  textAlign: 'center',
  border: `solid 1px ${whiteTwoColor}`
};

export const arrowStyle = hovering => ({
  width: '14px',
  display: 'inline-block',
  background: hovering ?
    `url("${imgUrl('arrow-down-blue.svg')}") 0px 0px no-repeat scroll` :
    `url("${imgUrl('arrow-down-grey.svg')}") 0px 0px no-repeat scroll`,
  marginLeft: '60px',
  height: '9px'
});

