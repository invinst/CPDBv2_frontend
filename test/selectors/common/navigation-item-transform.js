import { navigationItemTransform } from 'selectors/common/navigation-item-transform';


describe('navigationItemTransform', function () {
  it('should transform view_all item correctly', function () {
    navigationItemTransform({
      id: 'community',
      name: 'Communities',
      description: 'Chicago is divided into 77 areas.',
      'call_to_action_type': 'view_all',
      link: 'http://beta.cpdb.co/url-mediator/session-builder?community=<name>',
      type: 'category',
    }).should.eql({
      id: 'community',
      name: 'Communities',
      description: 'Chicago is divided into 77 areas.',
      callToActionType: 'view_all',
      to: '/search/?terms=community&type=COMMUNITY',
      url: '',
      type: 'category',
      uniqueKey: 'category-community',
    });
  });

  it('should transform link item correctly', function () {
    navigationItemTransform({
      id: 'community',
      name: 'Communities',
      description: 'Chicago is divided into 77 areas.',
      'call_to_action_type': 'link',
      link: 'http://beta.cpdb.co/url-mediator/session-builder?community=<name>',
      type: 'category',
    }).should.eql({
      id: 'community',
      name: 'Communities',
      description: 'Chicago is divided into 77 areas.',
      callToActionType: 'link',
      to: '',
      url: 'http://beta.cpdb.co/url-mediator/session-builder?community=<name>',
      type: 'category',
      uniqueKey: 'category-community',
    });
  });
});
