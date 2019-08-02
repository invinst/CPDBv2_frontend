import { softBlackColor, sugarCaneColor } from 'utils/styles';


export const radarAxisTextStyle = {
  fontSize: '10px',
};

export const radarAxisTitleStyle = (fillColor) => ({
  fill: fillColor || sugarCaneColor,
  fontWeight: 300,
});

export const radarAxisValueTitleStyle = {
  fill: softBlackColor,
};
