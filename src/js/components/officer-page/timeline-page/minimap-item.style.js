import {
  sanFranciscoTextFamily, wildSandColor, mediumGrayColor, veryLightGreyColor, darkerGreyColor, whiteTwoColor,
  softBlackColor
} from 'utils/styles';


const hoverStyle = {
  backgroundColor: veryLightGreyColor,
  border: `2px solid ${veryLightGreyColor}`,
  color: darkerGreyColor
};

const activeStyle = {
  backgroundColor: 'white',
  border: `2px solid ${whiteTwoColor}`,
  color: softBlackColor
};

export const itemStyle = (hovering, active) => ({
  width: '67px',
  display: 'inline-block',
  verticalAlign: 'middle',
  height: '26px',
  backgroundColor: wildSandColor,
  textAlign: 'center',
  borderRadius: '100px',
  fontSize: '14px',
  fontFamily: sanFranciscoTextFamily,
  fontWeight: 400,
  border: `2px solid ${wildSandColor}`,
  color: mediumGrayColor,
  boxSizing: 'border-box',
  padding: '3px 0',
  marginLeft: '1px',
  marginBottom: '1px',
  cursor: 'pointer',
  ...(hovering ? hoverStyle : {}),
  ...(active ? activeStyle : {})
});
