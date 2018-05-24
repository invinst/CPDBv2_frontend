import { imgUrl } from 'utils/static-assets';
import { hawkesBlue, accentColor, softBlackColor } from 'utils/styles';


export const wrapperStyle = {
  display: 'inline-block',
  position: 'relative',
  margin: '0 4px 0 6px',
  width: '109px'
};

export const displayOptionStyle = {
  padding: '5px 8px',
  backgroundColor: hawkesBlue,
  borderRadius: '2px',
  color: accentColor,
  fontSize: '14px',
  fontWeight: 300,
  textAlign: 'center',
  cursor: 'pointer'
};

export const displayValueStyle = hovering => ({
  width: '77px',
  textAlign: 'center',
  display: 'inline-block',
  color: hovering ? softBlackColor : accentColor
});

export const optionsStyle = expanded => ({
  display: expanded ? 'block': 'none',
  backgroundColor: 'white',
  position: 'absolute',
  width: '100%',
  zIndex: 10
});

export const optionItemStyle = {
  color: accentColor,
  textAlign: 'center',
  padding: '5px 8px',
  cursor: 'pointer'
};

export const arrowStyle = expanded => {
  const image = expanded ? 'arrow-up-blue.svg' : 'arrow-down-blue.svg';

  return {
    background: `url("${imgUrl(image)}") no-repeat center`,
    width: '14px',
    height: '12px',
    display: 'inline-block'
  };
};
