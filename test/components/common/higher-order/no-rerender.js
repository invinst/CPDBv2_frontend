import NoRerender from 'components/common/higher-order/no-rerender';


describe('NoRerender component', function () {
  it('should render sub-component', function () {
    NoRerender.should.renderSubComponent();
  });
});
