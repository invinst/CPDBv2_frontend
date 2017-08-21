import { sugarCaneColor, greyishColor } from 'utils/styles';
import { SLIM_HEADER_HEIGHT } from 'components/slim-header/slim-header.style';

export const searchSectionStyle = {
  height: `calc(84vh - ${SLIM_HEADER_HEIGHT}px)`,
  width: '100%'
};

export const searchBoxStyle = {
  position: 'relative',
  height: '32px',
  width: '500px',
  backgroundColor: sugarCaneColor,
  color: greyishColor,
  top: '46%',
  transform: 'translateY(-50%)',
  padding: '8px 17px',
  margin: 'auto',
  fontSize: '13px',
  boxSizing: 'border-box',
  cursor: 'text',
  display: 'block',
  textDecoration: 'none'
};
