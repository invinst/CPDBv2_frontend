import { sanFranciscoTextFamily, greyishColor, softBlackColor } from 'utils/styles';

export const wrapperStyle = {
  marginTop: '16px',
  marginBottom: '22px'
};

export const textStyle = {
  width: '195px',
  display: 'inline-block',
  fontFamily: sanFranciscoTextFamily,
  fontSize: '14px',
  fontWeight: '500',
  marginLeft: '17px',
  color: greyishColor
};

export const crStyle = {
  width: '66px',
  display: 'inline-block',
  textAlign: 'right',
  fontFamily: sanFranciscoTextFamily,
  fontSize: '14px',
  fontWeight: '600',
  color: softBlackColor
};

export const circleStyle = shade => ({
  width: '10px',
  height: '10px',
  display: 'inline-block',
  borderRadius: '5px',
  backgroundColor: shade
});
