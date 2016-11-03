import { lightBlackColor, wildSandColor, lightMineShaftColor, whiteTwoColor } from 'utils/styles';


export const backButtonStyle = {
  background: `url(/src/img/arrow.svg) center no-repeat ${wildSandColor}`,
  display: 'inline-block',
  width: '26px',
  height: '26px',
  margin: '4px 23px 5px 0',
  border: `1px solid ${whiteTwoColor}`,
  borderRadius: '2px'
};

export const searchBoxStyle = {
  height: '83px',
  backgroundColor: 'white',
  boxSizing: 'border-box',
  padding: '23px 16px',
  boxShadow: `0 1px 2px 0 ${lightBlackColor}`,
  marginBottom: '1px'
};

export const helperTextStyle = {
  padding: '16px 63px 92px',
  color: lightMineShaftColor
};

export const resultWrapperStyle = {
  backgroundColor: 'white'
};
