import { accentColor, clayGray, brightOrangeTwoColor } from 'utils/styles';


export const complaintsTextStyle = active => ({
  color: active ? accentColor : clayGray,
  fontSize: '12px',
  fontWeight: '300'
});

export const sustainedTextStyle = active => ({
  color: active ? brightOrangeTwoColor : clayGray,
  fontSize: '12px',
  fontWeight: '300'
});
