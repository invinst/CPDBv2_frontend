import { softBlackColor, mistyRoseColor, tomatoPinkColor, sanFranciscoTextFamily } from 'utils/styles';


const _baseStyle = {
  color: softBlackColor,
  fontFamily: sanFranciscoTextFamily,
  fontSize: '15px',
  fontWeight: 300,
  backgroundColor: mistyRoseColor,
  border: '1px solid white',
  borderRadius: '3px',
  marginLeft: '50px',
  padding: '5px 7px',
  cursor: 'pointer'
};

export const style = {
  base: _baseStyle,
  hover: {
    ..._baseStyle,
    backgroundColor: tomatoPinkColor
  }
};
