import { RawTRRFactory, RawTRROfficerFactory } from 'utils/test/factories/trr';

export default () => RawTRRFactory.build({
  'id': 1,
  officer: RawTRROfficerFactory.build({
    'id': 1,
    'full_name': 'Bernadette Kelly'
  })
});
