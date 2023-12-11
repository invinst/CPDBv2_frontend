import { RawTRRFactory, RawTRROfficerFactory } from '../../src/js/utils/test/factories/trr';

export const trrData = RawTRRFactory.build({
  'id': 1,
  officer: RawTRROfficerFactory.build({
    'id': 1,
    'full_name': 'Bernadette Kelly',
    'percentile_allegation': '99.8100',
  }),
});
