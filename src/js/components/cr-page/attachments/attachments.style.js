import { softBlackColor, whiteTwoColor, sugarCaneColor } from 'utils/styles';


export const wrapperStyle = hasData => ({
  backgroundColor: hasData ? 'white' : sugarCaneColor,
  position: 'relative',
  top: '-1px'
});

export const innerWrapperStyle = hasData => ({
  margin: '0 16px',
  borderBottom: hasData ? `1px solid ${whiteTwoColor}` : null,
  borderTop: hasData ? `1px solid ${whiteTwoColor}` : null,
  position: 'relative',
});

export const attachmentsStyle = hasData => ({
  paddingBottom: hasData ?'8px' : 0
});

export const titleStyle = {
  color: softBlackColor,
};
