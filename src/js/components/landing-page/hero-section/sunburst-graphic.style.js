import { spindleColor, wildSandColor } from 'utils/styles';
import { imgUrl } from 'utils/static-assets';


export const responsiveStyleWrapperStyle = {
  display: 'inline-block',
  verticalAlign: 'top'
};

const _wrapperStyle = {
  background: spindleColor,
  boxSizing: 'border-box',
  cursor: 'pointer',
  display: 'inline-block'
};

export const wrapperStyle = {
  tablet: {
    ..._wrapperStyle,
    paddingTop: '62px',
    width: '352px',
    height: '352px'
  },
  desktop: {
    ..._wrapperStyle,
    paddingTop: '86px',
    width: '464px',
    height: '464px'
  },
  extraWide: {
    ..._wrapperStyle,
    paddingTop: '105px',
    width: '568px',
    height: '568px'
  }
};
export const wrapperHoverStyle = {
  background: wildSandColor
};

const _sunburstGraphicStyle = {
  background: `url("${imgUrl('sunburst-graphic.svg')}") center / cover`,
  margin: '0 auto'
};

export const sunburstGraphicStyle = {
  tablet: {
    ..._sunburstGraphicStyle,
    width: '190px',
    height: '204px'
  },
  desktop: {
    ..._sunburstGraphicStyle,
    width: '242px',
    height: '260px'
  },
  extraWide: {
    ..._sunburstGraphicStyle,
    width: '296px',
    height: '317px'
  }
};

export const sunburstGraphicHoverStyle = {
  background: `url("${imgUrl('sunburst-graphic-hover.svg')}") center / cover`
};
