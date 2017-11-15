import { sugarCaneColor, greyishColor } from 'utils/styles';

export const searchSectionStyle = {
  height: '60vh',
  width: '100%'
};

export const searchBoxStyle = (wide) => ({
  position: 'relative',
  height: '32px',
  width: wide ? '600px' : '500px',
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
});
