import { softBlackColor, sugarCaneColor, clayGray } from 'utils/styles';

const _wrapperStyle = { maxWidth: '288px' };

export const wrapperStyle = {
  top: _wrapperStyle,
  middle: _wrapperStyle,
  bottom: _wrapperStyle
};

const _titleStyle = {
  textDecoration: 'none',
  fontWeight: 400,
  cursor: 'pointer',
  color: softBlackColor
};

export const titleStyle = {
  top: {
    link: _titleStyle
  },
  middle: {
    link: _titleStyle
  },
  bottom: {
    link: {
      ..._titleStyle,
      color: sugarCaneColor
    }
  }
};

const _subtitleStyle = {
  fontSize: '14px',
  fontWeight: '300',
  width: '288px',
  color: clayGray,
};

export const subtitleStyle = {
  top: {
    wrapper: _subtitleStyle
  },
  middle: {
    wrapper: {
      ..._subtitleStyle,
      display: 'none',
    }
  },
  bottom: {
    wrapper: _subtitleStyle
  }
};
