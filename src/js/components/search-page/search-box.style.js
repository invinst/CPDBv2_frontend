import { greyishColor, softBlackColor, sugarCaneColor } from 'utils/styles';
import { backButtonWidth } from './search-content.style';


const marginRight = 23;
export const searchInputStyle = {
  input: {
    color: softBlackColor,
    outline: 'none',
    border: 0,
    fontSize: '14px',
    verticalAlign: 'top',
    fontWeight: 500,
    backgroundColor: sugarCaneColor
  },
  wrapper: {
    boxSizing: 'border-box',
    width: `calc(100% - ${backButtonWidth + marginRight}px)`,
    height: '32px',
    marginRight: `${marginRight}px`,
    padding: 0,
  },
  placeholder: {
    color: greyishColor,
    fontSize: '14px'
  }
};
