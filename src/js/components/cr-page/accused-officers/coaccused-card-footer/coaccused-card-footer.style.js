import { accentColor, softBlackColor, whiteTwoColor, azaleaColor, champagneColor } from 'utils/styles';


export const bottomSectionWrapperStyle = {
  padding: '11px 16px 4px',
  backgroundColor: 'white'
};

export const categoryTextStyle = hovering => ({
  fontSize: '14px',
  fontWeight: 500,
  color: hovering ? accentColor : softBlackColor,
  borderBottom: `1px solid ${whiteTwoColor}`,
  height: '47px',
  overflow: 'hidden'
});

export const outcomeTextWrapperStyle = (finding, disciplined) => {
  const borderColor = (finding === 'Sustained' && disciplined) ? azaleaColor : champagneColor;
  const backgroundColor = finding !== 'Sustained' ? 'transparent' : borderColor;

  return {
    backgroundColor,
    display: 'inline-block',
    border: `1px solid ${borderColor}`,
    overflow: 'hidden',
    height: '21px',
    marginTop: '8px',
    maxWidth: '100%',
    borderRadius: '2px'
  };
};

export const findingOutcomeMixStyle = {
  height: '21px',
  fontSize: '14px',
  color: softBlackColor,
  fontWeight: 400,
  padding: '0 10px 16px',
  lineHeight: '21px',
  display: 'inline-block',
  overflowX: 'scroll',
  overflowY: 'hidden',
  whiteSpace: 'nowrap',
  boxSizing: 'content-box',
  maxWidth: 'calc(100% - 20px)'
};
