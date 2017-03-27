import { softBlackColor, mediumGrayColor, accentColor, whiteTwoColor, sanFranciscoTextFamily } from 'utils/styles';


export const wrapperStyle = (viewing, hovering) => ({
  padding: '13px 0',
  fontFamily: sanFranciscoTextFamily,
  fontSize: '14px',
  borderBottom: `solid 1px ${whiteTwoColor}`,
  marginLeft: '16px',
  cursor: viewing ? 'default' : 'pointer',
  opacity: 300
});

export const officerInfoStyle = {
  width: '50%',
  display: 'inline-block'
};

export const fullNameStyle = (viewing, hovering) => ({
  fontWeight: 600,
  paddingRight: '18px',
  color: viewing ? mediumGrayColor : (hovering ? accentColor : softBlackColor)
});

export const extraInfoStyle = (viewing, hovering) => ({
  fontWeight: 500,
  color: viewing ? mediumGrayColor : (hovering ? accentColor : mediumGrayColor),
  opacity: hovering && !viewing ? 0.5 : 1
});

export const categoryStyle = (viewing, hovering) => ({
  display: 'inline-block',
  fontWeight: 600,
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

export const indicatorStyle = {
  width: '72px',
  display: 'inline-block'
};

